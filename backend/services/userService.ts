import bcrypt from 'bcryptjs'

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
	//TODO: Check if the user already exists
	const id = Math.random().toString(36).slice(2,10)
	//TODO: Password security requirements (8+ characters w/ numbers, letters, & special characters)
	const passwordHash = await bcrypt.hash(password,10)
	const user: User = {id,username,passwordHash,displayName}
	//TODO: Local database integration
	return user
}