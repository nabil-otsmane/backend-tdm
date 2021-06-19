const { Router } = require("express")
const { getSpecialites, getSpecialite, postSpecialite, putSpecialite, deleteSpecialite, getMedecinsSpecialite } = require('../controllers/specialite')

const router = Router()

router.get('/', getSpecialites)
router.get('/:id', getSpecialite)
router.get('/:id/medecin', getMedecinsSpecialite)
router.post('/', postSpecialite)
router.delete('/:id', deleteSpecialite)
router.put('/:id', putSpecialite)

module.exports = router;
