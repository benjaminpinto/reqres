import { test, expect } from '@playwright/test'
import { UsersApi } from './resources/Users'

test.describe.parallel('Tests at API reqres.in', () => {
  const baseURL = 'https://reqres.in/api'

  test('List users', async ({ request }) => {
    const users = new UsersApi(request)
    const usersList = await users.list()

    expect(usersList.status).toBe(200)
    expect(usersList.data[0].id).toBe(1)
  })

  test('Get valid user id = 3', async ({ request }) => {
    const users = new UsersApi(request)
    const user = await users.get(3)

    expect(user.status).toBe(200)
    expect(user.data).toBeTruthy()
  })

  test('Get invalid user id = 30000', async ({ request }) => {
    const users = new UsersApi(request)
    const user = await users.get(30000)
    const emptyObj = {}

    expect(user.status).toBe(404)
    expect(user.data).toEqual(emptyObj)
  })

  test('Create user - happy path', async ({ request }) => {
    const users = new UsersApi(request)
    const newUser = { name: 'benjamin', job: 'programmer' }
    const createResponse = await users.create(newUser)

    expect(createResponse.status).toBe(201)
    expect(createResponse.data).toBeTruthy()
  })

  test('[ISSUE] Create user - empty strings on attributes', async ({
    request,
  }) => {
    const users = new UsersApi(request)
    const newUser = { name: '', job: '' }
    const createResponse = await users.create(newUser)

    console.log(createResponse.data)
    console.log(createResponse.status)
    // expect(createResponse.status).toBe(201)
    // expect(createResponse.data).toBeTruthy()
  })
  test('[ISSUE] Create user - empty body', async ({ request }) => {
    const users = new UsersApi(request)
    const newUser = {}
    const createResponse = await users.create(newUser)

    console.log(createResponse.data)
    console.log(createResponse.status)
    // expect(createResponse.status).toBe(201)
    // expect(createResponse.data).toBeTruthy()
  })
})
