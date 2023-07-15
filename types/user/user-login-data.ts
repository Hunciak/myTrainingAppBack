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

export interface ICreateNewExercise {
    id?: string,
    set_name?: string,
    exerId?: string,
    name: string,
    series: number,
    repeats: number,
    weight: number,
    time: number,
    id_set_name?: string,
}

export interface IExerciseName {
    name?: string,
    set_name?: string,
}

export interface IRefreshToken {
    id: string,
}

export interface IUserData{
    name: string,
    email: string,
    weight: string,
    height: string,
}




