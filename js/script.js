document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous error messages
  clearMessages();

  // Validate inputs
  var isValid = validateForm();

  if (isValid) {
    sendEmail();
  }
});

function clearMessages() {
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('subjectError').textContent = '';
  document.getElementById('messageError').textContent = '';
  document.getElementById('successMessage').style.display = 'none';
  document.getElementById('errorMessage').style.display = 'none';
}

function validateForm() {
  let isValid = true;

  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let subject = document.getElementById('subject').value.trim();
  let message = document.getElementById('message').value.trim();

  if (name === '') {
    document.getElementById('nameError').textContent = 'Please enter your name';
    isValid = false;
  }

  if (email === '') {
    document.getElementById('emailError').textContent = 'Please enter your email';
    isValid = false;
  } else if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address';
    isValid = false;
  }

  if (subject === '') {
    document.getElementById('subjectError').textContent = 'Please enter a subject';
    isValid = false;
  }

  if (message === '') {
    document.getElementById('messageError').textContent = 'Please enter a message';
    isValid = false;
  }

  return isValid;
}

function validateEmail(email) {
  var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(String(email).toLowerCase());
}

function sendEmail() {
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  document.querySelector('.btn-text').style.display = 'none';
  document.querySelector('.btn-loader').style.display = 'inline-block';

  // Simulate email sending
  setTimeout(function () {
    submitBtn.disabled = false;
    document.querySelector('.btn-text').style.display = 'inline';
    document.querySelector('.btn-loader').style.display = 'none';

    // Simulate success
    document.getElementById('successMessage').style.display = 'block';
  }, 2000);
}

/* ========================= Typing Animation ========================= */
let typed = new Typed(".typing", {
  strings: [
    "",
    "Software Engineer",
    "Full-Stack Web Developer",
    "Freelancer",
    "Cyber Security Enthusiast",
    "AI Developer",
    
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

/* ========================= Portfolio Filter ========================= */
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.classList.add('animate');
          item.classList.remove('hide');
          item.classList.add('show');
        } else {
          item.style.display = 'none';
          item.classList.remove('animate');
          item.classList.add('hide');
          item.classList.remove('show');
        }
      });

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

/* ========================= Aside ========================= */
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
        //allSection[j].classList.add("back-section")
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}

function addBackSection(num) {
  if (allSection[num]) {
    allSection[num].classList.add("back-section");
    
    // Ensure back section styling is applied after page load
    if (document.body.classList.contains('loaded')) {
      setTimeout(() => {
        allSection[num].style.transform = '';
        allSection[num].style.opacity = '';
        allSection[num].style.filter = '';
      }, 50);
    }
  }
}

function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  const targetSection = document.querySelector("#" + target);
  if (targetSection) {
    targetSection.classList.add("active");
    
    // Force proper positioning after page is loaded
    if (document.body.classList.contains('loaded')) {
      setTimeout(() => {
        // Clear any conflicting inline styles
        targetSection.style.transform = '';
        targetSection.style.opacity = '';
        targetSection.style.filter = '';
      }, 50);
    }
  }
}

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}

// Handle all CTA buttons with data-section-index
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('[data-section-index]');
  ctaButtons.forEach(button => {
    button.addEventListener("click", function () {
      const sectionIndex = this.getAttribute("data-section-index");
      showSection(this);
      updateNav(this);
      removeBackSection();
      addBackSection(sectionIndex);
    });
  });

  // Add animations when page loads
  animateHeroSection();
  
  // Initialize page load handling
  initPageLoadHandling();
  
  // Handle URL hash on page load
  handleInitialHash();
});

