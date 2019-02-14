const express = require('express');
const router = express.Router();

//Axios
const axios = require('axios');


//body-parser
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


router.get('/', async(req, res) => {
    datos = await datosRequeridos();
    console.log(datos);
    res.render('index', datos);
})


router.get('/home', async(req, res) => {
    var productos = await product.obtenerProductos();
    res.render('home', {
        productos
    });
})




datosRequeridos = async() => {
    var depart = await axios.get("http://localhost:3000/departamentos")

    var productos = null //await product.obtenerProductos();
    var misPedidos = null //await order.pedidosCliente("2") //cambiar id
    var misProductos = null //await order.pedidosProducto("2")


    var data = {
        departamentos: depart.data.departamentos,
        productos,
        misPedidos,
        misProductos
    }

    return data
}

module.exports = router;