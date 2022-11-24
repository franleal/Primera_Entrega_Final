const { Router } = require("express");
const router = Router();
const Contenedor = require('../container/contenedor')
const carrito = new Contenedor("./carrito.json");
const productos = new Contenedor("./productos.json")
const notFound = { error: "Producto no encontrado" };

router.get('/:id', async (req,res)=>{
    const id = parseInt(req.params.id)
    console.log(`getById req recibida con exito`);
    const getId = await carrito.getById(id)
    console.log('Archivo encontrado!')
    console.log(getId)
    res.send({Carrito: getId})
});

router.post('/', async (req,res)=>{
    
    console.log(`post req recibida con exito`);
    const data = req.body;
    console.log(data);
    const nuevoCarrito = await carrito.save(data);
    res.send(data)
    
})

router.post('/:idc/productos/:idp', async (req,res)=>{
    console.log(`post req recibida con exito`);
    const idCarro = parseInt(req.params.idc)
    const carro = await carrito.getById(idCarro);
   
    const idProduc = parseInt(req.params.idp)
    const produc = await productos.getById(idProduc);
    
    productInCarr = carro.producto
    console.log(productInCarr)
    productInCarr.push(produc)
    console.log(productInCarr)
    
    const sobreescribirCarro = await carrito.modify(idCarro,productInCarr);
    res.send(productInCarr)
})

router.delete('/:idc', async (req,res)=>{
    console.log(`delete req recibida con exito`);
    const id = parseInt(req.params.idc)
    const getId = await carrito.getById(id)
    console.log(getId)
    const productoEliminado = await carrito.deleteById(id); 
    res.send(getId)

})

router.delete('/:idc/productos/:idp', async (req,res)=>{

    console.log(`post req recibida con exito`);
    const idCarro = parseInt(req.params.idc)
    const carro = await carrito.getById(idCarro);
   
    const idProduc = parseInt(req.params.idp)


    let indexToDelete = -1;
    console.log(indexToDelete)
    console.log(carro)
    console.log(carro.producto)
    console.log(carro.id)
    carro.forEach((producto,index) => {
        if (producto.id == idProduc) {
        indexToDelete = index;
        };
    });
    if (indexToDelete >= 0) {
        carro.splice(indexToDelete, 1);
    }
    await carrito.modify(idCarro, carro);
    respuesta.json({
        status: 'ok'
    });
    

})

module.exports = router;