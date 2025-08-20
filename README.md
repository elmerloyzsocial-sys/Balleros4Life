# 🏀 Balleros4Life Club Portal
Welcome to the **Balleros4Life** website — a mobile-friendly portal for basketball club members, fans, and organizers!  
This site is designed for easy navigation and quick access to all club activities, resources, and information.
---

## 🌟 Features

- **📅 Events & Team Games Table:**  
  View all upcoming and past matches, including results, scores, opponents, and venues in one easy-to-read table.

- **📺 YouTube Resources:**  
  Organize and access curated basketball videos by category:
    - 🏀 Offense
    - 🛡️ Defense
    - ⏱️ In-Play  
  Add your own YouTube links with titles, and remove them anytime—links are saved in your browser for convenience.

- **🔗 Clickable Navigation Menu:**  
  Clean, icon-based menu for accessing all sections:
    - 🏀 Next Game
    - 🖼️ Gallery
    - 👤 Player Stats
    - 🤳 Player Photos
    - 💡 Advice
    - 📖 Plays

- **👤 Player Stats & Photos:**  
  Track individual player stats and upload player photos for easy reference.

- **🖼️ Gallery:**  
  Preview and upload team and match photos.

- **💡 Advice & 📖 Plays:**  
  Get basketball advice and view club playbooks.

- **ℹ️ About & Contact Section:**  
  Learn more about the club, and easily find contact info (email, Instagram, phone).

---

## 📱 Mobile-Friendly Design

- Responsive single-column layout, large tap targets, and scrollable tables.
- Designed for fast loading and usability on phones and tablets.

---

## 🚀 How to Use

1. **Open** `index.html` in your browser.
2. **Use** the navigation menu to access each feature.
3. **Add** YouTube videos and photos—these are stored in your browser (`localStorage`) for privacy and speed.
4. **All updates** to events, resources, and stats are instant — no login required.

---

## 🏁 Getting Started

1. **Clone or download** this repository.
2. **Open** `index.html` in your browser.
3. *(Optional)* Deploy to GitHub Pages or your own web server for public access.

---

## 🛠️ Step-by-Step Management & Customization Guide

### 1. **Editing Website Data**

#### 🗓️ **Events & Games Table**
- **Location:** Inside a `<script>` block at the end of `index.html`.
- **Data:** The array named `games`.
- **How to edit:**
  - Find this code:
    ```javascript
    const games = [
      { date: '2025-08-22', opponent: 'Falcons', location: 'Home', result: null, ourScore: null, oppScore: null },
      { date: '2025-08-29', opponent: 'Eagles', location: 'Away', result: null, ourScore: null, oppScore: null },
      { date: '2025-08-15', opponent: 'Bulls', location: 'Away', result: 'Win', ourScore: 88, oppScore: 75 },
      { date: '2025-08-08', opponent: 'Sharks', location: 'Home', result: 'Loss', ourScore: 65, oppScore: 70 }
    ];
    ```
  - **To add a game:** Add a new line inside the array, matching the format above.
  - **To edit a game:** Change the values for the date, opponent, location, scores, or result.
  - **To remove a game:** Delete the line for that game.

#### 📺 **YouTube Links**
- **Location:** Managed through the browser interface (YouTube Resource section).
- **How to Add:** Use the form on the site, select category, enter title and URL, click “Add Video.”
- **How to Remove:** Click the **×** button next to the video link.
- **To reset all YouTube links:** Clear your browser’s localStorage for the site, or add a reset button in the JavaScript.

#### ℹ️ **About & Contact Info**
- **Location:** Inside the `<section class="about-contact">` in `index.html`.
- **How to edit:**
  - Change the text under `<h3>About Us</h3>`, `<p>...</p>`.
  - Change or add contact methods in the `<ul>` list (email, phone, Instagram).

---

### 2. **Modifying the Look & Layout**

#### 🎨 **Change Background Color**
- **Location:** In the `<style>` block at the top of `index.html`.
- **How to edit:**
  - Find the `:root` CSS variables:
    ```css
    :root {
      --primary: #243d68;
      --accent: #f7b32b;
      --bg: #f7f7fa;
      --card: #fff;
      --border: #e5e5e5;
    }
    ```
  - Change `--bg` for page background, `--card` for sections, `--primary` for header and accent colors.

#### 🖼️ **Change Icons in Menu**
- **Location:** In the `<nav class="menu-grid">` block in `index.html`.
- **How to edit:**
  - Each `<a class="menu-card">` has a `<span>` with an emoji/icon, e.g. `<span>🏀</span>`.
  - Replace the emoji with any Unicode emoji or icon you prefer.

#### 📋 **Edit Table Column Names**
- **Location:** In the `<thead>` section of the games table.
- **How to edit:** Change the text inside `<th>` tags.

#### 🏷️ **Change Page Layout**
- **How to edit:**  
  - Rearrange or add sections in `<main>`.
  - Add or remove menu links in `<nav class="menu-grid">`.

---

### 3. **Advanced Customization**

#### 🖌️ **Custom Fonts**
- Add a `<link>` for Google Fonts in `<head>`, then update `body { font-family: ... }`.

#### 🖼️ **Custom Icons**
- Use [Twemoji](https://twemoji.twitter.com/) or SVG icons for more style.

#### 💻 **Add/Remove Features**
- Copy, move, or delete sections in `index.html`.
- Add new scripts, forms, or tables as needed.

---

## 📬 Contact

For questions or suggestions, reach out to us at [contact@balleros4life.com](mailto:contact@balleros4life.com)  
or DM [@balleros4life](https://instagram.com/balleros4life) on Instagram. Or visit our webpage at (https://elmerloyzsocial-sys.github.io/Balleros4Life/index.html).

---

**Balleros4Life** — where teamwork, fun, and growth are always in play! 🏀
