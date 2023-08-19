import React from 'react';
import "@/styles/pages/Fail.scss"

const Fail = () => {
    return (
        <div className="fail">
            <div className="content">
                <span className="status">
                    <img src="/assets/icons/fail.icon.svg"/>
                </span>
                <h2>Payment failed</h2>
                <p>An error occurred while making a payment, contact the administration</p>
            </div>
        </div>
    );
};

export default Fail;