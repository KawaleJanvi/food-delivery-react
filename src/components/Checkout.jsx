import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatter";
import Modal from "./Modal";
import UserProgressContext from "../store/ProgressTrackerContext";
import Input from './Input.jsx';
import { Button } from './Button.jsx';
import { usePostOrders } from "../Hooks/fetch.js";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    let totalAmount = cartCtx.items.reduce((total, currentItem) => total + currentItem.price, 0);
    const progressCtx = useContext(UserProgressContext);
    let modalRef = useRef();

    useEffect(() => {
        if (progressCtx.progress == 'checkout' && modalRef?.current) {
            modalRef.current.open();
        }
    }, [progressCtx.progress])


    function handleCancel() {
        modalRef.current.close();
        progressCtx.hideCheckout();
        clearData();
    }
    const { post, data, error, loading, clearData } = usePostOrders();

    function submitForm(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let allEntries = Object.fromEntries(formData.entries());
        post({
            order: {
                items: cartCtx.items,
                customer: allEntries
            }
        });
        // progressCtx.hideCheckout();
    }

    if (error) {
        return <div>
            <p>{error.message}</p>
        </div>
    }
    if (!error && data) {
        return <Modal open={progressCtx.progress == 'checkout'} ref={modalRef} close={handleCancel}>
            <h2>Your Order was submitted</h2>
            <p>we will get back to you with mored details via email within next few minutes.</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCancel}>Close</Button>
            </p>
        </Modal>
    }
    return (
        <Modal open={progressCtx.progress == 'checkout'}>
            <form onSubmit={submitForm}>
                <h2>Checkout:</h2>
                <p>Total Amount to be paid. -  {currencyFormatter.format(totalAmount)}</p>

                <Input id='name' label='Full Name' />
                <Input id='email' label='Email Address' />
                <Input id='street' label='Street' />
                <div className="control-row">
                    <Input id='postal-code' label='Postal code' />
                    <Input id='city' label='City' />
                </div>
                <p className="modal-actions">
                    {loading ? ' Submitting ....' : <><Button textOnly type='button' onClick={handleCancel}>Cancel</Button>
                        <Button type='submit'>Submit</Button></>}
                </p>
            </form>
        </Modal>
    )
}