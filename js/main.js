// Nav Bar Toggle
let toggleBtn = document.getElementById("toggle-btn");
let headerTitle = document.querySelector(".nav-title");
let body = document.getElementById("body");
let links = document.querySelectorAll(".side-bar-link");
let sideBar = document.getElementById("side-bar");

toggleBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
	toggleBtn.classList.toggle("toggled");

	if (
		sideBar.style.transform === "translateX(-200%)" ||
		sideBar.style.transform === ""
	) {
		headerTitle.style.color = "$dark-color";
		sideBar.style.transform = "translateX(0px)";
		body.style.overflowY = "hidden";
	} else {
		headerTitle.style.color = "#19150f"; // $primary-color en lugar de #665b55
		sideBar.style.transform = "translateX(-200%)";
		body.style.overflowY = "auto";
	}
}

links.forEach((link) =>
	link.addEventListener("click", () => {
		sideBar.style.transform = "translateX(-200%)";
		body.style.overflowY = "auto";
		toggleBtn.classList.toggle("toggled");
	})
);

// Accordion
document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".vip-header");
	const content = document.querySelector(".vip-content");
	const toggle = document.querySelector(".vip-toggle");

	header.addEventListener("click", () => {
		content.classList.toggle("active");
		toggle.classList.toggle("active");
	});
});
