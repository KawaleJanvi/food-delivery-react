import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const Modal = forwardRef(({ children, className, ...props }, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.show();
            },
            close: () => {
                dialog.current.close();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} {...props} className={`modal ${className}`}>
           {children}
        </dialog>,
        document.getElementById('modal')
    )

});
export default Modal;