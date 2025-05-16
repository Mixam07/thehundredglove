const images = document.querySelectorAll(".pack__items img");
const sizesWrappers = document.querySelectorAll(".pack__sizes");
const sizes = document.querySelectorAll(".pack__size span");
const submit = document.querySelector(".pack__submit");
const prev = document.querySelector(".pack__prev");
const next = document.querySelector(".pack__next");

let activeImg = 0;
const variants = [];

const setActiveImg = () => {
    images.forEach(image => {
        image.classList.remove("active");
    });

    images[activeImg].classList.add("active");
}

sizesWrappers.forEach((wrapper, i) => {
    wrapper.addEventListener("click", (e) => {
        if (e.target.classList.contains("pack__elem")) {
            wrapper.querySelectorAll(".pack__elem").forEach(item => {
                item.classList.remove("active");
            });

            e.target.classList.add("active");
            sizes[i].innerHTML = e.target.innerHTML;
            variants[i] = e.target.getAttribute("data-id");;
        }
    });
});

submit.addEventListener("click", async (e) => {
    if (variants.length == 2) {
        const formData = {
            //"54910057054588"
            items: [...variants].map(variant => ({
                id: variant,
                quantity: 1
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
                console.error("error");
            }
        } catch (error) {
            console.error("error:", error);
        }
    }
});

/*
prev.addEventListener("click", (e) => {
    const images = document.querySelectorAll(".pack__items img");

    activeImg = activeImg == 0 ? images.length - 1 : activeImg - 1;

    setActiveImg();
});

next.addEventListener("click", (e) => {
    const images = document.querySelectorAll(".pack__items img");

    activeImg = activeImg == images.length - 1 ? 0 : activeImg + 1;

    setActiveImg();
});
*/

setActiveImg();