document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Navbar & Mobile Menu
  ========================================================================== */const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

// Navbar Scroll Effect
if (navbar) {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

// Toggle Mobile Menu
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open"); // ← menu buka/tutup
  const icon = navToggle.querySelector("i");

  if (navLinks.classList.contains("open")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times"); 
  } else {
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  }
});

// Tutup menu saat klik link
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const icon = navToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});
  

  /* ==========================================================================
     2. Reveal on Scroll (Intersection Observer)
  ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-staggered');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        observer.observe(el);
      } else {
        el.classList.add('active');
      }
    });
  }

  /* ==========================================================================
     3. Number Counter (Trust Badge)
  ========================================================================== */
  const counterElement = document.querySelector('.count-number');
  const duration = 3000; // 2 detik
  if (counterElement && 'IntersectionObserver' in window) {
    const startCounter = (el) => {
      let currentCount = 0;
      const targetValue = parseInt(el.getAttribute('data-target')) || 0;
      const increment = targetValue / (duration / 16);

      const updateCount = () => {
        currentCount += increment;
        if (currentCount < targetValue) {
          el.textContent = Math.ceil(currentCount).toLocaleString('id-ID');
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = targetValue.toLocaleString('id-ID');
        }
      };
      requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(counterElement);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const trustBadge = counterElement.closest('.trust-badge');
    if (trustBadge) counterObserver.observe(trustBadge);
  }

  /* ==========================================================================
     4. Testimonial Slider
  ========================================================================== */
  const slider = document.getElementById('testiSlider');

if (slider) {
  const items = slider.querySelectorAll('.testi-item');
  let currentIndex = 0;

  // Tampilkan slide
  const showSlide = (index) => {
    items.forEach(item => item.classList.remove('active'));
    items[index].classList.add('active');
  };

  // Auto-play setiap 5 detik
  setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }, 5000);

  // Tampilkan pertama
  showSlide(currentIndex);
}

  /* ==========================================================================
     5. Typing Effect
  ========================================================================== */
  const typingTarget = document.querySelector('.typing-target');
  if (typingTarget && 'IntersectionObserver' in window) {
    const textToType = typingTarget.textContent;
    typingTarget.textContent = '';

    const typingObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let i = 0;
          const speed = 50;
          const typeWriter = () => {
            if (i < textToType.length) {
              typingTarget.textContent += textToType.charAt(i);
              i++;
              setTimeout(typeWriter, speed);
            }
          };
          setTimeout(typeWriter, 1500);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });

    typingObserver.observe(typingTarget);
  }

});

document.addEventListener("DOMContentLoaded", () => {
  const typing = document.querySelector(".typing-target");
  if (!typing) return;

  const text = typing.textContent.trim();
  typing.textContent = "";
  let idx = 0;

  function type() {
    if (idx < text.length) {
      typing.textContent += text.charAt(idx);
      idx++;
      setTimeout(type, 100); // speed
    }
  }
  type();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.fade-in-right, .fade-in-left, .reveal').forEach(el => {
  observer.observe(el);
});

const gallerySlider = document.getElementById('gallerySlider');
if (gallerySlider) {
  const slides = gallerySlider.children;
  let currentSlide = 0;

  const showGallerySlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  setInterval(showGallerySlide, 3000); // ganti slide tiap 3 detik
}