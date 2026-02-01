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
    const photoUrl = player.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=243d68&color=fff&size=128`;
    
    html += `
      <div class="player-card">
        <div class="player-card-header">
          <img src="${photoUrl}" alt="${player.name}" class="player-photo" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=243d68&color=fff&size=128'">
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
