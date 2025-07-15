
var express = require('express');
var session = require('express-session');
var cookieParser= require('cookie-parser');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var db = require('./db_con.js');
const sendVarifyMail = require('./mailer.js');
require('dotenv').config();

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST", "GET", "PUT"],
    credentials: true
}));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));

app.options('*', cors());

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

app.get('/api/protected', isAuthenticated, (req, res) => {
    const user = req.session.user;
    res.json({ success: true, user });
});

// app.get('/', function (req, res) {
//     res.end("Hello welcome to Rest API");
//     var msg = "";
//     if (req.session.msg != "")
//         msg = req.session.msg;

//     // res.render('main', { msg: msg});
//     // console.log("Session object:", req.session);
// });

app.get('/',(req,res)=>{
    if(req.session.userid){
        return res.json({valid:true, userid:req.session.userid})
    }
    else{
        return res.json({valid:false})
    }
})

app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM user';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Database query error:', error.stack);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});

app.post("/signup_user", (req, res) => {
    const { UName, UEmail, Password, PAdd1, PAdd2, Pincode, Contact } = req.body;

    if (!UName || !UEmail || !Password || !PAdd1 || !Pincode || !Contact) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const userData = {
        UName,
        UEmail,
        Password,
        PAdd1,
        PAdd2,
        Pincode,
        Contact
    };

    let sql_check = "SELECT UEmail FROM user WHERE UEmail = ?";
    db.query(sql_check, [UEmail], (err, result) => {
        if (err) {
            console.error("Error checking email:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        db.query("INSERT INTO user SET ?", userData, (err, results) => {
            if (err) {
                console.error("Error creating user:", err);
                return res.status(500).json({ error: "Error creating user" });
            } else {
                const UID = results.insertId;

                sendVarifyMail(UEmail)
                    .then((success) => {
                        if (success) {
                            res.status(200).json({ id: UID, ...userData });
                            console.log('Data inserted successfully:');
                        } else {
                            res.status(500).json({ error: "Failed to send verification email" });
                        }
                    })
                    .catch((error) => {
                        console.error("Error sending verification email:", error);
                        res.status(500).json({ error: "Error sending verification email" });
                    });
            }
        });
    });
});

app.get('/varifyemail', function (req, res) {
    let UEmail = req.query['UEmail'];
    let sql_update = "update user set status=1 where UEmail=?";

    db.query(sql_update, [UEmail], function (err, result) {
        if (err) console.log(err);

        if (result.affectedRows == 1) {
            req.session.msg = "Email verified, Now You can proceed to login";
            // res.redirect('/');
        } else {
            req.session.msg = "Cannot verify your Email/Contact";
            // res.redirect('/');
        }
        res.redirect('/');
    });
});
app.get('/login', function (req, res) {
  var msg = "";
  if (req.session.msg != "")
      msg = req.session.msg;

});
app.post('/login_submit', function (req, res) {
    const { UEmail, Password } = req.body;
    const sql = "SELECT * FROM user WHERE UEmail=? AND Password=? AND status=1 AND softdelete=0";

    db.query(sql, [UEmail, Password], function (err, result, fields) {
        if (err) {
            console.error('Error executing database query:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        if (result.length == 0) {
            res.status(401).json({ success: false, message: "Incorrect email or password" });
        } else {
            req.session.userid = result[0].UID;
            req.session.uname = result[0].UName;
            console.log("Logged-in User ID:", req.session);
            res.status(200).json({ success: true, message: "Login successful" });
            // return res.json({Login:true, user:req.session.userid})
        }
    });
});

app.get('/api/men/products', (req, res) => {
    const query = 'SELECT * FROM products WHERE productCatogory = "Men"';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Database query error:', error.stack);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }
        res.json(results);
        console.log("Logged-in User ID:", req.session);
    });
});

app.get('/api/women/products', (req, res) => {
    const query = 'SELECT * FROM products WHERE productCatogory = "Women"';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Database query error:', error.stack);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.get('/api/kids/products', (req, res) => {
    const query = 'SELECT * FROM products WHERE productCatogory = "Kids"';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Database query error:', error.stack);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.get('/api/newCollection', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY productID DESC LIMIT 8';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Database query error:', error.stack);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.get('/api/products/:productID', (req, res) => {
    const productID = req.params.productID;
    const query = `SELECT * FROM products WHERE productID = ${productID}`;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching product details' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Product not found' });
            } else {
                res.json(result[0]);
            }
        }
    });
});

app.post("/contactus_user", (req, res) => {
    const userData = req.body;

    db.query("INSERT INTO contact_us SET ?", userData, (err, results) => {
        if (err) {
            console.error("Error creating user:", err);
            res.status(500).send("Error creating user");
        } else {
            const UID = results.insertId;
            res.status(200).json({ id: UID, ...userData });
        }
    });
});

app.get('/profile', (req, res) => {
    if (!req.session.userid) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const userid = req.session.userid;
    const query = "SELECT UID, UName, UEmail, PAdd1, PAdd2, Pincode, Contact FROM user WHERE UID = ? AND softdelete = 0";

    db.query(query, [userid], (error, results) => {
        if (error) {
            console.error('Error fetching user data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true, user: results[0] });
    });
});

app.put('/editprofile', (req, res) => {
    if (!req.session.userid) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const userid = req.session.userid;
    const { UName, UEmail, PAdd1, PAdd2, Pincode, Contact } = req.body;

    const query = "UPDATE user SET UName = ?, UEmail = ?, PAdd1 = ?, PAdd2 = ?, Pincode = ?, Contact = ? WHERE UID = ? AND softdelete = 0";
    console.log('SQL Query:', query);
    console.log('Data:', [UName, UEmail, PAdd1, PAdd2, Pincode, Contact, userid]);

    db.query(query, [UName, UEmail, PAdd1, PAdd2, Pincode, Contact, userid], (err, result) => {
        if (err) {
            console.error('Error updating user data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            console.error('No rows updated');
            return res.status(404).json({ error: 'No rows updated' });
        }

        res.json({ success: true, message: 'User data updated successfully' });
    });
});

// app.put('/editprofile', (req, res) => {
//     if (!req.session.userid) {
//         return res.status(401).json({ error: 'User not authenticated' });
//     }
//     const userid = req.session.userid;
//     const { UName, UEmail, Password, PAdd1, PAdd2, Pincode, Contact } = req.body;

//     const query = "UPDATE user SET UName = ?, UEmail = ?, Password = ?, PAdd1 = ?, PAdd2 = ?, Pincode = ?, Contact = ? WHERE UID = ? AND softdelete = 0";
//     console.log('SQL Query:', query);
//     db.query(query, [UName, UEmail, Password, PAdd1, PAdd2, Pincode, Contact, userid], (err, result) => {
//         if (err) {
//             console.error('Error updating user data:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         res.json({ success: true, message: 'User data updated successfully' });
//     });
// });

app.get('/logout', function (req, res) {
    req.session.userid = "";
    res.redirect('/');
});

app.listen(8082, () => console.log("Server running at port 8082"));
