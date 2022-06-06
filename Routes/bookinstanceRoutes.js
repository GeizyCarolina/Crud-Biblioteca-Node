
// inportar a model person
const { restart } = require('nodemon')
const Bookinstance = require('../Models/bookinstance')

// rotas da API

// importar o metodo Router do express para criaar as rotas
const router = require('express').Router()



// -------  create ---------

router.post('/', async (req, res) => {

    // req.body
 
    const {book, imprint, status, due_back, url} = req.body


    // validação
    if(!book || !imprint || !status || !due_back || !url) {
        res.status(422).json({error: 'Todos os Campos são obrigatorios!'})
        return
    }

    const bookinstance = {
        book, 
        imprint, 
        status, 
        due_back,
        url,
    }

    try {

        // criando dados
        await Bookinstance.create(bookinstance)
        
        res.status(201).json({message:' Inserido com Sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- read pegar todas as pessoas ----------

router.get('/', async (req, res) => {

    try {

        const getbookinstance = await Bookinstance.find()
        res.status(201).json(getbookinstance)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- read pegar pessoa pelo id ----------

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const getIdbookinstance = await Bookinstance.findById({ _id: id})

        // validação para a pessoa que nao é encontrada
        if(!getIdbookinstance){
            res.status(422).json({ message: 'Instancia não encontrada'})
            return
        }

        res.status(200).json(getIdbookinstance)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- update atualizar pessoa pelo id ----------

router.put('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id
       
    // dados que precisam ser atualizados
    const {book, imprint, status, due_back, url} = req.body
    
    const bookinstance = {
        book, 
        imprint, 
        status, 
        due_back,
        url,
    }

    try {

        const updateBookinstance = await Bookinstance.updateOne({ _id: id}, bookinstance) // recebe o id e a pessoa que vai atualizar
     

        if(updateBookinstance.matchedCount === 0){
            res.status(422).json({message: "Instancia não encontrada"})
            return
        }

        res.status(200).json(bookinstance)

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- delete deletar pessoa pelo id ----------

router.delete('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params para excluir
    const id = req.params.id

    // verificar se a pesoa existe
    const bookinstance = await Bookinstance.findById({ _id: id })

    if(!bookinstance){
        res.status(422).json({message: "Instancia não encontrada"})
        return
    }

    try {

        const deleteIdbookinstance = await Bookinstance.deleteOne({ _id: id})
        res.status(200).json({message: "Instancia deletada com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// exportar o router
module.exports = router
