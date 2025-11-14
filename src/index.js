import express from "express";
import { logMiddleware } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.js";
import { initializeDatabase } from "./config/database.js"; // Import initializer

const app = express();
const PORT = 3000;

// Initialize database before starting server
initializeDatabase();

// Global middleware
app.use(express.json());

// Mount the user router
app.use("/users", userRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    endpoints: {
      users: "/users",
    },
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📊 Database ready`);
  console.log(`API Endpoints:`);
  console.log(`  GET    /users      - Get all users`);
  console.log(`  GET    /users/:id  - Get user by ID`);
  console.log(`  POST   /users      - Create new user`);
  console.log(`  PUT    /users/:id  - Update user`);
  console.log(`  DELETE /users/:id  - Delete user`);
});
