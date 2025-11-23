import axios from 'axios'

const api = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_OPENROUTER_API_KEY,
    'HTTP-Referer': import.meta.env.VITE_APP_URL,
    'X-Title': 'Selidik'
  }
})

const send = async (message) => {
    const messages = `${message}. Berikan respons yang atraktif dan menarik seperti manusia dalam format HTML 5, tetapi hanya gunakan tag <h5>, <span>, <p>, <i>, <strong> untuk cetak teks saja`
    const res = await api.post('/chat/completions', {
        model: 'x-ai/grok-4.1-fast',
        messages: [
        { role: 'user', content: messages }
        ]
    })

    return res.data.choices[0].message.content
}

export default send