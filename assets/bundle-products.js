try{
const buttons = document.querySelectorAll("[data-modal]");
const popups = document.querySelectorAll(".popup-modal");
const variants = document.querySelectorAll(".product-item");
const helps = document.querySelectorAll(".product-popup-modal__button");
const helpPopups = document.querySelectorAll(".help-choose");
const sizesWrap = document.querySelectorAll(".data-sizes");
const sizeWrapper = document.querySelectorAll(".selected-size");
const images = document.querySelectorAll(".popup-images");
const imageWrapper = document.querySelector("[data-popup-image]");
const personalizationButton = document.querySelectorAll(".personalization-box__wrap");
const personalizationWrapper = document.querySelectorAll(".personalization-drawer");
const personalizationClose = document.querySelectorAll(".personalization-drawer .close-icon");
const personalizationInputs = document.querySelectorAll("[data-personalization]");
const addButtons = document.querySelectorAll(".add-in-bundle");
const wrapper = document.querySelector("#bundle-products");
const plans = document.querySelectorAll(".section-product__item");
const giftsItem = document.querySelectorAll(".section-product__option");
const submit = document.querySelector("#add-to-cart-button");
const text = document.querySelector(".section-product__inscription");

let bundle = [];
let index = 3;
const gifts = [0, 1, 3];
const bundleVariants = ['45950893392128', '45950893359360', '45950893326592'];

const drawBundle = () => {
    wrapper.innerHTML = "";

    for (let i = 0; i < index; i++) {
        let product = bundle[i];

        if (product) {
            wrapper.innerHTML += `
                <div class="relative flex flex-col md:gap-[20px] w-[60px] sm:w-[100px] md:w-full">
                    <div class="md:h-[175px] h-[60px] border-solid border-[1px] border-[#B2B2B2] rounded-[6px] bundle_bg">
                        <img class="h-full w-full object-contain" src="${product.image}" alt="" />
                    </div>
                    <div class="info">
                        <p class="md:text-[16px] text-[10px] text-[#000000] text-left font-[600] p-0 m-0 whitespace-nowrap text-ellipsis overflow-hidden">${product.title}</p>
                        <span class="md:text-[14px] text-[8px] md:text-[#12121280] text-[#000] text-center text-left">Size: ${product.size}</span>
                        <div class="bundle-remove absolute md:-top-[11px] -top-[5px] md:-right-[11px] -right-[5px] bg-black p-[3px] md:p-[6px] rounded-[100%] cursor-pointer z-10" data-index="${i}" >
                            <svg class="w-[8px] md:w-[10px]" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1.267 9.667-.934-.934L4.067 5 .333 1.267l.934-.934L5 4.067 8.733.333l.934.934L5.933 5l3.734 3.733-.934.934L5 5.933z" fill="#E8EAED"/></svg>
                        </div>
                    </div>
                </div>
            `;
        } else {
            wrapper.innerHTML += ` 
                <div class="relative flex flex-col gap-[20px] w-[60px] sm:w-[100px] md:w-full pb-[12px]">
                    <div class="md:h-[175px] h-[60px] flex items-center justify-center border-solid border-[1px] border-[#B2B2B2] rounded-[6px] bundle_bg text-[24px] md:text-[76px] text-[#fff] font-anton">
                        ${i+1}
                    </div>
                </div
            `;
        }
    }

    submit.innerHTML = bundle.length >= index ? "Submit bundle" : `Add ${index - bundle.length} More Items`;

    document.querySelectorAll(".bundle-remove").forEach((button, q) => {
        button.addEventListener("click", (e) => {
            bundle = bundle.filter((item, i) => i != q);

            submit.classList.add("opacity-75");

            drawBundle();
        });
    });
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const id = button.getAttribute("data-modal");
        const popup = document.querySelector(id);

        popup.classList.remove("hidden");
    });
});

popups.forEach(popup => {
    popup.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup-modal") || e.target.closest(".close-popup-modal")) {
            popup.classList.add("hidden")
        }
    });
});

variants.forEach(variant => {
    variant.addEventListener("click", (e) => {
        const id = variant.querySelector(".button-color").getAttribute("data-id");
        const popup = document.querySelector(id);

        popups.forEach(popup => {
            popup.classList.add("hidden")
        });

        popup.classList.remove("hidden");
    });
});

