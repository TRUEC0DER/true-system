import React, {FC} from 'react';
import "./Toggle.scss"
import clsx from "clsx";

type ToggleProps = {
    type: 'disabled' | 'enabled'
}

const Toggle: FC<React.ComponentProps<'div'> & ToggleProps> = ({type, ...props}) => {
    const toggleClass = clsx({
        [`toggle-${type}`]: true
    })
    return (
        <div className={toggleClass} {...props}>
            <span className="circle"/>
        </div>
    );
};

export default Toggle;