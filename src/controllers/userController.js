// This is your data (normally would come from a service/database)
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dave" },
];

// Controller function - extracted from the route
export const getAllUsers = (req, res) => {
  res.json(users);
};
