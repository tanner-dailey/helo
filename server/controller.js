const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const profilePic = `https://robohash.org/${username}.png`
        const db = req.app.get('db')
        const foundUser = await db.get_user({username})
        if(foundUser[0]) {
            return res.status(400).send('Username taken')
        }
        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt)
        const newUser = await db.register_user({username, hash, profilePic})
        req.session.user = newUser[0]
        return res.status(201).send(req.session.user)
    },

    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        const foundUser = await db.get_user({username})
        if(!foundUser[0]) {
            return res.status(400).send('User not found. Please register before logging in')
        }
        const isAuthenticated = bcrypt.compareSync(password, foundUser[0].password)
        if(!isAuthenticated) {
            return res.status(401).send('Incorrect password')
        }
        req.session.user = foundUser[0]
        res.status(202).send(req.session.user)
    }
}