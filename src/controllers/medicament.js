const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Medicament = getRepository('Medicament')

function getMedicaments(req, res) {
    Medicament.find()
    .then(medicaments => {
        res.send(success("liste des medicaments", medicaments))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getMedicament(req, res) {
    Medicament.findOne({ id: req.params.id })
    .then(medicament => {
        res.send(success("medicament of id " + req.params.id, medicament))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function postMedicament(req, res) {
    const medicament = Medicament.create(req.body)
    Medicament.save(medicament)
    .then(() => {
        res.send(success("medicament cree avec succes", medicament))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function deleteMedicament(req, res) {
    Medicament.delete({ id: req.params.id })
    .then(medicaments => {
        res.send(success("medicament supprime avec succes", medicaments))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putMedicament(req, res) {
    Medicament.update(req.body)
    .then(medicaments => {
        res.send(success("medicament modifie avec succes", medicaments))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getMedicaments,
    getMedicament,
    postMedicament,
    deleteMedicament,
    putMedicament
}