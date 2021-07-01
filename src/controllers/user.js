const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")
const bcrypt = require('bcrypt')

const generateToken = require('../lib/generateToken')

const User = getRepository('User')

function getUsers(req, res) {
    User.find()
    .then(users => {
        res.send(success("liste des users", users))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getUser(req, res) {
    User.findOne({ id: req.params.id })
    .then(user => {
        res.send(success("user of id " + req.params.id, user))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

async function register(req, res) {

    const { numTele, mdp } = req.body;

    if (!numTele || !mdp) {
        res.status(400).send(error("invalid payload: " + JSON.stringify(req.body)))
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(mdp, salt)
    
        const user = User.create({
            numTele,
            mdp: password
        })
        const u = await User.save(user);

        const token = generateToken(u)

        res.header("auth", token)
        res.send(success("user cree avec succes", user))

    } catch(err) {
        res.send(error(err.message));
    }
}

function login(req, res) {
    const { numTele, mdp } = req.body;

    if (!numTele || !mdp) {
        res.status(400).send(error("invalid payload: " + JSON.stringify(req.body)))
    }

    User.find({ numTele })
    .then(user => {

        if (user.length === 0) {
            res.send(error("incorrect num_tel."))
            return
        }

        const isMatch = bcrypt.compareSync(mdp, user[0].mdp)
        if (!isMatch) {
            res.send(error("incorrect password."))
        } else {
            const token = generateToken(user[0])

            res.header("auth", token)
            res.send(success("login success", user[0]))
        }
    })
    .catch(err => {
        res.send(error("incorrect email"))
    })
}

function deleteUser(req, res) {
    User.delete({ id: req.params.id })
    .then(users => {
        res.send(success("user supprime avec succes", users))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putUser(req, res) {
    User.update(req.body)
    .then(users => {
        res.send(success("user modifie avec succes", users))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = {
    getUsers,
    getUser,
    register,
    login,
    deleteUser,
    putUser
}