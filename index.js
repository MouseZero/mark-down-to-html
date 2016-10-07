const marked = require('marked')
const fs = require('fs')
const Transform = require('stream').Transform
const inherits = require('util').inherits

const fileSource = process.argv[2]
const fileTarget = process.argv[3]


const read = fs.createReadStream(fileSource)
const write = fs.createWriteStream(fileTarget)


function Convert () {
  Transform.call(this)
}
inherits(Convert, Transform)

Convert.prototype._transform = function (chunk, enc, done){
  chunk = marked(chunk.toString())
  this.push(chunk)
  done()
}

read.pipe(new Convert()).pipe(write)
