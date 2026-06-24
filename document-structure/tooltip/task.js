const hint = document.createElement("div");
hint.classList.add("tooltip");
document.querySelector("body").appendChild(hint);

Array.from(document.getElementsByClassName("has-tooltip")).forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const title = link.getAttribute("title");

        if (title === hint.innerText) {
            hint.classList.toggle("tooltip_active");
            return;
        }

        hint.classList.add("tooltip_active");
        hint.innerText = title;

        const { left, top } = getLinkCoords(link);
        hint.style.left = `${left}px`;
        hint.style.top = `${top}px`;
        
        console.log(title);
    });
});

function getLinkCoords(link) {
    const linkCoords = link.getBoundingClientRect();
    const linkDataPosition = link.dataset.position;

    switch (linkDataPosition) {
        case "right":
            return { left: linkCoords.right, top: linkCoords.top };
        case "top":
            return { left: linkCoords.left, top: linkCoords.top - 40 };
        case "left": {
            const hintCoords = link.getBoundingClientRect();
            return { left: linkCoords.left - hintCoords.width - 10, top: linkCoords.top + 20 };
        }
        default:
            return { left: linkCoords.left, top: linkCoords.top + 20 };
    }
}