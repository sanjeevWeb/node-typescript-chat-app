import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt-ts';
import User from "../models/user.model";
import { Op } from "sequelize";
import jwt from "jsonwebtoken"
import { jwt_secret } from "../config/db.config"
// import dotenv from 'dotenv'

// dotenv.config({ path: ".env." });


class UserController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, phone, password } = req.body;

            // Validate the incoming data
            if (!name || !email || !phone || !password) {
                return res.status(400).json({ success: false, msg: "All fields are required" });
            }

            // Check if the user already exists by email or phone
            let user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { phone: phone }
                    ]
                }
            });

            if (user) {
                return res.status(403).json({ success: false, msg: "User already exists" });
            }

            // Hash the password
            const hash = await bcrypt.hash(password, 10);

            const userData: any = {
                username:name,
                email: email,
                password: hash,
                phone: phone // Ensure the phone field is specified correctly
            }

            // Create a new user
            user = await User.create(userData);

            return res.json({ success: true, msg: "User created successfully" });
        }
         catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, msg: "Internal server error" });
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            // Validate the incoming data
            if (!email || !password) {
                return res.status(400).json({ success: false, msg: "All fields are required" });
            }

            // Check if the user already exists by email or phone
            let user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        // { phone: phone }
                    ]
                }
            });

            if (!user) {
                return res.status(403).json({ success: false, msg: "User does not exists" });
            }

            // Hash the password
            const match = await bcrypt.compare(password, user.password);

            if(!match){
                return res.status(400).json({ success: false, msg: "Incorrect credentials" });
            }

            const signOptions = {
                issuer: "sanjeev",
                expiresIn: "5d"
            };

            jwt.sign({ userId: user.id}, process.env.JWT_SECRET_KEY, signOptions)

            return res.json({ success: true, msg: "User created successfully" });
        }
         catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, msg: "Internal server error" });
        }
    }
}

export default new UserController();
