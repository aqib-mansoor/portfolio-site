import React from 'react';

export const About: React.FC = () => {
  const services = [
    {
      title: "Full-Stack Web Development",
      icon: "/assets/images/icon-dev.svg",
      text: "High-quality development of web applications at a professional level."
    },
    {
      title: "Mobile App Development",
      icon: "/assets/images/icon-app.svg",
      text: "High-quality development of mobile applications for iOS and Android."
    },
    {
      title: "UI/UX Design",
      icon: "/assets/images/icon-design.svg",
      text: "Crafting seamless user experiences through intuitive visual design."
    },
    {
      title: "API & Cloud Solutions",
      icon: "/assets/images/icon-dev.svg",
      text: "Integrating robust APIs and secure cloud deployment solutions."
    }
  ];

  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <p>
          I’m a Full-Stack Web and Mobile Developer who builds clean, practical applications that work. My main tools are React, React Native, Node.js, and Laravel. I write code that is easy to maintain, design databases that run fast, and build frontends that look good on any screen.
        </p>

        <p>
          I build projects from scratch handling everything from setting up the server and database architecture to crafting the final user interface. For me, a good application is one that is fast, secure, and easy for people to use.
        </p>

        <p>
          I enjoy working with teams, solving tricky coding problems, and picking up new technologies as I go. If you have an idea for a web platform or mobile app, let’s connect and build it.
        </p>
      </section>

      {/* service */}
      <section className="service">
        <h3 className="h3 service-title">What i'm doing</h3>

        <ul className="service-list">
          {services.map((service, index) => (
            <li key={index} className="service-item reveal">
              <div className="service-icon-box">
                <img src={service.icon} alt={`${service.title} icon`} width="40" />
              </div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
