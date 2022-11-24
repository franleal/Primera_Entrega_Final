const express = require("express");
const bp = require("body-parser");
const routers = require("../routers/");
const app = express();


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.use("/api", routers);



const port = 8080;

const server = app.listen(port,()=>{
    console.log(`Servidor escuchado en http://localhost:${port}`)
})
server.on('error',err =>{
    console.log('Error en sercvidor',err)
})