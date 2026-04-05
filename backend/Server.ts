import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors'
import { createUser } from './services/userService.ts'
import type { User } from './services/userService.ts'
import db from "./db.ts";

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000
db.prepare(`DROP TABLE IF EXISTS users`).run() //TODO: Remove this line. This is for testing purposes only
db.prepare(`
  CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    displayName TEXT DEFAULT NULL
  )
`).run()

app.post('/register', async (req: Request, res: Response) => {
    const { username, password, displayName } = req.body
    try{
        const user: User = await createUser(username, password, displayName)
        res.json(user)
    }catch (err: any){
        res.status(400).json({error: err.message})
    }
})

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Basic Express + Typescript backend' })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