helps.forEach(help => {
    help.addEventListener("click", (e) => {
        const id = help.getAttribute("data-modal");
        const popup = document.querySelector(id);

        popup.classList.remove("hidden");
    });
});

helpPopups.forEach(popup => {
    popup.addEventListener("click", (e) => {
        if (e.target.classList.contains("help-choose") || e.target.closest(".close-help-choose")) {
            popup.classList.add("hidden");
        }
    });
});

sizesWrap.forEach((wrap, i) => {
    wrap.querySelectorAll(".size-option").forEach((size, q, arr) => {
        size.addEventListener("click", (e) => {
            arr.forEach(size => {
                size.classList.remove("selected");
            });
    
            size.classList.add("selected");
            sizeWrapper[i].innerHTML = size.innerHTML;
        });
    });;
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

images.forEach(wrap => {
    wrap.querySelectorAll("img").forEach((image, i, imagesList) => {
        image.addEventListener("click", (e) => {
            imageWrapper.classList.remove("opacity-0", "pointer-events-none")
            imageWrapper.querySelector("#image").src = image.src;
    
            addEventArrow(imagesList, i, imageWrapper.querySelector("#image"));
        });
    });
});

imageWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("data-popup-image")) {
        imageWrapper.classList.add("opacity-0", "pointer-events-none")
    }
});

personalizationButton.forEach((button, i) => {
    button.addEventListener("click", (e) => {
        personalizationWrapper[i].classList.toggle("hidden");
    });
});

personalizationClose.forEach((close, i) => {
    close.addEventListener("click", (e) => {
        personalizationWrapper[i].classList.add("hidden");
    });
});

addButtons.forEach((button, i) => {
    button.addEventListener("click", (e) => {
        if (sizeWrapper[i].innerHTML) {
            const image = button.getAttribute("data-product-image");
            const title = button.getAttribute("data-product-title");
            const type = button.getAttribute("data-product-type");
            const size = sizeWrapper[i].innerHTML;
            const variant = sizesWrap[i].querySelector(".selected").getAttribute("data-variant-id");
            const personalization = personalizationInputs[i].value || null;

            if (bundle.length < 3) {
                bundle.push({ image, title, type, variant, personalization, size })
            }

            sizesWrap[i].querySelectorAll(".size-option").forEach(size => {
                size.classList.remove("selected")
            });
            sizeWrapper[i].innerHTML = "";
            popups[i].classList.add("hidden");

            if (bundle.length >= index) {
                submit.classList.remove("opacity-75");
            }

            drawBundle();
        }
    });
});

plans.forEach((plan, i) => {
    plan.addEventListener("click", (e) => {
        plans.forEach(plan => {
            plan.classList.remove("active");
        });

        plan.classList.add("active");
        index = i + 1;
        bundle = bundle.slice(0, i + 1);

        
        giftsItem.forEach((gift, q) => {
            if (q + 1 <= 3 - gifts[i]) {
                gift.classList.remove("active")
            } else {
                gift.classList.add("active")
            }
        });

        if (bundle.length >= index) {
            submit.classList.remove("opacity-75");
        } else {
            submit.classList.add("opacity-75");
        }

        text.innerHTML = `
            <span class='section-product__bold'>Awesome!</span> You’ve Unlocked <span class='section-product__circle'>${gifts[i]}</span> FREE Gifts
        `;

        drawBundle();
    });
});

submit.addEventListener("click", async (e) => {
    if (bundle.length >= index) {
        let number = 0;

        bundle.forEach(item => {
            if (item.personalization)
                number += 1
        });

        const formData = {
            items: [
                ...bundle.map(product => ({
                    id: product.variant,
                    quantity: 1
                })), {
                    id: bundleVariants[index - 1],
                    quantity: 1
                }, {
                    id: "53598862836092",
                    quantity: index > 1 ? 1 : 0
                },
                {
                    id: "54858935828860",
                    quantity: index > 2 ? 1 : 0
                }
            ]
        }

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
                    console.log(cart);
                });
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }

        bundle = [];
        drawBundle();
    }
});

drawBundle();
} catch(e) {
    console.log(e)
}