import mongoose from "mongoose"

const connectToDb = async() => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log("\nMongodb server connected on host: ", connectionInstance.connection.host);
        
    } catch (error ) {
        console.log("Mongodb connection error", error);
        process.exit(1)
    }

}

export default connectToDb