const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({
    mergeParams: true
})

router.patch('/:userId',
    auth,
    async (req, res) => {
        try {
            const {userId} = req.params
            
            if (userId === req.user._id) {
                const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
                // {new: true} - обозначает ожидание получения данных до момента обновления,
                // чтобы не получить старые данные
                res.send(updatedUser)
            } else {
                res.status(401).json({message: 'Unauthorized'})
            }
            
            res.status(200).send()
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка'
            })
        }
    })

router.get('/',
    auth,
    async (req, res) => {
        try {
            const list = await User.find()
            res.status(200).send(list)
            // status 200 по умолчанию, его можно не указывать
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка'
            })
        }
    }
)

module.exports = router