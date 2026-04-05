import express from 'express'
import type { Request, Response } from 'express'

const app = express()
const PORT = 3000

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Basic Express + Typescript backend' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
