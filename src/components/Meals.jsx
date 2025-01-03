import React from "react"

import { useFetchMeals } from "../Hooks/fetch"
import { MealItem } from "./MealItem";

export default function Meals() {
  const {meals, error} = useFetchMeals() || []; // Fallback to an empty array if undefined or null
  console.log(meals)

  if(error){
    return <div>
        <p>{error.message}</p>
    </div>
}

  return (
    <ul id="meals">
      {meals.length ? meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      )) : <p>No record Found !</p>}
    </ul>
  )
}