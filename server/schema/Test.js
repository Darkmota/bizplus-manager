const Model = require('../Model')

const schema = {
  _id: Number,
  a: [Number],
  b: {
    c: String,
    d: [{
      e: {
        type: String,
        default: 'hello world'
      },
      f: [String],
      g: {
        type: Date,
        default: Date.now
      }
    }]
  }
}

module.exports = new Model(schema, 'test')
