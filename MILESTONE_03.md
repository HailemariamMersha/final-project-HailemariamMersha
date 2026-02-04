Milestone 03
===

Repository Link
---
[https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha](https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha)

---

URL for Form 1 (from previous milestone)
---
[https://final-project-hailemariammersha.onrender.com](https://final-project-hailemariammersha.onrender.com/)

Special Instructions for Form 1
---
Users must **register first** before playing or saving any scores.  
After registration, they can log in to access the main home page and game interface.  

---

 Form 2 (for current milestone)

 ---

After completing a round in the **TypeRush: Word Storm** game, users can submit their results using the **Save Score form**. I have updated this form such that the score is saved as soon as the user is done playing. Users can then request for their previous scores by clicking the scores button. 

The form captures:
- Username (from session)  
- Level  
- Score  
- Date  

Scores are then stored in MongoDB and linked to the authenticated user account.  
This demonstrates persistent data storage and backend validation of user-generated data.  

---

Research Progress:
---
### Tailwind CSS (2 points)
Used for styling across all pages, including game screen, forms, and leaderboard.  
Implements consistent dark theme, responsive layout, and white-space balance.  
🔗 [Tailwind usage – `/public/css/tailwind.css`](https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/tree/main/public/css)

---

###  Client-Side JavaScript Logic (6 points)
Implements full dynamic logic for the **TypeRush: Word Storm** gameplay:
- Random word generation (for now, am using a static word collection)
- Animated falling words (handled via `setInterval`)  
- User input validation and scoring system  
- Dynamic difficulty scaling (words speed up over time)  
- Visual feedback for correct / incorrect input  

All logic contained in the `/public/js/game.js` file, built with vanilla JavaScript.  
Demonstrates asynchronous DOM updates and efficient event handling.  
🔗 [Client-side logic – `/public/js/game.js`](https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/tree/main/public/js)

---

###  ESLint Integration (2 points )
ESLint is integrated for linting file and standardization of code.
Modern flat config setup for code quality and formatting.
## Features
- **@eslint/js** recommended rules
- **Prettier** integration for auto-formatting
- **ES Modules** support (`.mjs`, `.js`, `.cjs`)
- **Node.js + Browser** globals

## Rules
- `no-unused-vars`: warn
- `no-console`: off
- `semi`: required
- `quotes`: double quotes
- `indent`: 2 spaces
- `prettier/prettier`: error


### 🧪 Mocha Testing (3 points – in progress)
A Mocha test suite is being prepared to validate:
- Successful user registration and login routes  
- Database insertions for score saving  
- Proper response structure from Express endpoints  

will be located in `/tests` folder.  
Next steps I will be adding **4 unit tests** and documenting results in the final milestone.  
🔗 [Mocha setup documentation](https://mochajs.org/)

---

References
---
1. [TailwindCSS Documentation](https://tailwindcss.com/docs) – Used for responsive design and styling.  
2. [MDN Web Docs – JavaScript APIs](https://developer.mozilla.org/en-US/docs/Web/API) – For timers, DOM manipulation, and event handling.  
3. [ESLint Documentation](https://eslint.org/docs/latest/) – For upcoming linting setup.  
4. [Mocha Docs](https://mochajs.org/) – For backend testing configuration.  
5. [Express.js Documentation](https://expressjs.com/) – For route setup and server management.  
6. [Mongoose Docs](https://mongoosejs.com/docs/) – For MongoDB schema creation and database handling.  

---

### Summary
For **Milestone 3**, the project demonstrates:
- Two fully functional forms (**Register/Login** and **Save Score**) integrated with MongoDB.  
- Working client-side game logic that dynamically updates based on user performance.  
- Tailwind CSS integrated for responsive and modern interface.  
- Proof of research progress in **client-side JS**, **ESLint**, and **Mocha** testing setup.  

Next milestone I will focus on:
- Adding Mocha test results  
- Finalizing ESLint automation with build tool  
- Enhancing leaderboard functionality and visual effects.  
- Completing deployment with improved stability.  
