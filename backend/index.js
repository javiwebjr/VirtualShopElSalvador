import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//
import connectionDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import subcategoryRoutes from './routes/subcategoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;
connectionDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.listen(port, () => console.log(`Server running on port: ${port}`));