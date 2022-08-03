const express = require("express")
const { verify } = require("jsonwebtoken")
const {getAllProducts,getProductsId, addNewProducts, updateProducts, deleteProducts} = require('../controller/productsController')
const router = express.Router()
const upload = require('../helper/multer')
const verifyAuth = require("../helper/verifyAuth")

router.get('/', getAllProducts)
router.get('/:product_id', getProductsId )
router.post('/', verifyAuth, upload.single('image'), addNewProducts)
router.patch('/:product_id',verifyAuth,upload.single('image'), updateProducts)
router.delete('/:product_id',verifyAuth, deleteProducts)

module.exports = router