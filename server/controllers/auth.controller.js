import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res
      .status(200)
      .json({ user, message: "User created successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {}
  res.json({ message: "Login route" });
};

export const logout = async (req, res) => {
  res.json({ message: "Forgot password route" });
};
