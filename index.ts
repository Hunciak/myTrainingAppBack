const express = require('express');
const cors = require('cors');
const app = express();


app
    .use(express.json())
    .use(cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }))

    // .post('/singup', async (req, res) => {
    //     const {name, password, weight, height, gender} = req.body;
    //     try {
    //         // const userDoc = await
    //
    //             } catch (e) {
    //         console.log('Błąd', e)
    //     }
    // })
    .listen('3001',() => {
        console.log('Backend is ready on http://localhost:3001');
    })
