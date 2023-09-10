const second_header = document.querySelector("#second_header");
const nav_click = document.getElementsByClassName("nav-link");


window.addEventListener("scroll", (event) => header_scroll());

$(window).resize(function () {
    header_scroll();
});

function header_scroll() {
    let scroll = this.scrollY;
    if (window.innerWidth > 768) {
        if (scroll > 1) {
            second_header.style.opacity = 1 - scroll / 100;

            for (let i = 0; i < nav_click.length; i++) {
                nav_click[i].href = "#";
                // console.log(nav_click[i]);
            }
        }
        else {
            second_header.style.opacity = 1;
            nav_click[0].href = "/controler/pages/index.php";
            nav_click[1].href = "/controler/pages/research.php";
        }
    }
}