class Product {
    create() {
        const product = document.getElementById('product');
        if (product === null) { return; }
        for(let i = 0; i < 2; i++) {
            const block = document.createElement('div');
            block.classList.add('product-block');
            block.textContent = i;
            product.appendChild(block);
        }
    }
}

window.product = new Product();
window.product.create();
