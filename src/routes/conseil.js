const { Router } = require("express")
const { getConseils, getConseil, postConseil, putConseil, deleteConseil } = require('../controllers/conseil')

const router = Router()

router.get('/', getConseils)
router.get('/:id', getConseil)
router.post('/', postConseil)
router.delete('/:id', deleteConseil)
router.put('/:id', putConseil)

module.exports = router;
