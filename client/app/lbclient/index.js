import { get, post, patch, delete as del } from 'axios'
import autobind from 'autobind-decorator'

export default class LoopbackClient {
  constructor({ baseUrl, accessToken }) {
    this.baseUrl = baseUrl
    this.accessToken = accessToken
  }

  @autobind
  create(modelName, data) {} 

  @autobind
  find(modelName, filter) {} 

  @autobind
  findById(modelName, id, filter) {} 

  @autobind
  findOne(modelName, filter) {} 

  @autobind
  updateAll(modelName, filter, data) {} 

  @autobind
  destroyAll(modelName, where) {} 

  @autobind
  destroyById(modelName, id) {}

  @autobind
  register(credentials) {}

  @autobind
  login(credentials) {}

  @autobind
  logout() {}

}