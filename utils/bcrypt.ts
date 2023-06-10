import {hash, compare} from 'bcrypt';


export const bcrypt = async (passwordToHash: string, SALT: number = 10): Promise<string> => {
    return await hash(passwordToHash, SALT);
};

export const comparePassword = async (passwordToComapre: string, hashedPassword: string): Promise<boolean> => {
    return await compare(passwordToComapre, hashedPassword);
};
