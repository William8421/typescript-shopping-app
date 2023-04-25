import jwt from "jsonwebtoken";


const generateToken = (payload: any) => {
    
  return jwt.sign(payload, process.env.SECRET!, { expiresIn: "21600s" });
};

export default generateToken;