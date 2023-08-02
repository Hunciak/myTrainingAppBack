import {createPool} from "mysql2/promise";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'my_training_app',
    namedPlaceholders: true,
    decimalNumbers: true,
});