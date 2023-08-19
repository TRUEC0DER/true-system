import React from 'react';
import "@/styles/pages/Success.scss"

const Success = () => {
    return (
        <div className="success">
            <div className="content">
                <span className="status">
                    <img src="/assets/icons/success.icon.svg"/>
                </span>
                <h2>Success payment</h2>
                <p>You should have already received the item. Have a good game!</p>
            </div>
        </div>
    );
};

export default Success;