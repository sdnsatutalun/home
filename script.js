// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scroll dengan Offset Header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Abaikan jika link hanya berisi '#'
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            e.preventDefault(); // Mencegah perilaku default browser yang insta-scroll
            
            // Tutup menu mobile jika sedang terbuka
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            // Hitung tinggi header secara dinamis
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            
            // Hitung posisi akhir (posisi section - tinggi header - sedikit spasi)
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            // Lakukan animasi scroll halus ke posisi yang sudah dihitung
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        // Sesuaikan posisi deteksi active link dengan tinggi header
        const sectionTop = section.offsetTop - headerHeight - 50;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated Counter
const counters = document.querySelectorAll('.stat-num');
const speed = 200;

const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;

    const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
};

// Trigger counter when visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});