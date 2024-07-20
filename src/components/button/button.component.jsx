import './button.styles.scss';

const BUTTON_STYLE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonStyle, ...additionalProps }) => (
    <button
        className={`button-container ${BUTTON_STYLE_CLASSES[buttonStyle]}`}
        {...additionalProps}
    >
        {children}
    </button>
)

export default Button;