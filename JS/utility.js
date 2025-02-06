// Dynamically load components (navbar, footer, offcanvas)
let basePath = window.location.pathname.includes("/pages/") ? "../" : "./";

const loadComponents = (id, fileName, callback) => {
    fetch(basePath + fileName)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch((err) => console.error("Loading failed: " + fileName, err));
};

// Load components on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    loadComponents("header", "components/navbar.html", highlightActiveLink);
    loadComponents("footer", "components/footer.html");
    loadComponents("mobileCartOffcanvas", basePath + "pages/cart.html");
    loadComponents("desktopCartOffcanvas", basePath + "pages/cart.html");
});

// Highlight the active navigation link based on the current page
const highlightActiveLink = () => {
    let currentPage = window.location.pathname.split("/").filter(Boolean).pop();
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach((link) => {
        let pageLink = link
            .getAttribute("href")
            .split("/")
            .filter(Boolean)
            .pop();
        if (pageLink === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};
