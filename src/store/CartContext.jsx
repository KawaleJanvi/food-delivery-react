import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
});

function addItem(cartList, item) {
    if (cartList.length) {
        let itemIndex = cartList.findIndex(cartItem => cartItem.id == item.id);
        if (itemIndex > -1) {
            cartList[itemIndex].quantity += 1;
        }
        else{
            cartList.push({ ...item, quantity: 1 });
        }
    } else {
        cartList.push({ ...item, quantity: 1 });
    }
    return [...cartList];
}

function removeItem(cartList, id) {
    let itemIndex = cartList.findIndex(cartItem => cartItem.id == id);
    if (itemIndex > -1) {
        if (cartList[itemIndex].quantity == 1) {
            cartList.splice(itemIndex, 1);
        }
        else {
            cartList[itemIndex].quantity -= 1;
        }
    }
    return [...cartList];
}

function reduceCart(state, action) {
   // let updatedCart = state;
    switch (action.type) {
        case 'ADD_ITEM': state.items = addItem(state.items, action.item);
            break;
        case 'REMOVE_ITEM': state.items = removeItem(state.items, action.id);
            break;
    }
    return {...state};
}

export function CartContextProvider({ children }) {
    const [ cartState, dispatchCartAction] = useReducer(reduceCart, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item })
    }
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id })
    }
    const cartContext = {
        items: cartState.items,
        addItem,
        removeItem
    };
    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}