const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Medecin = getRepository('Medecin')
const RendezVous = getRepository('RendezVous')
const traitement = getRepository('Traitement')

function getMedecins(req, res) {
    Medecin.find()
    .then(medecins => {
        res.send(success("liste des medecins", medecins))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getMedecin(req, res) {
    Medecin.findOne({ id: req.params.id })
    .then(medecin => {
        res.send(success("medecin of id " + req.params.id, medecin))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getTraitementMedecin(req, res) {
    const id = req.params.id
    traitement.find({ idMedecin: id })
    .then(e => {
        res.send(success("listes des traitements du medecin " + id, e))
    })
    .catch(err => {
        res.send(error(err.message))
    })
}

function getRendezVousMedecin(req, res) {
    const id = req.params.id
    RendezVous.find({ idMedecin: id })
    .then(e => {
        res.send(success("listes des rendez-vous du medecin " + id, e))
    })
    .catch(err => {
        res.send(error(err.message))
    })
}

function postMedecin(req, res) {
    const medecin = Medecin.create(req.body)
    Medecin.save(medecin)
    .then(() => {
        res.send(success("medecin cree avec succes", medecin))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function deleteMedecin(req, res) {
    Medecin.delete({ id: req.params.id })
    .then(medecins => {
        res.send(success("medecin supprime avec succes", medecins))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putMedecin(req, res) {
    Medecin.update(req.body)
    .then(medecins => {
        res.send(success("medecin modifie avec succes", medecins))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getMedecins,
    getMedecin,
    postMedecin,
    deleteMedecin,
    putMedecin,
    getRendezVousMedecin,
    getTraitementMedecin
}