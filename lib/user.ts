import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import excuteQuery from './db'
import moment from 'moment'
import { Base64 } from 'js-base64'

export async function createUser({ username, password }) {
  const pass = Base64.encode(password)
  const user = {
    id: uuidv4(),
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    username,
    pass,
  }

  try {
    const result = await excuteQuery({
      query: 'INSERT INTO users (id, createdAt, username, password) VALUES(?, ?, ?, ?, ?)',
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }

  return user
}

export async function findUser({ username }) {
  try {
    console.log(username)
    const result = await excuteQuery({
      query: `SELECT * FROM users WHERE username = '${username}'`,
    })
    console.log(result)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

export async function validatePassword(user, inputPassword) {
  const inputHash = Base64.encode(inputPassword)
  const passwordsMatch = user.password === inputHash
  return passwordsMatch
}
