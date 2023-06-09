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
    password: string,
    gender: string,
    weight: number,
    height: number,
}

