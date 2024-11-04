require('dotenv').config()
const { MongoClient } = require('mongodb')
const { GoogleGenerativeAI } = require("@google/generative-ai")
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const authMiddleware = require('./middleware/auth')
const { loadBookChunks } = require('./utils/bookLoader')

const app = express()
app.use(express.json())
app.use(cors())

const url = process.env.MONGO_DB_URL || 'mongodb://localhost:27017'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Your name is Delphi, and you go by \"Delphi\"\nYou are a literature professor that is teaching War and Peace by Leo Tolstoy\nThe version of War and Peace you are teaching is by Anthony Briggs\nMake sure your tone is professional but also friendly",
});

MongoClient.connect(url)
  .then((client) => {
    console.log('Successfully connected to MongoDB')
    const db = client.db('delphi')
    const chatHistoryCollection = db.collection('chatHistory')

    app.use('/auth', require('./routes/auth')(db))

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

    app.post('/api/chat', authMiddleware, async (req, res) => {
      const { message, chatId } = req.body
      const userId = req.userId
      if (!message) {
        return res.status(400).json({ error: 'Message is required.' })
      }

      let currentChatId = chatId

      try {
        if (!currentChatId) {
          currentChatId = uuidv4()
        }

        const userChatHistory = await chatHistoryCollection
          .find({ userId, chatId: currentChatId })
          .sort({ timestamp: 1 })
          .toArray()

        const history = userChatHistory.map((entry) => ({
          role: entry.role,
          parts: [{ text: entry.text }],
        }))

        history.push({ role: 'user', parts: [{ text: message }] })

        const chatSession = model.startChat({ history })
        const result = await chatSession.sendMessage(message)
        const geminiResponse = result.response.text()

        await chatHistoryCollection.insertOne({
          userId,
          chatId: currentChatId,
          role: 'user',
          text: message,
          timestamp: new Date(),
        })

        await chatHistoryCollection.insertOne({
          userId,
          chatId: currentChatId,
          role: 'model',
          text: geminiResponse,
          timestamp: new Date(),
        })

        res.status(200).json({ reply: geminiResponse, chatId: currentChatId })
      } catch (error) {
        console.error('Error communicating with the Gemini API:', error)
        res.status(500).json({ error: 'Failed to retrieve response from Gemini API' })
      }
    })
    app.get('/api/user-chats', authMiddleware, async (req, res) => {
      const userId = req.userId
      try {
        const userChats = await chatHistoryCollection
          .aggregate([
            { $match: { userId } },
            { $group: { _id: "$chatId" } }
          ])
          .toArray()
        const chatIds = userChats.map(chat => chat._id)
        res.status(200).json({ chatIds })
      } catch (error) {
        console.error('Error fetching user chats:', error)
        res.status(500).json({ error: 'Failed to retrieve chats' })
      }
    })
    app.get('/api/chat-history', authMiddleware, async (req, res) => {
      const userId = req.userId
      const { chatId } = req.query
    
      try {
        const chatHistory = await chatHistoryCollection
          .find({ userId, chatId })
          .sort({ timestamp: 1 })
          .toArray()
    
        const history = chatHistory.map((entry) => ({
          text: entry.text,
          sender: entry.role === 'user' ? 'user' : 'bot',
        }))
    
        res.status(200).json({ history })
      } catch (error) {
        console.error('Error fetching chat history:', error)
        res.status(500).json({ error: 'Failed to retrieve chat history' })
      }
    })
    app.get('/api/book-select', authMiddleware, async (req, res) => {
      const { selectedBook } = req.body
      const userId = req.userId
      try {
        const userChats = await chatHistoryCollection
          .aggregate([
            { $match: { userId } },
            { $group: { _id: "$chatId" } }
          ])
          .toArray()
        const chatIds = userChats.map(chat => chat._id)
        res.status(200).json({ chatIds })
      } catch (error) {
        console.error('Error fetching user chats:', error)
        res.status(500).json({ error: 'Failed to retrieve chats' })
      }
    })  
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err)
  })

app.get('/', (req, res) => {
  res.send('Hello, the server and MongoDB are connected!')
})
