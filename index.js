const express = require('express');
const Contenedor = require('./Contenedor')
const app = express();

const APP_PORT = 3000;

app.get('/productos', async (req, res) => {

    try{
        const contenedor = new Contenedor('productos.txt')
        const productos = await contenedor.getAll()
    
        res.json({
            productos
        })
    }
    catch(e){
        console.log('Error: ', e)
    }
    
})

app.get('/productoRandom', async(req, res) => {

    try{
        const contenedor = new Contenedor('productos.txt')
        const productos = await contenedor.getAll()
        const random = Math.floor(Math.random() * (productos.length - 0)) + 1

        const producto = await contenedor.getById(random)
        res.json({
            producto
        })
    }
    catch(e){
        console.log('Error: ', e)
    }
})

const server = app.listen(APP_PORT, () => {
    console.log(`Corriendo en el puerto ${APP_PORT}`)
})

server.on("error", error => console.log(`Error en el servidor: ${error}`))