const { Router } = require('express')
const medecins = require('./medecin')
const patients = require('./patient')
const users = require('./user')
const traitement = require('./traitement')
const conseil = require('./conseil')
const medicament = require('./medicament')
const rendezVous = require('./rendezVous')
const specialite = require('./specialite')

const router = Router()

router.use('/medecin', medecins)
router.use('/patient', patients)
router.use('/auth', users)
router.use('/traitement', traitement)

router.use('/conseil', conseil)
router.use('/medicament', medicament)
router.use('/rv', rendezVous)
router.use('/specialite', specialite)

module.exports = router;