const socket = new WebSocket('ws://localhost:3000');

const gameStatus = document.getElementById('gameStatus');
const endGameBtn = document.getElementById('endGameBtn');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const oppWinsDisplay = document.getElementById('oppWins');
const oppLossesDisplay = document.getElementById('oppLosses');
const gameBoard = document.getElementById('gameBoard');

let playerStats = {
  wins: 0,
  losses: 0
};

let opponentStats = {
  wins: 0,
  losses: 0
};

let gameState = [];

socket.onopen = function() {
  console.log('Connected to the game server');
  socket.send(JSON.stringify({ action: 'joinGame', player: 'Player1' }));
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Received game data:', data);
  if (data.action === 'gameUpdate') {
    updateGameStatus(data);
  } else if (data.action === 'gameOver') {
    endGame(data);
  }
};

function updateGameStatus(data) {
  if (data.status === 'waiting') {
    gameStatus.textContent = 'Waiting for opponent...';
  } else if (data.status === 'playing') {
    gameStatus.textContent = 'Game in progress';
    updateGameBoard(data.board);
  }

  playerStats = data.playerStats;
  opponentStats = data.opponentStats;
  winsDisplay.textContent = playerStats.wins;
  lossesDisplay.textContent = playerStats.losses;
  oppWinsDisplay.textContent = opponentStats.wins;
  oppLossesDisplay.textContent = opponentStats.losses;
}

function updateGameBoard(board) {
  gameState = board;
  gameBoard.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.textContent = gameState[i] || '';
    cell.addEventListener('click', () => handleCellClick(i));
    gameBoard.appendChild(cell);
  }
}
function handleCellClick(index) {
  if (!gameState[index]) {
    gameState[index] = 'X'; 
    socket.send(JSON.stringify({ action: 'makeMove', player: 'Player1', index: index }));
    updateGameBoard(gameState); 
  }
}
function endGame(data) {
  gameStatus.textContent = 'Game Over!';
  if (data.winner === 'Player1') {
    winsDisplay.textContent = playerStats.wins + 1;
  } else {
    lossesDisplay.textContent = playerStats.losses + 1;
  }

  window.location.href = 'homepage.html';
}

endGameBtn.addEventListener('click', function() {
  socket.send(JSON.stringify({ action: 'endGame', player: 'Player1' }));
  gameStatus.textContent = 'Ending game...';
  endGameBtn.disabled = true;
  window.location.href = 'homepage.html';
});

document.getElementById('profileBtn').addEventListener('click', function() {
  window.location.href = 'profile.html';
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  socket.send(JSON.stringify({ action: 'logout', player: 'Player1' }));
  window.location.href = 'index.html';
});
