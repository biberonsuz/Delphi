const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const url = 'mongodb://localhost:27017';

MongoClient.connect(url)
  .then((client) => {
    console.log('Successfully connected to MongoDB');
    const db = client.db('delphi');  // Use your database name

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // POST route for handling chat messages
    app.post('/api/chat', (req, res) => {
      const { message } = req.body;

      // Process the user's message (you can customize the logic here)
      const responseMessage = `You asked about "${message}". Here is my response...`;

      // Respond back with the message from the bot
      res.json({ reply: responseMessage });
    });

  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

app.get('/', (req, res) => {
  res.send('Hello, the server and MongoDB are connected!');
});
