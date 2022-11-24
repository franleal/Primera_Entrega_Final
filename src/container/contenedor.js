
const fs = require('fs');
const { networkInterfaces } = require('os');

class Contenedor {

  constructor(archivo) {
    this.archivo = archivo;
  }

  //Save---------------------------------------------------------------------------
  async save(products) {
    try {
      //Generar archivo
      if(fs.existsSync(this.archivo)) {
          let info = await fs.promises.readFile(this.archivo, 'utf8')
          let result = JSON.parse(info)

          
          if (result.length > 0) {
              let lastId = result.length + 1
              let newProduct = {
                  id: lastId,
                  timestamp:Date.now(),
                  ...products
              }
              result.push(newProduct)
              await fs.promises.writeFile(this.archivo, JSON.stringify(result, null, 2))
              return lastId
          } else { 
              let newProduct = {
                  id: 1,
                  timestamp:Date.now(),
                  ...products
              }
              result.push(newProduct)
              await fs.promises.writeFile(this.archivo, JSON.stringify(result, null, 2))
              return 1
          }
      } else {
          //No existe el archivo
          let newProduct = {
              id: 1,
              timestamp:Date.now(),
              ...products
          }
          await fs.promises.writeFile(this.archivo, JSON.stringify([newProduct], null, 2))
          return 1
      }
    } catch (error) {
        console.log(error)
    }
  }

  //getById---------------------------------------------------------------------------
  async getById(id) {
    try {
        let info = await fs.promises.readFile(this.archivo, 'utf8')
        let result = JSON.parse(info)

        return result.find(product => product.id === id)
    } catch (error) {
        console.log(`El archivo de ${id} no existe`)
    }
  }

  //getAll---------------------------------------------------------------------------
  async getAll() {
    try {
        let info = await fs.promises.readFile(this.archivo, 'utf8')
        let result = JSON.parse(info)
        return result
    } catch (error) {
        console.log(error)
    }
  }

  //deleteById----------------------------------------------------------------------------
  async deleteById(id) {
    try {
        let info = await fs.promises.readFile(this.archivo, 'utf8')
        let result = JSON.parse(info)

        const deleteObject = result.some(product => product.id === id)
        if(deleteObject) {
          console.log(`Eliminando carrito con id solicitado...`);
          const datos = result.filter(item => item.id !== id);
          await fs.promises.writeFile(this.archivo, JSON.stringify(datos, null, 2))
          console.log(`carrito con el id ${id} eliminado`);
        } else {
            console.log(`carrito de id: ${id} no existe`)
        }
    } catch (error) {
        console.log(error)
    }
  }

  async modify(id, contenido) {
    try {

      let data = await fs.promises.readFile(this.archivo, 'utf8')
      let result = JSON.parse(data)
      let dataId = result.find(item => item.id === id);
      if (dataId.length === 0) {

          throw new Error(
              `No se encontro el producto con el id solicitado`
          );
      } else {

          let info = result.filter(item => item.id !== id);

          dataId = { id: id, ...contenido };
          info.push(dataId);
          await fs.promises.writeFile(this.archivo, JSON.stringify(info, null, 2))
          console.log(`Se modifico el producto con el id ${id}`);
          return dataId;
      }
    }
    catch (error) {
      console.log(`Error modificando el producto: ${error.message}`);
    } 
  }

  //deleteAll------------------------------------------------------------------------
  async deleteAll() {
    await fs.promises.writeFile(this.archivo, JSON.stringify([]))
  }
}

module.exports = Contenedor