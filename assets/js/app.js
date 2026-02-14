let cart = [];
let menuData = {};

// Cargar Datos
async function loadMenu() {
    const response = await fetch('./assets/js/products.json'); // Asegúrate que la ruta sea correcta
    menuData = await response.json();
    renderProducts('burgers');
}

// Renderizar Productos
function renderProducts(category) {
    const container = document.getElementById('product-display');
    container.innerHTML = '';

    menuData[category].forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.nombre}">
            <h4>${product.nombre}</h4>
            <p>$${product.precio}</p>
            <button onclick="addToCart(${product.id}, '${product.nombre}', ${product.precio})">Agregar</button>
        `;
        container.appendChild(card);
    });
}

// Lógica de Carrito
window.addToCart = (id, nombre, precio) => {
    cart.push({ id, nombre, precio });
    updateCartUI();
};

function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    
    cartList.innerHTML = cart.map(item => `<div>${item.nombre} - $${item.precio}</div>`).join('');
    
    const total = cart.reduce((sum, item) => sum + item.precio, 0);
    totalSpan.innerText = total;
}

// Eventos de Categoría
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        renderProducts(e.target.dataset.category);
    });
});

loadMenu();
