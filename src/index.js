// import { getAllUsers } from "./controllers/userController.js";
import { logMiddleware } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.js"
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount the user router at /users
app.use('/users', userRoutes)

// Optional: Add a welcome route
app.get('/', (req, res) => {
	res.json({ 
		message: "Welcome to the API",
		endpoints: {
			users: "/users"
		}
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
	console.log(`API Documentation:`)
	console.log(`  GET    /users      - Get all users`)
	console.log(`  GET    /users/:id  - Get user by ID`)
	console.log(`  POST   /users      - Create new user`)
	console.log(`  PUT    /users/:id  - Update user`)
	console.log(`  DELETE /users/:id  - Delete user`)
})

// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
//   { id: 4, name: "Dave" },
// ];

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

// app.get("/", logMiddleware, getAllUsers);

// app.post("/", (req, res) => {
//   console.log(req);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
