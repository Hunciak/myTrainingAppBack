import {ICreateNewExercise, IExerciseName, ISetName, IUserData, IUserLogIn, IUserSignUp} from "../types"
import {UnknownError, ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

import {bcrypt, comparePassword} from "../utils/bcrypt";
import {accessToken, refreshToken} from "../utils/token";

type IUserLogInResult = [IUserLogIn[], FieldPacket[]];
type IUserExerciseResult = [IExerciseName[], FieldPacket[]];
type ISetNameResult = [ISetName[], FieldPacket[]];
type IGetDataUser = [IUserData[], FieldPacket[]];
type ICreateNewExerciseResult = [ICreateNewExercise[], FieldPacket[]]

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

    async insert(): Promise<void> {

        if (!this.id) {
            this.id = uuid()
            this.password = await bcrypt(this.password)

        } else {
            throw new Error('Cannot insert something that is already inserted!')
        }
        await pool.query("INSERT INTO `users`(`id`, `name`, `email`, `password`, `gender`, `weight`, `height`) VALUES(:id, :name, :email, :password, :gender, :weight, :height)", this)

    }

    static async logIn(email: string, password: string): Promise<string[] | null> {
        const [getUser] = await pool.query("SELECT id, password FROM users WHERE email = :email", {
            email,
        }) as IUserLogInResult;

        if (!getUser[0] || !await comparePassword(password, getUser[0].password)) {
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

    static async getData(id: string): Promise<IUserData[]> {
        const [getData] = await pool.query("SELECT name, email, weight, height FROM users WHERE id=:id", {
            id,
        }) as IGetDataUser
        return getData.length === 0 ? null : getData;
    }

    static async logOut() {
        return
    }


    static async addSetName(newExercises: ICreateNewExercise[], userId: string) {
        try {
            await pool.query("INSERT INTO `user_sets_name` (`id`, `set_name`) VALUES(:id, :setName)", {
                id: userId,
                setName: newExercises[0].setName,
            })
        } catch (e) {
            return 500  //conflict: Resource already exists
        }
    }

    static saveExercises(newExercises: ICreateNewExercise[], userId: string) {

        newExercises.forEach(async (exercise) => {

            try {
                if (!exercise.exerId) {
                    exercise.exerId = uuid()
                }
                await pool.query("INSERT INTO `exercise_sets`(`id`, `set_name`, `name`, `series`, `repeats`, `weight`, `time`, `exerId`) VALUES(:id, :setName, :name, :series, :repeats, :weight, :time, :exerId)", {
                    id: userId,
                    setName: exercise.setName,
                    name: exercise.name,
                    series: exercise.series,
                    repeats: exercise.repeats,
                    weight: exercise.weight,
                    time: exercise.time,
                    exerId: exercise.exerId,
                })
            } catch (e) {
                throw new UnknownError('Coś poszło nie tak, spróbuj ponownie później.')
            }
        })
    }

    static async getExercise(): Promise<IExerciseName[] | null> {
        const [getExercises] = await pool.query("SELECT name FROM exercises") as IUserExerciseResult;
        return getExercises.length === 0 ? null : getExercises;
    }

    static async getUserExercise(userId: string): Promise<IExerciseName[] | null> {
        const [getUserExercises] = await pool.query("SELECT set_name FROM user_sets_name WHERE id =:id", {
            id: userId,
        }) as IUserExerciseResult;
        return getUserExercises.length === 0 ? null : getUserExercises;
    }

    static async getUserExerciseDetails(userId: string, set_name: string) {
        const [getUserExerciseDetails] = await pool.query("SELECT name, set_name, series, repeats, weight, time FROM exercise_sets WHERE id =:userId AND set_name =:set_name", {
            userId,
            set_name,
        }) as ICreateNewExerciseResult
        return getUserExerciseDetails[0] ? getUserExerciseDetails : null;
    }

    static updateExercises(newExercise: ICreateNewExercise[], userId: string) {

        newExercise.forEach(async (exercise) => {
            try {

                await pool.query("UPDATE exercise_sets SET name =:name, set_name =:set_name, series =:series, repeats =:repeats, weight =:weight, time =:time WHERE set_name =:set_name AND id =:userId AND exerId =:exerId", {
                    name: exercise.name,
                    set_name: exercise.set_name,
                    series: exercise.series,
                    repeats: exercise.repeats,
                    weight: exercise.weight,
                    time: exercise.time,
                    exerId: exercise.exerId,
                    userId,
                })
            } catch (e) {
                console.log(e)
            }
        })
    }
}

























