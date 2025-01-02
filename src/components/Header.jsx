import { useContext, useRef } from 'react';
import logoImage from '../assets/logo.jpg'
import { Button } from './Button'
import Modal from './Modal'
import { CartContext } from '../store/CartContext';
import Cart from './Cart';
import UserProgressContext from '../store/ProgressTrackerContext';

export default function Header() {
    const modalRef = useRef();
    const cartCtx = useContext(CartContext);
    let totalSelectedItems = 0;
    const userCtx = useContext(UserProgressContext);
    totalSelectedItems = cartCtx.items.reduce((totalItems, item) => { return totalItems + item.quantity }, 0);

    function handleOpenCart() {
        modalRef.current.open();
        userCtx.showCart();
    }

    function handleCloseCart() {
        modalRef.current.close();
        userCtx.hideCart();
    }
    function handleCheckout(){        
        userCtx.showCheckout();
    }
    return (<>
        <header id="main-header">
            <div id="title">
                <img src={logoImage}></img>
                <h1>Food Order Application</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleOpenCart}>Cart ( {totalSelectedItems} )</Button>
            </nav>
        </header>

        <Modal ref={modalRef} className='cart' open={userCtx.progress=='cart'}>
            <Cart cart={cartCtx.items} />
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button textOnly onClick={handleCheckout}>Checkout</Button>}
            </p>
        </Modal>
    </>
    )
}