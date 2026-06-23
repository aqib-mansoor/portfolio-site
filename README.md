# Aqib Mansoor – Personal Portfolio

Welcome to the source code of my personal portfolio website! This modern, single-page application is built using React 19, Vite, and TypeScript. It features a premium, responsive glassmorphism UI with custom micro-animations, a responsive design system, and custom contact integrations.

## 🚀 Key Features

- **Interactive Experience:** Modern layout with a side navigation panel, glowing hover states, and smooth slide-up page transitions.
- **Dynamic Projects Showcase:** Filterable portfolios showcasing custom development work.
- **Custom Services Inquiry:** Interactive pills to specify required service offerings (Web Development, Mobile Apps, UI/UX Design).
- **Dual Email Workflows:** Real-time form processing with custom notification emails to the owner and automated confirmation auto-replies to the sender powered by EmailJS.

---

## 🛠️ Tech Stack & Setup

- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Premium Vanilla CSS with smooth custom animations
- **Package Manager:** [npm](https://www.npmjs.com/)

### Development

To start the local development server:

```bash
# Install dependencies (if not already installed)
npm install

# Run the development server
npm run dev
```

### Production Build

To compile and optimize the application for deployment:

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## ✉️ Contact Form Configuration (EmailJS)

The contact form is powered by [EmailJS](https://www.emailjs.com/). It triggers two concurrent actions:
1. **Notification:** Sends details about the new lead to your inbox.
2. **Auto-Reply:** Sends a friendly acknowledgement email back to the visitor.

### Configuration Constants

Configuration settings are stored at the top of the [Contact component](file:///d:/Web/Portfolio/src/components/Contact.tsx):

- **Service ID:** `service_qyxo0t7`
- **Notification Template ID:** `template_ok5gzzn`
- **Auto-Reply Template ID:** `template_w03n8bv`
- **Public Key:** `odOHlRNwPe0NnIw5t`

> [!IMPORTANT]
> Make sure both templates are active in your EmailJS dashboard, and that the Auto-Reply template's **To Email** field is set to `{{from_email}}` to ensure successful delivery to your visitors.
