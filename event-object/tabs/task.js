const containers = document.querySelectorAll(".tab__navigation");

containers.forEach(container => {
    const tabs = container.querySelectorAll(".tab");
    const tabsContainer = container.closest(".tabs");
    const contents = tabsContainer.querySelectorAll(".tab__content");

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            const activeTab = container.querySelector(".tab_active");
            const activeContent = tabsContainer.querySelector(".tab__content_active");

            if (activeTab) {
                activeTab.classList.remove("tab_active");
            }
            if (activeContent) {
                activeContent.classList.remove("tab__content_active");
            }

            tab.classList.add("tab_active");
            contents[index].classList.add("tab__content_active");
        });
    });
});