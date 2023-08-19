import React from 'react';
import '@/styles/pages/NotFound.scss'

const NotFound = () => {
    return (
        <div className="notfound">
            <div className="content">
                <h1>404</h1>
                <p className="p-big">
                    Страница не найдена
                </p>
            </div>
        </div>
    );
};

export default NotFound;