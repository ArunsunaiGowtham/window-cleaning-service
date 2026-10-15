const fs = require('fs');
const path = require('path');

const loginHtml = fs.readFileSync('login.html', 'utf8');
const registerHtml = fs.readFileSync('register.html', 'utf8');
const styleCss = fs.readFileSync('assets/css/style.css', 'utf8');
const authJs = fs.readFileSync('assets/js/auth.js', 'utf8');

console.log('=== TEST 1: Elements in login.html ===');
const loginChecks = [
  ['Has #accountCreatedAlert', loginHtml.includes('id="accountCreatedAlert"')],
  ['Has #successMessage', loginHtml.includes('id="successMessage"')],
  ['Has #dummySignInName', loginHtml.includes('id="dummySignInName"')],
  ['Dashboard button removed from login.html', !loginHtml.includes('id="authHeaderDashboardBtn"')],
  ['Has #customerTabBtn', loginHtml.includes('id="customerTabBtn"')],
  ['Has #signupTabBtn', loginHtml.includes('id="signupTabBtn"')],
  ['Has #regFullName', loginHtml.includes('id="regFullName"')],
  ['Has #regEmail', loginHtml.includes('id="regEmail"')],
  ['Has #regPhone', loginHtml.includes('id="regPhone"')],
  ['Has #regPass', loginHtml.includes('id="regPass"')],
  ['Has #regPass2', loginHtml.includes('id="regPass2"')],
  ['Has #regTerms', loginHtml.includes('id="regTerms"')],
  ['Has #loginEmail', loginHtml.includes('id="loginEmail"')],
  ['Has #loginPass', loginHtml.includes('id="loginPass"')],
  ['Has #remember', loginHtml.includes('id="remember"')],
  ['Has Customer Sign Up button text', loginHtml.includes('Customer Sign Up')],
  ['Has Customer Login button text', loginHtml.includes('Customer Login')],
  ['Has Screenshot 3 exact text', loginHtml.includes('Customer account created successfully! Please sign in with your credentials.')],
  ['Has Screenshot 4 exact title', loginHtml.includes('Customer Sign In Simulated (Dummy Mode)')],
  ['Has Screenshot 4 exact body', loginHtml.includes('This is a dummy login page and is <strong>not redirected</strong> to the dashboard page.')]
];
let allPassed = true;
loginChecks.forEach(([name, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n=== TEST 2: Elements in register.html ===');
const registerChecks = [
  ['Has #authHeaderDashboardBtn', registerHtml.includes('id="authHeaderDashboardBtn"')],
  ['Has #regFullName', registerHtml.includes('id="regFullName"')],
  ['Has #regEmail', registerHtml.includes('id="regEmail"')],
  ['Has #regPhone', registerHtml.includes('id="regPhone"')],
  ['Has #regPass', registerHtml.includes('id="regPass"')],
  ['Has #regPass2', registerHtml.includes('id="regPass2"')],
  ['Has #regTerms', registerHtml.includes('id="regTerms"')],
  ['Has Customer Sign Up heading', registerHtml.includes('Customer Sign Up')]
];
registerChecks.forEach(([name, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n=== TEST 3: CSS in assets/css/style.css ===');
const cssChecks = [
  ['Has .auth-input-group', styleCss.includes('.auth-input-group')],
  ['Has .auth-icon-box', styleCss.includes('.auth-icon-box')],
  ['Has .dummy-mode-alert', styleCss.includes('.dummy-mode-alert')],
  ['Has .dummy-alert-head', styleCss.includes('.dummy-alert-head')],
  ['Has .dummy-alert-title', styleCss.includes('.dummy-alert-title')],
  ['Has .dummy-alert-body', styleCss.includes('.dummy-alert-body')],
  ['Has dark mode dummy-mode-alert', styleCss.includes('[data-bs-theme="dark"] .dummy-mode-alert')]
];
cssChecks.forEach(([name, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n=== TEST 4: auth.js logic & dummy mode behavior ===');
const jsChecks = [
  ['No customer-dashboard.html redirect on login submit', !/loginForm[\s\S]*?location\.href\s*=\s*['"]customer-dashboard/i.test(authJs)],
  ['Password toggle handler present', authJs.includes('initPasswordToggles')],
  ['Sets dummySignInName text', authJs.includes('dummyNameEl.textContent = displayName')],
  ['Handles registered query parameter', authJs.includes('urlParams.get("registered") === "true"')],
  ['Handles register form switch in login.html', authJs.includes('accountCreatedAlert.hidden = false')],
  ['Zero .py references in auth files', !loginHtml.includes('.py') && !registerHtml.includes('.py') && !authJs.includes('.py')]
];
jsChecks.forEach(([name, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) allPassed = false;
});

console.log(`\nOverall Test Result: ${allPassed ? 'ALL TESTS PASSED!' : 'SOME TESTS FAILED!'}`);
process.exit(allPassed ? 0 : 1);
