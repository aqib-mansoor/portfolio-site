import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS config
const EMAILJS_SERVICE_ID = 'service_qyxo0t7';
const EMAILJS_NOTIFY_TEMPLATE = 'template_ok5gzzn';
const EMAILJS_REPLY_TEMPLATE = 'template_lnvf9i6';
const EMAILJS_PUBLIC_KEY = 'odOHlRNwPe0NnIw5t';

interface ContactProps {
  onSuccess: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleServiceChange = (serviceName: string) => {
    if (services.includes(serviceName)) {
      setServices(services.filter(s => s !== serviceName));
    } else {
      setServices([...services, serviceName]);
    }
  };

  // Re-run validation whenever inputs change
  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  }, [name, email, message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSending) return;

    setIsSending(true);

    // Setup spin keyframes dynamically
    if (!document.getElementById('spin-keyframes')) {
      const style = document.createElement('style');
      style.id = 'spin-keyframes';
      style.innerHTML = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        services: services.length > 0 ? services.join(', ') : 'Not specified',
      };

      // 1. Send notification to owner via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFY_TEMPLATE,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      // 2. Send auto-reply to the sender via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REPLY_TEMPLATE,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      onSuccess();
      setName('');
      setEmail('');
      setMessage('');
      setServices([]);
      setIsValid(false);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Oops! There was a problem submitting your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <article className="contact active" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <div className="contact-grid">
        <section className="mapbox reveal" data-mapbox>
          <figure>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.938641470626!2d73.06852771761844!3d33.60689646724423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94bdb2244bf7%3A0xa7cf79779264a9e1!2sAria%20Mohalla%20Marir%2C%20Rawalpindi%2C%20Punjab%2046000%2C%20Pakistan!5e0!3m2!1sen!2s!4v1727174979419!5m2!1sen!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </figure>
        </section>

        <section className="contact-form reveal">
          <h3 className="h3 form-title">Contact Form</h3>

          <form ref={formRef} onSubmit={handleSubmit} data-form>
            <div className="input-wrapper">
              <input
                type="text"
                name="from_name"
                className="form-input"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-form-input
              />
              <input
                type="email"
                name="from_email"
                className="form-input"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-form-input
              />
            </div>

            {/* Interactive Service Selector Pills */}
            <div className="service-select-wrapper">
              <p className="service-select-title">What services do you need?</p>
              <div className="service-pills">
                <label className="service-pill">
                  <input
                    type="checkbox"
                    name="services[]"
                    value="Web Development"
                    checked={services.includes("Web Development")}
                    onChange={() => handleServiceChange("Web Development")}
                  />
                  <span>Web App</span>
                </label>
                <label className="service-pill">
                  <input
                    type="checkbox"
                    name="services[]"
                    value="Mobile App"
                    checked={services.includes("Mobile App")}
                    onChange={() => handleServiceChange("Mobile App")}
                  />
                  <span>Mobile App</span>
                </label>
                <label className="service-pill">
                  <input
                    type="checkbox"
                    name="services[]"
                    value="UI/UX Design"
                    checked={services.includes("UI/UX Design")}
                    onChange={() => handleServiceChange("UI/UX Design")}
                  />
                  <span>UI/UX Design</span>
                </label>
              </div>
            </div>

            <textarea
              name="message"
              className="form-input"
              placeholder="Your Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              data-form-input
            ></textarea>

            <button className="form-btn" type="submit" disabled={!isValid || isSending} data-form-btn>
              {isSending ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ion-icon name="sync-outline" style={{ animation: 'spin 1s linear infinite' }}></ion-icon>
                  Sending...
                </span>
              ) : (
                <>
                  <ion-icon name="paper-plane"></ion-icon>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </article>
  );
};
