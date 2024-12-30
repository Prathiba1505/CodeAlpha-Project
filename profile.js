document.getElementById('logoutBtn').addEventListener('click', function() {
  window.location.href = 'index.html';
});
function fetchPlayerProfile() {
  const playerProfile = {
    name: 'Player1',
    email: 'player@example.com',
    wins: 10,
    losses: 5
  };
  document.getElementById('playerName').textContent = playerProfile.name;
  document.getElementById('playerEmail').textContent = playerProfile.email;
  document.getElementById('playerWins').textContent = playerProfile.wins;
  document.getElementById('playerLosses').textContent = playerProfile.losses;
}
window.onload = fetchPlayerProfile;
