const express = require("express")
const { verify } = require("jsonwebtoken")
const {getAllCategories,getCategoriesId, addNewCategories, updateCategories, deleteCategories} = require('../controller/categoriesController')
const router = express.Router()
const upload = require('../helper/multer')
const verifyAuth = require("../helper/verifyAuth")

router.get('/', getAllCategories)
router.get('/:category_id', getCategoriesId )
router.post('/', verifyAuth, addNewCategories)
router.patch('/:category_id',verifyAuth, updateCategories)
router.delete('/:category_id',verifyAuth, deleteCategories)

module.exports = router