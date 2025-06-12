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
    const buttons = document.querySelectorAll("[data-buttonPopup]");
    const popups = document.querySelectorAll(".popup");
    const sizes = document.querySelectorAll(".popup__sizes");
    const colors = document.querySelectorAll(".popup__list");
    const buttonModals = document.querySelectorAll(".popup__modal-button");
    const popupHelps = document.querySelectorAll(".popup__help");
    const buttonBoxes = document.querySelectorAll(".popup__box-wrapper");
    const boxContainers = document.querySelectorAll(".popup__box-container");
    const boxCloses = document.querySelectorAll("[data-close-icon]");
    const submits = document.querySelectorAll(".popup__submit");
    const quantities = document.querySelectorAll(".popup__quantity-selector");
    const images = document.querySelectorAll(".popup__images");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = button.getAttribute('data-buttonPopup');
            const popup = document.querySelector("#popup-" + productId);

            popup.classList.add("active");
        });
    });

    popups.forEach(popup => {
        popup.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup") || e.target.closest(".popup__close")) {
                popup.classList.remove("active");
            }
        });
    });

    colors.forEach(color => {
        color.querySelectorAll(".popup__button").forEach(item => {
            item.addEventListener("click", (e) => {
                const productId = item.getAttribute('data-productId');
                const popup = document.querySelector("#popup-" + productId);

                popups.forEach(popup => {
                    popup.classList.remove("active");
                });

                popup.classList.add("active");
            });
        })
    });

    sizes.forEach((size, i) => {
        size.querySelectorAll(".popup__btn").forEach(item => {
            item.addEventListener("click", (e) => {
                size.querySelectorAll(".popup__btn").forEach(btn => {
                    btn.classList.remove("active");
                });

                item.classList.add("active");
                document.querySelectorAll(".selected-size")[i].innerHTML = item.innerHTML;
            });
        })
    });

    buttonModals.forEach((button, i) => {
        button.addEventListener("click", (e) => {
            popupHelps[i].classList.add("active");
            document.querySelector(".bundle__cart-wrapper").style.zIndex = "100";
        });
    });

    popupHelps.forEach(popup => {
        popup.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup__help") || e.target.closest(".popup__help-close")) {
                popup.classList.remove("active");
                document.querySelector(".bundle__cart-wrapper").style.zIndex = "1000";
            }
        });
    });

    buttonBoxes.forEach((button, i) => {
        button.addEventListener("click", (e) => {
            boxContainers[i].classList.toggle("active");
        });
    });

    boxCloses.forEach((close, i) => {
        close.addEventListener("click", (e) => {
            boxContainers[i].classList.remove("active");
        });
    });

    submits.forEach((submit, i) => {
        submit.addEventListener("click", (e) => {
            const sizeHTML = document.querySelectorAll(".popup__content")[i].querySelector(".selected-size")?.innerHTML;
            const type = submit.getAttribute('data-product-type');

            if (sizeHTML || type == "accessory") {
                const variant = sizeHTML ? document.querySelectorAll(".popup__content")[i].querySelector(".popup__sizes .active").getAttribute("data-variant-id") : submit.getAttribute('data-variant-id');
                const product = submit.getAttribute('data-product-id');
                const title = submit.getAttribute('data-product-title');
                const description = submit.getAttribute('data-product-description');
                const price = submit.getAttribute('data-product-price');
                const image = submit.getAttribute('data-product-image');
                const personalization = document.querySelectorAll("[data-personalization]")[i]?.value || null;
                const quantity = +quantities[i].value;
                const size = sizeHTML ? sizeHTML.trim() : null;
    
                const type_bundle = bundle.filter(item => item.type == type);
    
                if (type_bundle.length < numbers[type]) {
                    bundle.push({
                        variant, product, title, description, price,
                        type, image, quantity, size, personalization
                    });
    
                    if (type_bundle.length == numbers[type] - 1 && active !== 2) {
                        popupEnd.classList.add("active");
                    }
                }
    
                sizes.forEach((size, i) => {
                    size.querySelectorAll(".popup__btn").forEach(item => {
                        item.classList.remove("active")
                    });
                });
    
                document.querySelectorAll(".selected-size").forEach(item => {
                    item.innerHTML = "";
                });
    
                drawCart();
                if (type_bundle.length == numbers[type] - 1 && active !== 2) {
                    changeActivePage(active + 1);
                }
            }
        });
    });

    const addEventArrow = (childNodes, i, img) => {
        let activeId = i;
        document.querySelector("[data-next]").addEventListener("click", (e) => {
          activeId = activeId == childNodes.length - 1 ? 0 : activeId + 1;
          img.src = childNodes[activeId].src;
        });
        document.querySelector("[data-prev]").addEventListener("click", (e) => {
          activeId = activeId == 0 ? childNodes.length - 1 : activeId - 1;
          img.src = childNodes[activeId].src;
        });
    }

    images.forEach(images => {
        images.querySelectorAll("img").forEach((image, i) => {
            image.addEventListener("click", (e) => {
                const popup = document.querySelector("[data-popup-image]");

                popup.classList.add("active")
                popup.querySelector("#image").src = image.src;
        
                addEventArrow(images.querySelectorAll("img"), i, popup.querySelector("#image"));
            });
        })
    })

    document.querySelectorAll(".section-glove__button").forEach((submit, i) => {
        submit.addEventListener("click", (e) => {
            const type = submit.getAttribute('data-type');
            const variant = document.querySelectorAll(".section-glove__select")[i]?.value;
            const activeItem = document.querySelector(`[value='${variant}']`);
            const maybePrice = activeItem.getAttribute("data-price");
            const size = activeItem?.innerHTML?.trim();
            const title = document.querySelectorAll(".section-glove__caption")[i]?.innerHTML;
            const price = maybePrice !== ""? maybePrice : document.querySelectorAll(".section-glove__button span")[i]?.innerHTML;
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

    document.querySelectorAll(".section-glove__select").forEach((item, i) => {
        item.addEventListener("change", (e) => {
            const value = item.value;
            const active = document.querySelector(`[value="${value}"]`);
            const price = active.getAttribute("data-price");

            if(price){
                document.querySelectorAll(".section-glove__button .money")[i].textContent = price
            }
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
                        <img data-buttonPopup="${item.id}" alt="${item.title}" src="${item.images[0]}" />
                    </div>
                    <div class="loox-rating">
                        ${stars}
                    </div>
                    <p class="section-glove__caption">${item.title}</p>
                    ${ 
                        item.type == "glove" ? `<p class="section-glove__type">${item.glove_type}</p>` : ""
                    }
                    ${
                        item.variants.length !== 1 && item.title !== "Gift Card" ?
                        `<p class="section-glove__text">Size:</p>`: ""
                    }
                    <div class="section-glove__wrapp">
                        <select name="variant-id" class="section-glove__select" style="${item.variants.length === 1 || item.title == "Gift Card" ? 'display: none;' : ''}">
                            ${
                                item.variants.map(variant => {
                                    return `
                                        <option 
                                            value="${variant.id}" 
                                            ${variant.available || "disabled"}
                                            ${variant.price ? `data-price="${variant.price}"`: ""}
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
                <div id="popup-${item.id}" class="popup ">
                    <div class="popup__content relative">
                        <div class="popup__images">
                            ${ 
                                item.images.map(img => {
                                    return `
                                        <img
                                            src="${img}"
                                            alt="Product image"
                                            class="popup__image"
                                        >
                                    `
                                }).join("")
                            }
                        </div>
                        <div class="popup__starst">
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
                        <div class="popup__wrapper">
                            <h2 class="popup__title">${item.title}</h3>
                            ${ 
                                item.type == "glove" ? `<span class="popup__subtitle">${item.glove_type}</span>` : ""
                            }
                        </div>
                        <h3 class="popup__price">${item.price}</h3>
                        ${
                            item.type == "glove" ?
                            `
                                <h4 class="popup__color">COLOUR :</h4>
                                <ul class="popup__list">
                                    ${
                                        list.map(elem => {
                                            if (elem.title.split(" ")[0] == item.title.split(" ")[0]) {
                                                return `
                                                    <li class="popup__item">
                                                        <button data-productId="${elem.id}" class="popup__button">
                                                            <img
                                                                src="${elem.images[0]}"
                                                                alt="photo"  
                                                            >
                                                        </button>
                                                    </li>
                                                `
                                            }
                                        }).filter(item => item).join("")
                                    }
                                </ul>
                            `:""
                        }
                        ${
                            item.type !== "accessory" || item.tags.some(item => item == "size") ?
                            `
                                <div class="popup__wrap">
                                    <h4 class="popup__size">
                                        SIZE: <span class="selected-size"></span>
                                    </h4>
                                    ${
                                        !item.tags.some(item => item == "size")?
                                        `
                                            <button
                                            class="popup__modal-button"
                                            data-modal="${item.id}"
                                        >
                                            HELP ME CHOOSE
                                        </button>
                                        <div id="helpchoose-${item.id}" class="popup__help">
                                            <div class="popup__help-content">
                                                <button
                                                    data-modal="${item.id}"
                                                    class="popup__help-close ${item.type !== "glove"? "big": ""}"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close" fill="none" viewBox="0 0 18 17">
                                                        <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </button>
                                                    <h1 class="popup__help-title">Size Guide</h1>
                                                    ${
                                                        item.type == "glove" ? 
                                                        document.querySelector("." + item.type)?.innerHTML :
                                                        item.tags.some(item => item == "trousers")? document.querySelector(".trouser").innerHTML:
                                                        item.tags.some(item => item == "top")? document.querySelector(".top").innerHTML:
                                                        document.querySelector(".short").innerHTML
                                                    }
                                                }
                                            </div>
                                        </div>
                                        `: ""
                                    }
                                </div>
                                <div class="popup__sizes">
                                    ${
                                        item.variants.map(variant => {
                                            if (variant.available) {
                                                return `
                                                    <button
                                                        class="popup__btn"
                                                        data-variant-id="${variant.id}"
                                                    >
                                                        ${variant.option1}
                                                    </button>
                                                `
                                            } else {
                                                return `
                                                    <button
                                                        class="popup__btn"
                                                        disabled
                                                    >
                                                        ${variant.option1}
                                                    </button>
                                                `
                                            }
                                        }).join("")
                                    }
                                </div>
                            `:""
                        }
                        ${
                            item.type == "glove" ?
                            `
                                <div class="popup__box">
                                    <div class="popup__box-wrapper">
                                        <svg
                                            width="18"
                                            viewBox="0 0 56 56"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="28" cy="28" r="28" fill="black"/>
                                            <mask id="mask0_701_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="14" width="28" height="28">
                                                <rect x="14" y="14" width="28" height="28" fill="#D9D9D9"/>
                                            </mask>
                                            <g mask="url(#mask0_701_2)">
                                                <path d="M19.8333 36.1668H21.4667L31.5292 26.1043L29.8958 24.471L19.8333 34.5335V36.1668ZM36.5167 24.4127L31.5583 19.5127L33.1917 17.8793C33.6389 17.4321 34.1882 17.2085 34.8396 17.2085C35.491 17.2085 36.0403 17.4321 36.4875 17.8793L38.1208 19.5127C38.5681 19.9599 38.8014 20.4995 38.8208 21.1314C38.8403 21.7634 38.6264 22.3029 38.1792 22.7502L36.5167 24.4127ZM34.825 26.1335L22.4583 38.5002H17.5V33.5418L29.8667 21.1752L34.825 26.1335Z" fill="white"/>
                                            </g>
                                        </svg>
                                        <span class="text-[10px]">ADD PERSONALISATION</span>
                                    </div>
                                    <div class="popup__box-container">
                                        <div class="popup__box-wrap">
                                            <div class="popup__box-info">
                                                <label for="personalization">Name and number printed</label>
                                                <span>£7</span>
                                            </div>
                                            <div data-close-icon>
                                                <svg
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 28 28"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <mask id="mask0_44_569" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
                                                        <rect width="28" height="28" fill="#D9D9D9"/>
                                                    </mask>
                                                    <g mask="url(#mask0_44_569)">
                                                        <path d="M7.46671 22.1667L5.83337 20.5334L12.3667 14L5.83337 7.46671L7.46671 5.83337L14 12.3667L20.5334 5.83337L22.1667 7.46671L15.6334 14L22.1667 20.5334L20.5334 22.1667L14 15.6334L7.46671 22.1667Z" fill="#1C1B1F"/>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            data-personalization
                                            maxlength="12"
                                            form="{{ product_form_id }}"
                                            name="properties[Name and number printed]"
                                            placeholder="12 characters only"
                                        >
                                    </div>
                                </div>
                            `:""
                        }
                        <div class="popup__container">
                            <select
                                class="popup__quantity-selector"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
        
                            <button
                                class="popup__submit"
                                data-variant-id="${item.variants[0].id}"
                                data-product-id="${item.id}"
                                data-product-title="${item.title}"
                                data-product-type="${item.type}"
                                data-product-price="${item.price}"
                                data-product-description="${item.glove_type}"
                                data-product-image="${item.images[0]}"
                            >
                                Add to Bundle
                            </button>
                        </div>
                        <button class="popup__close">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close" fill="none" viewBox="0 0 18 17">
                                <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }
    });

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
        document.querySelector(".another").classList.add("active")
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

document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.swiper', {
        loop: true,
        spaceBetween: 15,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            750: { slidesPerView: 1 },
            1024: { slidesPerView: 3 }
        }
    });

    document.querySelectorAll("[data-button]").forEach((button, i) => {
        button.addEventListener("click", async (e) => {
            const variant = document.querySelectorAll("[data-select]")[i]?.value;

            const formData = {
                items: [
                    /*{ id: "55418273628540", quantity: 1 },*/
                    { id: "54938685211004", quantity: 1 },
                    { id: variant, quantity: 1 },
                    ...bundle.map(item => ({
                        id: item.variant,
                        quantity: 1
                    }))
                ]
            }

            try{
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
            }catch(e) {
                console.error(e);
            }

            document.querySelector(".another").classList.remove("active");
            document.querySelector(".another").removeAttribute("data-variant");
            bundle = [];
            drawCart();
            changeActivePage(0);
        });
    });

    document.querySelector(".another").addEventListener("click", async (e) => {
        if(e.target.classList.contains("another") || e.target.classList.contains("another__button") || e.target.closest(".another__close")){
            const formData = {
                items: [
                    /*{ id: "55418273628540", quantity: 1 },*/
                    { id: "54938685211004", quantity: 1 },
                    ...bundle.map(item => ({
                        id: item.variant,
                        quantity: 1
                    }))
                ]
            }

            try{
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
            }catch(e) {
                console.error(e);
            }

            document.querySelector(".another").classList.remove("active");
            document.querySelector(".another").removeAttribute("data-variant");
            bundle = [];
            drawCart();
            changeActivePage(0);
        }
    });
});