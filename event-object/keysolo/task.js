class Game {
	constructor(container) {
		this.container = container;
		this.wordElement = container.querySelector('.word');
		this.winsElement = container.querySelector('.status__wins');
		this.lossElement = container.querySelector('.status__loss');
		this.timerElement = container.querySelector('.status__timer');
		this.timerID = null;
		this.currentTime = 0;
		this.waitingForNextWord = false;

		this.reset();
		this.registerEvents();
	}

	reset() {
		this.winsElement.textContent = 0;
		this.lossElement.textContent = 0;
		this.stopTimer();
		if (this.timerElement) {
			this.timerElement.textContent = 0;
		}
		this.setNewWordWithDelay();
	}

	registerEvents() {
		const check = (e) => {
			if (e.key.length !== 1) return;
			if (this.waitingForNextWord) return;

			const symbol = this.currentSymbol.textContent;
			if (e.key.toLowerCase() === symbol.toLowerCase()) {
				this.success();
			} else {
				this.fail();
			}
		};
		document.addEventListener('keyup', check);
	}

	setNewWordWithDelay() {
		this.waitingForNextWord = true;

		const delay = Math.floor(Math.random() * 4000) + 1000;

		setTimeout(() => {
			const word = this.getWord();
			this.renderWord(word);
			this.startTimer(word.length);
			this.waitingForNextWord = false;
		}, delay);
	}

	startTimer(seconds) {
		this.stopTimer();
		this.currentTime = seconds;
		if (this.timerElement) {
			this.timerElement.textContent = this.currentTime;
		}

		this.timerID = setInterval(() => {
			this.currentTime--;
			if (this.timerElement) {
				this.timerElement.textContent = this.currentTime;
			}

			if (this.currentTime <= 0) {
				this.stopTimer();
				this.fail();
			}
		}, 1000);
	}

	stopTimer() {
		if (this.timerID) {
			clearInterval(this.timerID);
			this.timerID = null;
		}
	}

	success() {
		this.stopTimer();

		if (this.currentSymbol.classList.contains("symbol_current")) {
			this.currentSymbol.classList.remove("symbol_current");
		}
		this.currentSymbol.classList.add('symbol_correct');
		this.currentSymbol = this.currentSymbol.nextElementSibling;

		if (this.currentSymbol !== null) {
			this.currentSymbol.classList.add('symbol_current');
			const remainingSymbols = this.wordElement.querySelectorAll('.symbol:not(.symbol_correct)').length;
			this.startTimer(remainingSymbols);
			return;
		}

		let wins = +this.winsElement.textContent + 1;
		this.winsElement.textContent = wins;

		if (wins === 10) {
			alert('Победа!');
			this.reset();
		} else {
			this.setNewWordWithDelay();
		}
	}

	fail() {
		this.stopTimer();

		let losses = +this.lossElement.textContent + 1;
		this.lossElement.textContent = losses;

		if (losses === 3) {
			alert('Вы проиграли!');
			this.reset();
		} else {
			this.setNewWordWithDelay();
		}
	}

	setNewWord() {
		const word = this.getWord();
		this.renderWord(word);
		this.startTimer(word.length);
	}

	getWord() {
		const words = [
			'bob',
			'awesome',
			'netology',
			'hello',
			'kitty',
			'rock',
			'youtube',
			'popcorn',
			'cinema',
			'love',
			'javascript'
		]
		const index = Math.floor(Math.random() * words.length);
		return words[index];
	}

	renderWord(word) {
		const html = [...word]
			.map((s, i) => `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`)
			.join('');
		this.wordElement.innerHTML = html;
		this.currentSymbol = this.wordElement.querySelector('.symbol_current');
	}
}

new Game(document.getElementById('game'));