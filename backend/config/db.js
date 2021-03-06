import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(
            process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (e) {
        console.error(`Error: ${e.message}`);
        // Exit with error
        process.exit(1);
    }
}

export default connectDB;