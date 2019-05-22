const Model = require('../Model')

const schema = {
  _id: Number,
  name: String,
  email: String,
  address: String,
  createTime: {
    type: Date,
    default: Date.now
  }
}

module.exports = new Model(schema, 'contact_us')
