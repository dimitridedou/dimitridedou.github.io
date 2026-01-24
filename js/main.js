const navbarBrand = document.querySelector('.navbar-brand');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom * 0.3) {
        navbarBrand.style.opacity = '1';
        navbarBrand.style.pointerEvents = 'auto';
    } else {
        navbarBrand.style.opacity = '0';
        navbarBrand.style.pointerEvents = 'none';
    }
});
