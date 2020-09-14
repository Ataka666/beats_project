const cross = document.querySelector("#cross");
const overlay = document.querySelector("#overlay");
  const hamburger = document.querySelector("#hamburger");
  const computed = window.getComputedStyle(overlay);

  hamburger.addEventListener("click", function(e) {
    e.preventDefault();
    overlay.style.right = "0px";
  });

  cross.addEventListener("click", function(e) {
    e.preventDefault();
    overlay.style.right = "-1000px";
  });