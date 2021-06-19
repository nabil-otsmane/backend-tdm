const { Router } = require("express")
const { getPatients, getPatient, postPatient, putPatient, deletePatient, getRendezVousPatient, getTraitementPatient } = require('../controllers/patient')

const router = Router()

router.get('/', getPatients)
router.get('/:id', getPatient)
router.get('/:id/rv', getRendezVousPatient)
router.get('/:id/traitements', getTraitementPatient)
router.post('/', postPatient)
router.delete('/:id', deletePatient)
router.put('/:id', putPatient)

module.exports = router;
