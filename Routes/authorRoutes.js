
// inportar a model person
const { restart } = require('nodemon')
const Author = require('../Models/author')

// rotas da API

// importar o metodo Router do express para criaar as rotas
const router = require('express').Router()



// -------  create ---------

router.post('/', async (req, res) => {

    // req.body

    const {fist_name, family_name, date_birth, date_death, name, lifespan, url} = req.body


    // validação
    if(!name || !family_name || !fist_name || !date_birth || !date_death || !lifespan || !url) {
        res.status(422).json({error: 'Todos os Campos são obrigatorios!'})
        return
    }

    const author = {
        fist_name,
        family_name, 
        date_birth, 
        date_death, 
        name, 
        lifespan,
        url,
    }

    try {

        // criando dados
        await Author.create(author)
        
        res.status(201).json({message:'Autor Inserido com Sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- read pegar todas as pessoas ----------

router.get('/', async (req, res) => {

    try {

        const getauthor = await Author.find()
        res.status(201).json(getauthor)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- read pegar pessoa pelo id ----------

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const getIdauthor = await Author.findById({ _id: id})

        // validação para a pessoa que nao é encontrada
        if(!getIdauthor){
            res.status(422).json({ message: 'Autor não encontrado'})
            return
        }

        res.status(200).json(getIdauthor)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- update atualizar pessoa pelo id ----------

router.put('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id
       
    // dados que precisam ser atualizados
    const {fist_name, family_name, date_birth, date_death, name, lifespan, url} = req.body
    
    const author = {
        fist_name, 
        family_name, 
        date_birth, 
        date_death, 
        name, 
        lifespan,
        url,
    }

    try {

        const updateAuthor = await Author.updateOne({ _id: id}, author) // recebe o id e a pessoa que vai atualizar
     

        if(updateAuthor.matchedCount === 0){
            res.status(422).json({message: "Autor não encontrado"})
            return
        }

        res.status(200).json(author)

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- delete deletar pessoa pelo id ----------

router.delete('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params para excluir
    const id = req.params.id

    // verificar se a pesoa existe
    const author = await Author.findById({ _id: id })

    if(!author){
        res.status(422).json({message: "Autor não encontrado"})
        return
    }

    try {

        const deleteIdauthor = await Author.deleteOne({ _id: id})
        res.status(200).json({message: "Autor deletado com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// exportar o router
module.exports = router 