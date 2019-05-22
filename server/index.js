const ContactUs = require('./schema/ContactUs')

console.log(ContactUs)

ContactUs.load()
console.log(ContactUs.find({
  _id: {
    $gt: 0
  },
  name: 'xq'
}).document)
