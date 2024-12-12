const fs = require('fs')
const path = require('path')

async function* loadBookChunks(author, title) {
  const formattedAuthor = author.replace(/\s+/g, '-')
  const formattedTitle = title.replace(/\s+/g, '-')
  const filePath = path.join(__dirname, '../../books', `${formattedAuthor}-${formattedTitle}`, `${formattedAuthor}-${formattedTitle}.txt`)
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' })
  let buffer = ''
  
  for await (const chunk of fileStream) {
    buffer += chunk
    const paragraphs = buffer.split('\n')
    buffer = paragraphs.pop()

    for (const paragraph of paragraphs) {
      yield paragraph.trim()
    }
  }

  if (buffer) {
    yield buffer.trim()
  }
}

module.exports = { loadBookChunks }
