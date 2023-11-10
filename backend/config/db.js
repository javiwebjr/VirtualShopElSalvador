import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected MongoDB', process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectionDB;