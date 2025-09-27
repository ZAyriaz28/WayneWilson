document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Duración de la animación en milisegundos
        once: true,    // Si las animaciones deben ocurrir solo una vez al hacer scroll hacia abajo
        mirror: false, // Si los elementos deben animarse al hacer scroll hacia arriba
    });

    // 2. Lógica del Modo Oscuro (Dark Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Cargar la preferencia del usuario al iniciar
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Cambiar icono
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    // 3. Efecto de Contador (para los hitos de trayectoria)
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 1.0 // Se activa cuando el elemento está completamente visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                
                const updateCounter = () => {
                    const increment = target / 200; // Controla la velocidad de conteo
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter); // Deja de observar después de la animación
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // 4. Efecto de Reducción de Header al Hacer Scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Se activa después de 50px de scroll
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});