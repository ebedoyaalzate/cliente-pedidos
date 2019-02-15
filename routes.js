const express = require('express');
const router = express.Router();

//Axios
const axios = require('axios');


//body-parser
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


router.get('/', async(req, res) => {
    res.render('index');
})


router.get('/home', async(req, res) => {
    res.render('home');
})

router.post('/register', async(req, res) => {
    res.render('index');
})

router.post('/login', async(req, res) => {
    res.render('home')
})

router.get('/logout', async(req, res) => {
    res.render('index')
})

router.post('/compra', async(req, res) => {
    console.log(req.body);
    res.render('home')
})



datosRequeridos = async() => {
    var depart = null //await axios.get("http://localhost:3000/departamentos")

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