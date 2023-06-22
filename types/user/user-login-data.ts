export interface IUserLogIn {
    id?: string,
    name: string,
    password: string,
}

export interface IUserSignUp {
    name: string,
    email: string
    password: string,
    gender: string,
    weight: string,
    height: string,
}

export interface INameEmailCheck {
    name?: string,
    email?: string,
}

export interface ICreateNewExercise {
    name: string,
    series: number,
    repeats: number,
    time: number,
}

export interface IExerciseName {
    name: string,
}