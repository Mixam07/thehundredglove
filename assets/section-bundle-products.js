let bundle = [];
const pairs = localStorage.getItem("pairs") || 3;

document.querySelector("#add-to-cart-button").innerHTML = `Add ${pairs} More`;

document.querySelectorAll(".close-popup-modal").forEach((button, i) => {
  button.addEventListener("click", (e) => {
    document.querySelectorAll(".popup-modal")[i].classList.add("hidden")
  });
});

const products_restocked = document.querySelector("[data-products-restocked]");
const products_sell_out = document.querySelector("[data-products-sell-out]");

function getNextDay(targetDay, includeToday = false, allowPastWeek = false) {
  const today = new Date();
  const currentDay = today.getDay();
  let daysUntilTarget = (targetDay - currentDay + 7) % 7;

  if (includeToday && daysUntilTarget === 0) {
      daysUntilTarget = 0;
  } else if (!includeToday && daysUntilTarget === 0) {
      daysUntilTarget = 7;
  }

  if (allowPastWeek && daysUntilTarget > 0) {
      daysUntilTarget -= 7;
  }

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntilTarget);

  const day = nextDate.getDate();
  const suffix = (d) => {
      if (d >= 11 && d <= 13) return "th";
      switch (d % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
      }
  };

  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  const formattedDate = `${monthNames[nextDate.getMonth()]} ${day}${suffix(day)} ${nextDate.getFullYear()}`;

  return formattedDate;
}

products_restocked.innerHTML = getNextDay(1, true, true);
products_sell_out.innerHTML = getNextDay(0, true);

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

document.querySelectorAll(".popup-images").forEach(images => {
  images.querySelectorAll("img").forEach((image, i) => {
    image.addEventListener("click", (e) => {
      const popup = document.querySelector("[data-popup-image]");
  
      popup.classList.remove("opacity-0", "pointer-events-none")
      popup.querySelector("#image").src = image.src;

      addEventArrow(images.querySelectorAll("img"), i, popup.querySelector("#image"));
    });
  })
})

document.querySelector("[data-popup-image]").addEventListener("click", (e) => {
  if(e.target.classList.contains("data-popup-image")){
    const popup = document.querySelector("[data-popup-image]");

    popup.classList.add("opacity-0", "pointer-events-none")
    popup.querySelector("img").src = "";
  }
});

document.querySelectorAll(".button-color").forEach(button => {
  button.addEventListener("click", (e) => {
    const id = button.getAttribute('data-id');
    const popupModal = document.querySelector(id);

    document.querySelectorAll(".popup-modal").forEach(popup => {
      popup.classList.add("hidden");
    });

    popupModal.classList.remove("hidden");
  });
})

document.querySelectorAll(".toggle").forEach((button, i) => {
  button.addEventListener("click", (e) => {
    document.querySelectorAll(".personalization-drawer")[i].classList.toggle("hidden")
  })
});

document.querySelectorAll("[data-close-icon]").forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".personalization-drawer")[i].classList.add("hidden")
  });
})

document.querySelectorAll('.add-in-bundle').forEach((button, i) => {
  button.addEventListener('click', (e) => {
    const productId = button.getAttribute('data-product-id');
    const productTitle = button.getAttribute('data-product-title');
    const productImage = button.getAttribute('data-product-image');
    const variantId = button.getAttribute('data-variant-id');
    const selectedSize = button.getAttribute('data-selected-size');
    const productType = button.getAttribute('data-product-type');
    const personalization = document.querySelectorAll('[data-personalization]')[i].value || null;
    const quantity = +document.querySelectorAll(".quantity-selector")[i].value;
    
    if (!selectedSize)
      return console.error("Please select a size before adding to the bundle!");

    const productToAdd = {
      id: productId,
      title: productTitle,
      image: productImage,
      variantId: variantId,
      size: selectedSize,
      type: productType,
      personalization: personalization,
      quantity: quantity
    };

    const existingProductIndex = bundle.findIndex(product => product.id === productId && product.size === selectedSize);
    if (existingProductIndex === -1 && bundle.length < pairs) {
      bundle.push(productToAdd); // Agregar el producto al bundle

      // Actualizar la interfaz
      updateBundleUI();
    }

    // Cerrar el modal después de agregar el producto
    const modal = document.querySelector(`#PopupModal-${productId}`);
    if (modal) {
      modal.classList.add('hidden');
    }
  });
});

