# Osto Zip game: setup (about 15 minutes)

Leads sheet: https://docs.google.com/spreadsheets/d/1nNLsN51YARo8Vne-HgvSv2fxzJWridTHTcnLpEAoHYk/edit

## 1. Connect the Google Sheet (once)
1. Open the leads sheet, then Extensions > Apps Script.
2. Delete what is there, paste everything from `apps-script.gs`, and save.
3. Deploy > New deployment > type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and approve permissions.
4. Copy the Web app URL (ends in `/exec`).

## 2. Host the game (once)
1. Go to https://app.netlify.com/drop and drag this whole folder onto the page.
2. Netlify gives you a URL. That is the game.

## 3. Set up the iPad (each iPad)
1. Open the game URL in Safari **while online**.
2. Share > Add to Home Screen. Always launch the game from that icon. It works offline after this first load.
3. On the home screen, tap the osto logo 5 times and enter PIN **2026** to open Admin.
4. Paste the Web app URL, tap Save URL, then Test connection.
5. Settings > Accessibility > Guided Access: turn it on, then triple-click the top button in the game to lock the iPad to it.

## During the event
- Every play is saved on the iPad first and syncs to the Sheet when online. The small dot in the top-right corner is green when everything is synced and orange when rows are waiting.
- The leaderboard resets automatically each day (Oct 13, 14 and 15 each have their own grid).
- Admin shows today's top 3 with email and phone, a Sync now button, and a CSV export backup.
- Before closing each day: open Admin, check "Waiting to sync" is 0, and tap Export all as CSV as a backup.
- Do not delete Safari data or the home screen app until everything has synced.
