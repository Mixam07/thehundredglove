try{
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
    const images = document.querySelectorAll(".popup__images");
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
                <div class="relative flex flex-col md:gap-[20px] w-[60px] sm:max-w-[175px] md:w-full">
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
                <div class="relative flex flex-col gap-[20px] w-[60px] sm:max-w-[175px] md:w-full pb-[12px]">
                    <div class="md:h-[175px] h-[60px] flex items-center justify-center border-solid border-[1px] border-[#B2B2B2] rounded-[6px] bundle_bg text-[24px] md:text-[76px] text-[#fff] font-anton">
                        ${i+1}
                    </div>
                </div
            `;
        }
    }

    const country = document.querySelector(".country")?.innerHTML.trim();

    if(country == "sv"){
        submit.innerHTML = bundle.length >= index ? "Skicka in bunt" : `LÄGG TILL ${index - bundle.length} FLER ARTIKLAR`;
    }else{
        submit.innerHTML = bundle.length >= index ? "Submit bundle" : `Add ${index - bundle.length} More Items`;
    }

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

    submits.forEach((submitBtn, i) => {
        submitBtn.addEventListener("click", (e) => {
            const sizeHTML = document.querySelectorAll(".popup__content")[i].querySelector(".selected-size")?.innerHTML;
            const type = submitBtn.getAttribute('data-product-type');

            if (sizeHTML || type == "accessory") {
                const variant = sizeHTML ? document.querySelectorAll(".popup__content")[i].querySelector(".popup__sizes .active").getAttribute("data-variant-id") : submit.getAttribute('data-variant-id');
                const title = submitBtn.getAttribute('data-product-title');
                const type = submitBtn.getAttribute('data-product-type');
                const image = submitBtn.getAttribute('data-product-image');
                const size = sizeHTML ? sizeHTML.trim() : null;
    
                if (bundle.length < 3) {
                    bundle.push({ image, title, type, variant, size })
                }

                if (bundle.length >= 3) {
                    submit.classList.remove("opacity-75");
                }

                drawBundle();

                popups.forEach(popup => {
                    popup.classList.remove("active");
                });
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

document.querySelectorAll(".section-glove__button").forEach((item, i) => {
    item.addEventListener("click", (e) => {
        const element = document.querySelectorAll(".section-glove__item")[i];
        const image = element.querySelector(".section-glove__image img").src;
        const title = element.querySelector(".section-glove__caption").textContent;
        const type = element.querySelector(".section-glove__type").textContent;
        const variant = element.querySelector(".section-glove__select").value;
        const size = element.querySelector(`[value="${variant}"]`).textContent;

        if (bundle.length < 3) {
            bundle.push({ image, title, type, variant, size })
        }

        if (bundle.length >= 3) {
            submit.classList.remove("opacity-75");
        }

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
                    render(cart);
                    document.querySelector(".drawer").classList.add("active");
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