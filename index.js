// Documentaion
// #
// https://github.com/nmaggioni/Simple-JSONdb
// https://www.npmjs.com/package/simple-json-db
// # Express
// https://expressjs.com/en/guide/routing.html
// http://expressjs.com/en/api.html
// -------------------------------------------
const JSONdb = require('simple-json-db');
const fs = require("fs")
const express = require('express');
const bodyParser = require('body-parser')
//------------------
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}))

// Check if directory exists and create
var dir = './database';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
// Setting Server --------------------------------------------------------------
var port = process.env.PORT || 80;
app.listen(port);
app.set('view engine', 'ejs');
console.log(`Server is Running on port : ${port}`);

// Static Requests --------------------------------------------------------------
app.use('/database', express.static(dir))

// Home Page --------------------------------------------------------------------
app.get('/', function(req, res) {
  console.log('wake up')
  res.json({
    awake:	true,
	dbs:	fs.readdirSync(dir)
  })
})


// Home / database ------------------------------------------------------------------
app.get('/database', (req, res) => {
	console.log('/database')
	res.json(fs.readdirSync(dir))
	
})


// DataBase GET ----------------------------------------------------------------------
app.get('/database/:db_name', function(req, res) {
  let db_name = req.params.db_name
  const db = new JSONdb('./database/' + db_name + '.json');
  res.json({
    db_name: db_name,
    length: Object.keys(db.JSON()).length
  })
})


// DataBase POST ---------------------------------------------------------------------
app.post('/database/:db_name/:method', function(req, res) {
  let db_name = req.params.db_name
  let method = req.params.method.toLowerCase()
  let key = req.body.key
  let value = (req.body.value ? JSON.parse(req.body.value) : false)
  console.log({
    key: key,
    value: value
  })

  const db = new JSONdb(dir + '/' + db_name + '.json');

  if (method == 'set' || method == 'get' || method == 'has' || method == 'delete' || method == 'json' || method == 'keys'  || method == 'values' ) {

    console.log('Good Method')
    res.status(200);
    let success = true;
    let data;
    let cause;

    if (method == 'json') {
        console.log('JSON')
        data = db.JSON()

    } else if (method == 'keys') {
        console.log('Keys')
        data = Object.keys(db.JSON())

    } else if (method == 'values') {
        console.log('values')
        data = Object.values(db.JSON())
		
    } else if (method == 'set' && key && value) {
      console.log('set')
      db.set(key, value)
      data = {
        [key]: db.get(key)
      }
    } else if (key) {
      if (method == 'get') {
        console.log('get')
        data = db.get(key)

      } else if (method == 'has') {
        console.log('has')
        data = db.has(key)

      } else if (method == 'delete') {
        console.log('delete')
        data = db.delete(key)


      } else {
        console.log('Error 1')
        res.status(400)
        success = false
        cause = 'key or value is not valid.'
      }

    } else {
        console.log('Error 2')
        res.status(400)
        success = false
        cause = 'key or value is not valid.'
    }

    res.json({
      success: success,
      method: method,
      note: cause || '',
	  response: data || {}
    })

  } else {
    console.log('Error 3')
    res.status(400)
    let cause = "Method doesn't exist.";

    res.json({
      success: false,
      method: method,
      note: cause || '',
	  response: data || {}
    })

  };

})






// DataBase Get, method + key ---------------------------------------------------------------------
app.get('/database/:db_name/:method/:key', function(req, res) {
  let db_name	= req.params.db_name
  let method	= req.params.method.toLowerCase()
  let key		= req.params.key
  //res.send(req.query)
  let value	=	(req.query ? req.query : false)
				
  const db = new JSONdb(dir + '/' + db_name + '.json');
	
    let success;
    let data;
    let cause;
	
	if (method == 'set' || method == 'get' || method == 'has' || method == 'delete') {

    console.log('Good Method')

    if (method == 'set' && key && value) {
      console.log('set')
	  success = true;
      db.set(key, value)
      data = {
        [key]: db.get(key)
      }
    } else if (key) {
      if (method == 'get') {
        console.log('get')
		success = true;
        data = db.get(key)

      } else if (method == 'has') {
        console.log('has')
		success = true;
        data = db.has(key)

      } else if (method == 'delete') {
        console.log('delete')
		success = true;
        data = db.delete(key)

      }

    }
	
	
	
	if (success != true) {
	    res.status(400);
		success = false
		cause	= 'key or value is not valid.'
	}
	
	res.json({
	    success: success,
	    method: method,
	    note: cause || '',
	    response: data || {}
	})
	



  } else {
    console.log('Error 4')
    res.status(400)	
    res.json({
      success: false,
      method: method,
      note: ((method == 'json' || method == 'keys' || method == 'values') ? "Don't use keys for this method." : "Method doesn't exist.") || '',
	  response: data || {}
    })
  };
  
  

})





// DataBase Get, method ---------------------------------------------------------------------
app.get('/database/:db_name/:method', function (req, res) {
    let db_name = req.params.db_name
    let method = req.params.method.toLowerCase()
    let key = req.params.key

    const db = new JSONdb(dir + '/' + db_name + '.json');

    let success;
    let data;

    if (method == 'json') {
        data = db.JSON()
		success = true;
    } 
	
	else if (method == 'keys') {
        console.log('Keys')
        data = Object.keys(db.JSON())
		success = true;
    } 
	
	else if (method == 'values') {
        console.log('Values')
        data = Object.values(db.JSON())
		success = true;
    }
	
	
	
	if (success != true) {
	    console.log('Error 5')
	    res.status(400)
		success = false
	};
	
	
	res.json({
	    success: success,
	    method: method,
	    note: (success ? '' : "Method doesn't exist."),
	    response: data || {}
	})
	
	
})

