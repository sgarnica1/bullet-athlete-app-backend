const authUtil = require("../utils/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const { isRef } = require("joi");

const authMiddleware = {
  // VALIDATE ACTIVE TOKEN
  validateTokenActive: (req, res, next) => {
    let token;
    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      return res
        .status(401)
        .json({ error: "No token provided! Please login to system." });
    }

    try {
      const verified = authUtil.verifyToken(token);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ADMIN ROLE
  isAdmin: async (req, res, next) => {
    try {
      if (!req.body.idAdmin) {
        // Check if isUser is included in the request body
        throw new Error("Missing idAdmin on request body.");
      }
      const user = await User.findById(req.body.idAdmin); // User
      const roles = await Role.find({ _id: { $in: user.roles } }); // Find all user roles
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          // Verify if user has admin role
          return next();
        }
      }
      res.status(400).json({ error: "Require Admin Role" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authMiddleware;
