const $parallax = document.querySelector('.parallax');
const $container = document.querySelector('.header-container');

function doParallax () {
    const scrolledHeight = window.pageYOffset;
    const limit = $parallax.offsetTop + $parallax.offsetHeight;
    if(scrolledHeight > $parallax.offsetTop && scrolledHeight <= limit) {
        $parallax.style.backgroundPositionY= (scrolledHeight - $parallax.offsetTop) / 2.5 + 'px';
    }  else {
        $parallax.style.backgroundPositionY = '0';
    }
}

function handleScroll () {
    const position = $container.getBoundingClientRect().top;

    if (position < 0) {
        $container.className = 'header-container stick';
    } else {
        $container.className = 'header-container';
    }

    doParallax();
}

(function () {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
}());