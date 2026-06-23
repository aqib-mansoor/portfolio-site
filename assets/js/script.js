'use strict';

// element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { 
    elementToggleFunc(sidebar); 
  });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if(modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
if(testimonialsItem.length > 0 && modalImg && modalTitle && modalText){
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });
}

// add click event to modal close button
if(modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if(overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select (dropdown) & filtering logic
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// filter function
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  if (filterItems.length > 0) {
    filterItems.forEach(item => {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category.toLowerCase()) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

// add event in all select items for mobile filtering
if (selectItems.length > 0) {
  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) select.classList.remove("active");
      filterFunc(selectedValue);
    });
  });
}

// add event in all filter button items for desktop filtering
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields for client-side validation
if(formInputs.length > 0 && formBtn && form){
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

// toast variable & show function
const toast = document.querySelector("#contact-toast");
const showToast = function () {
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
}

// contact form submission handling via AJAX
if (form && formBtn) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const originalBtnHTML = formBtn.innerHTML;
    formBtn.setAttribute("disabled", "");
    formBtn.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:8px;"><ion-icon name="sync-outline" style="animation: spin 1s linear infinite;"></ion-icon> Sending...</span>`;

    if (!document.getElementById('spin-keyframes')) {
      const style = document.createElement('style');
      style.id = 'spin-keyframes';
      style.innerHTML = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        showToast();
        form.reset();
        formBtn.setAttribute("disabled", "");
      } else {
        alert("Oops! There was a problem submitting your message. Please try again.");
      }
    })
    .catch(error => {
      console.error("Form submission error:", error);
      alert("Oops! There was a network error. Please try again.");
    })
    .finally(() => {
      formBtn.innerHTML = originalBtnHTML;
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      }
    });
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
if(navigationLinks.length > 0){
  navigationLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      pages.forEach((page, i) => {
        if (link.innerHTML.toLowerCase() === page.dataset.page) {
          page.classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      });
    });
  });
}

// scroll-reveal animation using IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(element => {
    // If it is on the first load visible screen, immediately show it
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      element.classList.add("active");
    } else {
      revealObserver.observe(element);
    }
  });
}
