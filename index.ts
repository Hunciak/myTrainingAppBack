const express = require('express');
const cors = require('cors');
// import {handleError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
// app.use(handleError)
app.use(express.json());
app.listen(3001, '0.0.0.0', () => {
    console.log('Backend is ready on http://localhost:3001');
})
