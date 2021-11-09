const express = require('express')
const exphbs = require('express-handlebars');
const {connectDB, connectUserDB} = require('./config/db');
const methodOverride = require('method-override');
const morgan = require('morgan');
const helmet = require('helmet')
const createError = require('http-errors');
require('dotenv').config();
// const client = require('./config/connection_redis')

// client.set("foo", "huyctdev");
// client.get("foo", (err, result) => {
//     if(err) throw createError.BadRequest();

//     console.log(result);
// });

const postRouter = require('./routes/posts');
const userRouter = require('./routes/user.route')

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(helmet());
app.use(morgan('common'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

connectDB;
connectUserDB;

// Route basic 
app.get('/', (req,res,next) => {
    res.render('index')
})

app.get('/about', (req,res,next) => {
    res.render('about')
})

app.use('/posts', postRouter);
app.use('/user', userRouter);

app.use((req,res,next) => {
    // const error = new Error('Not Found');
    // error.status = 500;
    // next(error);
    next(createError.NotFound('This route does not exit'))
})

app.use((err, req,res,next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    })
}) 

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req,res,next) => {
    console.log(`Server is running on ${PORT}`);
})

