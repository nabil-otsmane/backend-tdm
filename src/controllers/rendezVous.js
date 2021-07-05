const { getRepository, MoreThanOrEqual } = require("typeorm")
const { error, success } = require("../lib/response")
const fetch = require("node-fetch")

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
            const topicName = idMedecin;
            const message = {
              to: "/topics/"+topicName,
              notification: {
                title: 'Vous avez un nouveau rendez-vous',
                body: 'Un nouveau rendez-vous a été ajouté'
              },
            };

            fetch('https://fcm.googleapis.com/fcm/send',{
              'method' : 'POST',
              'headers' : {
                'Authorization' : 'key=AAAAu0xsRec:APA91bHIZswqs2ARLK5sEQOgzLr9ft-dfOEysHexaza3cLwguVkUR3CvuMaqsCCzqGxtQSjeHWFfWpW6-N7kBvF34TX0OJAY2syOweWw7ojmFn7vwifSlX8CdTZt_tS2X98l3v9z398_',
                'Content-Type' : 'application/json'
              },
              'body' : JSON.stringify(message)
            }
            ).then(res => res.json()) // expecting a json response
            .then(json => console.log(json))
            .catch((err)=>{
              console.log(err)
            })
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