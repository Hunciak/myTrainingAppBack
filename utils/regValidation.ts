import {pool} from "./db";
import {ValidationError} from "./errors";


export const regValidation = async (username: string, email: string) => {
    console.log(email)

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
    if ((emailCheckErr.length !== 0) || nameCheckErr.length !== 0) {
        throw new ValidationError('Nazwa użytkownika lub email zajęta.')
    }
}