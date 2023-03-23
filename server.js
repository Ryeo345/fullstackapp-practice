const express = require('express');
const app = express();
const path = require('path');
const {syncAndSeed, Subscriber} = require('./db');


app.use('/dist', express.static('dist'));
// app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/subscribers', async(req, res, next) => {
    try {
        res.send(await Subscriber.findAll());
    }
    catch(err) {
        next(err);
    }
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({error :err})
})

const port = process.env.PORT || 3000;

app.listen(port, async() => {
    try {
        await syncAndSeed();
        console.log(`Listening on port ${port}`);
    }
    catch (err) {
        console.log(err);
    }
})