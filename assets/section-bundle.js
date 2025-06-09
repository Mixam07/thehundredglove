let active = 0;
let bundle = [];
const numbers = {
    "glove": 1,
    "clothing": 3,
    "accessory": 1
}

const cart = document.querySelector(".bundle__cart-list");
const pageButtons = document.querySelectorAll(".bundle__products-btn");
const popupEnd = document.querySelector(".bundle__end");
const navigationItems = document.querySelectorAll(".bundle__navigation-item");

const drawCart = () => {
    cart.innerHTML = "";

    for (let i = 0;i < 5;i++) {
        const item = bundle[i];
        
        if (item) {
            cart.innerHTML += `
                <li class="bundle__cart-item">
                    <div class="bundle__cart-photo">
                        <img src="${item.image}" alt="photo">
                    </div>
                    <div class="bundle__cart-information">
                        <div class="bundle__cart-stars">
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.93133 12.9708L4.00589 8.34386L0.416016 5.23286L5.15245 4.82186L7.00008 0.458923L8.8477 4.82186L13.5841 5.23286L9.99426 8.34386L11.0688 12.9708L7.00008 10.516L2.93133 12.9708Z" fill="#D75555"/>
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.93133 12.9708L4.00589 8.34386L0.416016 5.23286L5.15245 4.82186L7.00008 0.458923L8.8477 4.82186L13.5841 5.23286L9.99426 8.34386L11.0688 12.9708L7.00008 10.516L2.93133 12.9708Z" fill="#D75555"/>
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.93133 12.9708L4.00589 8.34386L0.416016 5.23286L5.15245 4.82186L7.00008 0.458923L8.8477 4.82186L13.5841 5.23286L9.99426 8.34386L11.0688 12.9708L7.00008 10.516L2.93133 12.9708Z" fill="#D75555"/>
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.93133 12.9708L4.00589 8.34386L0.416016 5.23286L5.15245 4.82186L7.00008 0.458923L8.8477 4.82186L13.5841 5.23286L9.99426 8.34386L11.0688 12.9708L7.00008 10.516L2.93133 12.9708Z" fill="#D75555"/>
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.93133 12.9708L4.00589 8.34386L0.416016 5.23286L5.15245 4.82186L7.00008 0.458923L8.8477 4.82186L13.5841 5.23286L9.99426 8.34386L11.0688 12.9708L7.00008 10.516L2.93133 12.9708Z" fill="#D75555"/>
                            </svg>
                        </div>
                        <p class="bundle__cart-title">${item.title} ${item.size ? "- Size " + item.size : ""}</p>
                        <p class="bundle__cart-price">${item.price}</p>
                    </div>
                    <div>
                        <button data-delete class="bundle__cart-button">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6563 3.28125L2.34375 3.28126" stroke="#191B1C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.15625 1.40625H9.84375" stroke="#191B1C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.7188 3.28125V12.1875C11.7188 12.3118 11.6694 12.431 11.5815 12.519C11.4935 12.6069 11.3743 12.6562 11.25 12.6562H3.75C3.62568 12.6562 3.50645 12.6069 3.41854 12.519C3.33064 12.431 3.28125 12.3118 3.28125 12.1875V3.28125" stroke="#191B1C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="bundle__cart-details">
                        <p class="bundle__cart-name">${item.title}</p>
                        <p class="bundle__cart-size">Size ${item.size}</p>
                    </div>
                </li>`;
        } else {
            cart.innerHTML += `<li class="bundle__cart-item-empty">
                ${
                    i < 1 ? "Glove" :
                    i < 4 ? "CLOTHING" : "Accessory" 
                }
            </li>`
        }
    }
    const t = bundle;
    let total = 0;
    let currency = "";

    // Обробка першого значення, щоб отримати валюту
    if (bundle.length > 0) {
        const match = bundle[0].price.match(/^(\D+)/); // бере всі символи на початку, які не є цифрами
        if (match) currency = match[1];
    }

    // Підрахунок
    total = bundle.reduce((sum, item) => {
        const num = parseFloat(item.price.replace(/[^0-9.]/g, '')); // прибирає все, крім цифр та крапки
        return sum + (isNaN(num) ? 0 : num);
    }, 0);

    document.querySelector(".bundle__cart-prevcost").textContent = total !== 0 ? currency + total.toFixed(2): ""
    document.querySelector(".bundle__cart-caption").innerHTML = bundle.length < 5 ? `Add ${5 - bundle.length} MORE ITEMS FOR A FREE GIFT 🎁` : "CONGRATS, YOU'VE UNLOCKED A FREE GIFT 🎉";
    document.querySelector(".bundle__cart-submit").disabled = bundle.length >= 5 ? false : true;
    document.querySelector(".bundle__cart-progress-active").style.width = bundle.length / 5 * 100 + "%";
    document.querySelectorAll("[data-delete]").forEach((button, i) => {
        button.addEventListener("click", (e) => {
            bundle = bundle.filter((item, q) => q != i);

            drawCart();
        });
    });
}

