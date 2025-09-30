// playoff-react.js
// Drop this in your repo and load it in playoff.html as described.
// Requires: standings-data.js with window.standing array.
// Requires: React and ReactDOM loaded via CDN.

function sortStandings(standing) {
  // Sort by win, then loss, then point differential
  const parseRecord = r => {
    const [win, loss] = r.record.split("–").map(Number);
    return { win, loss };
  };
  return [...standing].sort((a, b) => {
    const ra = parseRecord(a), rb = parseRecord(b);
    if (rb.win !== ra.win) return rb.win - ra.win;
    if (ra.loss !== rb.loss) return ra.loss - rb.loss;
    return b.pointDifferential - a.pointDifferential;
  });
}

function PlayoffBracket() {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    if (window.standing && Array.isArray(window.standing)) {
      setTeams(sortStandings(window.standing));
    }
  }, []);

  if (!teams.length) return React.createElement('div', null, "Loading bracket...");

  // Division 3 Playoff Seeds
  const d3 = teams.slice(0, 4);
  // Division 4 Playoff Seeds
  const d4 = teams.slice(4, 12);
  // Eliminated Teams
  const eliminated = teams.slice(12);

  return React.createElement("div", null,
    React.createElement("h2", null, "Division 3–4 Playoff Bracket"),

    // Division 3
    React.createElement("section", null,
      React.createElement("h3", null, "🏀 Division 3 Playoffs"),
      React.createElement("table", { className: "bracket-table" },
        React.createElement("thead", null,
          React.createElement("tr", null,
            React.createElement("th", null, "Matchup"),
            React.createElement("th", null, "Teams")
          )
        ),
        React.createElement("tbody", null,
          React.createElement("tr", null,
            React.createElement("td", { colSpan: 2, style: { textAlign: "center", fontWeight: "bold" } }, "Semifinals")
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "Seed 1 vs. Seed 4"),
            React.createElement("td", null, `${d3[0]?.name || ""} (Seed 1) vs. ${d3[3]?.name || ""} (Seed 4)`)
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "Seed 2 vs. Seed 3"),
            React.createElement("td", null, `${d3[1]?.name || ""} (Seed 2) vs. ${d3[2]?.name || ""} (Seed 3)`)
          ),
          React.createElement("tr", null,
            React.createElement("td", { colSpan: 2, style: { textAlign: "center", fontWeight: "bold" } }, "Finals")
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "SF1 Winner (1/4) vs. SF2 Winner (2/3)"),
            React.createElement("td", null, "🏆 Division 3 Champion")
          )
        )
      )
    ),

    // Division 4
    React.createElement("section", null,
      React.createElement("h3", null, "🏀 Division 4 Playoffs"),
      React.createElement("table", { className: "bracket-table" },
        React.createElement("thead", null,
          React.createElement("tr", null,
            React.createElement("th", null, "Matchup"),
            React.createElement("th", null, "Teams")
          )
        ),
        React.createElement("tbody", null,
          React.createElement("tr", null,
            React.createElement("td", { colSpan: 2, style: { textAlign: "center", fontWeight: "bold" } }, "Quarterfinals")
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "Seed 5 vs. Seed 12"),
            React.createElement("td", null, `${d4[0]?.name || ""} (Seed 5) vs. ${d4[7]?.name || ""} (Seed 12)`)
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "Seed 8 vs. Seed 9"),
            React.createElement("td", null, `${d4[3]?.name || ""} (Seed 8) vs. ${d4[4]?.name || ""} (Seed 9)`)
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "Seed 7 vs. Seed 10"),
            React.createElement("td", null, `${d4[2]?.name || ""} (Seed 7) vs. ${d4[5]?.name || ""} (Seed 10)`)
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "Seed 6 vs. Seed 11"),
            React.createElement("td", null, `${d4[1]?.name || ""} (Seed 6) vs. ${d4[6]?.name || ""} (Seed 11)`)
          ),
          React.createElement("tr", null,
            React.createElement("td", { colSpan: 2, style: { textAlign: "center", fontWeight: "bold" } }, "Semifinals")
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "QF1 Winner (5/12) vs. QF2 Winner (8/9)"),
            React.createElement("td", null, "SF1")
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "QF3 Winner (7/10) vs. QF4 Winner (6/11)"),
            React.createElement("td", null, "SF2")
          ),
          React.createElement("tr", null,
            React.createElement("td", { colSpan: 2, style: { textAlign: "center", fontWeight: "bold" } }, "Final Matchup")
          ),
          React.createElement("tr", null,
            React.createElement("td", null, "SF1 Winner vs. SF2 Winner"),
            React.createElement("td", null, "🏆 Division 4 Champion")
          )
        )
      )
    ),

    // Eliminated Teams
    React.createElement("section", null,
      React.createElement("h3", { style: { color: "red" } },
        React.createElement("i", { className: "fas fa-times-circle" }),
        " Eliminated Team"
      ),
      React.createElement("table", { className: "eliminated-table" },
        React.createElement("thead", null,
          React.createElement("tr", null,
            React.createElement("th", null, "Seed"),
            React.createElement("th", null, "Status")
          )
        ),
        React.createElement("tbody", null,
          eliminated.map((team, i) =>
            React.createElement("tr", { key: team.seed || i },
              React.createElement("td", null, `${team.seed || ""} - ${team.name || ""}`),
              React.createElement("td", { style: { color: "red", fontWeight: "bold" } }, "ELIMINATED")
            )
          )
        )
      )
    )
  );
}

// Mount React app
document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("react-root");
  if (root) {
    ReactDOM.render(
      React.createElement(PlayoffBracket),
      root
    );
  }
});