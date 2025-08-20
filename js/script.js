fetch('data/games.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('nextGame').innerText = `${data.upcoming.opponent} on ${data.upcoming.date}`;
    document.getElementById('standings').innerText = `Wins: ${data.standing.wins}, Losses: ${data.standing.losses}`;
  });

fetch('data/players.json')
  .then(res => res.json())
  .then(players => {
    const tbody = document.querySelector('#playerStats tbody');
    players.forEach(p => {
      const row = `<tr><td>${p.name}</td><td>${p.points}</td><td>${p.assists}</td><td>${p.rebounds}</td></tr>`;
      tbody.innerHTML += row;
    });
  });
