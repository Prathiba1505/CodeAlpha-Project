const socket = new WebSocket('ws://localhost:3000');

const matchmakingBtn = document.getElementById('matchmakingBtn');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const playerNameDisplay = document.getElementById('playerName');

let playerStats = {
  wins: 0,
  losses: 0
};

matchmakingBtn.addEventListener('click', function() {
  initiateMatchmaking();
});

socket.onopen = function() {
  console.log('Connected to the game server');

  socket.send(JSON.stringify({ action: 'authenticate', player: 'Player1' }));
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Received game data:', data);

  if (data.action === 'matchmaking') {
    handleMatchmaking(data);
  } else if (data.action === 'gameUpdate') {
    updateGameStats(data.stats);
  } else if (data.action === 'authenticated') {
    playerNameDisplay.textContent = data.playerName;
    playerStats = data.stats;
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
  
  setTimeout(() => {
    matchmakingBtn.textContent = 'Match Found! Starting Game...';
    
    setTimeout(() => {
      window.location.href = 'game.html';
    }, 2000);
  }, 10000);
}

function handleMatchmaking(data) {
  if (data.success) {
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

document.getElementById('profileBtn').addEventListener('click', function() {
  window.location.href = 'profile.html'; 
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  socket.send(JSON.stringify({ action: 'logout', player: 'Player1' }));
  window.location.href = 'index.html';
});
