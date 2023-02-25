const jwl = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET_KEY

const generateJWT = async(uid, name,email,)=>{
    const payload = {uid,name,email}
    try{
        const token = await jwl.sign(payload, secret, {
            expiresIn: "1h"
        })
        return token
    }catch(error){
        throw new Error(error + 'no se puedo generar token')
    }   
}

module.exports= {generateJWT}