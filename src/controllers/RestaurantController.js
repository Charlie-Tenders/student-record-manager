import * as restaurantService from "../services/restaurantService.js";

export const getAllRestaurants = (req, res) => {
  const restaurants = restaurantService.getAllRestaurants();
  res.json(restaurants);
};

export const getRestaurantById = (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurantService.getRestaurantById(id);

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.json(restaurant);
};

export const createRestaurant = (req, res) => {
  try {
    const newRestaurant = restaurantService.createRestaurant(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateRestaurant = (req, res) => {
  const id = Number(req.params.id);
  const updated = restaurantService.updateRestaurant(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.json(updated);
};

export const deleteRestaurant = (req, res) => {
  const id = Number(req.params.id);
  const ok = restaurantService.deleteRestaurant(id);

  if (!ok) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.status(204).end();
};
