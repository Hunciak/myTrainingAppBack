import {pool} from "./db";


export const regValidation = async (username: string, email: string) => {

    const [emailCheck] = await pool.query("SELECT email FROM users WHERE email = :email", {
            email
        }
    )
    const emailCheckErr: any = emailCheck

    const [nameCheck] = await pool.query("SELECT name FROM users WHERE name = :username", {
            username
        }
    )

    const nameCheckErr: any = nameCheck
    if ((emailCheckErr.length !== 0) && nameCheckErr.length !== 0) {
        return "Adres email i nazwa użytkownika są zajęte."
    } else if (emailCheckErr.length !== 0) {
        return "Adres email jest zajęty."
    } else if (nameCheckErr.length !== 0) {
        return "Nazwa użytkownika jest zajęta."
    }

}