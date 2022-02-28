const fs = require('fs')
 class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    async save(producto){
        try {
            let productos
            // valida que el archivo existe o en su caso debe crearlo
            const archivos = await fs.promises.readdir('./')
            if(!archivos.includes(this.archivo)){
                await fs.promises.writeFile(`./${this.archivo}`, '[]')
            }
            // lee los datos del archivo
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            
            if(datos !== '') {
                productos = JSON.parse(datos)
            } 
            else{
                productos = []
            }
            
            if(productos.length !== 0){
                let id
                productos.forEach( product => {
                    id = product.id
                })
                id++
                producto.id = id
            } else{
                producto.id = 1
            }
            productos.push(producto)
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(productos))
            console.log('Producto guardado')
            return producto.id
        }
        catch(e) {
            return 'Se produjo un error: ' + e
        }
    }

    async getById(id){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            const producto = datos.filter( productos => productos.id == id)
            if(producto.length === 0) return null
            return producto[0]
        }
        catch(e){
           return 'Ocurrio un error en la busqueda: ', e
        }
    }

    async getAll(){
        try{
            let productos
            const datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if( datos === '') return null
            productos = JSON.parse(datos)
            if(productos.length === 0) return null

            return productos
        }
        catch(e){
            return 'Ocurrió un error: ' + e
        }
    }

    async deleteById(id){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            let productos = datos.filter( productos => productos.id === id)
            
            if(productos.length ===0 ){
                console.log(`El producto con id ${id} no existe`)
                return
            }

            productos = datos.filter( productos => productos.id !== id)
            await fs.promises.writeFile(`./${this.archivo}` , JSON.stringify(productos))
            console.log('Producto eliminado')
        }
        catch(e){
           return 'Ocurrio un error en la eliminación: ', e
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(`./${this.archivo}` , '[]')
            console.log('Productos eliminados')
        }
        catch(e){
           return 'Ocurrió un error: ', e
        }
    }

}

module.exports = Contenedor
