const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Conseil = getRepository('Conseil')

function getConseils(req, res) {
    Conseil.find()
    .then(conseils => {
        res.send(success("liste des conseils", conseils))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getConseil(req, res) {
    Conseil.findOne({ id: req.params.id })
    .then(conseil => {
        res.send(success("conseil of id " + req.params.id, conseil))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function postConseil(req, res) {
    const conseil = Conseil.create(req.body)
    Conseil.save(conseil)
    .then(() => {
        res.send(success("conseil cree avec succes", conseil))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function deleteConseil(req, res) {
    Conseil.delete({ id: req.params.id })
    .then(conseils => {
        res.send(success("conseil supprime avec succes", conseils))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putConseil(req, res) {
    Conseil.update(req.body)
    .then(conseils => {
        res.send(success("conseil modifie avec succes", conseils))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getConseils,
    getConseil,
    postConseil,
    deleteConseil,
    putConseil
}