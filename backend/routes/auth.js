const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

module.exports = (db) => {
  const userModel = new User(db)

  router.post('/register', async (req, res) => {
    const { email, password } = req.body

    const existingUser = await userModel.findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userModel.createUser(email, hashedPassword)

    const token = jwt.sign({ userId: newUser.insertedId }, 'your_jwt_secret', { expiresIn: '1h' })

    res.status(201).json({ token })
  })

  router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findUserByEmail(email)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' })
    res.json({ token })
  })

  router.post('/logout', (req, res) => {  
    res.status(200).json({ message: 'Logout successful' })
  })  

  router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret')
      const user = await userModel.findUserById(decoded.userId)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ email: user.email })
    } catch (err) {
      console.error('Error decoding token:', err)
      res.status(401).json({ message: 'Invalid token' })
    }
  })

  router.post('/change-password', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }
  
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret')
      const user = await userModel.findUserById(decoded.userId)
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      const { oldPassword, newPassword } = req.body
  
      const isMatch = await bcrypt.compare(oldPassword, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' })
      }
  
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)
  
      await userModel.updateUserPassword(user._id, hashedPassword)
  
      res.json({ message: 'Password changed successfully' })
    } catch (err) {
      console.error('Error changing password:', err)
      res.status(500).json({ message: 'Server error' })
    }
  })  

  return router
}
