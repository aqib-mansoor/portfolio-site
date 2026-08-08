import React, { useState } from 'react';

export const Sidebar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <aside className={`sidebar ${isActive ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src="/assets/images/my-avatar.png" alt="Aqib Mansoor" width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title="Aqib Mansoor">Aqib Mansoor</h1>
          <span className="title">Web & App Developer</span>
        </div>

        <button
          className="info_more-btn"
          onClick={toggleSidebar}
          data-sidebar-btn
          aria-label={isActive ? 'Hide Contacts' : 'Show Contacts'}
          aria-expanded={isActive}
        >
          <span>{isActive ? 'Hide Contacts' : 'Show Contacts'}</span>
          <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:aqibmansoor40@gmail.com" className="contact-link">
                aqibmansoor40@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline" aria-hidden="true"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+923185952411" className="contact-link">
                +92 318 5952411
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="calendar-outline" aria-hidden="true"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime="2001-06-05">June 05, 2001</time>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Rawalpindi, Pakistan</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a href="https://www.linkedin.com/in/aqib248" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <ion-icon name="logo-linkedin" aria-hidden="true"></ion-icon>
            </a>
          </li>

          <li className="social-item">
            <a href="https://twitter.com/itzaqib248" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
              <ion-icon name="logo-twitter" aria-hidden="true"></ion-icon>
            </a>
          </li>

          <li className="social-item">
            <a href="https://www.instagram.com/_aqib_15" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
              <ion-icon name="logo-instagram" aria-hidden="true"></ion-icon>
            </a>
          </li>

          <li className="social-item">
            <a href="https://github.com/aqib-mansoor" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <ion-icon name="logo-github" aria-hidden="true"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
