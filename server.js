const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const notFoundHandler = require('./Middlewares/not-found');
const errorHandler = require('./Middlewares/error');
const authRouter = require('./Router/auth-router');
const menuRouter = require('./Router/menu-router');
const categoryRouter = require('./Router/category-router');
const tableRouter = require('./Router/table-router');
// const authenticate = require('./Middlewares/authenticate');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Public Routes
app.use('/auth',authRouter);


// Apply authentication middleware to protected routes
app.use('/menu',menuRouter)
app.use('/category',categoryRouter)
app.use('/table',tableRouter)
app.use('/orders',tableRouter)


app.use('*',notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {console.log('Server started on port 3000');});


