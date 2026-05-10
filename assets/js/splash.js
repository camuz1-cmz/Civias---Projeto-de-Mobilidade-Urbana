window.addEventListener("load", () => {

  const splash = document.getElementById("splash");

  setTimeout(() => {

    splash.style.opacity = "0";

    setTimeout(() => {

      window.location.href = "onboarding.html";

    }, 600);

  }, 2600);

});
