import jwt from "jsonwebtoken"

export const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if(!token){
            return res.status(401)
                      .json({message : "Unauthorized request"})
        }
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}