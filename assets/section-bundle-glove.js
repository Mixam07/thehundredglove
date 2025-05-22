const submit = document.querySelector(".section-glove__submit");

let number = 4;
let bundle = [];

const changeBundle = () => {
    const wrapper = document.querySelector(".section-glove__list");

    wrapper.innerHTML = "";

    for(let i = 0; i < number; i++){
        const item = bundle[i]
        if(item){
            wrapper.innerHTML += `
                <div class="section-glove__element">
                    <div class="section-glove__photo">
                        <img src="${item.image}" alt="${item.title}" />
                    </div>
                    <div class="section-glove__information desctop">
                        <div class="section-glove__stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                <path d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#D75555"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                <path d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#D75555"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                <path d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#D75555"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                <path d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#D75555"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                <path d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#D75555"/>
                            </svg>
                        </div>
                        <p class="section-glove__headline">${item.title} - Size ${item.size}</p>
                        <p class="section-glove__price">${item.price}</p>
                    </div>
                    <div class="section-glove__information mobile">
                        <p class="section-glove__headline">${item.title}</p>
                        <p class="section-glove__size">Size ${item.size}</p>
                    </div>
                    <button class="section-glove__remove">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M12.6563 3.28125L2.34375 3.28126" stroke="#191B1C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.15625 1.40625H9.84375" stroke="#191B1C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.7188 3.28125V12.1875C11.7188 12.3118 11.6694 12.431 11.5815 12.519C11.4935 12.6069 11.3743 12.6562 11.25 12.6562H3.75C3.62568 12.6562 3.50645 12.6069 3.41854 12.519C3.33064 12.431 3.28125 12.3118 3.28125 12.1875V3.28125" stroke="#191B1C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            `;
        } else {
            wrapper.innerHTML += `
                <div class="section-glove__element empty">
                    <div class="section-glove__photo"><p>GLOVE </p><span>${i+1}</span></div>
                </div>
            `;
        }
    }

    if(bundle.length >= number) {
        submit.disabled = false;
    }else {
        submit.disabled = true;
    }

    document.querySelectorAll(".section-glove__remove").forEach((remove, i) => {
        remove.addEventListener("click", (e) => {
            bundle = bundle.filter((item, q) => q !== i);

            changeBundle();
        });
    });
}

document.querySelectorAll("[data-buttonPopup]").forEach(button => {
    button.addEventListener("click", (e) => {
        const id = button.getAttribute("data-buttonPopup");

        document.querySelector("#popup-" + id).classList.add("active");
    });
});

document.querySelectorAll(".popup").forEach(popup => {
    popup.addEventListener("click", (e) => {
        if(e.target.classList.contains("popup") || e.target.closest(".popup__close")){
            popup.classList.remove("active");
        }
    });

    popup.querySelectorAll(".popup__btn[data-variant-id]").forEach((button, i) => {
        button.addEventListener("click", (e) => {
            popup.querySelectorAll(".popup__btn[data-variant-id]").forEach(btn => {
                btn.classList.remove("active");
            })

            button.classList.add("active");
            popup.querySelector(".selected-size").innerHTML = button.innerHTML;
        });
    });

    popup.querySelector(".popup__submit").addEventListener("click", (e) => {
        const personalization = popup.querySelector("[data-personalization]")?.value;
        const size = popup.querySelector(".selected-size")?.innerHTML?.trim();
        const variantId = popup.querySelector("[data-variant-id].active")?.getAttribute("data-variant-id");
        const title = popup.querySelector(".popup__title")?.innerHTML;
        const price = popup.querySelector(".popup__price")?.innerHTML;
        const image = popup.querySelector(".popup__images img")?.src;

        popup.querySelectorAll("[data-variant-id]").forEach(size => {
            size.classList.remove("active");
        });
        
        if(bundle.length < number) {
            bundle.push({
                personalization,
                variantId,
                title,
                size,
                image,
                price
            });
        }

        changeBundle();

        popup.classList.remove("active");
    });
});

document.querySelectorAll("[data-productId]").forEach(button => {
    button.addEventListener("click", (e) => {
        const id = button.getAttribute("data-productId");

        document.querySelectorAll(".popup").forEach(popup => {
            popup.classList.remove("active");
        });

        document.querySelector("#popup-" + id).classList.add("active");
    });
});

document.querySelectorAll(".popup__box-wrapper").forEach((button, i) => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".popup__box-container")[i].classList.toggle("active");
    });
});

document.querySelectorAll("[data-close-icon]").forEach((close, i) => {
    close.addEventListener("click", (e) => {
        document.querySelectorAll(".popup__box-container")[i].classList.toggle("active");
    });
});

submit.addEventListener("click", async (e) => {
    const list = [...bundle.map(item => {
        return {
            variantId: item.variantId,
            quantity: 1
        }
    })];
    let number = 0;

    bundle.forEach(product => {
        if (product.personalization?.length > 0) {
            number += 1;
        }
    });

    list.push({
        variantId: "44030822383872",
        quantity: number
    });

    const formData = {
        items: list.map(item => ({
            id: item.variantId,
            quantity: item.quantity
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
                console.log(cart);
            });
        } else {
            console.error(response.error, response);
        }
    } catch (error) {
        console.error(error);
    }

    bundle = [];
    changeBundle();
});