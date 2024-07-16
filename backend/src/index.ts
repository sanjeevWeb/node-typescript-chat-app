import express, { Request, Response,NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express()

dotenv.config()
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.get('/test', (req:Request, res:  Response) => {
    res.send('hello to chat app')
})

declare global {
    interface CustomError extends Error {
        status?: number
    }
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(error.status) {
        return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: 'something went wrong' })
})

app.listen(3000, () => {
    console.log(`app running on port 3000`);
})