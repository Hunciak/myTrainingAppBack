
import {ICreateNewExercise, IExerciseName, ISetName, IUserLogIn, IUserSignUp} from "../types"
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";
import {FieldPacket, ResultSetHeader} from "mysql2";

import {bcrypt, comparePassword} from "../utils/bcrypt";
import {accessToken, refreshToken} from "../utils/token";



type IUserLogInResult = [IUserLogIn[], FieldPacket[]];
type IUserExerciseResult = [IExerciseName[], FieldPacket[]];
type IISetNameResult = [ISetName[], FieldPacket[]];



export class UserRecord implements IUserSignUp {
    id: string;
    name: string;
    email: string;
    password: string;
    gender: string;
    weight: string;
    height: string;


    constructor(obj: IUserSignUp) {

        if (!obj.name || obj.name.length > 30) {
            throw new ValidationError('Nazwa użytkowanika nie może być pusta, ani przekraczać 30 znaków.')
        }



        if (!obj.email || !obj.email.includes('@')) {
            throw new ValidationError('Email użytkownika nie moży być pysty lub podana nazwa nie jest emailem')
        }

        if (!obj.password || obj.password.length <= 8 || obj.password.length >= 30) {
            throw new ValidationError('Hasło użytkownika nie może być puste oraz zawierać od 8 do 30 znaków')
        }

        if (!obj.gender) {
            throw new ValidationError('Płeć nie może być puste.')
        }

        if (!obj.weight) {
            throw new ValidationError('Należy podać wagę!')

        }

        if (!obj.height) {
            throw new ValidationError('Należy podać wzrost.')
        }



        this.name = obj.name;
        this.email = obj.email;
        this.password = obj.password;
        this.gender = obj.gender;
        this.height = obj.height;
        this.weight = obj.weight;

    }

    // static async getUser(id: string): Promise<SingleUserEntity | Error> {
    //     const [results] = await pool.execute("SELECT name, level, experience, HP, strength, dexterity, stamina, charisma, PLN   FROM `users` WHERE id = :id", {
    //         id,
    //     }) as UserRecordResult;
    //
    //     return results.length !== 0 ? results[0] : new Error('No data of given id');
    // }

    static async logIn(email: string, password: string): Promise<string[] | null> {
        const [getUser] = await pool.query("SELECT id, password FROM users WHERE email = :email", {
            email,
        }) as IUserLogInResult;

        if (!getUser[0] || !await comparePassword(password, getUser[0].password) ) {
            return
        }
        //TODO poprawić promise
        const refToken = await refreshToken(getUser[0].id)
        const accToken = await accessToken(getUser[0].id)
        await pool.query("UPDATE users SET token = :refToken WHERE id = :id", {
            refToken,
            id: getUser[0].id,
        })

        const tokens: string[] = []
        tokens.push(accToken);
        tokens.push(refToken);

        return tokens
    }

    static async logOut() {
        return
}

    static async getExercise(): Promise<IExerciseName[] | null> {
        const [getExercises] = await pool.query("SELECT name FROM exercises") as IUserExerciseResult;
        return getExercises.length === 0 ? null : getExercises;
    }





    async insert(): Promise<void> {

        if (!this.id) {
            this.id = uuid()
            this.password = await bcrypt(this.password)

        } else {
            throw new Error('Cannot insert something that is already inserted!')
        }
        await pool.query("INSERT INTO `users`(`id`, `name`, `email`, `password`, `gender`, `weight`, `height`) VALUES(:id, :name, :email, :password, :gender, :weight, :height)", this)

    }


    static async saveExercises(newExercises: ICreateNewExercise, userId: string) {
        newExercises.id = userId;

        // const [setName] = await pool.query("SELECT set_name FROM users WHERE id =:id AND set_name =:setName", {
        //     id: newExercises.id,
        //     setName: newExercises.setName
        // }) as IISetNameResult;
        // console.log('setname: ', [setName])
        // if (setName) {
        //     return 403
        // } @@todo zrobic walidacje nazwy  zestawu ćwiczeń

       try{
           await pool.query("INSERT INTO `exercise_sets`(`id`, `set_name`, `name`, `series`, `repeats`, `weight`, `time`) VALUES(:id, :setName, :name, :series, :repeats, :weight, :time)", {
               id: newExercises.id,
               setName: newExercises.setName,
               name: newExercises.name,
               series: newExercises.series,
               repeats: newExercises.repeats,
               weight: newExercises.weight,
               time: newExercises.time,

           })
           return 200;
       } catch (e) {
           return e
       }
    }
}