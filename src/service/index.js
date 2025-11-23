import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.groq.com/openai/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_OPENROUTER_API_KEY,
    'X-Title': 'Selidik'
  }
})

const send = async (message) => {
    const messages = `${message}. Berikan respons yang atraktif dan menarik seperti manusia dalam format HTML 5, tetapi hanya gunakan tag <h5>, <span>, <p>, <i>, <strong> untuk cetak teks saja`
    const res = await api.post('/chat/completions', {
        model: "openai/gpt-oss-120b",
        max_completion_tokens: 1000,
        messages: [
          { role: 'user', 
            content: messages 
          }
        ],
    })

    return res.data.choices[0].message.content
}

export default send