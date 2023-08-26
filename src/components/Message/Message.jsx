import React from 'react';
import "./Message.css";

const Message = ({ msg }) => {
    return (
        <div class="message-container">
            {msg}
        </div>
    );
};

export default Message;
