const ContactUs = require('./schema/ContactUs')

console.log(ContactUs)

ContactUs.load()
console.log(ContactUs.findOne({
  _id: {
    $gt: 1
  }
}))
