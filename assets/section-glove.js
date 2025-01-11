const mainPhoto = document.querySelector(".section-product__image img");
const photos = document.querySelectorAll(".section-product__images img");
const pairs = localStorage.getItem("pairs") || 3;

photos.forEach(photo => {
    photo.addEventListener("click", (e) => {
        mainPhoto.src = photo.src;
    })
});

mainPhoto.src = photos[0].src;

const ability = [0, 1, 3];
const options = document.querySelectorAll(".section-product__option");

const changeActive = (id) => {
    const unability = options.length - ability[id];

    options.forEach((option, i) => {
        if (i < unability) {
            option.classList.remove("active");
        } else {
            option.classList.add("active");
        }
    });
}

changeActive(pairs - 1);

const products = document.querySelectorAll(".section-product__item");
const numberHTML = document.querySelector(".section-product__circle");
const caption = document.querySelector(".section-product__inscription");

products.forEach((product, i) => {
    product.classList.remove("active");

    if (i === pairs - 1) {
        product.classList.add("active"); 
    }

    product.addEventListener("click", (e) => {
        products.forEach(product => {
            product.classList.remove("active");
        });

        product.classList.add("active");
        changeActive(i);
        localStorage.setItem("pairs", i + 1);

        numberHTML.innerHTML = ability[i];

        if (ability[i] === 0) {
            caption.style.display = "none";
        } else {
            caption.style.display = "flex";
        }
    });
});