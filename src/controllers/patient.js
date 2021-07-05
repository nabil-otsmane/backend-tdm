const { getRepository, MoreThanOrEqual, LessThanOrEqual } = require("typeorm")
const { error, success } = require("../lib/response")

const Patient = getRepository('Patient')
const RendezVous = getRepository('RendezVous')
const Traitement = getRepository('Traitement')

function getPatients(req, res) {
    Patient.find()
    .then(patients => {
        res.send(success("liste des patients", patients))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getPatient(req, res) {
    Patient.findOne({ id: req.params.id })
    .then(patient => {
        res.send(success("patient of id " + req.params.id, patient))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getRendezVousPatient(req, res) {
    RendezVous.find({ idPatient: req.params.id })
    .then(rvs => {
        res.send(success("rendez-vous de patient " + req.params.id, rvs))
    })
    .catch(err => {
        res.send(error(err.message))
    })
}

function getTraitementPatient(req, res) {
    Traitement.find({ idPatient: req.params.id, dateFin: MoreThanOrEqual(new Date()), relations: ["listMedicament"] })
    .then(traitements => {
        res.send(success("traitements de patient " + req.params.id, traitements))
    })
    .catch(err => {
        res.send(error(err.message))
    })
}

function postPatient(req, res) {
    const patient = Patient.create(req.body)
    Patient.save(patient)
    .then(() => {
        res.send(success("patient cree avec succes", patient))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function deletePatient(req, res) {
    Patient.delete({ id: req.params.id })
    .then(patients => {
        res.send(success("patient supprime avec succes", patients))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putPatient(req, res) {
    Patient.update(req.body)
    .then(patients => {
        res.send(success("patient modifie avec succes", patients))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getPatients,
    getPatient,
    postPatient,
    deletePatient,
    putPatient,
    getRendezVousPatient,
    getTraitementPatient
}