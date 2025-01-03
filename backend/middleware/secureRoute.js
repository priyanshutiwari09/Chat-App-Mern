const jwt = require("jsonwebtoken");
const model = require("../model/userModel");
const User = model.User;


exports.secureRoute = async(req, res, next) => {
    try {

        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ message: "Unauthorized" })
        }
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
    
        if(!verified){
            return res.status(403).json({ message: "Invalid Token"} )
        }
        
        req.user = await User.findById(verified.userId).select("-password");
        // Attach to req.user for further use {middleware}
        if(!req.user){
            return res.status(404).json({ message: "User not Found" })
        }
 
        next()
    } catch (error) {
        console.log(error)
        res.status(501).json({ message: "Internal Server Error"})
    }
}