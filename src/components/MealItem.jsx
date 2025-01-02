import { useContext } from "react";
import { currencyFormatter } from "../utils/formatter";
import { Button } from "./Button";
import { CartContext } from "../store/CartContext";

export function MealItem({ meal }) {
    let { addItem } = useContext(CartContext)

    function handleAddMeal() {
        addItem(meal)
    }
    return (
        <li className="meal-item">
            <article>
                <img alt={meal.name} src={`http://localhost:3000/${meal.image}`} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMeal}>Add to Cart</Button>
                </p>
            </article>
        </li >
    )
}