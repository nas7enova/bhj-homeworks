const counterElement = document.getElementById("clicker__counter");
const cookieImage = document.getElementById("cookie");
const speedElement = document.getElementById("clicker__speed");

let clickCount = 0;
let lastClickTime = null;

const smallSize = 150;
const largeSize = 200;

cookieImage.style.width = largeSize + "px";

cookieImage.onclick = function() {
	const currentTime = Date.now();

	clickCount += 1;
	counterElement.textContent = clickCount;

	if (lastClickTime !== null) {
		const timeDifference = (currentTime - lastClickTime) / 1000;
		const clickSpeed = (1 / timeDifference).toFixed(2);
		speedElement.textContent = clickSpeed;
	} else {
		speedElement.textContent = 0;
	}

	lastClickTime = currentTime;

	if (clickCount % 2 === 1) {
		cookieImage.style.width = smallSize + "px";
	} else {
		cookieImage.style.width = largeSize + "px";
	}
};