import jwt from "jsonwebtoken";


const generateToken = (payload: any) => {
    
  return jwt.sign(payload, process.env.SECRET!, { expiresIn: "3600s" });
};

export default generateToken;