enum Gender {
    male,
    female,
}

export interface IUserLogIn {
    name: string,
    password: string,
}

export interface IUserSingUp{
    name: string,
    email: string
    password: string,
    gender: string,
    weight: number,
    height: number,
}

