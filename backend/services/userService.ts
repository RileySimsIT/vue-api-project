import bcrypt from 'bcryptjs'
import db from '../db'

export type User = {
	id: string
	username: string
	passwordHash: string
	displayName?: string
}

/**
 * Create a new user with the username, password, and display name provided
 *
 * @param   {string}         username     The username associated with the user
 * @param   {string}         password     The unhashed password associated with the user
 * @param   {string}   		 displayName  An optional cosmetic display name to be used instead of the user name
 *
 * @return  {Promise<User>}               
 */
export const createUser = async (username: string, password: string, displayName?: string): Promise<User> => {
	//TODO: variable validation
	const existing = db.prepare("SELECT * FROM users WHERE username = ?").get(username)
	if(existing){
		throw new Error("Username is already taken")
	}
	const id = Math.random().toString(36).slice(2,10)
	//TODO: Password security requirements (8+ characters w/ numbers, letters, & special characters)
	const passwordHash = await bcrypt.hash(password,10)
	const user: User = {id,username,passwordHash,displayName}

	const query = db.prepare(`
		INSERT INTO users (id, username, passwordHash, displayName)
		VALUES (?, ?, ?, ?)	
	`)

	query.run(id,username,passwordHash, displayName ?? null)
	return user
}

/**
 * Compares the raw string password with the associated user object's password hash
 *
 * @param   {User}              user      The current user object
 * @param   {string}   		    password  The raw password to be compared against the hash
 *
 * @return  {Promise<boolean>}            True/false if the password validates
 */
export const validatePassword = async (user: User, password: string): Promise<boolean> =>{
	//TODO: variable validation
	//TODO: validate the user provided is the current user.
	return bcrypt.compare(password, user.passwordHash)
}