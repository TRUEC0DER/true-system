import React from 'react';
import "./Footer.scss"
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="left">
                <Link to="/policy">Privacy Policy</Link>
                <Link to="/contacts">Contacts</Link>
            </div>
            <div className="center">
                <p>© TRUESystem (2021 - {new Date().getFullYear()})</p>
            </div>
            <div className="right">
                <a className="a-primary" href="https://github.com/TRUEC0DER" target="_blank">TRUESystem by TRUEC0DER</a>
            </div>
        </footer>
    );
};

export default Footer;