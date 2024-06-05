import express, { Request, Response } from "express"
import "dotenv/config"
import cors from "cors"

const app = express()

// app.use(config())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.get('/test', (req:Request, res:  Response) => {
    res.send('hello to chat app')
})

app.listen(3000, () => {
    console.log(`app running on port 3000`);
})