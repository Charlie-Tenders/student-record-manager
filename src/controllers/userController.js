// Import the service
import * as userService from "../services/userService.js";

// Get all users
export const getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers(); // Call service
    res.status(200).json(users); // HTTP response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
export const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getUserById(id); // Call service

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
    const { name } = req.body;

    // Basic validation (could be moved to middleware)
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = userService.createUser({ name }); // Call service
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = userService.updateUser(id, userData); // Call service

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = userService.deleteUser(id); // Call service

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // This is your data (normally would come from a service/database)
// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
//   { id: 4, name: "Dave" },
// ];

// // Controller function - extracted from the route
// export const getAllUsers = (req, res) => {
//   res.json(users);
// };
