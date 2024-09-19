const url = "https://fakestoreapi.com/products"; // URL base de la API
const containerCards = document.querySelector("#cards-container");
const inputCharacter = document.querySelector("#input-character");
const cartItemsContainer = document.querySelector("#cart-items"); // Contenedor para el carrito
const clearCartButton = document.querySelector("#clear-cart"); // Botón para vaciar carrito

let cart = []; // Array para almacenar productos del carrito

// Función para obtener todos los productos
const fetchCharacters = async (URL) => {
    try {
        const response = await fetch(url); // Obtiene todos los productos
        const data = await response.json();
        console.log(data);

        data.forEach(product => {
            makeCharacterCard(product); 
        });
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
};

// Función para crear una card de producto
const makeCharacterCard = (product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", product.id); // Agrega el atributo data-id

    const imgCard = document.createElement("img");
    imgCard.src = product.image;
    imgCard.alt = product.title;

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const nameCard = document.createElement("h3");
    nameCard.textContent = product.title;

    const categoryCard = document.createElement("p");
    categoryCard.textContent = product.category;

    const priceCard = document.createElement("p");
    priceCard.textContent = `$${product.price}`;

    const addToCartButton = document.createElement("button"); // Botón para agregar al carrito
    addToCartButton.textContent = "Agregar al carrito";
    addToCartButton.addEventListener("click", () => {
        addToCart(product); // Llama a la función para agregar el producto al carrito
    });

    cardContent.appendChild(nameCard);
    cardContent.appendChild(categoryCard);
    cardContent.appendChild(priceCard);
    cardContent.appendChild(addToCartButton); // Añadimos el botón de agregar al carrito
    card.appendChild(imgCard);
    card.appendChild(cardContent);

    containerCards.appendChild(card);
};

// Función para agregar productos al carrito
const addToCart = (product) => {
    cart.push(product); // Añade el producto al array de carrito
    renderCartItems(); // Actualiza la vista del carrito
};

// Función para renderizar los ítems del carrito
const renderCartItems = () => {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenido anterior del carrito
    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${item.title} - $${item.price}`;
        cartItemsContainer.appendChild(cartItem);
    });
};

// Función para vaciar el carrito
clearCartButton.addEventListener("click", () => {
    cart = []; // Vaciar el array del carrito
    renderCartItems(); // Actualizar la vista del carrito
});

// Función para filtrar las cards de productos
const filterCards = async (searchText) => {
    const searchUrl = `https://fakestoreapi.com/products`; // URL de búsqueda

    try {
        const response = await fetch(searchUrl); // Realiza la búsqueda
        const data = await response.json();

        // Oculta todas las cards
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.style.display = "none";
        });

        // Muestra las cards filtradas
        data.forEach(product => {
            if (product.title.toLowerCase().includes(searchText)) {
                const card = document.querySelector(`.card[data-id="${product.id}"]`);
                if (card) {
                    card.style.display = "flex";
                }
            }
        });

        if (data.length === 0) {
            alert("No se encontraron resultados.");
        }
    } catch (error) {
        console.error("Error filtering characters:", error);
    }
};

// Evento de entrada para el input de búsqueda
inputCharacter.addEventListener("input", () => {
    const searchText = inputCharacter.value.toLowerCase();
    filterCards(searchText);
});

// Llama a la función para obtener productos al cargar la página
fetchCharacters();
