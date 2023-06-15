enum Gender {
    male,
    female,
}

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
    weight: number,
    height: number,
}


