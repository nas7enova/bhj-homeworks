const cartProducts = document.querySelector(".cart__products");

document.querySelectorAll(".product").forEach(productElement => {
    const productQuantityValue = productElement.querySelector(".product__quantity-value");

    productElement.querySelector(".product__quantity-control_dec").addEventListener("click", () => {
        let currentValue = Number(productQuantityValue.innerText);
        if (currentValue > 1) {
            productQuantityValue.innerText = currentValue - 1;
        }
    });

    productElement.querySelector(".product__quantity-control_inc").addEventListener("click", () => {
        let currentValue = Number(productQuantityValue.innerText);
        productQuantityValue.innerText = currentValue + 1;
    });

    productElement.querySelector(".product__add").addEventListener("click", () => {
        const productId = productElement.dataset.id;
        const productImageSrc = productElement.querySelector("img").src;
        const quantity = Number(productQuantityValue.innerText);

        const foundProduct = Array.from(cartProducts.children).find(
            productInCart => productInCart.dataset.id === productId
        );
        
        if (foundProduct) {
            const countElement = foundProduct.querySelector(".cart__product-count");
            countElement.innerText = Number(countElement.innerText) + quantity;
        } else {
            cartProducts.insertAdjacentHTML("beforeend", `
                <div class="cart__product" data-id="${productId}">
                    <img class="cart__product-image" src="${productImageSrc}">
                    <div class="cart__product-count">${quantity}</div>
                </div>
            `);
        }
        updateLocalStorage();
    });
});

function updateLocalStorage() {
    const productsData = Array.from(cartProducts.children).map(productItem => {
        return {
            id: productItem.dataset.id,
            src: productItem.querySelector(".cart__product-image").src,
            count: productItem.querySelector(".cart__product-count").innerText
        };
    });
    localStorage.setItem("productsData", JSON.stringify(productsData));
}

function restoreFromLocalStorage() {
    const savedData = localStorage.getItem("productsData");
    if (savedData) {
        const productsData = JSON.parse(savedData);
        productsData.forEach(product => {
            cartProducts.insertAdjacentHTML("beforeend", `
                <div class="cart__product" data-id="${product.id}">
                    <img class="cart__product-image" src="${product.src}">
                    <div class="cart__product-count">${product.count}</div>
                </div>
            `);
        });
    }
}

restoreFromLocalStorage();