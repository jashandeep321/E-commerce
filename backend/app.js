var express = require ('express');
var app = express();
const cors = require('cors');
var session=require('express-session');
var bodyParser=require('body-parser');
var db=require('./db_con.js')
var multer = require('multer');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"poiwer123$#@"}));
app.set('view engine','ejs');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

var upload = multer({ storage: storage });

app.get('/',function(req,res){
    res.render('home');
});

// viewusers
app.get('/user', function(req, res) {
    db.query("SELECT * FROM user", function(err, result) {
        if (err)
            throw err;

            // let lastUID = result.length > 0 ? result[result.length - 1].UID : 0;
        res.render('user', { result: result });
    });
});

// adduser
app.get('/adduser', function(req, res) {
    db.query("select * from user",function(err,result){
        if(err)
        throw err;
        res.render('adduser',{result:result});
    });
});

app.post('/adduser_submit', function(req, res) {
    let {  UName, PAdd1, PAdd2, Pincode, Contact, UEmail ,Password } = req.body;

    let sql = "INSERT INTO user (UName, PAdd1, PAdd2, Pincode, Contact, UEmail ,Password) VALUES (?, ?, ?, ?, ?, ?, ?);";

    db.query(sql, [UName, PAdd1, PAdd2, Pincode, Contact, UEmail,Password], function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log("Query Result:" + result);
            if (result && result.insertId >= 0) {
                console.log("User Added");
                res.redirect('user');
            }
        }
    });
});



// deleteuser
app.get('/deluser', function(req, res) {
    let UID = req.query['id'];

    db.query("DELETE FROM user WHERE UID = " + UID, function(err, result) {
        if (err)
            throw err;

        res.redirect('/user');
    });
});


app.get('/catogory',function(req,res){
    db.query("select * from catogory",function(err,result){
        if(err)
        throw err;
        res.render('catogory',{result:result});
    });
});
app.get('/addcatogory',function(req,res){

    db.query("select * from catogory",function(err,result){
        // if(err)
        // throw err;
        res.render('addcatogory');
    });
});
app.post('/addcatogory_submit',function(req,res){
    let { CName} = req.body;
    
    let sql = "INSERT INTO catogory (CName) VALUES ( ?);";
   
    // let sql ="insert into product(CID,PName,PDescription,Price) values(?,?,?,?,?);";
    // console.log(sql);
    db.query(sql,[CName],function(err,result){
        if(err){
            throw err;
        }
        else{
            console.log("Query Result:"+result);
            if(result && result.insertId>=0){
                console.log("catogary Added");
                res.redirect('catogory');
            }
        }
    });
});
app.get('/delcatogary', function(req,res){
    let CID = req.query['id'];
    db.query("delete from catogory where CID = "+CID, function(err,result){
        if(err)
        throw err;
    res.redirect('/catogory');
    })
})

// app.get('/products', function(req, res) {
//     db.query("SELECT * FROM products", function(err, result) {
//         if (err)
//             throw err;

//             // let lastUID = result.length > 0 ? result[result.length - 1].UID : 0;
//         res.render('products', { result: result });
//     });
// });
app.get('/products', function(req, res) {
    db.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;

        result.forEach(product => {
            try {
                if (typeof product.productImages === 'string' && product.productImages.startsWith('[')) {
                    product.productImages = JSON.parse(product.productImages);
                } else if (!Array.isArray(product.productImages)) {
                    product.productImages = [];
                }
            } catch (e) {
                product.productImages = [];
            }
        });

        res.render('products', { result: result });
    });
});



app.get('/addproduct',function(req,res){
    db.query("select * from products",function(err,result){
        if(err)
        throw err;
        res.render('addproduct',{result:result});
    });
});
// app.post('/addproduct_submit',upload.array('productImages', 5) ,function(req,res){
//     let { productName,productBrand, productDetails,productCatogory,productMRP, productPrice} = req.body;
    
//     var filename ="";
//     var mimetype ="";
//     try{
//         filename=req.file.filename;
//         mimetype=req.file.mimetype;
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
//     // let PImage = req.file; // Assuming you are using multer or a similar middleware for handling file uploads

