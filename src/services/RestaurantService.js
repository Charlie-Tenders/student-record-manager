import Restaurant from "../models/Restaurant.js";

export const getAllRestaurants = () => {
  return Restaurant.findAll();
};

export const getRestaurantById = (id) => {
  return Restaurant.findById(id);
};

export const createRestaurant = (data) => {
  if (!data.name) {
    throw new Error("Name is required");
  }
  return Restaurant.create(data);
};

export const updateRestaurant = (id, data) => {
  const existing = Restaurant.findById(id);
  if (!existing) return null;
  return Restaurant.update(id, data);
};

export const deleteRestaurant = (id) => {
  return Restaurant.delete(id);
};
