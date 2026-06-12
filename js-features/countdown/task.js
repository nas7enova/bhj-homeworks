let totalSeconds = 60;

function getCurrentFormattedTime() {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const downloadFile = () => {
	const link = document.createElement("a");
	link.style.display = "none";
	link.href = "https://u.netology.ru/backend/uploads/legal_descriptions/file/34/Prawila_wozwrata_denezhnyh_sredstw._Versiq___10.1_ot_14.08.2025.pdf";
	link.download = "contest_rules.pdf";
	link.target = "_blank";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const countDown = () => {
	if (totalSeconds <= 0) {
		clearInterval(intervalID);
		alert("Вы победили в конкурсе!");
		downloadFile();
		return;
	}

	totalSeconds -= 1;
	const output = document.getElementById("timer");

	if (output) {
		output.textContent = getCurrentFormattedTime();
	}
};

const intervalID = setInterval(countDown, 1000);