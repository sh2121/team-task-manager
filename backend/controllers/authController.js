const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Member"
    });

    res.json({ msg: "User created successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= GET USERS (NEW) =================
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching users" });
  }
};

module.exports = {
  signup,
  login,
  getUsers
};