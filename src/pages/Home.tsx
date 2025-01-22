import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchFoods } from "../store/foodSlice";
import FoodItem from "../components/FoodItem";
import { Food } from "../types";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Our Food Menu</h1>
      <div className="food-list">
        {items &&
          items.map((food: Food) => <FoodItem key={food.id} food={food} />)}
      </div>
    </div>
  );
};

export default Home;
