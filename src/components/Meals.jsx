import React from "react"

import { useFetchMeals } from "../Hooks/fetch"
import { MealItem } from "./MealItem";

export default function Meals() {
  const meals = useFetchMeals() || []; // Fallback to an empty array if undefined or null
  console.log(meals)
  return (
    <ul id="meals">
      {meals.length ? meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      )) : <p>No record Found !</p>}
    </ul>
  )
}