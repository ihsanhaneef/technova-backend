import express from "express";

import {
  getEventEnd,
  toggleEventEnd,
  
} from "../controllers/eventover.js";

const router = express.Router();
router.get("/toggleeventOver", toggleEventEnd);
router.get("/iseventOver",  getEventEnd);
export const eventoverRouter = router;

export default router;
