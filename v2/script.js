// Select form elements
const form = document.querySelector('.form');
const emailInput = document.querySelector('.input');
const passwordInput = document.querySelector('.input[type="password"]');
const rememberMeCheckbox = document.querySelector('input[type="checkbox"]');
const signInButton = document.querySelector('.button-submit');
const forgotPasswordSpan = document.querySelector('.span.forgot-password');
const signUpSpan = document.querySelector('.span.sign-up');
const googleButton = document.querySelector('.btn.google');
const appleButton = document.querySelector('.btn.apple');

// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate email input
  if (!emailInput.value.trim()) {
    alert('Please enter your email address.');
    return;
  }

  // Validate password input
  if (!passwordInput.value.trim()) {
    alert('Please enter your password.');
    return;
  }

  // Handle form submission
  console.log('Form submitted with email:', emailInput.value, 'and password:', passwordInput.value);
});

// Add event listener for forgot password link
forgotPasswordSpan.addEventListener('click', () => {
  console.log('Forgot password link clicked.');
});

// Add event listener for sign up link
signUpSpan.addEventListener('click', () => {
  console.log('Sign up link clicked.');
});

// Add event listener for Google button
googleButton.addEventListener('click', () => {
  console.log('Google button clicked.');
});

// Add event listener for Apple button
appleButton.addEventListener('click', () => {
  console.log('Apple button clicked.');
});

// Add event listener for remember me checkbox
rememberMeCheckbox.addEventListener('change', () => {
  console.log('Remember me checkbox checked:', rememberMeCheckbox.checked);
});

// Add event listener for password input focus
passwordInput.addEventListener('focus', () => {
  console.log('Password input focused.');
});

// Add event listener for password input blur
passwordInput.addEventListener('blur', () => {
  console.log('Password input blurred.');
});