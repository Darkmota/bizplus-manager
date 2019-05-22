const Model = require('../Model')
module.exports = new Model({
  name: 'contact_us',
  query: {
    name: String,
    email: String,
    address: String,
    createTime: {
      type: Date,
      default: Date.now
    }
  }
})
