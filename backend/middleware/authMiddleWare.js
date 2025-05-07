import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'
dotenv.config()

//authentication middleware that will later protect routes
export const authMiddleWare = (req , res , next ) => {
    
    //Steps : T V A

    //Step : T (token)
    const token = req.header('x-auth-token') || req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(403).json({
            message : 'Unauthorized'
    })}

    try {
        //Step : V  (verify)
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
        const CRYPTOJS_SECRET_KEY = process.env.CRYPTOJS_SECRET_KEY

        const bytes = CryptoJS.AES.decrypt(token , CRYPTOJS_SECRET_KEY)
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)

        const decodedPayload = jwt.verify(decryptedToken , JWT_SECRET_KEY)

        //Step : A  (attach)
        req.user = decodedPayload
        next()

    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message : 'Unauthorized'
        })
    }
    
}