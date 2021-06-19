const { Router } = require("express")
const { getMedicaments, getMedicament, postMedicament, putMedicament, deleteMedicament } = require('../controllers/medicament')

const router = Router()

router.get('/', getMedicaments)
router.get('/:id', getMedicament)
router.post('/', postMedicament)
router.delete('/:id', deleteMedicament)
router.put('/:id', putMedicament)

module.exports = router;
