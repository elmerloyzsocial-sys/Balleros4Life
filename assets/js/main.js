function toggleNav() {
  document.getElementById('main-nav').classList.toggle('show');
}

function openModal(type) {
  const modal = document.getElementById('modal');
  const form = document.getElementById('addForm');
  let html = '';
  switch(type) {
    case 'event':
      html = `
        <h3>Add Event</h3>
        <input type="text" id="eventTitle" placeholder="Title" required><br>
        <input type="date" id="eventDate" required><br>
        <input type="text" id="eventLocation" placeholder="Location" required><br>
        <button type="button" onclick="addEvent()">Add</button>`;
      break;
    case 'advice':
      html = `
        <h3>Add Advice</h3>
        <textarea id="adviceText" placeholder="Advice" required></textarea><br>
        <button type="button" onclick="addAdvice()">Add</button>`;
      break;
    case 'photo':
      html = `
        <h3>Add Photo</h3>
        <input type="text" id="photoUrl" placeholder="Image URL" required><br>
        <input type="text" id="photoCaption" placeholder="Caption" required><br>
        <button type="button" onclick="addPhoto()">Add</button>`;
      break;
    case 'play':
      html = `
        <h3>Add Play</h3>
        <input type="text" id="playName" placeholder="Play Name" required><br>
        <textarea id="playDesc" placeholder="Description" required></textarea><br>
        <button type="button" onclick="addPlay()">Add</button>`;
      break;
    case 'stat':
      html = `
        <h3>Add Stat</h3>
        <input type="text" id="playerName" placeholder="Player Name" required><br>
        <input type="number" id="playerPoints" placeholder="Points" required><br>
        <input type="number" id="playerRebounds" placeholder="Rebounds" required><br>
        <input type="number" id="playerAssists" placeholder="Assists" required><br>
        <button type="button" onclick="addStat()">Add</button>`;
      break;
    case 'announcement':
      html = `
        <h3>Add Announcement</h3>
        <textarea id="announcementText" placeholder="Announcement" required></textarea><br>
        <button type="button" onclick="addAnnouncement()">Add</button>`;
      break;
    default: html = '';
  }
  form.innerHTML = html;
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Save to localStorage and refresh page
function addEvent() {
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  events.unshift({
    title: document.getElementById('eventTitle').value,
    date: document.getElementById('eventDate').value,
    location: document.getElementById('eventLocation').value
  });
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
  location.reload();
}

function addAdvice() {
  const advice = JSON.parse(localStorage.getItem('advice') || '[]');
  advice.unshift(document.getElementById('adviceText').value);
  localStorage.setItem('advice', JSON.stringify(advice));
  closeModal();
  location.reload();
}

function addPhoto() {
  const photos = JSON.parse(localStorage.getItem('photos') || '[]');
  photos.unshift({
    url: document.getElementById('photoUrl').value,
    caption: document.getElementById('photoCaption').value
  });
  localStorage.setItem('photos', JSON.stringify(photos));
  closeModal();
  location.reload();
}

function addPlay() {
  const plays = JSON.parse(localStorage.getItem('plays') || '[]');
  plays.unshift({
    name: document.getElementById('playName').value,
    description: document.getElementById('playDesc').value
  });
  localStorage.setItem('plays', JSON.stringify(plays));
  closeModal();
  location.reload();
}

function addStat() {
  const stats = JSON.parse(localStorage.getItem('stats') || '[]');
  stats.unshift({
    name: document.getElementById('playerName').value,
    points: document.getElementById('playerPoints').value,
    rebounds: document.getElementById('playerRebounds').value,
    assists: document.getElementById('playerAssists').value
  });
  localStorage.setItem('stats', JSON.stringify(stats));
  closeModal();
  location.reload();
}

function addAnnouncement() {
  const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
  announcements.unshift(document.getElementById('announcementText').value);
  localStorage.setItem('announcements', JSON.stringify(announcements));
  closeModal();
  location.reload();
}