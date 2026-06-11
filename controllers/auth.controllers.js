
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/token.js";
import { signupValidation } from "../validations/auth.validation.js";


export const signUp = async (req, res) => {
  try {

    const { error } = signupValidation.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

    let { firstName, lastName, userName, email, password } = req.body;

    let existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(400).json({ message: "email already exist !" });
    }

    let existUsername = await User.findOne({ userName });

    if (existUsername) {
      return res.status(400).json({ message: "username already exist !" });
    }

    let hashPassword = await bcrypt.hash(password,10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password :hashPassword
    })
    let token = await genToken();
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENVIRONMENT === "production"
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
   return res.status(500).json({
     success: false,
     message: error.message,
   });
  }
};
