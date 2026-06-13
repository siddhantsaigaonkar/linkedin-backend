
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/token.js";
import { signupValidation,signInValidation } from "../validations/auth.validation.js";




// signUp controller

export const signUp = async (req, res) => {
  try {
    const { error } = signupValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { firstName, lastName, userName, email, password, confirmPassword } =
      req.body;

    // Password Match Check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Email Check
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Username Check
    const existUsername = await User.findOne({ userName });

    if (existUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashPassword,
    });

    // Generate Token
    const token = await genToken(user._id);

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,

      // secure: process.env.NODE_ENVIRONMENT === "production",
    });

    console.log("Token:", token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signIn controller

export const signIn = async (req, res) => {
  try {

    const { error } = signInValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message:"user dose not exist !"})
    }
    
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
     return res.status(400).json({success:false,message:"incorrect password"})
    }
    
    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENVIRONMENT === "production",
    });

        return res.status(200).json({
          success: true,
          message: "Login successful",
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
}


// signOut controller 

export const signOut = async (req, res) => {
  try {
    res.clearCookies("token");
    return res.status(200).json({
      message:"sign out sucessfully"
    })
  } catch (error) {
    
  }
}


// cheack auth

export const checkAuth = (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    success: true,
    cookies: req.cookies,
  });
};



