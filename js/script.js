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
    "Cloud Solutions Architect"
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
  allSection[num].classList.add("back-section");
}

function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
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
});

// Hero section animations
function animateHeroSection() {
  const greeting = document.querySelector('.animated-greeting');
  const profession = document.querySelector('.my-profession');
  const description = document.querySelector('.hero-description');
  const buttons = document.querySelector('.hero-buttons');
  const socialLinks = document.querySelector('.social-links');
  const profileImg = document.querySelector('.home-img img');

  // Add animation classes
  if (greeting) greeting.style.animation = 'fadeInUp 1s ease 0.2s both';
  if (profession) profession.style.animation = 'fadeInUp 1s ease 0.4s both';
  if (description) description.style.animation = 'fadeInUp 1s ease 0.6s both';
  if (buttons) buttons.style.animation = 'fadeInUp 1s ease 0.8s both';
  if (socialLinks) socialLinks.style.animation = 'fadeInUp 1s ease 1s both';
  if (profileImg) profileImg.style.animation = 'fadeInRight 1s ease 0.5s both';
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
