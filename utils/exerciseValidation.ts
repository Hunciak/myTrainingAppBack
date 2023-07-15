import {ICreateNewExercise} from "../types";
import {pool} from "./db";
import {UnknownError, ValidationError} from "./errors";
import {FieldPacket} from "mysql2";

type ICreateNewExerciseResult = [ICreateNewExercise[], FieldPacket[]]

export const exerciseValidation = async (exerciseValidation: ICreateNewExercise[], id: string): Promise<number[]> => {
    const validation: number[] = [];
    let nameValidation: string[] = [];

    if (exerciseValidation.length === 0) {
        throw new ValidationError('Należy dodać przynajmniej 1 ćwiczenie.');
    }

    for (const exercise of exerciseValidation) {
        try {
            const [nameValidResult] = await pool.query("SELECT name FROM exercise_sets WHERE name =:name AND set_name =:setName AND id =:id", {
                name: exercise.name,
                setName: exercise.setName,
                id,
            }) as any;

            if (nameValidResult.length !== 0) {
                nameValidation = nameValidResult;
            }
        } catch (e) {
            console.log(e);
        }

        if (nameValidation.length > 0){
            throw new ValidationError(`Ćwiczenie ${exercise.name} występuje już w zestawie ${exercise.setName}`);
        }

        if (!id && !exercise.setName) {
            throw new ValidationError('Nie podano nazwy zestawu ćwiczeń.');
        }
        if (!exercise.name) {
            throw new ValidationError('Nie podano nazwy ćwiczenia.');
        }

        try {
            await pool.query("SELECT set_name FROM user_sets_name WHERE id = ? AND set_name = ?", [id, exercise.set_name]);
        } catch (e) {
            throw new UnknownError('Nieznany błąd, spróbuj ponownie później.');
        }

        if (Math.abs(exercise.series).toString().length > 3 || Math.abs(exercise.repeats).toString().length > 3 || Math.abs(exercise.time).toString().length > 3) {
            throw new ValidationError('Ilość serii, powtórzeń i czas nie mogą być dłuższe niż 999.');
        }

        validation.push(200);
    }

    return validation;
}