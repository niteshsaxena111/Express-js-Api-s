const express = require('express');
const path = require('path');
const logger = require('./Middleware/logger');
const members = require('./routes/api/members');
const exphbs = require('express-handlebars');
const data =require('./Members');
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json()) 
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('index',{title:'Member App',members:data});
})


app.use(express.static(path.join(__dirname,'public')))

app.use('/api/members',members);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)})