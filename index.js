import connectDB from './src/config/db.connect.js';
import dotenv from 'dotenv'
dotenv.config({ path: '.env.dev' });
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.static('./src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
import userRoute from './src/routes/user.route.js'
app.use('/api/user', userRoute)

// error handler
import errorHandler from './src/middleware/errorHandler.js';

app.use(errorHandler);

export default app;

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
    connectDB();
});