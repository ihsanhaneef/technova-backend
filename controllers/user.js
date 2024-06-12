import { JWT_SECRET, QUALIFICATION_SCORE } from "../constants/index.js";
import { Users } from "../models/user.js";
import { comparePasswords, generateToken } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or password not found in body");
    }
    const userExists = await Users.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    await Users.create({ email, passwordhash: password });
   console.log("HERE?")
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Registration failed due to : ${
        error?.message ?? error.response
      }`,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or password not found in body");
    }
    const user = await Users.findOne({ email });
    const correctPassword = await comparePasswords(
      password,
      user?.passwordhash
    );

    if (!user || !correctPassword) {
      throw new Error("Invalid password or user not found");
    }

    const token = generateToken({ userId: user._id });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Login failed due to : ${error?.message ?? error.response}`,
    });
  }
}

export async function profile(req, res, next) {
  try {
    const totalScore = req?.user.roundsCompleted.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);
    const qualified = totalScore >= QUALIFICATION_SCORE || !!req?.user?.qualified;
    return res.status(200).json({ user: req?.user,qualified });
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
      const user = await Users.findById(decoded?.userId, { passwordhash: 0 });
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
//push test
