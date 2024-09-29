import dotenv from 'dotenv/config';
import connectToDb from './src/db/index.js';
import app from './app.js';

const port = process.env.PROT || 8000


connectToDb()
.then( () => {
    app.on( "Error", (error) => {
        console.log("Error: ", error);
        throw error;
        
    })

    app.get("/", (req, res) => {
        res.json({message: "connect successfully"})
    })

    app.listen(port, () => {
        console.log(`Application listen on port ${port}`);
        
    })
})
.catch( (error) => {
    console.log("Mongodb connection failed ", error);
    
})