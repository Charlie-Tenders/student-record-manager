import User from "../models/User.js";

// Get all users
export const getAllUsers = () => {
  return User.findAll();
};

// Get user by ID
export const getUserById = (id) => {
  return User.findById(id);
};

// Create new user
export const createUser = (userData) => {
  const { name, email } = userData;

  // Business logic: Check if email already exists
  if (email && User.emailExists(email)) {
    throw new Error("Email already exists");
  }

  // Additional business logic could go here
  // e.g., send welcome email, log user creation, etc.

  return User.create({ name, email });
};

// Update user
export const updateUser = (id, userData) => {
  const { name, email } = userData;

  // Check if user exists
  const existingUser = User.findById(id);
  if (!existingUser) {
    return null;
  }

  // Business logic: Check if new email conflicts
  if (email && email !== existingUser.email && User.emailExists(email, id)) {
    throw new Error("Email already exists");
  }

  return User.update(id, { name, email });
};

// Delete user
export const deleteUser = (id) => {
  return User.delete(id);
};

// Additional service methods with business logic
export const getUserByEmail = (email) => {
  return User.findByEmail(email);
};

export const getUserCount = () => {
  return User.count();
};
