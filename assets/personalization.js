
function toggleDrawer() {
  const drawer = document.getElementById("personalization-drawer");
  const closeIcon = document.querySelector(".close-icon");
  const svg = document.querySelector(".personalization-box__wrap svg");
  const span = document.querySelector(".personalization-box__wrap span");
  
    
  
  if (
    drawer.style.display === "block" ||
    getComputedStyle(drawer).display === "block"
  ) {
    drawer.style.display = "none";
    closeIcon.style.display = "none";
    // Restore initial styles
    svg.style.backgroundColor = "";
    span.style.color = "";
    span.style.borderBottomColor = "";
    $('.presonalisation_values').removeClass('active');
    
  } else {
    drawer.style.display = "block";
    closeIcon.style.display = "flex";
    // Apply new styles
    svg.style.backgroundColor = "#D75454";
    span.style.color = "#D75454";
    span.style.borderBottomColor = "#D75454";
    $('.presonalisation_values').addClass('active');
  }
}

const toggle = document.getElementById("toggle");
toggle.addEventListener("click", toggleDrawer);

const closeIcon = document.querySelector(".close-icon");
closeIcon.addEventListener("click", function () {
  document.getElementById("personalization-drawer").style.display = "none";
  closeIcon.style.display = "none";
  // Restore initial styles
  const svg = document.querySelector(".personalization-box__wrap svg");
  const span = document.querySelector(".personalization-box__wrap span");
  svg.style.backgroundColor = "";
  span.style.color = "";
  span.style.borderBottomColor = "";
  $('.presonalisation_values').removeClass('active');
  
});
