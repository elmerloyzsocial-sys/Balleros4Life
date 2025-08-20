// Data simulation: replace with backend or localStorage in production

const games = [
  { date: '2025-08-22', opponent: 'Falcons', location: 'Home', result: null, ourScore: null, oppScore: null },
  { date: '2025-08-29', opponent: 'Eagles', location: 'Away', result: null, ourScore: null, oppScore: null },
  { date: '2025-08-15', opponent: 'Bulls', location: 'Away', result: 'Win', ourScore: 88, oppScore: 75 },
  { date: '2025-08-08', opponent: 'Sharks', location: 'Home', result: 'Loss', ourScore: 65, oppScore: 70 }
];

const standings = [
  { team: 'Ballero4Life', wins: 1, losses: 1 },
  { team: 'Falcons', wins: 2, losses: 0 },
  { team: 'Eagles', wins: 1, losses: 1 },
  { team: 'Bulls', wins: 0, losses: 2 }
];

const plays = [
  {
    name: "Pick and Roll",
    desc: "A basic play where one player sets a screen (pick) for a teammate handling the ball and then moves towards the basket (roll)."
  },
  {
    name: "Zone Defense",
    desc: "Players defend areas (zones) rather than specific opponents. Good for limiting drives."
  },
  {
    name: "Fast Break",
    desc: "Quick transition from defense to offense, aiming for easy basket before the defense sets."
  },
  {
    name: "Isolation Play",
    desc: "Clear the court to let a strong scorer take on their defender 1-on-1."
  }
];

const advice = {
  offense: "Move the ball quickly, look for open shots, and set effective screens. Avoid stagnant offense.",
  defense: "Communicate, switch on screens if needed, and always box out after a shot. Defense wins games!",
  teamwork: "Trust each other, keep heads up for passes, and celebrate small wins together.",
  conditioning: "Run sprints, focus on agility drills, and hydrate before and after games.",
  shooting: "Practice form daily, focus on follow-through, and use legs for power."
};

// Stats (simulate with localStorage for persistence)
function getStats() {
  return JSON.parse(localStorage.getItem('playerStats') || '[]');
}
function saveStats(stats) {
  localStorage.setItem('playerStats', JSON.stringify(stats));
}

// Player Photos (simulate with localStorage for persistence)
function getPlayerPhotos() {
  return JSON.parse(localStorage.getItem('playerPhotos') || '{}');
}
function savePlayerPhotos(photos) {
  localStorage.setItem('playerPhotos', JSON.stringify(photos));
}

// Gallery fetch from GitHub
const repoOwner = "elmerloyzsocial-sys";
const repoName = "Balleros4Life";
const galleryFolder = "gallery";

