const express = require("express")
const { createConnection, EntitySchema } = require("typeorm")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
    res.send({ message: "server is up and running." })
})

createConnection({
    "type": "mysql", 
    "host": "localhost", 
    "port": 3306, 
    "username": "nabil", 
    "password": "heyheyboi", 
    "database": "ProjetMobile",
    "synchronize": true, 
    "logging": false, 
    entities: [ 
        new EntitySchema(require("./entities/conseil.json")),
        new EntitySchema(require("./entities/medecin.json")),
        new EntitySchema(require("./entities/medicament.json")),
        new EntitySchema(require("./entities/patient.json")),
        new EntitySchema(require("./entities/rendezVous.json")),
        new EntitySchema(require("./entities/specialite.json")),
        new EntitySchema(require("./entities/traitement.json")),
        new EntitySchema(require("./entities/user.json")),
    ] 
})
.then(() => {
    const routes = require('./routes')

    app.use('/api', routes)

    app.listen(3333, () => console.log("server started."))
})
.catch(err => {
    console.log("connection error: " + err.message)
})