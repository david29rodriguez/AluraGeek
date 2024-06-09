document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productsList = document.getElementById('products-list');
    let editIndex = -1;

    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = document.getElementById('precio').value;
            const imagen = document.getElementById('imagen').value;

            let products = JSON.parse(localStorage.getItem('products')) || [];

            if (editIndex === -1) {
                // Save new product data to localStorage
                const product = { nombre, descripcion, precio, imagen };
                products.push(product);
            } else {
                // Update existing product
                products[editIndex] = { nombre, descripcion, precio, imagen };
                editIndex = -1;
            }

            localStorage.setItem('products', JSON.stringify(products));

            alert('Producto guardado exitosamente.');

            productForm.reset();

            // Refresh the products list
            cargarProductos();
        });
    }

    if (productsList) {
        // Load products from localStorage
        cargarProductos();
    }

    function cargarProductos() {
        productsList.innerHTML = '';
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach((product, index) => {
            agregarProducto(product.nombre, product.descripcion, product.precio, product.imagen, index);
        });
    }

    function agregarProducto(nombre, descripcion, precio, imagen, index) {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        const productoContainer = document.createElement('div');
        productoContainer.className = 'producto-container';

        productoContainer.innerHTML = `
            <img src="${imagen}" class="imagen_producto" alt="Imagen del producto">
            <h2>${nombre}</h2>
            <p>${descripcion}</p>
            <p>Precio: $ <span>${precio}</span></p>
            <img src="borrar.png" alt="Imagen de borrar" class="icon_borrar">
        `;

        cardContainer.appendChild(productoContainer);
        productsList.appendChild(cardContainer);

        // Add event listener to the delete icon
        const deleteIcon = productoContainer.querySelector('.icon_borrar');
        deleteIcon.addEventListener('click', () => {
            eliminarProducto(index, cardContainer);
        });
    }

    function eliminarProducto(index, cardElement) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        cardElement.remove();
    }
});