// This script allows the editor to update next game details directly on the page.

// Helper functions for formatting
function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function formatTime(date) {
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${min}`;
}

function parseDate(dateStr) {
  // Expects DD-MM-YYYY
  const [dd, mm, yyyy] = dateStr.split('-').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

function parseTime(timeStr) {
  // Expects HH:MM
  const [hh, min] = timeStr.split(':').map(Number);
  return { hh, min };
}

// Initial data (can be changed by editor)
let nextGameData = {
  date: '15-09-2025',       // DD-MM-YYYY
  time: '18:30',            // HH:MM (24-hour)
  opponent: 'Rival Ballers' // Opponent name
};

// Render next game info (view or edit mode)
function renderNextGame(editMode = false) {
  const nextGameDiv = document.getElementById('nextGame');
  if (!nextGameDiv) return;

  if (editMode) {
    // Editable form
    nextGameDiv.innerHTML = `
      <form id="nextGameForm">
        <label>Date (DD-MM-YYYY): <input type="text" id="ngDate" value="${nextGameData.date}" pattern="\\d{2}-\\d{2}-\\d{4}" required></label><br>
        <label>Time (HH:MM, 24h): <input type="text" id="ngTime" value="${nextGameData.time}" pattern="\\d{2}:\\d{2}" required></label><br>
        <label>Opponent: <input type="text" id="ngOpponent" value="${nextGameData.opponent}" required></label><br>
        <button type="submit">Save</button>
        <button type="button" id="cancelEdit">Cancel</button>
      </form>
    `;
    document.getElementById('nextGameForm').onsubmit = function(e) {
      e.preventDefault();
      // Get new values
      const date = document.getElementById('ngDate').value;
      const time = document.getElementById('ngTime').value;
      const opponent = document.getElementById('ngOpponent').value;
      // Validate date and time
      if (!/^\d{2}-\d{2}-\d{4}$/.test(date) || !/^\d{2}:\d{2}$/.test(time) || !opponent.trim()) {
        alert('Please enter valid details.');
        return;
      }
      nextGameData.date = date;
      nextGameData.time = time;
      nextGameData.opponent = opponent;
      renderNextGame(false);
    };
    document.getElementById('cancelEdit').onclick = () => renderNextGame(false);
  } else {
    // Display mode
    nextGameDiv.innerHTML = `
      <ul>
        <li><strong>Date:</strong> ${nextGameData.date}</li>
        <li><strong>Time:</strong> ${nextGameData.time}</li>
        <li><strong>Opponent:</strong> ${nextGameData.opponent}</li>
      </ul>
      <button id="editNextGame">Edit</button>
    `;
    document.getElementById('editNextGame').onclick = () => renderNextGame(true);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => renderNextGame(false));