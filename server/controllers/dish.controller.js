const DishSchema = require("../models/dish.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.create = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      food_type,
      price,
      discount,
      is_signature,
    } = req.body;

    if (!req.image_url) {
      throw new ApiError("Dish image is required", 400, "ImageError");
    }

    const dish = await DishSchema.create({
      name: name,
      description: description,
      category: category,
      image: req.image_url,
      food_type: food_type,
      price: {
        original: price,
        discounted: discount,
      },
      is_signature: is_signature,
    });

    return res
      .status(201)
      .json(new ApiResponse(dish, "Dish created successfully", 201));
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const dishes = await DishSchema.find().sort({ createdAt: -1 }).lean();

    if (!dishes) {
      throw new ApiError([], 404, "DishesNotFound");
    }

    return res.status(200).json(new ApiResponse(dishes, "Dishes found", 200));
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { dish_id } = req.params;

    const response = await DishSchema.findById(dish_id)
      .sort({ createdAt: -1 })
      .lean();

    if (!response) {
      throw new ApiError(null, 404, "DishNotFound");
    }

    return res.status(200).json(new ApiResponse(response, "Dish found", 200));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const { dish_id } = req.params;

    const response = await DishSchema.findByIdAndRemove(dish_id);

    if (!response) {
      throw new ApiError([], 404, "DishNotFound");
    }

    return res.status(200).json(new ApiResponse(null, "Dish deleted", 200));
  } catch (err) {
    next(err);
  }
};
