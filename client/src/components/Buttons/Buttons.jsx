
import "./Button.css";

function Button({
    children,
    variant = "primary",
    type = "button",
    onClick,
    disabled = false,
    className = ""
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`common-btn common-btn-${variant} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
