const express = require ('express')
const app = express()

app.use(express.urlencoded({extended: true}))

app.post('/curriculo', (req, resp) => {
    console.log(req.body)
    resp.send('<h1> [OK] Formulário Recebido! </h1>')
})

console.log('Servidor Executando...')
app.listen(3000)

