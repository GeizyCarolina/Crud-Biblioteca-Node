
// inportar a model person
const { restart } = require('nodemon')
const Book = require('../Models/book')

// rotas da API

// importar o metodo Router do express para criaar as rotas
const router = require('express').Router()



// -------  create ---------

router.post('/', async (req, res) => {

    // req.body
 
    const {title, author, summary, genre, isbn, url} = req.body


    // validação
    if(!title || !author || !summary || !genre || !isbn || !url) {
        res.status(422).json({error: 'Todos os Campos são obrigatorios!'})
        return
    }

    const book = {
        title, 
        author, 
        summary, 
        genre, 
        isbn,
        url,
    }

    try {

        // criando dados
        await Book.create(book)
        
        res.status(201).json({message:'Livro Inserido com Sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- read pegar todas as pessoas ----------

router.get('/', async (req, res) => {

    try {

        const getbook = await Book.find()
        res.status(201).json(getbook)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- read pegar pessoa pelo id ----------

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const getIdbook = await Book.findById({ _id: id})

        // validação para a pessoa que nao é encontrada
        if(!getIdbook){
            res.status(422).json({ message: 'Usuario não encontrado'})
            return
        }

        res.status(200).json(getIdbook)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- update atualizar pessoa pelo id ----------

router.patch('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id
       
    // dados que precisam ser atualizados
    const {title, author, summary, genre, isbn, url} = req.body
    
    const book = {
        title, 
        author, 
        summary, 
        genre, 
        isbn,
        url,
    }

    try {

        const updateBook = await Book.updateOne({ _id: id}, book) // recebe o id e a pessoa que vai atualizar
     

        if(updateBook.matchedCount === 0){
            res.status(422).json({message: "Livro não encontrado"})
            return
        }

        res.status(200).json(book)

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- delete deletar pessoa pelo id ----------

router.delete('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params para excluir
    const id = req.params.id

    // verificar se a pesoa existe
    const book = await Book.findById({ _id: id })

    if(!book){
        res.status(422).json({message: "Livro não encontrado"})
        return
    }

    try {

        const deleteIdbook = await Book.deleteOne({ _id: id})
        res.status(200).json({message: "Livro deletado com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// exportar o router
module.exports = router