//     let sql = "INSERT INTO products (productName, productBrand, productDetails,productCatogory,productMRP, productPrice, productImage) VALUES (?, ?, ?, ?, ?, ?, ?);";
   
//     // let sql ="insert into product(PID,CID,PName,PDescription,Price) values(?,?,?,?,?);";
//     // console.log(sql);
//     db.query(sql,[productName,productBrand, productDetails,productCatogory,productMRP, productPrice,filename],function(err,result){
//         if(err){
//             throw err;
//         }
//         else{
//             console.log("Query Result:"+result);
//             if(result && result.insertId>=0){
//                 console.log("product Added");
//                 res.redirect('/products');
//             }
//         }
//     });
// });

app.post('/addproduct_submit', upload.array('productImages', 5), function(req, res) {
    let { productName, productBrand, productDetails, productCatogory, productMRP, productPrice } = req.body;

    let imageFilenames = [];
    if (req.files && req.files.length > 0) {
        imageFilenames = req.files.map(file => file.filename);
    }

    let sql = "INSERT INTO products (productName, productBrand, productDetails, productCatogory, productMRP, productPrice, productImages) VALUES (?, ?, ?, ?, ?, ?, ?);";

    db.query(sql, [
        productName,
        productBrand,
        productDetails,
        productCatogory,
        productMRP,
        productPrice,
        JSON.stringify(imageFilenames)
    ], function(err, result) {
        if (err) {
            console.error("Insert Error:", err);
            return res.status(500).send("Error inserting product.");
        }
        console.log("Product added:", result.insertId);
        res.redirect('/products');
    });
});


app.get('/delproduct', function(req,res){
    let PID = req.query['id'];
    db.query("delete from products where productID = "+PID, function(err,result){
        if(err)
        throw err;
    res.redirect('/products');
    })
})

// app.get('/editproduct', function(req, res) {
//     let productID = req.query['id'];

//     db.query("SELECT * FROM products WHERE productID = " + productID, function(err, result) {
//         if (err) {
//             throw err;
//         }

//         if (result.length > 0) {
//             res.render('editproduct', { product: result[0] });
//         } else {
//             // Handle the case where the product with the specified ID is not found
//             res.status(404).send('Product not found');
//         }

//     });
// });

app.get('/editproduct', function(req, res) {
    const productID = req.query.id;

    db.query('SELECT * FROM products WHERE productID = ?', [productID], function(err, results) {
        if (err) throw err;

        const product = results[0];

    
        try {
            if (typeof product.productImages === 'string' && product.productImages.startsWith('[')) {
                product.productImages = JSON.parse(product.productImages);
            } else if (!Array.isArray(product.productImages)) {
                product.productImages = [];
            }
        } catch (e) {
            product.productImages = [];
        }

        res.render('editproduct', { product });
    });
});




// app.post('/editproduct_submit', upload.single('productImage'), function(req, res) {
//     let { productID, productName, productBrand, productDetails, productMRP, productPrice } = req.body;

//     // Handling file upload
//     let productImage = "";
//     try {
//         productImage = req.file.filename;
//     } catch (err) {
//         console.log(err);
//     }
//     let filename1 = "";

//     // Update the product information in the database
//     let sql = "UPDATE products SET productName = ?, productBrand = ?, productDetails = ?, productMRP = ?, productPrice = ?, productImage = ? WHERE productID = ?";
//     let params = [productName, productBrand, productDetails, productMRP, productPrice, productImage, productID];
//     db.query(sql, params, function(err, result) {
//         if (err) {
//             throw err;
//         }

//         // Redirect to the cheflist after the edit is submitted
//         res.redirect('/products');
//     });
// });



