// 🔡 Typing Animation – runs only when element is found
const skills = ["Strength Training", "Expert Coaching", "Tailored Programs"];
let skillIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

function type(bannerSkills) {
  const currentSkill = skills[skillIndex];
  const displayedText = currentSkill.substring(0, charIndex);
  bannerSkills.textContent = displayedText;

  if (!isDeleting && charIndex < currentSkill.length) {
    charIndex++;
    setTimeout(() => type(bannerSkills), typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(() => type(bannerSkills), typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (isDeleting) {
      setTimeout(() => type(bannerSkills), 1000);
    } else {
      skillIndex = (skillIndex + 1) % skills.length;
      setTimeout(() => type(bannerSkills), 500);
    }
  }
}

window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }

  const bannerSkills = document.querySelector(".banner-skills");
  if (bannerSkills) {
    type(bannerSkills);
  }
});


// 🍔 Hamburger Menu
$(document).ready(function () {
  $('.hamburger-menu').click(function () {
    const $sidebar = $('.sidebar');
    $sidebar.stop(true, true).slideToggle();
  });
});


// 🔢 Macro Calculator
function calculateMacros(weight, unit = "lbs", goal = "maintenance", gender = "male") {
  if (unit === "kg") weight *= 2.20462;
  const multipliers = {
    maintenance: { protein: [0.7, 1.0], carbs: [1.5, 2.5], fat: [0.3, 0.5], male: [14, 16], female: [13, 15] },
    muscle_gain: { protein: [1.0, 1.2], carbs: [2.5, 3.5], fat: [0.4, 0.6], male: [16, 18], female: [14, 16] },
    fat_loss: { protein: [1.0, 1.2], carbs: [1.0, 1.5], fat: [0.3, 0.5], male: [12, 14], female: [11, 13] }
  };
  if (!multipliers[goal] || !multipliers[goal][gender]) return null;

  const macro = multipliers[goal];
  const calorieRange = macro[gender];
  const protein = [Math.round(weight * macro.protein[0]), Math.round(weight * macro.protein[1])];
  const carbs = [Math.round(weight * macro.carbs[0]), Math.round(weight * macro.carbs[1])];
  const fat = [Math.round(weight * macro.fat[0]), Math.round(weight * macro.fat[1])];
  const calories = [Math.round(weight * calorieRange[0]), Math.round(weight * calorieRange[1])];

  return {
    protein: `${protein[0]}g - ${protein[1]}g`,
    carbs: `${carbs[0]}g - ${carbs[1]}g`,
    fat: `${fat[0]}g - ${fat[1]}g`,
    calories: `${calories[0]} - ${calories[1]} kcal`
  };
}


// 📊 Nutrition Form Submit
$(document).ready(function () {
  $('.submit-button').click(function () {
    const weight = parseFloat($('.weight-input').val());
    const unit = $('.weight-unit').val() === '2' ? 'lbs' : 'kg';
    const genderVal = $('.gender-button').val();
    const goalVal = $('.nutrition-button').eq(2).val();

    const gender = genderVal === '2' ? 'male' : genderVal === '3' ? 'female' : '';
    const goal = goalVal === '2' ? 'muscle_gain' : goalVal === '3' ? 'maintenance' : goalVal === '4' ? 'fat_loss' : '';

    if (!weight || !gender || !goal) {
      alert("Please complete all fields.");
      return;
    }

    const result = calculateMacros(weight, unit, goal, gender);
    if (result) {
      $('.nutrition-table td:contains("Fats")').next().html(result.fat);
      $('.nutrition-table td:contains("Calories")').next().html(result.calories);
      $('.nutrition-table td:contains("Protein")').next().html(result.protein);
      $('.nutrition-table td:contains("Carbohydrates")').next().html(result.carbs);
    }
  });
});


// 📧 Contact Form Validation + Loading Feedback
document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.querySelector('.first-name-input');
  const lastName = document.querySelector('.last-name-input');
  const subject = document.querySelector('.subject-input');
  const email = document.querySelector('.email-input');
  const message = document.querySelector('textarea');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(input, msg) {
    input.parentElement.querySelector('.error-message').textContent = msg;
    input.style.border = '2px solid red';
  }

  function clearError(input) {
    input.parentElement.querySelector('.error-message').textContent = '';
    input.style.border = '';
  }

  let isValid = true;
  if (firstName.value.trim() === '') { showError(firstName, 'First name is required.'); isValid = false; } else clearError(firstName);
  if (lastName.value.trim() === '') { showError(lastName, 'Last name is required.'); isValid = false; } else clearError(lastName);
  if (subject.value.trim() === '') { showError(subject, 'Please enter a subject.'); isValid = false; } else clearError(subject);
  if (!emailPattern.test(email.value.trim())) { showError(email, 'Please enter a valid email address.'); isValid = false; } else clearError(email);
  if (message.value.trim() === '') { showError(message, 'Message cannot be empty.'); isValid = false; } else clearError(message);

  if (isValid) {
    const submitBtn = document.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.submit-btn-text');
    btnText.innerHTML = `
      <svg class="custom-spinner" width="20" height="20" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"
          stroke-dasharray="100" stroke-dashoffset="60">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25"
            dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>`;
    submitBtn.style.filter = 'grayscale(100%)';
    submitBtn.disabled = true;

    setTimeout(() => {
      btnText.textContent = 'Submit';
      submitBtn.disabled = false;
      submitBtn.style.filter = 'grayscale(0)';
    }, 1000);
  }
});


// ❓ FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
