const {verifyJwt, getTokenFromHeaders} = require('../helpers/jwt')

const checkJwt = (req, res, next) => {//validando se o token é valido

    //fazendo com que as rotas /auth/sign-in e /auth/sign-up não precisem de autenticação JWT
    const {url: path} = req
    const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh']
    const isExcluded = !!excludedPaths.find(p => p.startsWith(path))// o '!!' transforma em boolean
    if(isExcluded) return next()

    const token = getTokenFromHeaders(req.headers);
    if(!token) {
        return res.jsonUnauthorized(null, 'Invalid token')
    }

    try{
        const decoded = verifyJwt(token)
        req.accountId = decoded.id
        next()
    }catch(error){
        return res.jsonUnauthorized(null, 'Invalid token')
    }
    
   // console.log('dddd', decoded)


    
}

module.exports = checkJwt