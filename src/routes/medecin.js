const { Router } = require("express")
const { getMedecins, getMedecin, postMedecin, putMedecin, deleteMedecin, getRendezVousMedecin, getTraitementMedecin } = require('../controllers/medecin')

const router = Router()

router.get('/', getMedecins)
router.get('/:id', getMedecin)
router.get('/:id/rv', getRendezVousMedecin)
router.get('/:id/traitement', getTraitementMedecin)
router.post('/', postMedecin)
router.delete('/:id', deleteMedecin)
router.put('/:id', putMedecin)

module.exports = router;
