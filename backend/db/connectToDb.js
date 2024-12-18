import mongoose from "mongoose";

const connetToMongoDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        if(connect)
            console.log("Mongo is connected");
            
    } catch (error) {
        console.log(error);
        
    }
}

export default connetToMongoDB;