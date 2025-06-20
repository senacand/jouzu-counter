# Nihongo Jouzu Desu Ne Counter 🎌

A fun, light-hearted website that counts the days since someone last told you "nihongo jouzu desu ne" (your Japanese is good/skilled). Perfect for anyone learning Japanese who gets tired of hearing this phrase!

## Features

- **Live Counter**: Displays days since the last encounter
- **Encounter History**: Shows all previous encounters with dates and descriptions
- **Fancy Design**: Modern, animated UI with gradients and smooth transitions
- **Responsive**: Works on desktop, tablet, and mobile
- **Easter Eggs**: Hidden surprises for curious users! 🥚
- **Auto-updating**: Counter updates automatically at midnight

## How to Use

1. Open `index.html` in your web browser
2. The counter will automatically calculate days since your last encounter
3. View all your previous encounters in the list below

## Customizing Your Data

Edit the `config.json` file to add your own encounters:

```json
{
  "encounters": [
    {
      "timestamp": "2024-01-15T14:30:00.000Z",
      "description": "Your funny encounter description here 😄"
    }
  ]
}
```

- **timestamp**: ISO 8601 date format (YYYY-MM-DDTHH:mm:ss.sssZ)
- **description**: Short, funny description of the encounter

## Easter Eggs

- Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
- Click the counter 10 times for a surprise
- Check the browser console for random encouragement messages

## Files

- `index.html` - Main website
- `style.css` - Fancy styling and animations
- `script.js` - JavaScript functionality
- `config.json` - Your encounter data

## Adding New Encounters

When someone says "nihongo jouzu desu ne" to you:

1. Open `config.json`
2. Add a new entry to the encounters array
3. Use the current date/time in ISO format
4. Add a funny description of what happened
5. Refresh the website to see the updated counter

The website will automatically show the most recent encounter and reset the counter!

---

*Remember: Every time someone says this, a weeb gets their wings* 👼 