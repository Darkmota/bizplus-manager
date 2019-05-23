const ContactUs = require('./schema/ContactUs')
const Test = require('./schema/Test')

console.log(ContactUs)
console.log(Test)
/*
console.log(ContactUs.find({
  $or: [{
    name: {
      $in: ['a', 'b']
    },
  }]
}).document)
*/
console.log(Test.find({
  'a.0': 100
}).document)
