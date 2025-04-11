// products.js

document.addEventListener("DOMContentLoaded", () => {
	// Function to load and render the product list on products.html
	const renderProductList = (products) => {
		// Get the container where product cards will be rendered
		const productContainer = document.getElementById("product-list-container");
		if (!productContainer) return; // Exit if container doesn't exist

		// Clear any existing content in the container
		productContainer.innerHTML = "";

		// Loop through each product to create a card
		products.forEach((product) => {
			// Create the card link element
			const card = document.createElement("a");
			card.href = `./product-detail.html?id=${product.id}`; // Set link to product detail page
			card.className = "product-card card";
			card.style.backgroundImage = `url('${product.image}')`; // Set background image

			// Create the footer container for name, price, and button
			const footer = document.createElement("div");
			footer.className = "product-footer";

			// Create the info container for name and price
			const footerInfo = document.createElement("div");
			footerInfo.className = "product-footer-info";

			// Create the product name element
			const name = document.createElement("h3");
			name.className = "product-name";
			name.textContent = product.name;

			// Create the product price element
			const price = document.createElement("p");
			price.className = "product-price";
			price.textContent = `$${product.price.toFixed(2)}`;

			// Create the "Detalles" button
			const button = document.createElement("button");
			button.className = "product-btn";
			button.textContent = "Detalles";

			// Append name and price to the footer info container
			footerInfo.appendChild(name);
			footerInfo.appendChild(price);

			// Append footer info and button to the footer
			footer.appendChild(footerInfo);
			footer.appendChild(button);

			// Append the footer to the card
			card.appendChild(footer);

			// Append the card to the container
			productContainer.appendChild(card);
		});
	};

	// Function to load and render the product detail on product-detail.html
	const renderProductDetail = (products) => {
		// Get the container and section title elements
		const productContainer = document.querySelector(
			".product-detail-container"
		);
		const sectionTitle = document.querySelector(".section-title");
		if (!productContainer || !sectionTitle) return; // Exit if elements don't exist

		// Get the product ID from the URL query parameter
		const urlParams = new URLSearchParams(window.location.search);
		const productId = parseInt(urlParams.get("id"));

		// Find the product by ID
		const product = products.find((p) => p.id === productId);

		// Handle case where product is not found
		if (!product) {
			sectionTitle.textContent = "Producto no encontrado";
			const errorMessage = document.createElement("p");
			errorMessage.textContent = "El producto no existe.";
			productContainer.appendChild(errorMessage);
			return;
		}

		// Update the section title with the product name
		sectionTitle.textContent = product.name;

		// Create the carousel container for images
		const carousel = document.createElement("div");
		carousel.className = "product-detail-carousel";

		// Add each image to the carousel
		product.images.forEach((img, index) => {
			const imgElement = document.createElement("img");
			imgElement.src = img.src;
			imgElement.alt = img.alt;
			imgElement.className = "product-detail-image";
			if (index === 0) imgElement.classList.add("active"); // Set first image as active
			carousel.appendChild(imgElement);
		});

		// Create the previous button for the carousel
		const prevButton = document.createElement("button");
		prevButton.className = "carousel-btn prev";
		prevButton.innerHTML = "❮";

		// Create the next button for the carousel
		const nextButton = document.createElement("button");
		nextButton.className = "carousel-btn next";
		nextButton.innerHTML = "❯";

		// Append buttons to the carousel
		carousel.appendChild(prevButton);
		carousel.appendChild(nextButton);

		// Create the info container for price, details, and button
		const info = document.createElement("div");
		info.className = "product-detail-info";

		// Create the price element
		const price = document.createElement("p");
		price.className = "product-detail-price";
		price.textContent = `$${product.price.toFixed(2)}`;

		// Create the details container for description paragraphs
		const details = document.createElement("div");
		details.className = "product-detail-texts";

		// Add each detail paragraph
		product.details.forEach((detail) => {
			const p = document.createElement("p");
			p.className = "product-detail-text";
			p.textContent = detail;
			details.appendChild(p);
		});

		// Create the "Comprar" button
		const buyButton = document.createElement("button");
		buyButton.className = "btn";
		buyButton.textContent = "Comprar";

		// Append price, details, and button to the info container
		info.appendChild(price);
		info.appendChild(details);
		info.appendChild(buyButton);

		// Append carousel and info to the container
		productContainer.appendChild(carousel);
		productContainer.appendChild(info);

		// Add carousel functionality
		const images = carousel.querySelectorAll(".product-detail-image");
		let currentIndex = 0;

		// Add event listener for the next button
		if (nextButton && images.length > 0) {
			nextButton.addEventListener("click", () => {
				images[currentIndex].classList.remove("active");
				currentIndex = (currentIndex + 1) % images.length;
				images[currentIndex].classList.add("active");
			});
		}

		// Add event listener for the previous button
		if (prevButton && images.length > 0) {
			prevButton.addEventListener("click", () => {
				images[currentIndex].classList.remove("active");
				currentIndex = (currentIndex - 1 + images.length) % images.length;
				images[currentIndex].classList.add("active");
			});
		}
	};

	// Fetch products from JSON and render based on the current page
	fetch("../data/products.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to load products");
			}
			return response.json();
		})
		.then((products) => {
			// Check which page is loaded and render accordingly
			if (document.getElementById("product-list-container")) {
				renderProductList(products);
			} else if (document.querySelector(".product-detail-container")) {
				renderProductDetail(products);
			}
		})
		.catch((error) => {
			// Handle errors during fetch
			console.error("Error:", error);
			const productContainer =
				document.getElementById("product-list-container") ||
				document.querySelector(".product-detail-container");
			const sectionTitle = document.querySelector(".section-title");
			if (productContainer && sectionTitle) {
				sectionTitle.textContent = "Error";
				const errorMessage = document.createElement("p");
				errorMessage.textContent = "Failed to load products. Please try again.";
				productContainer.appendChild(errorMessage);
			}
		});
});
