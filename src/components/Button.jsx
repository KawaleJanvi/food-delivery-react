export function Button({ children, classes, textOnly, ...props }) {
    let className = (textOnly ? 'text-button ' : 'button ') + classes

    return (
        <button className={className} {...props}>{children}</button>
    )
}