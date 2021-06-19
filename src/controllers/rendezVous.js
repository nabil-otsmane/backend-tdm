const { getRepository, MoreThanOrEqual } = require("typeorm")
const { error, success } = require("../lib/response")

const RendezVous = getRepository('RendezVous')

function getRendezVouss(req, res) {
    RendezVous.find()
    .then(rendezVouss => {
        res.send(success("liste des rendezVouss", rendezVouss))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getRendezVous(req, res) {
    RendezVous.findOne({ id: req.params.id })
    .then(rendezVous => {
        res.send(success("rendezVous of id " + req.params.id, rendezVous))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function postRendezVous(req, res) {

    const { idPatient, idMedecin } = req.body;

    let date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(9, 0, 0, 0)

    RendezVous.find({ 
        where: { date: MoreThanOrEqual(date), idMedecin },
        order: {
            date: "DESC",
        },
        take: 1
    })
    .then(rvs => {
        if (rvs.length != 0) {
            date = new Date(rvs[0].date)
            if (date.getHours() > 16) {
                date.setDate(date.getDate() + 1)
                date.setHours(9, 0, 0, 0)
            } else {
                date.setHours(date.getHours() + 1)
            }
        }

        const rendezVous = RendezVous.create({ idMedecin, idPatient, date })
        RendezVous.save(rendezVous)
        .then(rendezVous => {
            res.send(success("rendezVous cree avec succes", rendezVous))
        })
        .catch(err => {
            res.send(error(err.message));
        })
    })
    .catch(err => {
        res.send(error(err.message))
    })


    return;

    
}

function deleteRendezVous(req, res) {
    RendezVous.delete({ id: req.params.id })
    .then(rendezVouss => {
        res.send(success("rendezVous supprime avec succes", rendezVouss))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putRendezVous(req, res) {
    RendezVous.update(req.body)
    .then(rendezVouss => {
        res.send(success("rendezVous modifie avec succes", rendezVouss))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getRendezVouss,
    getRendezVous,
    postRendezVous,
    deleteRendezVous,
    putRendezVous
}