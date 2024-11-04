const { ObjectId } = require('mongodb')

class User {
  constructor(db) {
    this.collection = db.collection('users')
  }

  async createUser(email, hashedPassword) {
    return await this.collection.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })
  }

  async findUserByEmail(email) {
    return await this.collection.findOne({ email })
  }

  async findUserById(userId) {
    return await this.collection.findOne({ _id: new ObjectId(userId) })
  }
}

module.exports = User