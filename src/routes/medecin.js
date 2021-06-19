const { Router } = require("express")
const { getMedecins, getMedecin, postMedecin, putMedecin, deleteMedecin } = require('../controllers/medecin')

const router = Router()

router.get('/', getMedecins)
router.get('/:id', getMedecin)
router.post('/', postMedecin)
router.delete('/:id', deleteMedecin)
router.put('/:id', putMedecin)

module.exports = router;
