document.addEventListener("DOMContentLoaded", function () {
  if (checkBox) {
    checkBox.onchange = function () {
      if (this.checked) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    };
  }
  
  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", function (e) {
      e.preventDefault;
      window.location.href = "study.html";
    });
  }
});
