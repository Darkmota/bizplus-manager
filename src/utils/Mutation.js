import axios from '../axios'
import Config from '../config/secret'
const Mutation = {
  async fetchData () {
    let returnObj = {}
    await Promise.all(['cn', 'en', 'jp'].map(locale =>
      new Promise(async (resolve, reject) => {
        axios.get(`./lang/${locale}.json`)
          .then(res => {
            returnObj[locale] = res.data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    ))
    return returnObj
  },
  loginAsTeacher (id, password) {
    return axios.post(`${Config.serverBase}/graphql`, {
      operationName: null,
      query: `
        mutation($id: String, $password: String) {
          loginAsTeacher(id: $id, password: $password) {
            _id
            id
            saltyPassword
            salt
          }
        }
       `,
      variables: {
        id: id,
        password: password
      }
    })
  },

  registerAsTeacher (id, password) {
    return axios.post(`${Config.serverBase}/graphql`, {
      operationName: null,
      query: `
        mutation($id: String, $password: String) {
          registerAsTeacher(id: $id, password: $password) {
            _id
            id
            saltyPassword
            salt
          }
        }
       `,
      variables: {
        id: id,
        password: password
      }
    })
  }
}

export default Mutation
