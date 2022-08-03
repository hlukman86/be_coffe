const Products = require('../model/Products')

module.exports = {
    getAllProducts: async (req, res)=> {
        try {
            const results = await Products
            .get(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    getProductsId: async (req, res) => {
        try {
          const results = await Products.getId(req, res);
          res.status(200).send(results);
        } catch (error) {
          res.send(error);
        }
      },

    addNewProducts: async (req, res)=> {
        console.log(req.file, 'filename dari upload')
        try {
            console.log({...req.body, image: 'oke'})
            const reqModifer = {
                ...req,
                body: { ...req.body, image: req.file.filename }
            }
            const results = await Products
            .add(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    
    updateProducts: async (req, res) => {
        try {
            if(req.file){
                reqModifer = {
                    ...req,
                    body: { ...req.body, image: req.file.filename }
                } 
            } else {
                reqModifer = {
                    ...req,
                    body: { ...req.body}
                }
            }
            const results = await Products
            .update(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    deleteProducts: async(req, res)=> {
        try {
            const results = await Products
            .remove(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}