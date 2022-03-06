const express = require('express')
const path = require("path")
const app = express();
const port = 3000;

class Farmer{
    constructor(n) {
        this.id = n;
        this.region = `r${n}`;
        this.farmer = `f${n}`;
        this.n_fields = n;
        this.ha = n;
        this.autumn = n;
        this.spring = n;
        this.seeding = n;
        this.planting = n;
        this.irrigation = n;
        this.cultivation = n;
        this.fertilizing = n;
        this.topping = n;
        this.efficiency = n;
        this.quality = n;
        this.index = n;
    }
}

let dataset = [];
for(let i = 0 ; i < 200; i++){
    dataset.push(new Farmer(i))
}

app.use(express.static('./'))

app.get('/', (req, res) => {
    console.log(`${req.hostname} connected to app.`)
    res.redirect("/farmers")
})

app.get('/farmers', (req, res) => {
    console.log(`${req.hostname} connected to farmers.`)
    res.sendFile(path.join(__dirname, '/farmers.html'))
})

app.get('/constants', (req, res) => {
    console.log(`${req.hostname} connected to constants.`)
    res.sendFile(path.join(__dirname, '/constants.html'))
})

app.get('/data', (req, res) => {
    res.json(dataset)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});