app.post('/editproduct_submit', upload.array('productImages', 5), function (req, res) {
    let {
        productID,
        productName,
        productBrand,
        productDetails,
        productMRP,
        productPrice,
        productCatogory,
    } = req.body;

    let deleteImages = req.body.deleteImages || []; // could be string or array
    if (!Array.isArray(deleteImages)) deleteImages = [deleteImages];

    // Get current images from DB
    db.query("SELECT productImages FROM products WHERE productID = ?", [productID], function(err, result) {
        if (err) return res.status(500).send("DB error fetching images");

        let currentImages = [];
        try {
            currentImages = JSON.parse(result[0].productImages || "[]");
        } catch {
            currentImages = [];
        }

        // Delete selected images from disk and array
        currentImages = currentImages.filter(img => {
            if (deleteImages.includes(img)) {
                let imgPath = path.join(__dirname, 'public', 'uploads', img);
                fs.unlink(imgPath, err => {
                    if (err) console.error("Failed to delete", img, err);
                });
                return false;
            }
            return true;
        });

        // Append newly uploaded images
        const newUploaded = req.files.map(f => f.filename);
        const finalImages = [...currentImages, ...newUploaded];

        // Update DB
        const updateSql = `
            UPDATE products SET 
                productName = ?, 
                productBrand = ?, 
                productDetails = ?, 
                productMRP = ?, 
                productPrice = ?, 
                productCatogory = ?, 
                productImages = ? 
            WHERE productID = ?
        `;
        db.query(updateSql, [
            productName,
            productBrand,
            productDetails,
            productMRP,
            productPrice,
            productCatogory,
            JSON.stringify(finalImages),
            productID
        ], function(err, result) {
            if (err) {
                console.error("Update error", err);
                return res.status(500).send("Update failed");
            }
            res.redirect('/products');
        });
    });
});


// app.post('/editproduct_submit', upload.array('productImages', 5), function (req, res) {
//     let {
//         productID,
//         productName,
//         productBrand,
//         productDetails,
//         productMRP,
//         productCatogory,
//         productPrice,
//     } = req.body;

//     let productImages = [];

//     if (req.files && req.files.length > 0) {
//         productImages = req.files.map(file => file.filename);
//     }

//     let imageString = JSON.stringify(productImages);

//     let params = [
//         productName,
//         productBrand,
//         productDetails,
//         productMRP,
//         productPrice,
//         productCatogory,
//         imageString,
//         productID,
//     ];

//     let sql = `UPDATE products 
//                SET productName = ?, productBrand = ?, productDetails = ?, 
//                    productMRP = ?, productPrice = ?, productCatogory = ?, 
//                    productImages = ? 
//                WHERE productID = ?`;

//     db.query(sql, params, function (err, result) {
//         if (err) {
//             console.error("Error updating product:", err);
//             return res.status(500).send("Server error");
//         }

//         if (result.affectedRows > 0) {
//             res.redirect("/products");
//         } else {
//             res.status(404).send("Product not found");
//         }
//     });
// });





// app.post('/editproduct_submit',upload.array('productImages', 5), function (req, res) {
//     let {
//         productID,
//         productName,
//         productBrand,
//         productDetails,
//         productMRP,
//         productCatogory, // Keeping the variable name as productCatogory
//         productPrice,
//     } = req.body;

//     let productImage = "";
//     if (req.file) {
//         productImage = req.file.filename;
//     } else {
//         console.log("File not uploaded");
//     }

//     // Check if productCatogory is null, if so, set it to an empty string
//     // if (!productCatogory) {
//     //     productCatogory = "";
//     // }

//     let params = [
//         productName,
//         productBrand,
//         productDetails,
//         productMRP,
//         productPrice,
//         productCatogory, // Keeping the variable name as productCatogory
//         productImage,
//         productID,
//     ];

//     let sql = "UPDATE products SET productName = ?, productBrand = ?, productDetails = ?, productMRP = ?, productPrice = ?, productCatogory = ?, productImage = ? WHERE productID = ?";

//     console.log("Updating product with params:", params);

//     db.query(sql, params, function (err, result) {
//         if (err) {
//             console.error("Error updating product:", err);
//             res.status(500).send("Server error");
//             return;
//         }

//         if (result.affectedRows > 0) {
//             res.redirect("/products");
//         } else {
//             console.log("No rows were updated");
//             res.status(404).send("Product not found");
//         }
//     });
// });

app.listen(8000,()=>{
    console.log("running at 8000");
});

