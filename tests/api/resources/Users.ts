export class UsersApi {
  readonly baseURL = 'https://reqres.in/api'

  constructor(private request: any) {
    this.request = request
  }

  async list() {
    const response = await this.request.get(`${this.baseURL}/users`)
    const { data } = await response.json()
    const status = response.status()

    return { data, status }
  }

  async get(id: number) {
    const response = await this.request.get(`${this.baseURL}/users/${id}`)
    const data = await response.json()
    const status = response.status()

    return { data, status }
  }

  async create(user: any) {
    const response = await this.request.post(`${this.baseURL}/users`, user)
    const data = await response.json()
    const status = response.status()

    return { data, status }
  }
}
