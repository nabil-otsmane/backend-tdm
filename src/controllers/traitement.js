const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Traitement = getRepository('Traitement')

function getTraitements(req, res) {
    Traitement.find({ relations: ["listMedicament"] })
    .then(traitements => {
        res.send(success("liste des traitements", traitements))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getTraitement(req, res) {
    Traitement.findOne({ id: req.params.id })
    .then(traitement => {
        res.send(success("traitement of id " + req.params.id, traitement))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function postTraitement(req, res) {
    const traitement = Traitement.create(req.body)
    Traitement.save(traitement)
    .then(() => {
        res.send(success("traitement cree avec succes", traitement))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function deleteTraitement(req, res) {
    Traitement.delete({ id: req.params.id })
    .then(traitements => {
        res.send(success("traitement supprime avec succes", traitements))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putTraitement(req, res) {
    Traitement.update(req.body)
    .then(traitements => {
        res.send(success("traitement modifie avec succes", traitements))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getTraitements,
    getTraitement,
    postTraitement,
    deleteTraitement,
    putTraitement
}