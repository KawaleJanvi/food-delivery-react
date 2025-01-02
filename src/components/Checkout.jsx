import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatter";
import Modal from "./Modal";
import UserProgressContext from "../store/ProgressTrackerContext";
import Input from './Input.jsx';
import { Button } from './Button.jsx';
import { useActionState } from "react";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    let totalAmount = cartCtx.items.reduce((total, currentItem) => total + currentItem, 0);
    const progressCtx = useContext(UserProgressContext);
    let modalRef = useRef();

    useEffect(() => {
        if (progressCtx.progress == 'checkout' && modalRef?.current) {
            modalRef.current.open();
        }
    }, [progressCtx.progress])

    const [ message, formAction, isPending] = useActionState(submitForm, null);

    function handleCancel() {
        modalRef.current.close();
        progressCtx.hideCheckout();
    }

    function submitForm(prevState, formData) { 
         
    }

    return (
        <Modal ref={modalRef}>
            <form action={formAction}>
                <h2>Checkout:</h2>
                <p>Total Amount to be paid. -  {currencyFormatter.format(totalAmount)}</p>

                <Input id='name' label='Full Name' />
                <Input id='name' label='Email Address' />
                <Input id='name' label='Street' />
                <div className="control-row">
                    <Input id='name' label='Postal code' />
                    <Input id='name' label='City' />
                </div>
                <p className="modal-actions">
                    <Button textOnly type='button' onClick={handleCancel}>Cancel</Button>
                    <Button type='submit' disabled={isPending}>{isPending ? 'Submitting:' : 'Submit'}</Button>
                </p>
            </form>
        </Modal>
    )
}