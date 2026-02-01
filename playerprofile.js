// Player data with photos and jersey numbers
const playerData = [
  { number: '1', name: 'Jerwin P.', photo: 'images/players/Jerwin.jpg', notes: 'Captain (C)' },
  { number: '55', name: 'Dan A.', photo: null, notes: '' },
  { number: '10', name: 'Rey R.', photo: null, notes: '' },
  { number: '3', name: 'Dee S.', photo: null, notes: '' },
  { number: '6', name: 'Bryan S.', photo: null, notes: '' },
  { number: '19', name: 'Jay J.', photo: null, notes: '' },
  { number: '42', name: 'Loyz V.', photo: 'images/players/Loyz.JPG', notes: '' },
  { number: '11', name: 'Elvis C.', photo: null, notes: '' },
  { number: '13', name: 'Lloyd C.', photo: null, notes: '' },
  { number: '14', name: 'Jeremy S.', photo: null, notes: '' },
  { number: '8', name: 'Jordan C.', photo: null, notes: '' }
];

// Get stats from localStorage
function getStats() {
  return JSON.parse(localStorage.getItem('playerStats') || '[]');
}

// Calculate aggregate stats for a player
function calculatePlayerStats(playerName) {
  const stats = getStats();
  const playerStats = stats.filter(s => s.player === playerName);
  
  if (playerStats.length === 0) {
    return null;
  }
  
  const totalPoints = playerStats.reduce((sum, s) => sum + parseInt(s.points || 0), 0);
  const totalRebounds = playerStats.reduce((sum, s) => sum + parseInt(s.rebounds || 0), 0);
  const totalAssists = playerStats.reduce((sum, s) => sum + parseInt(s.assists || 0), 0);
  const gamesPlayed = playerStats.length;
  
  return {
    totalPoints,
    totalRebounds,
    totalAssists,
    gamesPlayed,
    avgPoints: (totalPoints / gamesPlayed).toFixed(1),
    avgRebounds: (totalRebounds / gamesPlayed).toFixed(1),
    avgAssists: (totalAssists / gamesPlayed).toFixed(1),
    gameStats: playerStats
  };
}

// Render player profiles
function renderPlayerProfiles() {
  const container = document.getElementById('playerProfiles');
  
  if (!container) return;
  
  let html = '';
  
  playerData.forEach(player => {
    const stats = calculatePlayerStats(player.name);
    const photoUrl = player.photo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect fill='%23243d68' width='128' height='128'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.35em' fill='white' font-family='Arial' font-size='48' font-weight='bold'%3E" + player.name.charAt(0) + "%3C/text%3E%3C/svg%3E";
    
    html += `
      <div class="player-card">
        <div class="player-card-header">
          <img src="${photoUrl}" alt="${player.name}" class="player-photo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22128%22 height=%22128%22%3E%3Crect fill=%22%23243d68%22 width=%22128%22 height=%22128%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%220.35em%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2248%22 font-weight=%22bold%22%3E${player.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
          <div class="player-info">
            <h3>${player.name}</h3>
            <div class="player-number">Jersey #${player.number}</div>
            ${player.notes ? `<div class="player-number" style="color: #f7b32b; font-weight: bold;">${player.notes}</div>` : ''}
          </div>
        </div>
        <div class="player-stats">
    `;
    
    if (stats) {
      html += `
        <h4>Season Statistics</h4>
        <div class="stats-summary">
          <div class="stat-box">
            <div class="stat-label">PPG</div>
            <div class="stat-value">${stats.avgPoints}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">RPG</div>
            <div class="stat-value">${stats.avgRebounds}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">APG</div>
            <div class="stat-value">${stats.avgAssists}</div>
          </div>
        </div>
        <table class="stats-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>PTS</th>
              <th>REB</th>
              <th>AST</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      stats.gameStats.forEach(game => {
        html += `
          <tr>
            <td>${game.date}</td>
            <td>${game.points}</td>
            <td>${game.rebounds}</td>
            <td>${game.assists}</td>
          </tr>
        `;
      });
      
      html += `
          </tbody>
        </table>
      `;
    } else {
      html += `<div class="no-stats">No statistics available yet</div>`;
    }
    
    html += `
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderPlayerProfiles();
});
