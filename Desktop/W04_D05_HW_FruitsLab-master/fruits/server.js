const express = require('express');
const app = express();
const methodOverride = require('method-override');
const PORT = 4000;
const ejs = require('ejs')
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');
app.use(express.urlencoded({ extended: false }));
// parse requests of content-type - application/json
app.use(express.json())
app.use(methodOverride('_method'));

app.set("view engine", "ejs");


mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb is running'), (err) => console.log(err));



// define a simple route
// app.get('/', (req, res) => {

// });





app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits
        });
    });
});
app.get('/fruits/new', (req, res) => {
    res.render('create.ejs');
});
app.post('/create', (req, res) => {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
    });
});
  
//Create Show Route
app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.ejs', {
            fruit:foundFruit
        });
    });
});

app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits');//redirect back to fruits index
    });
});


app.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        res.render(
    		'edit.ejs',
    		{
    			fruit: foundFruit //pass in found fruit
    		}
    	);
    });
});

app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/fruits');
    });
});
// // //Create data in MongoDB
// app.post('/create', (req, res)=>{
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true;
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false;
//     }
//     Fruit.create(req.body, (error, createdFruit)=>{
//         res.redirect('/fruits');
//     });
// });

// // Create Show Route
// app.get('/fruits/:id', (req, res)=>{
//     Fruit.findById(req.params.id, (err, foundFruit)=>{
//         res.render('show.ejs', {
//             fruit:foundFruit
//     });
// });
// });

// //

// listen for requests
app.listen(4000, () => {
   console.log("Server is listening on port 4000");
});
