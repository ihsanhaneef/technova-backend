//router admin
import express from "express";

import {
  authMiddleWare,
  // getEventEnd,
  loginAdmin,
  profile,
  registerAdmin,
  // toggleEventEnd,
  updateuserDetails,
  userDetails,
  usersDetails,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/registeradmin", registerAdmin);
router.post("/loginadmin", loginAdmin);
router.get("/profile", authMiddleWare, profile);
router.get("/users", authMiddleWare, usersDetails);



router.get("/user/:userId", authMiddleWare, userDetails);
router.post("/user/:userId", authMiddleWare, updateuserDetails);

export const adminRouter = router;

export default router;
