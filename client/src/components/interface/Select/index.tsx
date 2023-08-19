import React, {FC} from 'react';
import "./Select.scss"

type SelectProps = {
    placeholder: string
    options: {
        value: string
        title: string
    }[]
}

const Select: FC<React.ComponentProps<'select'> & SelectProps> = ({children, options, placeholder, ...props}) => {
    return (
        <select defaultValue="default" className="select" {...props}>
            <option value="default" disabled>{placeholder}</option>
            {options.map(item => {
                return (
                    <option value={item.value} key={item.value}>{item.title}</option>
                )
            })}
        </select>
    );
};

export default Select;