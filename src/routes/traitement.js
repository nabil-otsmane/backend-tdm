const { Router } = require("express")
const { getTraitements, getTraitement, postTraitement, putTraitement, deleteTraitement } = require('../controllers/traitement')

const router = Router()

router.get('/', getTraitements)
router.get('/:id', getTraitement)
router.post('/', postTraitement)
router.delete('/:id', deleteTraitement)
router.put('/:id', putTraitement)

module.exports = router;
