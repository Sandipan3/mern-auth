import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import User from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

export const router = express.Router()

//user registration
router.post('/register', async(req , res) =>{

    const {username , email , password } =  req.body

    //password hashing
    try {
            const SALT_COST_FACTOR = parseInt(process.env.SALT_COST_FACTOR) || 10
            const salt = await bcrypt.genSalt(SALT_COST_FACTOR);
            const hashedPassword = await bcrypt.hash(password , salt)

            const user = new User({
                username, email, password : hashedPassword
            })
            
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

