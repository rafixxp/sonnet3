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
    const messages = `Bertindaklah sebagai pakar cek fakta independen. Analisis informasi berikut secara menyeluruh dan tentukan keakuratannya. Gunakan minimal dua sumber terpercaya dan berikan tautannya: ${message}. Berikan respons nya dalam bentuk html dan jangan berikan tanda kutip. tambahkan emoji agar terlihat lebih menarik. gunakan tag <h5> sebagai heading untuk judul dan referensinya`
    const res = await api.post('/chat/completions', {
        model: 'openai/gpt-oss-20b:free',
        messages: [
        { role: 'user', content: messages }
        ]
    })

    return res.data.choices[0].message.content
}

export default send