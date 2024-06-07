//router admin
import express from "express";
import { authMiddleWare, login, profile, register } from "../controllers/user.js";
import { usersDetails } from "../controllers/admin.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile",authMiddleWare, profile);
router.get("/AllUser", authMiddleWare, usersDetails);

export const userRoute = router;

export default router;
