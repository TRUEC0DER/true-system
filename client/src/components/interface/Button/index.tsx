import React, {FC} from 'react';
import "./Button.scss"
import clsx from "clsx";

type ButtonProps = {
    color: 'primary' | 'secondary' | 'clear'
}

const Button: FC<React.ComponentProps<'button'> & ButtonProps> = ({children, color, ...props}) => {
    const buttonClass = clsx({
        [`btn-${color}`]: true
    })
    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
};

export default Button;