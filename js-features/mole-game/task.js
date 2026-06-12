const moleKilled = document.getElementById("dead");
const loss = document.getElementById("lost");
let win = 0;
let lostCount = 0;

const holes = Array.from({
	length: 9
}, (_, i) => document.getElementById(`hole${i + 1}`));

function resetGame() {
	win = 0;
	lostCount = 0;
	moleKilled.textContent = win;
	loss.textContent = lostCount;
}

holes.forEach(hole => {
	if (hole) {
		hole.addEventListener("click", function() {
			if (this.classList.contains("hole_has-mole")) {
				win++;
				moleKilled.textContent = win;

				if (win === 10) {
					alert("Победа!");
					resetGame();
				}
			} else {
				lostCount++;
				loss.textContent = lostCount;

				if (lostCount === 5) {
					alert("Вы проиграли!");
					resetGame();
				}
			}
		});
	}
});