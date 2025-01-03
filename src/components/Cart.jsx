import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatter";

export default function Cart({ cart }) {
    let totalSelectedItemsCost = cart.reduce((total, cartItem) => total + (Number(cartItem.price) * cartItem.quantity), 0);
    return (
        <>
            <h1>Your Cart</h1>
            <ul>
                {
                    cart.map(cartItem => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                }
            </ul>
            <p className='cart-total'>{currencyFormatter.format(totalSelectedItemsCost)}</p>
        </>
    )
}

function CartItem({ cartItem }) {
    const { addItem, removeItem } = useContext(CartContext)
    function handleAddItem() {
        addItem(cartItem);
    }
    function handleRemoveItem() {
        removeItem(cartItem.id);
    }

    return (
        <li key={cartItem.id}>
            <div className="cart-item">
                <p>{cartItem.name} - {currencyFormatter.format(cartItem.price)} {cartItem.quantity > 1 && 'X ' + cartItem.quantity} </p>
                <p className="cart-item-actions">
                    <button onClick={handleAddItem}>+</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={handleRemoveItem}>-</button>
                </p>
            </div>
        </li>
    )
}