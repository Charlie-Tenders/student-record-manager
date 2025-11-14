import express from "express";
import { logMiddleware } from "../middleware/logger.js";
import * as restaurantController from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", logMiddleware, restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
