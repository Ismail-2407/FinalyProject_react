import React from "react";
import { Food } from "../types";

interface Props {
  food: Food;
}

const FoodItem: React.FC<Props> = ({ food }) => {
  return (
    <div className="food-item">
      <img src={food.image} alt={food.name} />
      <h3>{food.name}</h3>
      <p>{food.description}</p>
      <span>${food.price}</span>
      <button>Order Now</button>
    </div>
  );
};

export default FoodItem;
