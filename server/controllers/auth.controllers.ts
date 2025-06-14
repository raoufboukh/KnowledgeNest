import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/auth.models.ts";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

export default function configurePassport(passport: passport.PassportStatic) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user || !user.password)
            return done(null, false, { message: "Invalid credentials" });
          const isMatch = await bcrypt.compare(password, user.password);
          isMatch
            ? done(null, user)
            : done(null, false, { message: "Wrong Password" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              email: profile.emails?.[0]?.value,
              name: profile.displayName,
              image: profile.photos?.[0]?.value,
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error, undefined);
        }
      }
    )
  );
  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  });
}

export const success = (req: any, res: any) => {
  if (req.user) {
    res.status(200).json({ message: "Login successful", user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const failed = (req: any, res: any) => {
  res.status(401).json({ message: "Google login failed" });
};

export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        message: !name
          ? "Name is required"
          : !email
          ? "Email is required"
          : "Password is required",
      });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req: any, res: any) => {
  req.logout((err: any) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logout successful" });
  });
};

export const checkAuth = (req: any, res: any) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
