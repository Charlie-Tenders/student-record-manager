import { logMiddleware } from "./middleware/logger.js";
import { getAllUsers } from "./controllers/userController.js"
import express from "express";

const app = express();
const PORT = 3000;

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dave" },
];

app.use(express.json());

// middleware to log request body
// app.use(async (req, res, next) => {
//   const date = new Date().toISOString();
//   console.log(`[${date}] ${req.method} ${req.url}`);

//   const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
//   const data = await response.json();
//   req.data = data;
//   console.log(data);

//   next();
// });

// app.get("/", logMiddleware, (req, res) => {
//   res.json({ users });
// });

app.get("/", logMiddleware, getAllUsers)

app.post("/", (req, res) => {
  console.log(req);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