document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', (e) => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.remove('hidden');
    }
  });
});

document.querySelectorAll('.popup-modal').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});

document.querySelectorAll(".open-help-choose").forEach(button => {
  button.addEventListener("click", (e) => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.getElementById("fixedpart").style.zIndex = "1000000000";
    }
  })
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".help-content") && !e.target.classList.contains("open-help-choose")) {
    document.querySelectorAll(".help-choose").forEach(modal => {
      modal.classList.add('hidden');
      document.getElementById("fixedpart").style.zIndex = "1000000002";
    })
  }
});

document.querySelectorAll(".close-help-choose").forEach(button => {
  button.addEventListener("click", (e) => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.add('hidden');
      document.getElementById("fixedpart").style.zIndex = "1000000002";
    }
  })
});

const bundleVariants = ['45950893392128', '45950893359360', '45950893326592'];

const addGifts = async (products) => {
  const variants = [
    [],
    ["53598862836092"],
    ["54858935828860", "53598862836092"]
  ]

  for (const id of variants[products.length - 1]) {
    const bundleFormData = new FormData();
    bundleFormData.append("id", id);
    bundleFormData.append("quantity", 1);

    await fetch("/cart/add.js", {
      method: "POST",
      body: bundleFormData,
    })
    .then(async response => {
      console.log(await response.json());
    })
    .catch(e => {
      console.error(e);
    }); 
  }
}

const addPersonalization = async (products) => {
  let number = 0;

  products.forEach(product => {
    if (product.personalization && product.personalization.length > 0) {
      number += 1;
    }
  })

  const bundleFormData = new FormData();
  bundleFormData.append("id", "44030822383872");
  bundleFormData.append("quantity", number);

  await fetch("/cart/add.js", {
    method: "POST",
    body: bundleFormData,
  })
  .then(async response => {
    const bundleResult = await response.json();
    console.log(`Bundle added: ${bundleResult.title}`);
  })
  .catch(e => {
    console.error(e);
  }); 
}

const addBundle = async (products) => {
  let bundleNote = "";
  products.forEach((product, index) => {
    if (product.title) {
      bundleNote += `${index + 1}: ${product.title}\n${index !== products.length - 1 ? "," : ""}`;
    }
  });
  const bundleFormData = new FormData();
  bundleFormData.append("id", bundleVariants[bundle.length - 1]);
  bundleFormData.append("quantity", 1);
  bundleFormData.append("properties[Contents]", bundleNote.trim());

  await fetch("/cart/add.js", {
    method: "POST",
    body: bundleFormData,
  })
  .then(async response => {
    const bundleResult = await response.json();
    console.log(`Bundle added: ${bundleResult.title}`);
  })
  .catch(e => {
    console.error(e);
  }); 
}

