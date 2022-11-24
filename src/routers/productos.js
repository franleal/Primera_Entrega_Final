const { Router } = require("express");
const router = Router();
const Contenedor = require('../container/contenedor')
const productos = new Contenedor("./productos.json")
const notFound = { error: "Producto no encontrado" };



router.get('/', async (req,res)=>{
    const getAll = await productos.getAll()
    console.log('Todos los archivos')
    console.log(getAll)
    res.send(getAll)
})

router.get('/:id', async(req,res)=>{
    const id = parseInt(req.params.id)
    console.log(`getById req recibida con exito`);
    const getId = await productos.getById(id)
    console.log('Archivo encontrado!')
    console.log(getId)
    res.send({producto: getId})

});


router.post('/', async (req,res)=>{
    
    console.log(`post req recibida con exito`);
    const data = req.body;
    console.log(data);
    const nuevoProducto = await productos.save(data);
    res.send(data)
    
})

router.put('/:id', async (req,res)=>{

    console.log(`put req recibida con exito`);
    const id = parseInt(req.params.id);
    const data = req.body;
    console.log(data)
    const productoEditado = await productos.modify(id, data);
    console.log(productoEditado)
    res.send(productoEditado)
})

router.delete('/:id', async (req,res)=>{
    console.log(`delete req recibida con exito`);
    const id = parseInt(req.params.id)
    const getId = await productos.getById(id)
    console.log(getId)
    const productoEliminado = await productos.deleteById(id); 
    console.log(productoEliminado)
    res.send(productoEliminado)

})

module.exports = router;