const db = require('../helper/db_connection')
const fs = require('fs');
// const moment = require('moment');
// const { match } = require('assert');
module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        // const {product_name=''} = req.query
        const offset = (req.query.page - 1) * req.query.limit
       let limit = req.query.limit
                // const sql = `SELECT * FROM products ${product_name ? `WHERE product_name LIKE '%${product_name}%'`: product_name ? `WHERE product_name LIKE '%${product_name}%'`:''} ORDER BY price DESC LIMIT ${req.query.limit} OFFSET ${offset}` 
                // const sql = `SELECT * FROM products join categories on products.category_id=categories.category_id ORDER BY price DESC LIMIT ${req.query.limit} OFFSET ${offset}` 
                const sql = `SELECT products.product_name, description, categories.category_name FROM products join categories on products.category_id=categories.category_id ORDER BY price DESC LIMIT ${req.query.limit} OFFSET ${offset}` 
        db.query(sql,(err, results)=> {
          db.query('SELECT * FROM products ',(err2, results2)=>{
            let totalpage= Math.ceil(results2.length/limit)
            if(err) {
              reject({message: "ada error"})
            }            
            resolve({
              message: "get all from products success",
              status: 200,
              totalrow : results.length,
              totalpage: totalpage,
              data:{results} 
            })
          })
          })
        })
      },

      getId: (req, res) => { // get done
        return new Promise((resolve, reject) => {
            const {product_id} = req.params;
            console.log(product_id)
          const sql = `SELECT * FROM products WHERE product_id =${product_id}`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err)
              reject({
                message: "Something wrong",
              });
            }
            resolve({
              message: "Get all from products success",
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
        const {product_name, description, stock, price, image, delivery_start_date, delivery_end_date} = req.body

        console.log(req.body, 'reaqqqq')
        db.query(`INSERT INTO products(product_name, description, stock, price, image, delivery_start_date, delivery_end_date ) VALUES('${product_name}', '${description}','${stock}','${price}','${image}','${delivery_start_date}','${delivery_end_date}')`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new products success",
            status: 200,
            data: {
              // id: results.insertId,
              ...req.body,
            }
          })
        })
      })
    },
    update: (req, res) => {
      return new Promise((resolve, reject)=> {
        const {product_id} = req.params
        db.query(`SELECT * FROM products WHERE product_id=${product_id}`,(err, results)=> {
          // console.log(results)
          // console.log(req.file)
          if(err) {res.send({message: "ada error"})}
          if(req.file){
            fs.unlink(`./uploads/${results[0].image}`, function (err) {
              if (err) resolve({
                message: "update products success",
                status: 200,
                data: results
              });
              resolve({
                message: "update products success",
                status: 200,
                data: results
              });
            });
          }
          
          const previousData = {
            ...results[0],
            ...req.body
          }
          // console.log(previousData)
          const {product_name, description, stock, price, image, delivery_start_date, delivery_end_date} = previousData

          // const date = moment(stock).format('YYYY-MM-DD')
      
          db.query(`UPDATE products SET product_name='${product_name}', description='${description}', stock='${stock}', price='${price}', image='${image}', delivery_end_date='${delivery_end_date}', delivery_start_date='${delivery_start_date}' WHERE product_id='${product_id}'`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update products success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {product_id} = req.params
        db.query(`SELECT image FROM products WHERE product_id=${product_id}`, (err ,resultData) => {
          if(err) {
            console.log(err)
          }
          if(!resultData.length) {
            reject({message: "id tidak ditemukan"})
          }else {
            let image = resultData[0].image
            db.query(`DELETE FROM products where product_id=${product_id}`,(err, results)=> {
              if(err) {reject({message: "ada error"})}
              fs.unlink(`./uploads/${image}`, function (err) {
                if (err) resolve({
                  message: "delete products success",
                  status: 200,
                  data: results
                });
                resolve({
                  message: "delete products success",
                  status: 200,
                  data: results
                });
              });
            })
          }
        })
      })
    }
}