// Enhanced hero section animations with modern loading
function animateHeroSection() {
  const greeting = document.querySelector('.animated-greeting');
  const profession = document.querySelector('.my-profession');
  const description = document.querySelector('.hero-description');
  const buttons = document.querySelector('.hero-buttons');
  const socialLinks = document.querySelector('.social-links');
  const profileImg = document.querySelector('.home-img img');

  // Create loading timeline with staggered animations
  const elements = [
    { el: greeting, delay: 0.2, animation: 'fadeInUp' },
    { el: profession, delay: 0.4, animation: 'fadeInUp' },
    { el: description, delay: 0.6, animation: 'fadeInUp' },
    { el: buttons, delay: 0.8, animation: 'fadeInUp' },
    { el: socialLinks, delay: 1.0, animation: 'fadeInUp' },
    { el: profileImg, delay: 0.5, animation: 'fadeInRight' }
  ];

  elements.forEach(({ el, delay, animation }) => {
    if (el) {
      el.style.animation = `${animation} 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s both`;
      // Add a subtle glow effect on load
      el.style.filter = 'drop-shadow(0 0 20px rgba(236, 24, 57, 0.1))';
    }
  });

  // Animate skill badges individually
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach((badge, index) => {
    if (badge) {
      badge.style.animation = `fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.1 * index}s both`;
    }
  });

  // Add page load progress indicator
  createLoadingProgress();
}

// Modern loading progress indicator
function createLoadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'page-loading-progress';
  progressBar.innerHTML = '<div class="progress-fill"></div>';
  document.body.appendChild(progressBar);

  // Animate progress
  const fill = progressBar.querySelector('.progress-fill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        progressBar.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(progressBar);
        }, 300);
      }, 200);
    }
    fill.style.width = progress + '%';
  }, 50);
}

const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

// Page load handling to prevent blurred/mispositioned content
function initPageLoadHandling() {
  // Add preload class to prevent animations during load
  document.body.classList.add('preload');
  
  // Remove preload class after a short delay to enable animations
  window.addEventListener('load', function() {
    setTimeout(() => {
      document.body.classList.remove('preload');
      document.body.classList.add('loaded');
      
      // Ensure all sections are properly positioned
      resetSectionPositions();
      
      // Re-enable navigation functionality
      enableNavigation();
      
      // Handle hash after everything is loaded
      handleInitialHash();
    }, 100);
  });
  
  // Fallback for slower connections
  setTimeout(() => {
    if (document.body.classList.contains('preload')) {
      document.body.classList.remove('preload');
      document.body.classList.add('loaded');
      resetSectionPositions();
      enableNavigation();
      handleInitialHash();
    }
  }, 1000);
}

// Enable navigation after page load
function enableNavigation() {
  // Force refresh of current active section
  const activeSection = document.querySelector('.section.active');
  if (activeSection) {
    activeSection.style.transform = '';
    activeSection.style.opacity = '';
    activeSection.style.filter = '';
  }
  
  // Ensure inactive sections are properly positioned
  const inactiveSections = document.querySelectorAll('.section:not(.active)');
  inactiveSections.forEach(section => {
    if (!section.classList.contains('back-section')) {
      section.style.transform = '';
      section.style.opacity = '';
      section.style.filter = '';
    }
  });
}

// Handle initial URL hash on page load
function handleInitialHash() {
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const sectionId = hash.substring(1);
    const targetSection = document.querySelector(`#${sectionId}`);
    const navLink = document.querySelector(`a[href="${hash}"]`);
    
    if (targetSection && navLink) {
      // Wait for page to be loaded before switching sections
      setTimeout(() => {
        // Remove active class from all sections
        document.querySelectorAll('.section').forEach(section => {
          section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav a').forEach(link => {
          link.classList.remove('active');
        });
        
        // Activate the target section and nav link
        targetSection.classList.add('active');
        navLink.classList.add('active');
        
        // Clear any conflicting styles
        targetSection.style.transform = '';
        targetSection.style.opacity = '';
        targetSection.style.filter = '';
      }, 200);
    }
  }
}

// Handle hash changes during navigation
window.addEventListener('hashchange', function() {
  handleInitialHash();
});

// Reset section positions to prevent misalignment
function resetSectionPositions() {
  const sections = document.querySelectorAll('.section');
  const activeSection = document.querySelector('.section.active');
  
  sections.forEach(section => {
    if (section !== activeSection) {
      // Clear inline styles to let CSS classes take control
      section.style.transform = '';
      section.style.opacity = '';
      section.style.filter = '';
      section.classList.remove('back-section');
    } else {
      // Clear inline styles for active section too
      section.style.transform = '';
      section.style.opacity = '';
      section.style.filter = '';
    }
  });
}
