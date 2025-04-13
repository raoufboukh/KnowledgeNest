import express from "express";
import passport from "passport";
import {
  failed,
  logout,
  register,
  success,
} from "../controllers/auth.controllers.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Login successful", user: req.user });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    successRedirect: "/auth/success",
  })
);
router.get("/success", success);
router.get("/failed", failed);
router.get("/logout", logout);

export default router;
