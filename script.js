const products = [
    { id: 1, name: "Smartphone", price: 29999, category: "electronics", inStock: true, image: "smartphone.jpeg" },
    { id: 2, name: "Laptop", price: 1200, category: "electronics", inStock: true, image: "laptop.jpeg" },
    { id: 3, name: "T-Shirt", price: 1555, category: "clothing", inStock: true, image: "tshirt.jpeg" },
    { id: 4, name: "Watch", price: 150, category: "accessories", inStock: true, image: "watch.jpeg" },
    { id: 5, name: "Headphones", price: 999, category: "electronics", inStock: true, image: "headphones.jpeg" },
	{ id: 6, name: "jacket", price: 999, category: "clothing", inStock: true, image: "jacket.jpeg"},
	{ id: 7, name: "bat", price: 1499, category: "sports-gear", inStock: true, image: "bat.jpeg"},
	{ id: 8, name: "cricket-kit", price: 20000, category: "sports-gear", inStock: true, image: "cricket.jpeg"},
	{ id: 9, name: "oven", price: 2999, category: "home-applianes", inStock: true, image: "oven.jpeg"},
	{ id: 10, name: "AC", price: 20000, category: "home-applianes", inStock: true, image: "ac.jpeg"},
	{ id: 11, name: "chain", price: 199999, category: "accessories", inStock: true, image:"chain.jpeg"}, 
	{ id: 12, name: "Ring", price: 60000, category: "accessories", inStock: true, image: "ring.jpeg"},	
    { id: 13, name: "shoes", price: 1555, category: "clothing", inStock: true, image: "shoes.jpeg" },
	
];

const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const minPriceFilter = document.getElementById("minPrice");
const maxPriceFilter = document.getElementById("maxPrice");
const inStockFilter = document.getElementById("inStock");
const sortFilter = document.getElementById("sort");
const searchFilter = document.getElementById("search");
const clearFiltersBtn = document.getElementById("clearFilters");

function displayProducts(filteredProducts) {
    productContainer.innerHTML = "";
    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
            <p>${product.inStock ? "In Stock" : "Out of Stock"}</p>
        `;
        productContainer.appendChild(productElement);
    });
}

function filterProducts() {
    let filteredProducts = [...products];

    const selectedCategories = Array.from(categoryFilter.selectedOptions).map(option => option.value);
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
    }

    const minPrice = parseFloat(minPriceFilter.value) || 0;
    const maxPrice = parseFloat(maxPriceFilter.value) || Infinity;
    filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);

    if (inStockFilter.checked) {
        filteredProducts = filteredProducts.filter(product => product.inStock);
    }

    const searchQuery = searchFilter.value.toLowerCase();
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery));
    }

    const sortBy = sortFilter.value;
    if (sortBy === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
        filteredProducts.sort((a, b) => b.id - a.id);
    }

    displayProducts(filteredProducts);
}

// Event Listeners
[categoryFilter, minPriceFilter, maxPriceFilter, inStockFilter, sortFilter].forEach(el => el.addEventListener("change", filterProducts));

searchFilter.addEventListener("input", debounce(filterProducts, 300));

clearFiltersBtn.addEventListener("click", () => {
    categoryFilter.selectedIndex = -1;
    minPriceFilter.value = "";
    maxPriceFilter.value = "";
    inStockFilter.checked = false;
    sortFilter.value = "default";
    searchFilter.value = "";
    filterProducts();
});

// Debounce for search performance
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

// Initial display
displayProducts(products);
