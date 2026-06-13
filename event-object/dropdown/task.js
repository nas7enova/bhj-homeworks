const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
const dropdownValue = dropdown.querySelector(".dropdown__value");
const dropdownList = dropdown.querySelector(".dropdown__list");
const dropdownLinks = dropdown.querySelectorAll(".dropdown__link");

dropdownValue.addEventListener("click", function() {
    dropdownList.classList.toggle("dropdown__list_active");
});

dropdownLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); 
        dropdownValue.textContent = this.textContent;
        dropdownList.classList.remove("dropdown__list_active");
    });
    });
});