async function addToCart(products) {
  for (const product of products) {
    const formData = new FormData();
    formData.append("id", product.variantId);
    formData.append("quantity", product.quantity);

    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Product added: ${result.title}`);
      } else {
        console.error(`Failed to add product: ${product.title}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  addBundle(products);
  addPersonalization(products);
  addGifts(products);
  
  //window.location.href = '/checkout';
  /*
  if (typeof UpCart !== "undefined" && UpCart.openDrawer) {
    
  } else {
    console.error("UpCart is not available.");
  }
  */
}

document.querySelector("#add-to-cart-button").addEventListener("click", (e) => {
  e.preventDefault();
  addToCart(bundle);
});

let selectedSize = null; // Declarar fuera de la función

function selectSize(button, size, variantId) {
  selectedSize = size; // Almacena el tamaño seleccionado

  // Resaltar el botón seleccionado
  document.querySelectorAll('.size-option').forEach(btn => {
    btn.classList.remove('selected'); // Elimina la clase 'selected' de todos los botones
  });
  button.classList.add('selected'); // Marca el botón seleccionado

  // Actualizar el tamaño seleccionado en el botón "Add to Bundle"
  button.setAttribute('data-selected-size', selectedSize);
  const addToBundleButton = button.closest('.popup-modal').querySelector('.add-in-bundle');
  addToBundleButton.setAttribute('data-selected-size', selectedSize);

  // Actualizar el contenido del elemento junto a "SIZE:"
  const selectedSizeElement = document.getElementById('selected-size');
  if (selectedSizeElement) {
    selectedSizeElement.textContent = size;
  }
}

// Cerrar el formulario de personalización al hacer clic en el icono
document.querySelector('.close-icon').addEventListener('click', function() {
  const personalizationDrawer = document.getElementById('personalization-drawer');
  personalizationDrawer.style.display = 'none';
});

function updateBundleUI() {
  const bundleProductsContainer = document.getElementById('bundle-products');
  const addToCartButton = document.getElementById('add-to-cart-button');
  
  bundleProductsContainer.innerHTML = ''; // Limpiar productos existentes

  // Recorrer el array de productos y agregar cada uno al contenedor
  bundle.forEach(product => {
    bundleProductsContainer.innerHTML += `
      <div class="relative bundle-product_item flex flex-col gap-[12px] mb-[10px]">
        <div class="relative pt-[97.77%] border border-[#B2B2B2] rounded-[6px] bundle_bg before:content-['${i+1}']">
          <img
            alt="${product.title}"
            src="${product.image}"
            class="object-contain w-full h-full"
            style="width: auto; height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
          >
        </div>
        <div class="md:block hidden">
          <div class="font-anton text-[14px]">${product.title}</div>
          <div class="text-[14px]">${product.type}</div>
        </div>
        <button class="delete-glove absolute right-0 top-0 translate-y-[-50%] translate-x-2/4 w-[20px] h-[20px] bg-black rounded-full flex justify-center
          items-center text-[20px] text-white z-10 font-arial">
          &times;
        </button>
      </div>`
    ;
  });

  for (let i = 0; i < 3; i++) {
    if (i < pairs) {
      if (i >= bundleProductsContainer.children.length) {
        bundleProductsContainer.innerHTML += `
            <div class="bundle-product_item flex flex-col gap-[12px] md:pb-[36px]">
              <div class="relative pt-[97.77%] border border-[#B2B2B2] rounded-[6px] bundle_bg before:content-['${i+1}']"></div>
            </div>`;
      }
    } else {
      bundleProductsContainer.innerHTML += `<div class="bundle-product_item flex flex-col gap-[12px] md:pb-[36px]"></div>`;
    }
  }

  if (bundle.length == pairs) {
    addToCartButton.disabled = false;
  }

  document.querySelectorAll(".delete-glove").forEach((button, i) => {
    button.addEventListener("click", (e) => {
      bundle = bundle.filter((item, q) => q !== i);

      updateBundleUI();
    });
  });

  // Actualizar el estado del botón según la cantidad de productos
  if (bundle.length >= pairs) {
    addToCartButton.textContent = "SUBMIT BUNDLE";
    addToCartButton.classList.remove('opacity-75');
  } else {
    const itemsNeeded = pairs - bundle.length;
    addToCartButton.textContent = `Add ${itemsNeeded} More Items`;
    addToCartButton.classList.add('opacity-75');
  }
}

function addControler() {
  document.querySelectorAll(".delete-glove").forEach((button, i) => {
    button.addEventListener("click", (e) => {
      bundle = bundle.filter((item, q) => q !== i);
      console.log(bundle)
      updateBundleUI();
    });
  });
}

const section = document.getElementById("fixedpart");
const sectionOffset = section.offsetTop;

function handleScroll() {
  // Only apply fixed positioning if the screen width is below 768px (mobile)
  if (window.innerWidth <= 768) {
    if (window.pageYOffset >= sectionOffset) {
      section.classList.add("fixed");
    } else {
      section.classList.remove("fixed");
    }
  } else {
    section.classList.remove("fixed"); // Remove fixed class for larger screens
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);
updateBundleUI()