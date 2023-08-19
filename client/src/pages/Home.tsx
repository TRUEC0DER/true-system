import React from 'react';
import "@/styles/pages/Home.scss"
import {ThemeContext} from "@/contexts/ThemeContext";

const Home = () => {
    return (
        <div className="home">
            <div className="block">
                <h4>The site is under development, so there may be some errors</h4>
                <p>Developed by TRUEC0DER</p>
            </div>
            <div className="main">
                <div className="content">
                    <p className="icon">
                        <ThemeContext.Consumer>
                            {({theme}) => (
                                <img src={theme === "dark" ? "/assets/icons/moon.icon.svg" : "/assets/icons/sun.icon.svg"}/>
                            )}
                        </ThemeContext.Consumer>
                    </p>
                    <h2>It's just a TRUESystem</h2>
                    <p>TRUESystem - this is a convenient system for minecraft servers.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;