//admin controller
import jwt from "jsonwebtoken";
import { Admins } from "../models/admin.js";
import { comparePasswords, generateToken } from "../utils/helpers.js";
import { JWT_SECRET, QUALIFICATION_SCORE } from "../constants/index.js";
import { Users } from "../models/user.js";
import {eventover} from "../models/eventover.js";

export async function registerAdmin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or password not found in body");
    }
    const newAdmin = await Admins.create({ email, passwordhash: password });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Admin Registration failed due to internal server error : ${error.message}`,
    });
  }
}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or password not found in body");
    }
    const admin = await Admins.findOne({ email });
    console.log("ADMIN FOUND", admin);
    const correctPassword = await comparePasswords(
      password,
      admin?.passwordhash
    );

    if (!admin || !correctPassword || !admin.approved) {
      throw new Error("Invalid password or admin not found");
    }

    const token = generateToken({ userId: admin._id });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Admin login failed due to internal server error : ${error.message}`,
    });
  }
}

export async function profile(req, res, next) {
  try {
    return res.status(200).json({ admin: req?.user });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}

export async function usersDetails(req, res, next) {
  try {
    const users = await Users.find({}, { passwordhash: 0 });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}
export async function userDetails(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await Users.findById(userId, { passwordhash: 0 });
    const totalScore = user.roundsCompleted.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);
    const qualified = totalScore >= QUALIFICATION_SCORE || user?.qualified;
    return res.status(200).json({ user, qualified, QUALIFICATION_SCORE });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}
export async function updateuserDetails(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await Users.findByIdAndUpdate(userId, req.body, { new: true });
    const totalScore = user.roundsCompleted.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);
    const qualified = totalScore >= QUALIFICATION_SCORE || user?.qualified;
    return res.status(200).json({ user, qualified, QUALIFICATION_SCORE });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}

export async function authMiddleWare(req, res, next) {
  const token = req.headers?.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      const user = await Admins.findById(decoded?.userId, { passwordhash: 0 });
      if (user) {
        req.user = user;
        next();
        return;
      }
    }
    throw new Error();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}


// export async function toggleEventEnd(req, res, next) {
//   try {
//     const over = await eventover.findOne();
//     if(over){
//       over.endtime = !over.endtime
//       await over.save();
//     }
//   await eventover.create({endtime:true})
    

//     return res.ok();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized - Invalid token" });
//   }
// }

// export async function getEventEnd(req, res, next) {
//   try {
//     let over = await eventover.findOne();
//     if(over){
//       await over.save();
//     }
//     else{
//       await eventover.create();
//       over = await eventover.findOne();
//     }
//   await eventover.create({ended:over.endtime})
    

//     return res.ok();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized - Invalid token" });
//   }
// }