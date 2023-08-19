import React, {FC} from 'react';
import "./Input.scss"
import clsx from "clsx";

type InputProps = {
    color: 'primary' | 'secondary' | 'clear'
}

const Input: FC<React.ComponentProps<'input'> & InputProps> = ({children, color, ...props}) => {
    const inputClass = clsx({
        [`input-${color}`]: true
    })
    return (
        <input className={inputClass} {...props}/>
    );
};

export default Input;