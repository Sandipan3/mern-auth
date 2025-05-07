import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import User from '../models/User.js'
import { check,oneOf,validationResult } from 'express-validator'
import dotenv from 'dotenv'
dotenv.config()

export const router = express.Router()

//user registration
router.post('/register',[
    check('username','Invalid Username').not().isEmpty(),
    check('email','Invalid Email').isEmail(),
    check('password','Please use strong password').isStrongPassword()
], async(req , res) =>{


    //validation
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        })
    }
     //steps: H,U,S

    const {username , email , password } =  req.body

    //step : H  (hash)
    try {
            const SALT_COST_FACTOR = parseInt(process.env.SALT_COST_FACTOR) || 10
            const salt = await bcrypt.genSalt(SALT_COST_FACTOR);
            const hashedPassword = await bcrypt.hash(password , salt)

            //step : U  (user)
            const user = new User({
                username, email, password : hashedPassword
            })
            
            //step : S  (save)
            await user.save()
            return res.status(201).json({
                message : 'User registration was successful'
            })

    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            message : 'User registration was not successful'
        })
    }
})


//user login

router.post('/login',[
    oneOf([
        check('username').not().isEmpty(),
        check('email').isEmail()
    ],'Incorrect username or password'),
    check('password','Password is required').isStrongPassword()
],async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        })
    }
    
    //steps : D,U,M,T
    
    const {username , email , password } =  req.body

    try {
        //Step :D   (dynamic query)
        const user = await User.findOne({
            $or:[
                {username : username},
                {email : email}
            ]
        })
    
        //step : U  (user)
        if(!user){
            return res.status(401).json({
                message : "user not found!!"
            })
        }
    
        //step : M  (match)
        const match = await bcrypt.compare(password , user.password)
    
        if(!match){
            return res.status(401).json({
                message : "incorrect password"
            })
        }
    
        //step: T   (token)
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
        const CRYPTOJS_SECRET_KEY = process.env.CRYPTOJS_SECRET_KEY
    
        const payload = {
            user : {
                id : user.id
            }
        }
    
        const token = jwt.sign(payload , JWT_SECRET_KEY, {expiresIn : 1800})
    
        const encryptedToken = CryptoJS.AES.encrypt(token , CRYPTOJS_SECRET_KEY).toString()
    
        return res.json({token : encryptedToken})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
})
