
// inportar a model person
const { restart } = require('nodemon')
const Genre = require('../Models/genre')

// rotas da API

// importar o metodo Router do express para criaar as rotas
const router = require('express').Router()



// -------  create ---------

router.post('/', async (req, res) => {

    // req.body

    const {name, url} = req.body


    // validação
    if(!name || !url){
        res.status(422).json({error: 'Campo nome é obrigatorio!'})
        return
    }

    const genre = {
        name, 
        url,        
    }

    try {

        // criando dados
        await Genre.create(genre)
        
        res.status(201).json({message:'Genero Inserido com Sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- read pegar todas as pessoas ----------

router.get('/', async (req, res) => {

    try {

        const getgenre = await Genre.find()
        res.status(201).json(getgenre)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- read pegar pessoa pelo id ----------

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const getIdgenre = await Genre.findById({ _id: id})

        // validação para a pessoa que nao é encontrada
        if(!getIdgenre){
            res.status(422).json({ message: 'Genero não encontrado'})
            return
        }

        res.status(200).json(getIdgenre)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// --------- update atualizar pessoa pelo id ----------

router.put('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id
       
    // dados que precisam ser atualizados
    const {name, url} = req.body
    
    const genre = { 
        name, 
        url,
        
    }

    try {

        const updateGenre = await Genre.updateOne({ _id: id}, genre) // recebe o id e a pessoa que vai atualizar
     

        if(updateGenre.matchedCount === 0){
            res.status(422).json({message: "Genero não encontrado"})
            return
        }

        res.status(200).json(genre)


    } catch (error) {
        res.status(500).json({error: error})
    }
})


// --------- delete deletar pessoa pelo id ----------

router.delete('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params para excluir
    const id = req.params.id

    // verificar se a pesoa existe
    const genre = await Genre.findById({ _id: id })

    if(!genre){
        res.status(422).json({message: "Autor não encontrado"})
        return
    }

    try {

        const deleteIdgenre = await Genre.deleteOne({ _id: id})
        res.status(200).json({message: "Genero deletado com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// exportar o router
module.exports = router 