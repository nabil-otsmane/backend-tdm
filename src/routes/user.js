const { Router } = require("express")
const { getUsers, getUser, putUser, deleteUser, login, register } = require('../controllers/user')

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/login', login)
router.post('/register', register)
router.delete('/:id', deleteUser)
router.put('/:id', putUser)

module.exports = router;
