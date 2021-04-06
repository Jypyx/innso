import axios from 'axios'

const api = axios.create({
  baseUlr: '/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const sendGetRequest = async (url, config = null) => {
  try {
    const resp = await api.get(url, config)
    return resp.data
  } catch (err) {
    console.error(err)
  }
}
