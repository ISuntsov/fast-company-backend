const express = require('express')
const router = express.Router({
    mergeParams: true
})

router.patch('/: userId')


module.exports = router