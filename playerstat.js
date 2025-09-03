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

document.addEventListener("DOMContentLoaded", function() {
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
});