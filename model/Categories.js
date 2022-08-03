
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        // const {category_name=''} = req.query
        // const sql = `SELECT * FROM categories ${category_name ? `WHERE category_name LIKE '%${category_name}%'`: category_name? `WHERE category_name LIKE '%${category_name}%'`:''} ORDER BY release_date DESC`
        const sql = `SELECT * FROM categories`
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from categories success",
            status: 200,
            data: results
          })
        })
      })
    },

    // get: (req, res)=> {
    //   return new Promise((resolve, reject)=> {
    //     // const {product_name=''} = req.query
    //     const offset = (req.query.page - 1) * req.query.limit
    //    let limit = req.query.limit
    //             // const sql = `SELECT * FROM categories ${product_name ? `WHERE product_name LIKE '%${product_name}%'`: product_name ? `WHERE product_name LIKE '%${product_name}%'`:''} ORDER BY price DESC LIMIT ${req.query.limit} OFFSET ${offset}` 
    //             const sql = `SELECT * FROM categories LIMIT ${req.query.limit} OFFSET ${offset}` 

    //     db.query(sql,(err, results)=> {
    //       db.query('SELECT * FROM categories ',(err2, results2)=>{
    //         let totalpage= Math.ceil(results2.length/limit)
    //         if(err) {
    //           reject({message: "ada error"})
    //         }            
    //         resolve({
    //           message: "get all from categories success",
    //           status: 200,
    //           totalrow : results.length,
    //           totalpage: totalpage,
    //           data:{results} 
    //         })
    //       })
    //       })
    //     })
    //   },

    getId: (req, res) => { // get done
      return new Promise((resolve, reject) => {
          const {category_id} = req.params;
          console.log(category_id)
        const sql = `SELECT * FROM categories WHERE category_id =${category_id}`;
        db.query(sql, (err, results) => {
          if (err) {
            console.log(err)
            reject({
              message: "Something wrong",
            });
          }
          resolve({
            message: "Get all from categories success",
            status: 200,
            data: results
            // data:{results,
            //   ...req.body
            // }
            
          });
        });
      });
    },


    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {category_name} = req.body

        db.query(`INSERT INTO categories(category_name) VALUES('${category_name}')`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          console.log(results, 'aaaa')
          resolve({
            message: "add new categories success",
            status: 200,
            data: {
              id: results.insertId,
              ...req.body,
            }
          })
        })
      })
    },
    update: (req, res) => {
      return new Promise((resolve, reject)=> {
        const {category_id} = req.params
        db.query(`SELECT * FROM categories WHERE category_id=${category_id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {category_name} = previousData
      
          db.query(`UPDATE categories SET category_name='${category_name}'`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update categories success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {category_id} = req.params
        db.query(`DELETE FROM categories WHERE category_id=${category_id}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve.send({
            message: "delete categories success",
            status: 200,
            data: results
          })
        })
      })
    }
}