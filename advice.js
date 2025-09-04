const advice = {
  offense: "Move the ball quickly, look for open shots, and set effective screens. Avoid stagnant offense.",
  defense: "Communicate, switch on screens if needed, and always box out after a shot. Defense wins games!",
  teamwork: "Trust each other, keep heads up for passes, and celebrate small wins together.",
  conditioning: "Run sprints, focus on agility drills, and hydrate before and after games.",
  shooting: "Practice form daily, focus on follow-through, and use legs for power."
};

document.addEventListener("DOMContentLoaded", function() {
  const adviceForm = document.getElementById('adviceForm');
  const adviceResult = document.getElementById('adviceResult');
  
  if (adviceForm && adviceResult) {
    adviceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const topic = document.getElementById('adviceTopic').value;
      adviceResult.innerHTML = `<div class="advice"><b>${topic.charAt(0).toUpperCase() + topic.slice(1)}:</b> ${advice[topic]}</div>`;
    });
  }
});