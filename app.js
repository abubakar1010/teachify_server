import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/authRoutes.js';

const app = express()


app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())


// handle routers 
 
app.use("/app/v1/auth", authRouter)


export default app;