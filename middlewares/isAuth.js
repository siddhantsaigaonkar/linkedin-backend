import jwt from "jsonwebtoken";

const isAuth = async (req,res,next) => {
  try {
        console.log("Cookies =>", req.cookies);

    let { token } = req.cookies
    console.log("Token =>", token);
    console.log("Type =>", typeof token);

    if (!token) {
      return res.status(400).json({message:"user dont have token"})
    }
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(400).json({ message: "user dont have valid token" });
    }

    req.userId = verifyToken.userId
 
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default isAuth;