const addEvent = () => {
    document.querySelectorAll(".section-glove__button").forEach((submit, i) => {
        submit.addEventListener("click", (e) => {
            const type = submit.getAttribute('data-type');
            const variant = document.querySelectorAll(".section-glove__select")[i]?.value;
            const size = document.querySelector(`[value='${variant}']`)?.innerHTML?.trim();
            const title = document.querySelectorAll(".section-glove__caption")[i]?.innerHTML;
            const price = document.querySelectorAll(".section-glove__button span")[i]?.innerHTML;
            const image = document.querySelectorAll(".section-glove__image img")[i]?.src;

            const type_bundle = bundle.filter(item => item.type == type);
    
            if (type_bundle.length < numbers[type]) {
                bundle.push({
                    variant, title, price, type, image, size
                });

                if (type_bundle.length == numbers[type] - 1 && active !== 2) {
                    changeActivePage(active + 1);
                }
            }

            drawCart();
        });
    })
}

function changeActivePage(i) {
    active = i;
    const titles = ["step 1 - choose your glove (1 pair)", "step 2 - Choose Your Clothing Size (3 items)", "step 3 - Choose Your Accessory (1 item)"];
    const classes = ["glove", "clothing", "accessory"]

    document.querySelector(".bundle__products-wrapper").innerHTML = "";

    list.forEach((item, q) => {
        const avalible = item.variants.some(variant => variant.available);

        const stars = document.querySelectorAll(".loox-information .wrapper")[active].querySelectorAll(".loox-rating")[q]?.innerHTML || ""

        if (item.type == classes[active] && avalible) {
            document.querySelector(".bundle__products-wrapper").innerHTML += `
                <div class="section-glove__item">
                    ${
                        item.tags.some(item => item == "fingersave") ? '<span class="card-top-badge">Fingersave</span>':
                        item.tags.some(item => item == "best-seller") ? '<span class="card-top-badge">Best Seller</span>':
                        item.tags.some(item => item == "new-in") ? '<span class="card-top-badge">New In</span>': ""
                    }
                    <div class="section-glove__image">
                        <img alt="${item.title}" src="${item.images[0]}" />
                    </div>
                    <div class="loox-rating">
                        ${stars}
                    </div>
                    <p class="section-glove__caption">${item.title}</p>
                    ${ 
                        item.type == "glove" ? `<p class="section-glove__type">${item.glove_type}</p>` : ""
                    }
                    ${
                        item.variants.length !== 1 ?
                        `<p class="section-glove__text">Size:</p>`: ""
                    }
                    <div class="section-glove__wrapp">
                        <select name="variant-id" class="section-glove__select" style="${item.variants.length === 1 ? 'display: none;' : ''}">
                            ${
                                item.variants.map(variant => {
                                    return `
                                        <option 
                                            value="${variant.id}" 
                                            ${variant.available || "disabled"}
                                        >
                                            ${variant.option1}
                                        </option>
                                    `
                                })
                            }
                        </select>
                        <button data-type="${item.type}" class="section-glove__button">
                            Add | ${item.price}
                        </button>
                    </div>
                </div>
            `;
        }
    });

    /*
    <div class="bundle__products-item">
                    <div class="bundle__products-image">
                        <img alt="${item.title}" src="${item.images[0]}" />
                        ${
                            item.tags.some(item => item == "fingersave") ? '<span class="card-top-badge">Fingersave</span>':
                            item.tags.some(item => item == "best-seller") ? '<span class="card-top-badge">Best Seller</span>':
                            item.tags.some(item => item == "new-in") ? '<span class="card-top-badge">New In</span>': ""
                        }
                    </div>
                    <p class="bundle__products-size">Size:</p>
                    <div class="bundle__products-wrap">
                        <select name="variant-id" class="bundle__products-select" style="${item.variants.length === 1 ? 'display: none;' : ''}">
                            ${
                                item.variants.map(variant => {
                                    return `
                                        <option 
                                            value="${variant.id}" 
                                            ${variant.available || "disabled"}
                                        >
                                            ${variant.option1}
                                        </option>
                                    `
                                })
                            }
                        </select>
                        <button data-type="${item.type}" class="bundle__products-button">
                            Add
                            <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.42857 4H0V3H3.42857V0H4.57143V3H8V4H4.57143V7H3.42857V4Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                    <p class="bundle__products-title">${item.title}</p>
                    ${ 
                        item.type == "glove" ? `<p class="bundle__products-subtitle">${item.glove_type}</p>` : ""
                    }
                    <p class="bundle__products-price">${item.price}</p>
                </div>*/

    if (i == 0) {
        pageButtons[0].style.display = "none";
        pageButtons[1].style.display = "block";
    } else if (i == 1) {
        pageButtons[0].style.display = "block";
        pageButtons[1].style.display = "block";
    } else {
        pageButtons[0].style.display = "block";
        pageButtons[1].style.display = "none";
    }

    navigationItems.forEach(nav => {
        nav.classList.remove("active");
    });

    navigationItems[i].classList.add("active");

    document.querySelector(".bundle__products-headline").innerHTML = titles[i];

    addEvent();
}

