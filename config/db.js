const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_URL;

const connectDB =async ()=>{
    console.log(mongo_url);
    let connect = await mongoose.connect(mongo_url);
    console.log('Connected to MongoDB');
}


const checkConnection = async()=>{
      try {
        const connection = mongoose.connection;
        if (connection.readyState === 1) {
            console.log('MongoDB database health check successful!');
            return {
                status: 'healthy',
                message: 'MongoDB database connection successful',
            };
        } else {
            throw new Error('MongoDB is not connected');
        }
    } catch (error) {
        console.log('MongoDB database health check failed:', error.message);
        return {
            status: 'unhealthy',
            message: `MongoDB database connection failed: ${error.message}`,
        };
    }
}

module.exports= {connectDB,checkConnection};