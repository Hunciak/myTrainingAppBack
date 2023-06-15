import {pool} from "./db";


export const regValidation = async (username: string, email: string) => {

    const emailCheck = await pool.query("SELECT email FROM users WHERE email = :email", {
            email
        }
    )
    const nameCheck = await pool.query("SELECT name FROM users WHERE name = :username", {
            username
        }
    )
    if (emailCheck && nameCheck) {
        return "Adres email i nazwa użytkownika są zajęte."
    } else if (emailCheck) {
        return "Adres email jest zajęty."
    } else if (nameCheck) {
        return "Nazwa użytkownika jest zajęta."
    }

}