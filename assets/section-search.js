try{
    const apply = document.querySelector(".filters-sidebar__apply");
    const currency = document.querySelector("#currency[data-currency]")?.innerHTML?.replace(/\s+/g, '');
    const wrapper = document.querySelector(".collection-products");
    const featuresButtons = document.querySelectorAll("[data-features]");
    const collectionButtons = document.querySelectorAll("[data-handle]");
    const checkboxes = document.querySelectorAll("[data-checkbox]");
    const radios = document.querySelectorAll("[data-radio]");
    const minRange = document.getElementById('min-price');
    const maxRange = document.getElementById('max-price');
    const minValueText = document.getElementById('min-price-value');
    const maxValueText = document.getElementById('max-price-value');
    const track = document.getElementById('range-track');
    const tags = document.querySelector(".collection-hero__list");
    const clear = document.querySelector(".collection-hero__clear");
    const filterBtn = document.querySelector(".collection-hero__filter");
    const filter = document.querySelector(".collection-filters");
    const filterClose = document.querySelector(".filters-sidebar__close");

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const handle = params.get('handle');
    const inStock = params.get('in-stock');
    const outStock = params.get('out-stock');

    if(handle == "gloves") {
        document.querySelector("[data-features-list]").style.display = "block";
    } else {
        document.querySelector("[data-features-list]").style.display = "none";
    }

    if ([...params].length !== 0) {
        const minR = params.get('min');
        const maxR = params.get('max');
        minRange.value = minR;
        maxRange.value = maxR;
    }

    if (handle || inStock || outStock) {
        clear.classList.add("active");
    }

    const min = parseInt(minRange.min);
    const max = parseInt(minRange.max);

    const data = products;

    const addEvents = () => {
        document.querySelectorAll("[data-buttonpopup]").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = btn.getAttribute("data-buttonpopup");

                document.querySelector("#popup-" + id).classList.add("active")
            });
        });

        document.querySelectorAll(".popup").forEach(item => {
            item.addEventListener("click", (e) => {
                if (e.target.classList.contains("popup") || e.target.closest(".popup__close")){
                    item.classList.remove("active");
                }
            });
        });

        document.querySelectorAll(".popup__sizes").forEach((size, i) => {
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

        document.querySelectorAll(".popup__help-close").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = btn.getAttribute("data-modal");

                document.querySelector("#helpchoose-" + id).classList.add("active");
            });
        });

        document.querySelectorAll(".popup__modal-button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = btn.getAttribute("data-modal");

                document.querySelector("#helpchoose-" + id).classList.add("active");
                document.querySelector(".bundle__cart-wrapper").style.zIndex = "100";
            });
        });

        document.querySelectorAll(".popup__help").forEach(popup => {
            popup.addEventListener("click", (e) => {
                if (e.target.classList.contains("popup__help") || e.target.closest(".popup__help-close")) {
                    popup.classList.remove("active");

                    document.querySelector(".bundle__cart-wrapper").style.zIndex = "1000";
                }
            });
        });
    }

    const changeProducts = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const handle = params.get('handle');
        const features = params.get('features');
        const inStock = params.get('in-stock');
        const outStock = params.get('out-stock');
        const max = params.get('max') ? +params.get("max"): 500;
        const min = params.get('min') ? +params.get("min"): 5;
        const sortDescending = params.get('date') == "new-to-old"? true: false

        wrapper.innerHTML = "";

        const newList = [];

        data.forEach((product, i) => {
            const match = product.price.match(/£([\d.]+)/);
            const price = parseFloat(match[1]);
          
            if (!(product.collections.some(collection => collection == handle || !handle))) return;
            if (!(product.collections.some(collection => collection == features || !features))) return;
            if (!(inStock !== "true" && outStock !== "true") && (!(inStock == "true" && product.available) && outStock !== "true")) return;
            if (!(inStock !== "true" && outStock !== "true") && (!(outStock == "true" && !product.available) && inStock !== "true")) return;
            if (price < min) return;
            if (price > max) return;

            newList.push(product);
        });

        newList.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
        
            return sortDescending
                ? dateB - dateA
                : dateA - dateB;
        });

        function parseTitleWithBrackets(text) {
            const match = text.match(/^(.+?)\s*\((.+)\)$/);
            if (match) {
                return {
                title: match[1].trim(),
                variant: match[2].trim(),
                };
            }
            return {
                title: text.trim(),
                variant: null,
            };
        }

        newList.forEach(item => {
            const { title, variant } = parseTitleWithBrackets(item.title)
            wrapper.innerHTML += `
                <div class="card card--standard card--media" style="--ratio-percent: 125.0%;">
                    <div class="card__inner color-background-2 gradient ratio" style="--ratio-percent: 125.0%;">
                        <div class="card__media">
                            <a href="${item.url}" class="media media--transparent media--hover-effect">
                                <img alt="${item.title}" src="${item.images[0]}" class="motion-reduce"  />
                            </a>
                        </div>
                    </div>
                    <div class="card__content">
                        <div class="card__information"> 
                            <div class="single_card_reviews">
                                ${document.querySelector(`[data-reviews="${item.id}"]`).innerHTML}
                                <div>
                                    <span>Reviews</span>
                                </div>
                            </div>
                            <div class="flex-information_card_product">
                                <div class="title_information_card"> 
                                    <a href="${item.url}" class="full-unstyled-link">
                                        <h3 class="title_product_carousel">${title}</h3>
                                        ${variant ? `<p class="color_product_carousel" style="text-decoration:none;">(${variant})</p>`: ""}
                                    </a>
                                </div>
                                <div class="card-information"><span class="caption-large light"></span>
                                    <div class="card-information">
                                        <div class="price">
                                            <div class="price__container">
                                                <div class="price__regular">
                                                    <span class="price-item price-item--regular">
                                                        From <span class="money">${item.price}</span>
                                                    </span>         
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelector("[data-number-products]").textContent = newList.length;
        addEvents();
    }

    const changeFilterParam = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const handle = params.get('handle');
        const features = params.get('features');
        const radioParam = params.get('date');

        collectionButtons.forEach(button => {
            const data = button.getAttribute("data-handle");

            if (handle == data) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        featuresButtons.forEach(button => {
            const data = button.getAttribute("data-features");

            if (features == data) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        })

        checkboxes.forEach(checkbox => {
            const data = checkbox.getAttribute("data-checkbox");
            const param = params.get(data);

            if (param == "true") {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });

        radios.forEach(radio => {
            const data = radio.getAttribute("data-radio");

            if (data == radioParam) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
    }

    const changeTags = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const handle = params.get('handle');
        const features = params.get("features");
        const inStock = params.get('in-stock');
        const outStock = params.get('out-stock');
        const date = params.get('date');
        const tagsList = [
            [handle, "handle"],
            [features, "features"],
            [inStock == "true"? "In stock": null, "in-stock"],
            [outStock == "true"? "Out of stock": null, "out-stock"],
            [date, "date"]
        ];

        tags.innerHTML = "";

        tagsList.forEach(tag => {
            if (tag[0]) {
                tags.innerHTML += `
                    <li class="collection-hero__item" data-type="${tag[1]}">
                        ${tag[0]} <button data-remove class="collection-hero__remove">&times;</button>
                    </li>
                `;
            }
        });

        const checkClert = () => {
            const url = new URL(window.location.href);
            const params = url.searchParams;
            const handle = params.get('handle');
            const features = params.get('features');
            const inStock = params.get('in-stock');
            const outStock = params.get('out-stock');
            const data = params.get('date');

            if (!handle && !inStock && !outStock && !data && !features) {
                clear.classList.remove("active");
            }
        }

        document.querySelectorAll(".collection-hero__item").forEach(item => {
            item.querySelector("[data-remove]").addEventListener("click", async (e) => {
                const type = item.getAttribute("data-type");
            
                params.delete(type);
                
                window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);

                changeFilterParam();
                changeProducts();
                changeTags();
                checkClert();
            });
        })
    }

    const updateOutStockParam = (data, value) => {
        const url = new URL(window.location.href);
        const params = url.searchParams;

        if (data !== "min" && data !== "max") {
            clear.classList.add("active");
        }

        params.set(data, value);

        if(value == null){
            params.delete(data);
        }

        window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);
        changeFilterParam();
        changeProducts();
        changeTags();
    }

    const setStandartParam = () => {
        updateOutStockParam("handle", "all");
        updateOutStockParam("in-stock", "true");
        updateOutStockParam("date", "new-to-old");
        updateOutStockParam("min", "5");
        updateOutStockParam("max", "500");
    }

    collectionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const handle = button.getAttribute("data-handle");

            if(handle == "gloves") {
                document.querySelector("[data-features-list]").style.display = "block";
            } else {
                document.querySelector("[data-features-list]").style.display = "none";
            }

            updateOutStockParam("handle", handle);
            updateOutStockParam("features", null);
        });
    });

    featuresButtons.forEach(button => {
        button.addEventListener("click", () => {
            const features = button.getAttribute("data-features");

            updateOutStockParam("features", features);
        });
    });


    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", (e) => {
            const data = checkbox.getAttribute("data-checkbox");

            updateOutStockParam(data, checkbox.checked);
        });
    });

    radios.forEach(radio => {
        radio.addEventListener("click", (e) => {
            const data = radio.getAttribute("data-radio");
            
            updateOutStockParam("date", data);
        });
    });

    const updateSliderTrack = () => {
        let minVal = parseInt(minRange.value);
        let maxVal = parseInt(maxRange.value);

        const minPercent = ((minVal - min) / (max - min)) * 100;
        const maxPercent = ((maxVal - min) / (max - min)) * 100;

        track.style.background = `linear-gradient(
            to right,
            #ccc ${minPercent}%,
          #234534 ${minPercent}%,
          #234534 ${maxPercent}%,
            #ccc ${maxPercent}%
        )`;

        minValueText.textContent = `${currency}${minVal.toFixed(2)}`;
        maxValueText.textContent = `${currency}${maxVal.toFixed(2)}`;

        updateOutStockParam("min", minVal);
        updateOutStockParam("max", maxVal);
    }

    const clearTags = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;

        params.delete("handle");
        params.delete("in-stock");
        params.delete("out-stock");
        params.delete("date");
        params.set("min", 10);
        params.set("max", 500);
        minRange.value = 5;
        maxRange.value = 500;
        
        window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);

        updateSliderTrack();
        changeFilterParam();
        changeProducts();
        changeTags();
    }

    filterBtn.addEventListener("click", (e) => {
        filter.classList.add("active");
        document.querySelector("body").style.overflow = "hidden";
    });

    filterClose.addEventListener("click", (e) => {
        filter.classList.remove("active");
        document.querySelector("body").style.overflow = "auto";
    });

    apply.addEventListener("click", (e) => {
        filter.classList.remove("active");
        document.querySelector("body").style.overflow = "auto";
    });

    clear.addEventListener("click", (e) => {
        clearTags();

        clear.classList.remove("active");
    });

    if ([...params].length === 0) {
        setStandartParam();
    }

    minRange.addEventListener('input', updateSliderTrack);
    maxRange.addEventListener('input', updateSliderTrack);

    updateSliderTrack();
    changeFilterParam();
    changeProducts();
    changeTags();
}catch(e){
    console.error(e)
}