const jwt = require ('jsonwebtoken');

const authMiddleware = (req,res,next) =>{

    const token = req.headers.token
    console.log(token)
    if(token) {
        const secretStr = "secret_key"
        jwt.verify(token, secretStr, (err, decoded) => {
            console.log(decoded.id)
            if (err){
                console.log("middleware hiba" + err)
            }
            if (decoded?.id){
                res.locals.id = decoded.id
            }
            next()
        })
    }else { next()} 

}

module.exports = authMiddleware