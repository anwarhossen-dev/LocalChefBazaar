# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# LocalChefBazaar

## Project Overview
LocalChefBazaar is a modern online marketplace connecting home cooks (chefs) with customers seeking fresh, homemade meals. The platform allows chefs to sell their meals online without a physical restaurant and enables customers to order homemade food conveniently. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this platform ensures smooth user experience, secure payments, and role-based access control.

---

## **Live Project**
**Client URL:** [https://your-client-live-url.com](https://your-client-live-url.com)  
**Server URL:** [https://your-server-live-url.com](https://your-server-live-url.com)

---

## **Key Features**

### **General**
- Responsive design for mobile and desktop
- Secure Firebase authentication for registration and login
- Role-based access (Admin, Chef, Customer)
- JWT-based protected routes
- Dynamic page titles
- Dark/Light theme toggle (optional)
- Error & Loading pages

### **Customer**
- Browse daily meals
- Meal details with ingredients, chef info, and reviews
- Add meals to favorites
- Place orders and pay with Stripe
- Track order status in real-time
- Submit reviews

### **Chef**
- Upload new meals with images, price, and ingredients
- Manage own meals (update/delete)
- View order requests and update status (Accept/Cancel/Deliver)
- See favorite meals by users

### **Admin**
- Manage users (roles & status)
- Approve/reject Chef/Admin requests
- Platform statistics dashboard (payments, users, orders)
- Manage requests with approval workflow

### **Payments**
- Stripe integration for online payments
- Orders updated automatically after payment success
- Payment history saved in MongoDB

---

## **Tech Stack**
- Frontend: React, React Router, React Query, react-hook-form, Framer Motion
- Backend: Node.js, Express.js, MongoDB
- Authentication: Firebase Auth, JWT
- Payment: Stripe API
- Deployment: Vercel / Netlify / Heroku
- Charts: Recharts
- Notifications: SweetAlert2

---

## **Setup & Installation**

### **Client**
```bash
cd client
npm install
npm start

