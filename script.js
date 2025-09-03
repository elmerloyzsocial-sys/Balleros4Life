// Data simulation: replace with backend or localStorage in production

const games = [
  // Add your upcoming schedules here:
  { date: '2025-08-30', opponent: 'No games', time: '-', result: 'Rest', ourScore: null, oppScore: null },
  { date: '2025-08-31', opponent: 'PBAO Family Day', time: '11:00AM', result: 'Event', ourScore: null, oppScore: null },
  { date: '2025-09-06', opponent: "Henry's Harvest", time: '3:30PM', result: 'Comp', ourScore: null, oppScore: null },
  { date: '2025-09-13', opponent: 'No games', time: '-', result: 'Rest', ourScore: null, oppScore: null },
  { date: '2025-09-20', opponent: 'TBD', time: 'Home', result: null, ourScore: null, oppScore: null },
  { date: '2025-10-11', opponent: 'Playoffs', time: '11:00AM', result: 'Playoff', ourScore: null, oppScore: null }
];

const standing = [
  { name: 'Masagana', record: '8–0', pointDifferential: 125 },
  { name: 'World Remit', record: '6–2', pointDifferential: 45 },
  { name: 'Ted Fencing', record: '5–3', pointDifferential: 71 },
  { name: "Henry's Harvest", record: '5–3', pointDifferential: 54 },
  { name: 'Hype Signs', record: '5–3', pointDifferential: 18 },
  { name: 'Laserbond', record: '4–4', pointDifferential: 15 },
  { name: 'Elegance Eyewear', record: '4–3', pointDifferential: -4 },
  { name: 'Prime One', record: '4–4', pointDifferential: -5 },
  { name: 'Poke Bowl', record: '3–4', pointDifferential: -14 },
  { name: 'RnR Sportswear', record: '3–5', pointDifferential: -22 },
  { name: 'Simply Fin Wiz', record: '3–5', pointDifferential: -80 },
  { name: "Angie's Vlog", record: '2–6', pointDifferential: -61 },
  { name: 'McGrath Mitsubishi', record: '2–6', pointDifferential: -78 },
  { name: 'Jet1 Plumbing', record: '1–7', pointDifferential: -78 }
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
      <b>Time:</b> ${upcoming.time}
    ` : 'No upcoming games.';

    // Standings
    let standingsHTML = `<table><tr><th>Team</th><th>Record</th><th>Point Differential</th></tr>`;
    standing.forEach(s => standingsHTML += `<tr><td>${s.name}</td><td>${s.record}</td><td>${s.pointDifferential}</td></tr>`);
    standingsHTML += `</table>`;
    document.getElementById('standingsTable').innerHTML = standingsHTML;

    // Team Stats Table
    let teamStatsHTML = `<table>
      <tr>
        <th>Date</th>
        <th>Opponent</th>
        <th>Time</th>
        <th>Our Score</th>
        <th>Opponent Score</th>
        <th>Result</th>
      </tr>`;
    games.forEach(g => {
      teamStatsHTML += `<tr>
        <td>${g.date}</td>
        <td>${g.opponent}</td>
        <td>${g.time}</td>
        <td>${g.ourScore !== null ? g.ourScore : '-'}</td>
        <td>${g.oppScore !== null ? g.oppScore : '-'}</td>
        <td>${g.result ? g.result : 'Upcoming'}</td>
      </tr>`;
    });
    teamStatsHTML += `</table>`;
    document.getElementById('teamStatsTable').innerHTML = teamStatsHTML;

    // Events & Team Games Table
    const eventsTableBody = document.getElementById('eventsTableBody');
    if (eventsTableBody) {
      eventsTableBody.innerHTML = games.map(g => `
        <tr>
          <td>${g.date}</td>
          <td>${g.opponent}</td>
          <td>${g.time}</td>
          <td>${g.ourScore !== null ? g.ourScore : '-'}</td>
          <td>${g.oppScore !== null ? g.oppScore : '-'}</td>
          <td>${g.result ? g.result : 'Upcoming'}</td>
        </tr>
      `).join('');
    }
  }

  // Team Stats Table (if on separate page/section)
  if (document.getElementById('teamStatsTable') && !document.getElementById('nextGame')) {
    let teamStatsHTML = `<table>
      <tr>
        <th>Date</th>
        <th>Opponent</th>
        <th>Time</th>
        <th>Our Score</th>
        <th>Opponent Score</th>
        <th>Result</th>
      </tr>`;
    games.forEach(g => {
      teamStatsHTML += `<tr>
        <td>${g.date}</td>
        <td>${g.opponent}</td>
        <td>${g.time}</td>
        <td>${g.ourScore !== null ? g.ourScore : '-'}</td>
        <td>${g.oppScore !== null ? g.oppScore : '-'}</td>
        <td>${g.result ? g.result : 'Upcoming'}</td>
      </tr>`;
    });
    teamStatsHTML += `</table>`;
    document.getElementById('teamStatsTable').innerHTML = teamStatsHTML;
  }

  // Calendar page
  if (document.getElementById('gameCalendar')) {
    let calHTML = `<table>
      <tr><th>Date</th><th>Opponent</th><th>Time</th><th>Result</th></tr>`;
    games.forEach(g => {
      calHTML += `<tr>
        <td>${g.date}</td>
        <td>${g.opponent}</td>
        <td>${g.time}</td>
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
  { name: "Loyz", img: "images/players/Loyz.jpg" },
  { name: "Jerwin", img: "images/players/Jerwin.jpg" },
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