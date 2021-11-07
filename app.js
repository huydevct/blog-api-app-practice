const express = require('express')
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const methodOverride = require('method-override');

const postRouter = require('./routes/posts')

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'))

connectDB();

// Route basic 
app.get('/', (req,res,next) => {
    res.render('index')
})

app.get('/about', (req,res,next) => {
    res.render('about')
})

app.use('/posts', postRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req,res,next) => {
    console.log(`Server is running on ${PORT}`);
})

