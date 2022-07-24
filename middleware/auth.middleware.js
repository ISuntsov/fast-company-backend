const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    
    try {
        // Bearer eweirwoeruweuroweurow - забираем токен после пробела
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).json({message: 'Unauthorized'})
        }
        
        const data = tokenService.validateAccess(token)
        if (!data) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        
        req.user = data
        
        //данные currentUser { _id: '62dc6fb0335737236b2e1cb5', iat: 1658654388, exp: 1658657988 }
        console.log(data)
        
        // вызов метода, чтобы остальные middleware продолжали работать
        next()
        
    } catch (e) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}