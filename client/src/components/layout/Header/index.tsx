import React, {useState} from 'react';
import Button from "../../interface/Button";
import "./Header.scss"
import {Link} from "react-router-dom";
import clsx from "clsx";
import {ThemeContext} from '@/contexts/ThemeContext';
import Toggle from "@/components/interface/Toggle";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const headerClass = clsx({
        "header-open": isOpen
    })
    return (
        <header className={headerClass}>
            <div className="items">
                <Link className="logo" to="/">
                    <ThemeContext.Consumer>
                        {({theme}) => (
                            <img src={theme === "dark" ? "/assets/icons/moon.icon.svg" : "/assets/icons/sun.icon.svg"}/>
                        )}
                    </ThemeContext.Consumer>
                    TRUESystem
                </Link>
                <div className="links">
                    <Link to="/">Home</Link>
                    <ThemeContext.Consumer>
                        {({theme, changeTheme}) => (
                            <Toggle type={theme === "dark" ? "enabled" : "disabled"} onClick={changeTheme}/>
                        )}
                    </ThemeContext.Consumer>
                    <div className="buttons">
                        <Link to="/purchase" className="a-primary a-button">
                            Buy a pass
                        </Link>
                    </div>
                </div>
                <div className="header-icon">
                    <Button color="clear" onClick={() => setIsOpen(!isOpen)}>
                        <img src="/assets/icons/icon.menu.svg"/>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;