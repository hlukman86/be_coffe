
const Categories = require('../model/Categories')

module.exports = {
    getAllCategories: async (req, res)=> {
        try {
            const results = await Categories.get(req, res)
            return res.status(200).send(
                // {message: 'awokwo'}
                results
            )
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    getCategoriesId: async (req, res) => {
        try {
          const results = await Categories.getId(req, res);
          res.status(200).send(results);
        } catch (error) {
          res.send(error);
        }
      },

    addNewCategories: async (req, res)=> {
        try {
            const results = await Categories.add(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    updateCategories: async(req, res) => {
        try {
            const results = await Categories.update(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    deleteCategories: async(req, res)=> {
        try {
            const results = await Categories.remove(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}