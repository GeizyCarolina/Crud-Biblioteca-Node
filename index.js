// configuração inicial

// chamar os pacotes instalados 
const express = require('express')
const app = express() // executar express como uam função
const mongoose = require('mongoose')

// segurança para o bd quando subir para o git
require('dotenv').config()


// forma de ler o json/ middlewares / eviar e ler json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


// rota inicial / postman / endpoint
app.get('/', (req, res) => {
  
    // mostrar a requisição
    res.json({
        message: 'Oi Express!'
    })
})





// importar as rotas do book 
const bookRoutes = require('./Routes/bookRoutes')
app.use('/book', bookRoutes) // definir as rotas que serao acessadas pelo arquivo

// importar as rotas do auhtor 
const authorRoutes = require('./Routes/authorRoutes')
app.use('/author', authorRoutes) // definir as rotas que serao acessadas pelo arquivo

// importar as rotas do genre 
const genreRoutes = require('./Routes/genreRoutes')
app.use('/genre', genreRoutes) // definir as rotas que serao acessadas pelo arquivo

// importar as rotas do bookinstance 
const bookinstanceRoutes = require('./Routes/bookinstanceRoutes')
app.use('/bookinstance', bookinstanceRoutes) // definir as rotas que serao acessadas pelo arquivo






//  Conexao com o mongo banco de dados 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterbiblioteca.yzhbf.mongodb.net/?retryWrites=true&w=majority`)

// se o banco conectou com sucesso
.then(() => {
    console.log('Conectamos ao Mongo')

    //porta para acessar
    app.listen(3000)
})

// se não exibir o erro
.catch((erro) => {
   console.log(erro)
})