async function fetchGalleryImages() {
  const galleryDiv = document.getElementById("galleryFull");
  if (!galleryDiv) return;

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${galleryFolder}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch gallery images.");
    const files = await response.json();

    // Only show image files (jpg, jpeg, png, gif)
    const imgFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    );

    // Display images
    galleryDiv.innerHTML = imgFiles.map(file => `
      <div class="galleryItem">
        <img src="${file.download_url}" alt="${file.name}" class="galleryImg" />
        <p>${file.name}</p>
      </div>
    `).join("");
  } catch (err) {
    galleryDiv.innerHTML = "<p>Could not load gallery images.</p>";
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Home page: Next Game, Standings, Team Stats, Gallery Preview
  if (document.getElementById('nextGame')) {
    // Upcoming game
    const upcoming = games
      .filter(g => !g.result && new Date(g.date) >= new Date())
      .sort((a,b) => new Date(a.date) - new Date(b.date))[0];
    document.getElementById('nextGame').innerHTML = upcoming ? `
      <b>Date:</b> ${upcoming.date}<br>
      <b>Opponent:</b> ${upcoming.opponent}<br>
      <b>Location:</b> ${upcoming.location}
    ` : 'No upcoming games.';

    // Standings
    let standingsHTML = `<table><tr><th>Team</th><th>Wins</th><th>Losses</th></tr>`;
    standings.forEach(s => standingsHTML += `<tr><td>${s.team}</td><td>${s.wins}</td><td>${s.losses}</td></tr>`);
    standingsHTML += `</table>`;
    document.getElementById('standingsTable').innerHTML = standingsHTML;

    // Team Stats Table
    let teamStatsHTML = `<table>
      <tr>
        <th>Date</th>
        <th>Opponent</th>
        <th>Location</th>
        <th>Our Score</th>
        <th>Opponent Score</th>
        <th>Result</th>
      </tr>`;
    games.forEach(g => {
      teamStatsHTML += `<tr>
        <td>${g.date}</td>
        <td>${g.opponent}</td>
        <td>${g.location}</td>
        <td>${g.ourScore !== null ? g.ourScore : '-'}</td>
        <td>${g.oppScore !== null ? g.oppScore : '-'}</td>
        <td>${g.result ? g.result : 'Upcoming'}</td>
      </tr>`;
    });
    teamStatsHTML += `</table>`;
    document.getElementById('teamStatsTable').innerHTML = teamStatsHTML;

    // Gallery preview (uses GitHub API, shows first 3 images)
    const galleryPreviewDiv = document.getElementById('galleryPreview');
    if (galleryPreviewDiv) {
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${galleryFolder}`;
      fetch(apiUrl).then(response => {
        if (!response.ok) throw new Error("Failed to fetch gallery images.");
        return response.json();
      }).then(files => {
        const imgFiles = files.filter(file =>
          /\.(jpg|jpeg|png|gif)$/i.test(file.name)
        );
        let previewHTML = '';
        imgFiles.slice(0, 3).forEach(file => {
          previewHTML += `<div>
            <img src="${file.download_url}" alt="${file.name}" class="galleryImg"><br>
            <small>${file.name}</small>
          </div>`;
        });
        galleryPreviewDiv.innerHTML = previewHTML;
      }).catch(err => {
        galleryPreviewDiv.innerHTML = "<p>Could not load gallery preview.</p>";
      });
    }
  }

  // Team Stats Table (if on separate page/section)
  if (document.getElementById('teamStatsTable') && !document.getElementById('nextGame')) {
    let teamStatsHTML = `<table>
      <tr>
        <th>Date</th>
        <th>Opponent</th>
        <th>Location</th>
        <th>Our Score</th>
        <th>Opponent Score</th>
        <th>Result</th>
      </tr>`;
    games.forEach(g => {
      teamStatsHTML += `<tr>
        <td>${g.date}</td>
        <td>${g.opponent}</td>
        <td>${g.location}</td>
        <td>${g.ourScore !== null ? g.ourScore : '-'}</td>
        <td>${g.oppScore !== null ? g.oppScore : '-'}</td>
        <td>${g.result ? g.result : 'Upcoming'}</td>
      </tr>`;
    });
    teamStatsHTML += `</table>`;
    document.getElementById('teamStatsTable').innerHTML = teamStatsHTML;
  }

  // Gallery Page: Full gallery and upload form
  if (document.getElementById('galleryFull')) {
    fetchGalleryImages();

    // Upload form (local preview only)
    if (document.getElementById('uploadForm')) {
      document.getElementById('uploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('photoUpload');
        const caption = document.getElementById('photoCaption').value;
        const file = fileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(ev) {
            const imgURL = ev.target.result;
            const div = document.createElement('div');
            div.innerHTML = `<img src="${imgURL}" alt="${caption}" class="galleryImg"><br><small>${caption}</small>`;
            document.getElementById('galleryFull').prepend(div);
          };
          reader.readAsDataURL(file);
          fileInput.value = '';
          document.getElementById('photoCaption').value = '';
        }
      });
    }
  }

  // Stats page (global stats table)
  if (document.getElementById('statsTable')) {
    function renderStats() {
      const stats = getStats();
      if (!stats.length) {
        document.getElementById('statsTable').innerHTML = "No stats yet.";
        return;
      }
      let statsHTML = `<table>
        <tr><th>Player</th><th>Points</th><th>Rebounds</th><th>Assists</th><th>Date</th></tr>`;
      stats.forEach(s => {
        statsHTML += `<tr>
          <td>${s.player}</td>
          <td>${s.points}</td>
          <td>${s.rebounds}</td>
          <td>${s.assists}</td>
          <td>${s.date}</td>
        </tr>`;
      });
      statsHTML += `</table>`;
      document.getElementById('statsTable').innerHTML = statsHTML;
    }
    renderStats();

    if (document.getElementById('statsForm')) {
      document.getElementById('statsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const player = document.getElementById('playerName').value;
        const points = +document.getElementById('points').value;
        const rebounds = +document.getElementById('rebounds').value;
        const assists = +document.getElementById('assists').value;
        const date = document.getElementById('gameDate').value;
        const stats = getStats();
        stats.push({ player, points, rebounds, assists, date });
        saveStats(stats);
        renderStats();
        renderPlayerStats(); // Also update player tables/photos
        e.target.reset();
      });
    }
  }

  // Player Photo upload form
  if (document.getElementById('playerPhotoForm')) {
    document.getElementById('playerPhotoForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('photoPlayerName').value.trim();
      const file = document.getElementById('playerPhotoUpload').files[0];
      if (name && file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          const photos = getPlayerPhotos();
          photos[name] = ev.target.result;
          savePlayerPhotos(photos);
          renderPlayerPhotosAndStats();
        };
        reader.readAsDataURL(file);
        e.target.reset();
      }
    });
  }

  // Render player photos and separate stats tables
  function renderPlayerPhotosAndStats() {
    const stats = getStats();
    const photos = getPlayerPhotos();
    const players = [...new Set(stats.map(s => s.player))];
    const photoDiv = document.getElementById('playerPhotos');
    const tablesDiv = document.getElementById('playerStatsTables');

    // Photos
    photoDiv.innerHTML = players.length 
      ? players.map(name => {
          const imgSrc = photos[name] || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=243d68&color=fff&size=128";
          return `<div>
            <img src="${imgSrc}" alt="${name}">
            <div style="font-weight:600;">${name}</div>
          </div>`;
        }).join('')
      : "<i>No player photos yet.</i>";

    // Stats Tables
    tablesDiv.innerHTML = players.length
      ? players.map(name => {
          const playerStats = stats.filter(s => s.player === name);
          if (!playerStats.length) return '';
          let statsHTML = `<table>
            <caption>${name}'s Stats</caption>
            <tr><th>Date</th><th>Points</th><th>Rebounds</th><th>Assists</th></tr>`;
          playerStats.forEach(s => {
            statsHTML += `<tr>
              <td>${s.date}</td>
              <td>${s.points}</td>
              <td>${s.rebounds}</td>
              <td>${s.assists}</td>
            </tr>`;
          });
          statsHTML += `</table>`;
          return statsHTML;
        }).join('<br>')
      : "<i>No player stats yet.</i>";
  }
  function renderPlayerPhotos() {
    renderPlayerPhotosAndStats();
  }
  function renderPlayerStats() {
    renderPlayerPhotosAndStats();
  }

  // Initial render on page load
  if (document.getElementById('playerPhotos') && document.getElementById('playerStatsTables')) {
    renderPlayerPhotosAndStats();
  }

  // Calendar page
  if (document.getElementById('gameCalendar')) {
    let calHTML = `<table>
      <tr><th>Date</th><th>Opponent</th><th>Location</th><th>Result</th></tr>`;
    games.forEach(g => {
      calHTML += `<tr>
        <td>${g.date}</td>
        <td>${g.opponent}</td>
        <td>${g.location}</td>
        <td>${g.result ? g.result : 'Upcoming'}</td>
      </tr>`;
    });
    calHTML += `</table>`;
    document.getElementById('gameCalendar').innerHTML = calHTML;
  }

  // Advice page
  if (document.getElementById('adviceResult') && document.getElementById('adviceForm')) {
    document.getElementById('adviceForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const topic = document.getElementById('adviceTopic').value;
      document.getElementById('adviceResult').innerHTML = `<div class="advice"><b>${topic.charAt(0).toUpperCase()+topic.slice(1)}:</b> ${advice[topic]}</div>`;
    });
  }

  // Plays page
  if (document.getElementById('playsList')) {
    let playHTML = '';
    plays.forEach(p => {
      playHTML += `<li><b>${p.name}:</b> ${p.desc}</li>`;
    });
    document.getElementById('playsList').innerHTML = playHTML;
  }

  // ==== MANUAL PLAYER PHOTO DISPLAY ====
// Add player info here. Image should be uploaded to images/players/
const players = [
  { name: "Sample Player", img: "images/players/sample_player.jpg" },
  // Add more players below. Example:
  // { name: "John Doe", img: "images/players/john_doe.jpg" },
  // { name: "Jane Smith", img: "images/players/jane_smith.png" },
];

// Display player photos
const playerPhotosDiv = document.getElementById("playerPhotos");
if (playerPhotosDiv) playerPhotosDiv.innerHTML = ""; // Clear any previous content

players.forEach(player => {
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${player.img}" alt="${player.name}">
    <div>${player.name}</div>
  `;
  playerPhotosDiv.appendChild(div);
});

// Hide the upload form since we're using manual method
const form = document.getElementById("playerPhotoForm");
if (form) form.style.display = "none";

// Optional: If you want to show a message instead of the form, uncomment below:
// if (form) {
//   form.insertAdjacentHTML("afterend",
//     "<div style='color: #243d68; font-weight: 600; margin-bottom: 1em;'>Upload is disabled. Please add player images manually to <code>images/players/</code> and update <code>script.js</code>.</div>"
//   );
// }
});
