import express from 'express'
import type { Request, Response } from 'express'
import db from "./db.ts";

const app = express()
app.use(express.json())
const PORT = 3000

db.prepare(`
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    passwordHash TEXT NOT NULL,
    displayName TEXT NOT NULL
  )
`).run()

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Basic Express + Typescript backend' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
