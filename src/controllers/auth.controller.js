import { User } from "../models/user.model.js"

const generateAuthToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const token = await user.generateToken();
        return token
    } catch (error) {
        console.log("Error while generating token : ",error)
    }
}

export const register = async(req,res)=>{
    try {
        const {name,password,email} = req.body;
        if(!email || !password || !name){
            return res.json({status : 404 , message : "Email, password and name are required"});
        }
        const existedUser = await User.findOne({email});
        if(existedUser){
            return res.json({status : 409,existedUser,message:"User already exists"})
        }
        const user = await User.create({
            email,
            password,
            name
        })
        const token = await generateAuthToken(user._id)
        if(!token){
            return res.json({status : 400 , message : "Token not recieved"})
        }
        return res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",          
            sameSite: "strict"
        })
                  .json({status : 201,user,message : "User registered successfully"})
    } catch (error) {
        console.log("Error : ",error);
        return res.json({status : 400,message : error.message})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({status : 404 , message : "Email and password are required"});
        }
        const user = await User.findOne({email})
        if(!user){
            return res.json({status : 404,message : "User does not exist"})
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.json({status : 400,message : "Invalid  user credentials"})
        }
        const token = await generateAuthToken(user._id);
        if(!token){
            return res.json({status : 409,message : "Token not recieved"});
        }
        return res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",          
            sameSite: "strict"
        })
        .status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const logout = async (req, res) => {
    try {
        // Clear cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,          
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};

export const getUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user,
            message: "User fetched successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};
