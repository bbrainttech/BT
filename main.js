const q = (el, all) => {
    return (all) ? document.querySelectorAll(el) : document.querySelector(el);
}
const cls = (el, value, type) => {
    (type == 'add') ? el.classList.add(value) :
        (type == 'remove') ? el.classList.remove(value) :
            el.classList.toggle(value)
}
window.addEventListener('load', () => {
    GLightbox({ selector: '.glight' });


    cls(q('.loader'), 'load', 'add')
    AOS.init({
        duration: 900,
        easing: "ease-in-out",
        mirror: false
    });
    toggleModal()

    const port_iso = new Isotope('.filter-elements', {
        itemSelector: '.port-contents',
        masonry: {
            columnWidth: 10,
            isFitWidth: true,
            isFitHeight: true
        }
        // layoutMode:'fitRows'
    });


    const filter_links = q('.filter-links span', 1)
    filter_links.forEach(link => {
        link.onmousedown = function () {
            for (i of filter_links) { cls(i, 'current-filter', 'remove') }
            cls(this, 'current-filter', 'add')
            port_iso.arrange({
                filter: this.getAttribute('data-filter')
            });
            AOS.refresh();
            window.addEventListener('resize', () => {
                port_iso.arrange({
                    filter: this.getAttribute('data-filter')
                });
                AOS.refresh();
            })
        }
    })

    window.addEventListener('scroll', () => {
        AOS.refresh();
    })

});

const navBar = q('.navBar')

const activateNav = () => {
    if (window.pageYOffset > 20) { cls(navBar, 'fx', 'add'); cls(q('.btt'), 'fx', 'add'); }
    else { cls(navBar, 'fx', 'remove'); cls(q('.btt'), 'fx', 'remove') }
}
activateNav();

const menu = q('.menu', 0), navLinks = q('.links');
const toggleModal = () => {
    click = 0
    menu.onclick = function () {
        cls(navLinks, 'show', 'toggle')
        if (!click) {
            this.innerHTML = `<i data-aos="zoom-in" data-aos-duration='300' class='ri ri-close-fill'></i>`; click = 1;
        }
        else {
            this.innerHTML = `<i data-aos="zoom-in" data-aos-duration='300' class="bi bi-list"></i>`; click = 0
        }
    }
}
let allNavLinks = q('.links>ul>li>a:last-child', 1)
const activate_current_link = link => {
    for (i of allNavLinks) { cls(i, 'act', 'remove') }
    cls(link, 'act', 'add');
}
// const removw_current_link = (i) => {
//     fcls(i, 'act', 'remove') }
// }

const activateNavLinksOnscroll = () => {
    const yt = el => { return el.offsetTop }
    const linkPages = [home, about, services, portfolio, team, contact];

    window.onscroll = () => {
        for (let i = 0; i < linkPages.length; i++) {
            let thisTop = yt(linkPages[i]) - (0.015 * yt(linkPages[i]))
            console.log(window.pageYOffset, linkPages[2].getBoundingClientRect().height)
            if (window.pageYOffset >= thisTop) {
                activate_current_link(allNavLinks[i])
            }
        }
        activateNav();
    }

}


activateNavLinksOnscroll();

allNavLinks.forEach(ln => {

    ln.onmousedown = () => {
        cls(navLinks, 'show', 'remove')
        q('.menu').innerHTML = `<i data-aos="zoom-in" data-aos-duration='300' class="bi bi-list"></i>`
        click = 0;
        activate_current_link(ln)
    }
});

new Swiper('.clients-slider', {
    speed: 700,
    loop: true,
    cursor: 'pointer',
    centerSlide: true,
    fade: true,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true
    },
    breakpoints: {
        250: {
            slidesPerView: 1,
            spaceBetween: 40
        },
        320: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        680: {
            slidesPerView: 3,
            spaceBetween: 50
        },
        900: {
            slidesPerView: 4,
            spaceBetween: 50
        },
        1130: {
            slidesPerView: 6,
            spaceBetween: 100
        }
    }
});

new Swiper('.revs-box', {
    speed: 600,
    loop: true,
    centerSlide: true,
    grabCursor: true,
    fade: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true
    }
});
