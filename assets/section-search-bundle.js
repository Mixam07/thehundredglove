try{
    const wrapper = document.querySelector(".collection-products");
    const checkboxes = document.querySelectorAll("[data-checkbox]");
    const prices = document.querySelectorAll("[data-price]");
    const alphabeticallies = document.querySelectorAll("[data-alphabetically]")
    const radios = document.querySelectorAll("[data-radio]");
    const tags = document.querySelector(".collection-hero__list");
    const clear = document.querySelector(".collection-hero__clear");
    const filterBtn = document.querySelector(".collection-hero__filter");
    const filter = document.querySelector(".collection-filters");
    const filterClose = document.querySelector(".filters-sidebar__close");

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const inStock = params.get('in-stock');
    const outStock = params.get('out-stock');

    if (inStock || outStock) {
        clear.classList.add("active");
    }

    const data = products;

    const changeProducts = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const inStock = params.get('in-stock');
        const outStock = params.get('out-stock');
        const sortDescending = params.get('date') == "new-to-old"? true:
                            params.get('date') == "old-to-new"? false: null;
        const sortByPrice = params.get('price') == 'low-to-high'? true:
                            params.get('price') == 'high-to-low'? false : null;
        const sortByAlphabetically = params.get('alphabetically') == 'a-z'? true:
                            params.get('alphabetically') == 'z-a'? false : null;

        wrapper.innerHTML = "";

        const newList = [];

        data.forEach((product, i) => {
            if (!(inStock !== "true" && outStock !== "true") && (!(inStock == "true" && product.available) && outStock !== "true")) return;
            if (!(inStock !== "true" && outStock !== "true") && (!(outStock == "true" && !product.available) && inStock !== "true")) return;

            newList.push(product);
        });

        if(sortDescending !== null) {
            newList.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
            
                return sortDescending
                    ? dateB - dateA
                    : dateA - dateB;
            });
        }

        if(sortByPrice !== null){
            newList.sort((a, b) => {
                const matchA = a.price.match(/£([\d.]+)/);
                const matchB = b.price.match(/£([\d.]+)/);

                const priceA = matchA ? parseFloat(matchA[1]) : 0;
                const priceB = matchB ? parseFloat(matchB[1]) : 0;

                return sortByPrice
                    ? priceA - priceB
                    : priceB - priceA;
            });
        }

        if (sortByAlphabetically !== null) {
            newList.sort((a, b) => {
                const nameA = a.title.toLowerCase();
                const nameB = b.title.toLowerCase();

                if (nameA < nameB) return sortByAlphabetically ? -1 : 1;
                if (nameA > nameB) return sortByAlphabetically ? 1 : -1;
                return 0;
            });
        }

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
                                                        <span class="money">${item.price}</span>
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
    }

    const changeFilterParam = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const radioParam = params.get('date');

        checkboxes.forEach(checkbox => {
            const data = checkbox.getAttribute("data-checkbox");
            const param = params.get(data);

            if (param == "true") {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });

        prices.forEach(price => {
            const data = price.getAttribute("data-price");
            const param = params.get("price");

            if(param == data){
                price.checked = true;
            }else{
                price.checked = false
            }
        });

        alphabeticallies.forEach(alphabetically => {
            const data = alphabetically.getAttribute("data-alphabetically");
            const param = params.get("alphabetically");

            if(param == data){
                alphabetically.checked = true;
            }else{
                alphabetically.checked = false
            }
        })

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
        const inStock = params.get('in-stock');
        const outStock = params.get('out-stock');
        const date = params.get('date');
        const tagsList = [
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
            const inStock = params.get('in-stock');
            const outStock = params.get('out-stock');
            const data = params.get('date');

            if (!inStock && !outStock && !data) {
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

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", (e) => {
            const data = checkbox.getAttribute("data-checkbox");

            updateOutStockParam(data, checkbox.checked);
        });
    });

    prices.forEach(price => {
        price.addEventListener("click", (e) => {
            const data = price.getAttribute("data-price");

            updateOutStockParam("price", data);
            updateOutStockParam("date", null);
            updateOutStockParam("alphabetically", null);
        });
    });

    alphabeticallies.forEach(alphabetically => {
        alphabetically.addEventListener("click", (e) => {
            const data = alphabetically.getAttribute("data-alphabetically");
            
            updateOutStockParam("alphabetically", data);
            updateOutStockParam("price", null);
            updateOutStockParam("date", null);
        });
    });

    radios.forEach(radio => {
        radio.addEventListener("click", (e) => {
            const data = radio.getAttribute("data-radio");
            
            updateOutStockParam("date", data);
            updateOutStockParam("price", null);
            updateOutStockParam("alphabetically", null);
        });
    });

    const clearTags = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;

        params.delete("in-stock");
        params.delete("out-stock");
        
        window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);

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

    clear.addEventListener("click", (e) => {
        clearTags();

        clear.classList.remove("active");
    });

    const updateOutStockParam = (data, value) => {
        const url = new URL(window.location.href);
        const params = url.searchParams;

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
        updateOutStockParam("in-stock", "true");
        updateOutStockParam("date", "new-to-old");
    }

    if ([...params].length === 0) {
        setStandartParam();
    }

    changeFilterParam();
    changeProducts();
    changeTags();
}catch(e){
    console.error(e)
}