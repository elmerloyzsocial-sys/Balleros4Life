// Data simulation: replace with backend or localStorage in production

// Games, Standings, and Gallery
const games = [
  { date: '2025-08-22', opponent: 'Falcons', location: 'Home', result: null },
  { date: '2025-08-29', opponent: 'Eagles', location: 'Away', result: null },
  { date: '2025-08-15', opponent: 'Bulls', location: 'Away', result: 'Win' },
  { date: '2025-08-08', opponent: 'Sharks', location: 'Home', result: 'Loss' }
];

const standings = [
  { team: 'Ballero4Life', wins: 1, losses: 1 },
  { team: 'Falcons', wins: 2, losses: 0 },
  { team: 'Eagles', wins: 1, losses: 1 },
  { team: 'Bulls', wins: 0, losses: 2 }
];

// Gallery: images in /gallery/ folder
const galleryImages = [
  { file: 'game1.jpg', caption: 'Victory against Bulls' },
  { file: 'game2.jpg', caption: 'Team huddle' },
  { file: 'game3.jpg', caption: 'Action shot' }
];

// Plays
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

// Advice
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

// DOM logic per page
document.addEventListener("DOMContentLoaded", function() {
  // Home page
  if (document.getElementById('nextGame')) {
    // Upcoming game
    const upcoming = games.filter(g => !g.result && new Date(g.date) >= new Date()).sort((a,b) => new Date(a.date) - new Date(b.date))[0];
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

    // Gallery preview
    let previewHTML = '';
    galleryImages.slice(0,3).forEach(img => {
      previewHTML += `<div><img src="gallery/${img.file}" alt="${img.caption}"><br><small>${img.caption}</small></div>`;
    });
    document.getElementById('galleryPreview').innerHTML = previewHTML;
  }

  // Gallery
  if (document.getElementById('galleryFull')) {
    let galleryHTML = '';
    galleryImages.forEach(img => {
      galleryHTML += `<div><img src="gallery/${img.file}" alt="${img.caption}"><br><small>${img.caption}</small></div>`;
    });
    document.getElementById('galleryFull').innerHTML = galleryHTML;

    // Upload form (local, not to GitHub but for preview)
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
          div.innerHTML = `<img src="${imgURL}" alt="${caption}"><br><small>${caption}</small>`;
          document.getElementById('galleryFull').prepend(div);
        };
        reader.readAsDataURL(file);
        fileInput.value = '';
        document.getElementById('photoCaption').value = '';
      }
    });
  }

  // Stats
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
      e.target.reset();
    });
  }

  // Calendar
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

  // Advice
  if (document.getElementById('adviceResult')) {
    document.getElementById('adviceForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const topic = document.getElementById('adviceTopic').value;
      document.getElementById('adviceResult').innerHTML = `<div class="advice"><b>${topic.charAt(0).toUpperCase()+topic.slice(1)}:</b> ${advice[topic]}</div>`;
    });
  }

  // Plays
  if (document.getElementById('playsList')) {
    let playHTML = '';
    plays.forEach(p => {
      playHTML += `<li><b>${p.name}:</b> ${p.desc}</li>`;
    });
    document.getElementById('playsList').innerHTML = playHTML;
  }
});