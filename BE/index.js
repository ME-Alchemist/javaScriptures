const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const mysql = require("mysql2");
const sequelize = require("./sequelize");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/user.model");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token provided, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

const User = UserModel(sequelize, require("sequelize").DataTypes);

sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// const arrOfItems = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
//   { id: 3, name: "Item 3" },
// ];

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// Get all users
app.get("/", async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/stats", verifyToken, async (req, res) => {
  // const token = req.cookies.token;
  console.log("Cookies get", req.cookies);
  // if (!token) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }
  try {
    // const decode = jwt.verify(token, JWT_SECRET);
    // console.log(decode);
    const user = await User.findOne({ where: { user_id: req.user.user_id } });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // For testing refresh of token
    // const newToken = jwt.sign({ user_id: user.user_id }, JWT_SECRET, {
    //   expiresIn: "2m",
    // });

    // res.cookie("token", newToken, {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: false,
    // });

    res.status(200).json({
      username: user.username,
      experience: user.exp,
      level: user.lvl,
      vocation: user.vocation,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "invalid token" });
  }
});

// Get single user by id
app.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { user_id: userId } });
    if (user === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Create new user
app.post("/sign-up", async (req, res) => {
  try {
    const { username, email, passHash } = req.body;
    const salt = await bcryptjs.genSaltSync(10);
    const hashed = await bcryptjs.hashSync(passHash, salt);

    const user = await User.create({
      username: username,
      email: email,
      passHash: hashed,
    });
    res.status(201).json({ user: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { email, passHash } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const isMatch = await bcryptjs.compare(passHash, user.passHash);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }
    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, {
      expiresIn: "2m",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Update user details
app.patch("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const user = await User.findOne({ where: { user_id: userId } });
    if (user === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.set({ username: username, email: email });
    await user.save();

    // user.username = username;
    // user.email = email;
    // user.passHash = passHash;
    // await user.save();

    // await User.update(
    //   { username: username, email: email, passHash: passHash },
    //   { where: { user_id: userId } }
    // );
    res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Delete user
app.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { user_id: userId } });
    if (user === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    await User.destroy({ where: { user_id: userId } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
