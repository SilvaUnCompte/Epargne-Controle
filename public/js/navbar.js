
function show_navbar() {
    let dark = document.getElementById("dark");
    let navbar = document.getElementById("side-menu");

    navbar.style.left = "0px";
    dark.style.backgroundColor = "#000000ab";
    dark.style.zIndex = "90";

    setTimeout(function () {
        dark.addEventListener("click", hide_navbar);
    }, 1);
}

function hide_navbar() {
    let dark = document.getElementById("dark");
    let navbar = document.getElementById("side-menu");

    navbar.style.left = "-175px";
    dark.style.backgroundColor = "#00000000";
    dark.style.zIndex = "-1";

    dark.removeEventListener("click", hide_navbar);
}

// Security: resizes the window more than 768px, navbar will be reset
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        let dark = document.getElementById("dark");
        let navbar = document.getElementById("side-menu");

        navbar.style.left = "0px";
        dark.style.backgroundColor = "#00000000";
        dark.style.zIndex = "-1";

        document.body.removeEventListener("click", hide_navbar);
    }
});

// Security: close navbar when the window is resized
window.addEventListener("resize", function () {
    if (window.innerWidth < 768) {
        let dark = document.getElementById("dark");
        let navbar = document.getElementById("side-menu");

        navbar.style.left = "-175px";
        dark.style.backgroundColor = "#00000000";
        dark.style.zIndex = "-1";
    }
});