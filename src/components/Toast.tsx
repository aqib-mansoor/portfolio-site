import React from 'react';

interface ToastProps {
  show: boolean;
  message?: string;
}

export const Toast: React.FC<ToastProps> = ({ show, message = "Message sent successfully!" }) => {
  return (
    <div className={`toast ${show ? 'show' : ''}`} id="contact-toast">
      <div className="toast-content">
        <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#2ed573' }}></ion-icon>
        <div className="toast-message">
          <span className="toast-title">Success</span>
          <span className="toast-text">{message}</span>
        </div>
      </div>
    </div>
  );
};
