import {ICreateNewExercise} from "../types";
import {pool} from "./db";
import {ExerciseValidationError} from "./errors";


export const exerciseValidation = async (exerciseValidation: ICreateNewExercise[], id: string): Promise<number[]> => {

    const validation: number[] = [];

    if (exerciseValidation.length === 0) {
        throw new ExerciseValidationError('Należy dodać przynajmniej 1 ćwiczenie.')
    }

    await exerciseValidation.forEach((exercise:ICreateNewExercise) => {

        if (!id || !exercise.setName) {
            throw new ExerciseValidationError('Nie podano nazwy zestawu ćwiczeń.')
        }
        if (!exercise.name) {
            throw new ExerciseValidationError('Nie podano nazwy ćwiczenia.')
        }

        try {
            pool.query("SELECT set_name FROM user_sets_name WHERE id = :id AND set_name = :name", {
                id,
                name: exercise.setName,
            })
        } catch (e) {
            throw new ExerciseValidationError('Nieznany błąd, spróbuj ponownie później.')
        }

        if (Math.abs(exercise.series).toString().length > 3 || Math.abs(exercise.repeats).toString().length > 3 || Math.abs(exercise.time).toString().length > 3) {
            throw new ExerciseValidationError('Należy dodać przynajmniej 1 ćwiczenie.')
        }
        validation.push(200);
    })
    return validation;
}