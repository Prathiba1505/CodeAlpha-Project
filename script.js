const socket = new WebSocket('ws://localhost:3000');

const matchmakingBtn = document.getElementById('matchmakingBtn');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');

let playerStats = {
  wins: 0,
  losses: 0
};

matchmakingBtn.addEventListener('click', function() {
  initiateMatchmaking();
});

socket.onopen = function() {
  console.log('Connected to the game server');
  socket.send(JSON.stringify({ action: 'join', player: 'Player1' }));
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Received game data:', data);
  if (data.action === 'matchmaking') {
    handleMatchmaking(data);
  } else if (data.action === 'gameUpdate') {
    updateGameStats(data.stats);
  }
};
socket.onclose = function() {
  console.log('Disconnected from the game server');
};

function initiateMatchmaking() {
  matchmakingBtn.disabled = true;
  matchmakingBtn.textContent = 'Searching for a match...';
  socket.send(JSON.stringify({ action: 'startMatchmaking', player: 'Player1' }));
}
function handleMatchmaking(data) {
  if (data.success) {
    console.log('Match found:', data.matchDetails);
    matchmakingBtn.textContent = 'Match Found! Starting Game...';
    setTimeout(() => {
      window.location.href = '/game';
    }, 2000);
  } else {
    matchmakingBtn.textContent = 'No Match Found. Retry?';
    matchmakingBtn.disabled = false;
  }
}

function updateGameStats(stats) {
  playerStats = stats;
  winsDisplay.textContent = playerStats.wins;
  lossesDisplay.textContent = playerStats.losses;
}

document.getElementById('logoutBtn').addEventListener('click', function() {
  window.location.href = '/login';
});
