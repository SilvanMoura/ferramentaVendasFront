import React from 'react';
import "./Message.css";

const Message = ({ msg }) => {
    return (
        <div class="message-container">
            <p>
                {msg}
            </p>
        </div>
    );
};

export default Message;
