import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again." });
      }
  
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: token_decode.id };  // ✅ attach user info safely
      next();
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

export default authUser;