pageButtons[0].addEventListener("click", (e) => {
    changeActivePage(active - 1);
});

pageButtons[1].addEventListener("click", (e) => {
    changeActivePage(active + 1);
});

navigationItems.forEach((item, i) => {
    item.addEventListener("click", (e) => {
        changeActivePage(i);
    });
});

popupEnd.addEventListener("click", (e) => {
    if (e.target.classList.contains("bundle__end")) {
        popupEnd.classList.remove("active");
    }
});

document.querySelector(".bundle__cart-submit").addEventListener("click", async (e) => {
    if (bundle.length >= 5) {
        let number = 0;

        bundle.forEach(product => {
            if (product.personalization?.length > 0) {
                number += 1;
            }
        });

        bundle.push({
            variant: "54938685211004",
            quantity: 1
        });

        const formData = {
            items: bundle.map(product => ({
                id: product.variant,
                quantity: product.quantity
            }))
        };
        try {
            const response = await fetch("/cart/add.js", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                
                fetch("/cart.js")
                .then(res => res.json())
                .then(cart => {
                    render(cart);
                    document.querySelector(".drawer").classList.add("active");
                });
            } else {
                console.error(response.error, response);
            }
        } catch (error) {
            console.error(error);
        }

        bundle = [];
        drawCart();
        changeActivePage(0);
    }
});

document.querySelector(".bundle__image").addEventListener("click", (e) => {
    if (e.target.classList.contains("bundle__image")) {
        e.target.classList.remove("active");
    }
});

document.addEventListener('DOMContentLoaded', (e) => {
    drawCart();
    changeActivePage(0);
});