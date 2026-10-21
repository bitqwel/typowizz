<div align="center">

# ⌨ Typowizz

**Type faster. Think sharper.**

A free, futuristic typing speed test with games, live WPM, and certificates.
No login. No ads. No tracking. Open source.

[![License: MIT](https://img.shields.io/badge/License-MIT-7c5cff.svg)](LICENSE)
![No build step](https://img.shields.io/badge/build-none-00b4ff)
![Made with](https://img.shields.io/badge/made%20with-HTML%20%7C%20CSS%20%7C%20JS-ff4fd8)

</div>

---

## What is Typowizz?

Typowizz is a small, fast website built for one thing: helping you type better.
Take a classic typing speed test with real paragraphs and essays, watch your **words per minute (WPM)** and **accuracy** update live, then train with arcade-style typing games. When time is up you get a results screen and a personalised **certificate**.

Everything runs in your browser. There are no accounts, no passwords, no servers and no data collection. Your best scores are stored only on your own device (browser `localStorage`).

## Features

- ⏱ **Typing test** – choose **Paragraph** or **Essay**, a **level** (Easy / Medium / Hard) and a **time** (30s, 1 min, 2 min or no limit). A random text is picked every time.
- ✍️ **Type directly on the text** – no separate input box. Correct letters turn green, mistakes turn red, and a blinking cursor shows your position.
- 📊 **Live stats** – WPM, accuracy, seconds left and your best WPM.
- 🎮 **4 typing games**, each with levels, timers, icons and animated backgrounds:
  - 🌧️ **Word Rain** – type falling words and press Enter to zap them. Wrong word: −5 points. Miss a word: lose a life.
  - ⚡ **Speed Burst** – type each word as fast as you can. Correct +1, wrong −1.
  - 🧩 **Scramble Dash** – unscramble the letters. Correct = word length points, wrong −3.
  - 🎯 **Letter Blitz** – hit the letters in order, no Enter needed. Right key +1, wrong key −1, bonus for finishing a set.
- 🏆 **Results + certificate** – after every test or game you see your **score, speed (WPM) and accuracy**, then enter your name to generate a certificate image.
- 🎨 **Futuristic white UI** – oval navigation bar, glass cards, gradients and smooth animations (respects *reduce motion*).
- 📱 **Responsive** – works on phones, tablets and desktops.
- 🔒 **Private** – no login, no cookies, no analytics.

## Pages

| Page | File | What it does |
|------|------|--------------|
| Home | `index.html` | About Typowizz, how it works, and the typing test |
| Games | `games.html` | The four games, with level and time setup |
| About | `about.html` | About the project and the developer |
| Open Source | `open-source.html` | License, how it is built, how to contribute |
| Terms | `terms.html` | Terms and conditions |

## Project structure

```
typowizz/
├── index.html          # Home + typing test
├── games.html          # Games
├── about.html          # About us + developer
├── open-source.html    # Open source info
├── terms.html          # Terms & conditions
├── css/
│   └── style.css       # All styling and animations
├── js/
│   ├── common.js       # Helpers, results popup, certificate generator
│   ├── typing.js       # Typing test (paragraphs, essays, WPM)
│   └── games.js        # The four games
├── README.md
└── LICENSE
```

No frameworks, no dependencies, no build step. The only external resource is the Google Fonts stylesheet (Orbitron and Space Grotesk), and the site falls back to system fonts without it.

## How scores work

- **WPM** = correct characters ÷ 5 ÷ minutes (the standard "5 characters = 1 word" rule).
- **Accuracy** = correct characters ÷ characters typed.
- **Typing test score** = 10 points per correct character − 5 points per mistake (never below 0).
- **Game score** depends on the game (see the list above) and never drops below 0. Game WPM is estimated from correct words per minute (Letter Blitz uses correct letters ÷ 5).

## Run locally

1. Download or clone this repository.
2. Open `index.html` in your browser.

That's it. (Optional: serve it with any static server, for example `python3 -m http.server`, then visit `http://localhost:8000`.)

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `typowizz`.
2. Upload these files, or push from your computer:
   ```bash
   cd typowizz
   git init
   git add .
   git commit -m "Initial commit: Typowizz"
   git branch -M main
   git remote add origin https://github.com/bitqwel/typowizz.git
   git push -u origin main
   ```
3. On GitHub open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then **Save**.
5. After a minute your site is live at `https://bitqwel.github.io/typowizz/`.

## Customising

- **Colours and animations** – edit the variables at the top of `css/style.css` (`--a`, `--b`, `--p`).
- **Typing texts** – edit the `TEXTS` object at the top of `js/typing.js`. Avoid apostrophes and fancy quotes so people can type the text on any keyboard.
- **Game words and difficulty** – edit `P` (word lists) and `LN` (speed, spawn gap, letter count) in `js/games.js`.
- **Add a game** – add an entry to `GM` in `js/games.js` and handle it in `nextItem()` / `submit()`.

## Contributing

Contributions are welcome: new games, word lists, languages, themes, bug fixes and accessibility improvements.

1. Fork the repository.
2. Create a branch: `git checkout -b my-feature`.
3. Make your changes and test them in a browser.
4. Commit and push, then open a pull request describing what you changed.

## Terms and privacy

Typowizz is provided as is, for practice and fun. It does not collect personal information; best scores live only in your browser's local storage and disappear if you clear site data. See `terms.html` for the full text.

## License

Released under the [MIT License](LICENSE). You are free to use, copy, modify and share it.

## Author

Built by **Bitqwel**

- GitHub: [@bitqwel](https://github.com/bitqwel)
- Instagram: [@bitqwel](https://instagram.com/bitqwel)

If you like Typowizz, give the repository a ⭐ and share it with a friend.
