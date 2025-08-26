const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const sequelize = require("./sequelize");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const initializeModels = require("./models/index");
const { Op } = require("sequelize");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://javascriptures-1.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_JWT_SECRET
    : process.env.DEV_JWT_SECRET;

// Set and save a list of blacklisted tokens
const tokenBlacklist = new Set();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token provided, authorization denied." });
  }

  if (tokenBlacklist.has(token)) {
    return res
      .status(401)
      .json({ error: "Token blacklisted, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const models = initializeModels(sequelize);
const { User, Bestiary, Quests, Vocations, Levels, Categories, Completed } =
  models;

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// Check for token, not needed for now
// app.use("/main/:route*", verifyToken);

// Get all quests
app.get("/quests", verifyToken, async (req, res) => {
  try {
    const quests = await Quests.findAll({
      include: ["category"],
      attributes: { exclude: ["category_id", "correct_answer"] },
    });
    res.json(quests);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Get HTML/CSS/JS quests
app.get("/quests/:category_name", verifyToken, async (req, res) => {
  try {
    const { category_name } = req.params;
    // const difficulty = req.params.difficulty;

    const category = await Categories.findOne({
      where: {
        category_name: category_name.toLowerCase(),
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const quests = await Quests.findAll({
      where: {
        category_id: category.category_id,
      },
      include: ["category"],
      attributes: { exclude: ["category_id"] },
    });
    res.json(quests);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Get all monsters
app.get("/monsters", async (req, res) => {
  try {
    const monsters = await Bestiary.findAll();
    res.json(monsters);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Get specific monster
app.get("/monster/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const monster = await Bestiary.findOne({ where: { enemy_id: id } });
    res.json(monster);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Get monsters specific to difficulty
app.get("/monsters/:category_name", verifyToken, async (req, res) => {
  try {
    // const difficulty = req.params.difficulty;

    const { category_name } = req.params;

    const category = await Categories.findOne({
      where: {
        category_name: category_name.toLowerCase(),
      },
    });

    const monsters = await Bestiary.findAll({
      where: {
        category_id: category.category_id,
      },
      order: [["exp_drop", "ASC"]],
    });
    res.json(monsters);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Get all users
// app.get("/users", async (req, res) => {
//   try {
//     const user = await User.findAll();
//     res.json(user);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// Create check to see if the user is still logged in or the token is still valid
app.get("/check", verifyToken, async (req, res) => {
  try {
    res.json({
      message: "You are still logged in.",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Create a "ping" route
app.get("/ping", async (req, res) => {
  res.status(200).json({
    message: "pong",
  });
});

// Get stats of currently logged in user
app.get("/stats", verifyToken, async (req, res) => {
  console.log("Cookies get", req.cookies);

  try {
    const user = await User.findOne({
      where: { user_id: req.user.user_id },
      include: [
        { model: Levels, as: "level" },
        { model: Vocations, as: "vocation" },
      ],
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      exp: user.exp,
      level: user.level.level,
      vocation: user.vocation.vocation_name,
      vocation_img: user.vocation.vocation_img,
      vocation_portrait: user.vocation.vocation_portrait,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "invalid token" });
  }
});

// Get single user by token
app.get("/user/", verifyToken, async (req, res) => {
  try {
    const userID = req.user.user_id;
    const user = await User.findOne({ where: { user_id: userID } });
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

// Get vocations
app.get("/vocations", async (req, res) => {
  try {
    const vocations = await Vocations.findAll();
    res.json(vocations);
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

    if (await User.findOne({ where: { email: email } })) {
      return res.status(400).json({
        error: "This email has been taken!",
      });
    }

    if (await User.findOne({ where: { username: username } })) {
      return res.status(400).json({
        error: "This username has taken!",
      });
    }

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
      expiresIn: "60m",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      // partitioned: true,
    });
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// blacklist current token and log out user
app.post("/logout", verifyToken, async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    tokenBlacklist.add(token);
  }
  res.clearCookie("token");
  res.json({ message: "logging out" });
});

// Update user details
app.patch("/user/update/", verifyToken, async (req, res) => {
  try {
    const userID = req.user.user_id;
    const { username, email } = req.body;
    const user = await User.findOne({ where: { user_id: userID } });
    if (user === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.set({ username: username, email: email, exp: exp });
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

// Update user vocation for first time login
app.patch("/user/update/vocation", verifyToken, async (req, res) => {
  try {
    const userID = req.user.user_id;
    const { chosenVocation, vocation_id } = req.body;
    const user = await User.findOne({ where: { user_id: userID } });

    if (user === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (chosenVocation !== 0 && chosenVocation !== 1) {
      return res.status(400).json({
        error: "Invalid value for chosenVocation",
      });
    }

    user.set({ chosenVocation: chosenVocation, vocation_id: vocation_id });
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Update user exp points, check for level up
app.patch("/user/questComplete/", verifyToken, async (req, res) => {
  try {
    //the token
    const userID = req.user.user_id;
    const { category_name, exp } = req.body;

    // get category id
    const category = await Categories.findOne({
      where: { category_name: category_name.trim().toLowerCase() },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const category_id = category.category_id;

    // get user
    const user = await User.findOne({
      where: { user_id: userID },
      include: ["level", "vocation"],
    });
    // if not found return 404 status
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // check if user has completed the same quest before
    const completedQuest = await Completed.findOne({
      where: {
        user_id: userID,
        category_id: category_id,
      },
    });

    let finalExp = exp;

    if (completedQuest) {
      completedQuest.times_completed += 1;
      completedQuest.completed_at = new Date();
      await completedQuest.save();

      finalExp = Math.floor(exp / 3); // divide by 3
    } else {
      await Completed.create({
        user_id: userID,
        category_id: category_id,
        completed: 1,
        times_completed: 1,
        completed_at: new Date(),
      });
    }

    user.exp += finalExp;

    const newLevel = await Levels.findOne({
      where: {
        exp_required: { [Op.lte]: user.exp },
        // vocation_id: { [Op.lte]: user.vocation_id },
      },
      order: [["exp_required", "DESC"]],
    });

    if (newLevel && newLevel.level_id !== user.level_id) {
      user.level_id = newLevel.level_id;
    }

    await user.save();

    return res.json({
      message: `User gained ${exp} EXP`,
      // updatedUser: user,
      timesCompleted: completedQuest ? completedQuest.times_completed : 1,
      username: user.username,
      totaltExp: user.exp,
      gainedExp: finalExp,
      level: user.level.level,
      vocation: user.vocation.vocation_name,
      portrait: user.vocation.vocation_portrait,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Delete user
app.delete("/delete", verifyToken, async (req, res) => {
  const token = req.cookies.token;
  try {
    if (token) {
      tokenBlacklist.add(token);
    }
    const userId = req.user.user_id;
    const user = await User.findOne({ where: { user_id: userId } });
    if (user === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    await Completed.destroy({ where: { user_id: userId } });
    await User.destroy({ where: { user_id: userId } });
    res.clearCookie("token");
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
