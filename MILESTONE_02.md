Milestone 02
===

Repository Link
---
[https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha](https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha)

---

Special Instructions for Using Form (or Login details if auth is part of your project)
---
Users must **register first** before accessing the game or saving scores.  
After registering, they can log in to play and track their high scores across multiple sessions.  

---

Render URL 
---
[https://final-project-hailemariammersha.onrender.com](https://final-project-hailemariammersha.onrender.com)

---

URL for form result
---
After successfully registering, users are redirected to the login page.  
Once logged in, they access the **Home** page, where they can navigate to the game levels and begin playing.

The two forms I worked on for this milestone are the login and register forms. I have used express session and bcrypt js to manage authentication.

Example pages:
- Registration: `/register`  
- Login: `/login`  
- Home: `/home`

---

URL to GitHub that shows line of code where research topic(s) are used / implemented
---
# Research topic for this milestone 
Tailwind CSS is used throughout the frontend for **dark theme**, **responsive design**, and **minimal component styling**.  
Implementation visible in the following file:  
👉 [tailwind.css usage – `/public/css/tailwind.css`](https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/tree/main/public/css)

Tailwind is used to maintain consistency and simplify UI development without relying on Bootstrap defaults.

# Finalized research topics I will be working on:

- Tailwind CSS – 2 pts  
- Client-side JS Logic – 6 pts  
- ESLint Integration – 2 pts  
- Mocha - 3 pts
---

References
---
1. [TailwindCSS Documentation](https://tailwindcss.com/docs) – Used for styling and responsive layout setup.  
2. [MDN JavaScript – setInterval, DOM, and Event Handling](https://developer.mozilla.org/en-US/docs/Web/API) – For client-side game logic (word spawning, timers, and input handling).  
3. [ESLint Documentation](https://eslint.org/docs/latest/) – For planned integration in future milestones.  
4. [Express.js Documentation](https://expressjs.com/) – For backend routing and form handling.  
5. [Mongoose Docs](https://mongoosejs.com/docs/) – For user and session schema setup.

---

### Summary
For **Milestone 2**, the app has been **deployed successfully on Render**, featuring a working **user registration and login form** connected to MongoDB via Mongoose.  
The **TypeRush: Word Storm** game is in prototype stage, with functional navigation and authentication.  
Next milestone will focus on:
- Expanding AJAX interactions for real-time score updates  
- Adding ESLint configuration  
- Refining game logic for dynamic difficulty and live leaderboard updates.  
