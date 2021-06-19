const { Router } = require("express")
const { getRendezVouss, getRendezVous, postRendezVous, putRendezVous, deleteRendezVous } = require('../controllers/rendezVous')

const router = Router()

router.get('/', getRendezVouss)
router.get('/:id', getRendezVous)
router.post('/', postRendezVous)
router.delete('/:id', deleteRendezVous)
router.put('/:id', putRendezVous)

module.exports = router;
