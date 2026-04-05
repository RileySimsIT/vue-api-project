import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

//Set the filepath to ensure the writing is pointed to the backend folder.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'database.db')
const db = new Database(dbPath)

export default db
