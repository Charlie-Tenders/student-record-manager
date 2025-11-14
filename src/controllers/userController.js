import * as userService from "../services/userService.js";

// Get all users
export const getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
export const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new user
export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = userService.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    // Handle duplicate email error
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = userService.updateUser(id, { name, email });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = userService.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
