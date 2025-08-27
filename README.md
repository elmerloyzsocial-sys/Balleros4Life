## 👑 Admin Guide: How to Use & Manage the Website

This section explains how admins can update, manage, and customize all Balleros4Life website data and features.

### 1. 🗓️ Events & Games Table
- **Location:** End of `index.html`, inside a `<script>` block.
- **Data Array:** `games`
- **Edit/Add/Remove:**  
  - Add a game: Copy an entry and paste with new data.
  - Edit a game: Change any value (date, opponent, scores, etc.).
  - Remove a game: Delete the entry.
- **Example:**
  ```javascript
  const games = [
    { date: '2025-09-05', opponent: 'Tigers', location: 'Home', result: null, ourScore: null, oppScore: null }
    // ...
  ];
  ```
- **Save:** After editing, save `index.html` and refresh the site.

### 2. 👤 Player Stats & Photos
- **Location:** Inside `index.html`, in the Player Stats and Player Photos sections.
- **Edit:**  
  - Stats: Change values in the JavaScript array or table.
  - Photos: Upload or update images via the website interface.
- **Remove:** Delete the relevant table row or photo entry.

### 3. 🖼️ Gallery
- **Manage:**  
  - Upload new images: Use the gallery upload form on the site.
  - Remove images: Click the remove/delete button next to the photo.
  - Images are stored in your browser (`localStorage`) for privacy; clearing browser storage resets the gallery.

### 4. 📺 YouTube Resources
- **Add:** Use the “Add Video” form, select a category, enter title and URL.
- **Remove:** Click the **×** next to a video link.
- **Reset:** Clear browser localStorage for the site, or use a reset button in the UI if implemented.

### 5. 💡 Advice & 📖 Plays
- **Edit:**  
  - Advice: Update text or resources in the “Advice” section of `index.html`.
  - Plays: Modify playbook entries directly in the HTML or via the website form (if available).

### 6. ℹ️ About & Contact Info
- **Location:** `<section class="about-contact">` in `index.html`
- **Edit:**  
  - Change club description under `<h3>About Us</h3>`.
  - Update contact details in the `<ul>` list.
- **Add:** Add new contact methods as list items.

### 7. 🔄 Resetting Data
- **YouTube Links/Gallery:** Clear browser localStorage.
- **Other Data:** Manually edit or remove in `index.html`.

### 8. 🎨 Customization
- **Change Colors:** Edit CSS variables in `<style>` at the top of `index.html`.
- **Icons:** Replace emojis in `<nav class="menu-grid">`.
- **Fonts:** Add a Google Fonts link in `<head>`, update `font-family`.
- **Layout:** Rearrange `<main>` sections, add/remove menu links.

---

**Tip:** All changes to HTML, JS, and CSS require saving the file and refreshing your browser. For major changes, consider version control (Git).

For more help, contact [contact@balleros4life.com](mailto:contact@balleros4life.com).
Visit for more info and details of the team: https://elmerloyzsocial-sys.github.io/Balleros4Life
