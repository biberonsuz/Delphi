const fs = require('fs')

const loadBookChunks = (filePath, chunkSize = 300) => {
  const text = fs.readFileSync(filePath, 'utf-8')
  const chunks = []

  let start = 0
  while (start < text.length) {
    const end = start + chunkSize
    chunks.push(text.slice(start, end).trim())
    start = end
  }

  return chunks
}

module.exports = { loadBookChunks }
