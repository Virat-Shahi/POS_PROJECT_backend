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
const orderRouter = require('./Router/Order-router')
const paymentRouter = require('./Router/payment-router')
const authenticate = require('./Middlewares/authenticate');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Public Routes
app.use('/auth',authRouter);


// Apply authentication middleware to protected routes
app.use('/menu',authenticate,menuRouter)
app.use('/category',authenticate,categoryRouter)
app.use('/table',authenticate,tableRouter)
app.use('/orders',authenticate,orderRouter)
app.use('/payment',authenticate,paymentRouter)


app.use('*',notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {console.log('Server started on port 3000');});


