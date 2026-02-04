Milestone 04 - Final Project Documentation
===

NetID
---
hbm9834

Name
---
Hailemariam Mersha

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha

URL for deployed site 
---
https://final-project-hailemariammersha.onrender.com

URL for form 1 (from previous milestone) 
---
https://final-project-hailemariammersha.onrender.com/auth/register

Special Instructions for Form 1
---
Create an account with a unique username and email before playing; errors display inline if the username or email already exists.

URL for form 2 (for current milestone) 
---
https://final-project-hailemariammersha.onrender.com/results

Special Instructions for Form 2
---
Finish a round of the game to reach the Results page; the score auto-saves via Fetch to `/api/save` for the logged-in user and then appears on the Scores screen.

URL for form 3 (from previous milestone) 
---
https://final-project-hailemariammersha.onrender.com/auth/login

Special Instructions for Form 3
---
Use an existing account to access gameplay; authentication is required before scores can be saved.

First link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/blob/main/public/js/game.js#L80

Second link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/blob/main/public/js/game.js#L239

Short description for links above
---
Word constructor builds each falling word with randomized position, speed, and TTL wiring; animation loop uses `filter` as a higher-order update to move and cull active words as difficulty scales.

Link to github line number(s) for schemas (db.js or models folder)
---
- User schema: https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/blob/main/models/Users.mjs#L1
- GameSession schema: https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/blob/main/models/GameSession.mjs#L1

Description of research topics above with points
---
- 2 points – Tailwind CSS: dark-theme styling and layout tokens across auth, levels, play, and results screens.
- 6 points – Client-side JS Logic: vanilla JS controls timers, spawning, speed scaling, scoring, and animations for the typing game.
- 2 points – ESLint Integration: flat ESLint config with Prettier rules keeps browser and Node code consistent during development.
- 3 points – Mocha Testing: unit tests cover models, auth middleware, date helpers, and login/register error states.

Links to github line number(s) for research topics described above (one link per line)
---
- Tailwind usage: https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/blob/main/public/css/tailwind.css#L1
- Client-side JS gameplay logic: https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/blob/main/public/js/game.js#L187
- ESLint flat config: https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/blob/main/eslint.config.js#L1
- Mocha tests (models, middleware, helper, auth error states): https://github.com/nyu-csci-ua-0467-001-002-fall-2025/final-project-HailemariamMersha/tree/main/tests

Optional project notes 
--- 
- Scores page (`/scores`) lists prior saves after login; use `/home` to return to the main menu.
- If auth is required while testing forms, register a fresh account; sessions persist until logout.
- Mocha suite (`npm test`) covers models plus login/register error handling, auth middleware, and date formatting helpers without needing a live database.
- Test run screenshot: documentation/test.png

Attributions
---
See source code comments
