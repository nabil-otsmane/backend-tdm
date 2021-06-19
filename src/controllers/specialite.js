const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Specialite = getRepository('Specialite')
const Medecin = getRepository('Medecin')

function getSpecialites(req, res) {
    Specialite.find()
    .then(specialites => {
        res.send(success("liste des specialites", specialites))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getSpecialite(req, res) {
    Specialite.findOne({ id: req.params.id })
    .then(specialite => {
        res.send(success("specialite of id " + req.params.id, specialite))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getMedecinsSpecialite(req, res) {
    Medecin,find({ idSpec: req.params.id })
    .then(medecins => {
        res.send(success("medecins de la specialite "+id, medecins))
    })
    .catch(err => {
        res.send(error(err.message))
    })
}

function postSpecialite(req, res) {
    const specialite = Specialite.create(req.body)
    Specialite.save(specialite)
    .then(() => {
        res.send(success("specialite cree avec succes", specialite))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function deleteSpecialite(req, res) {
    Specialite.delete({ id: req.params.id })
    .then(specialites => {
        res.send(success("specialite supprime avec succes", specialites))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putSpecialite(req, res) {
    Specialite.update(req.body)
    .then(specialites => {
        res.send(success("specialite modifie avec succes", specialites))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getSpecialites,
    getSpecialite,
    postSpecialite,
    deleteSpecialite,
    putSpecialite,
    getMedecinsSpecialite
}