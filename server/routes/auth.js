import express from "express";
const router = express.Router();

import { handleRegistration } from "../controllers/authControllers";

router.post("/register", handleRegistration);

router.get("/", (req, res) => {
  res.status(200).json({ message: "working Properly" });
});
export default router;
