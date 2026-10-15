const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const homeCleaningHtml = fs.readFileSync('home-cleaning.html', 'utf8');
const styleCss = fs.readFileSync('assets/css/style.css', 'utf8');

console.log('=== TEST 1: index.html Home Dropdown ===');
const indexChecks = [
  ['Has home-dropdown-nav', indexHtml.includes('home-dropdown-nav')],
  ['Has home-nav-link active', indexHtml.includes('home-nav-link active') || (indexHtml.includes('home-nav-link') && indexHtml.includes('active'))],
  ['Has home-nav-bar', indexHtml.includes('home-nav-bar')],
  ['Has home-nav-chevron', indexHtml.includes('home-nav-chevron')],
  ['Has home-dropdown-menu', indexHtml.includes('home-dropdown-menu')],
  ['Has Window Cleaning Service', indexHtml.includes('Window Cleaning Service')],
  ['Has Home Cleaning Service', indexHtml.includes('Home Cleaning Service')],
  ['Has index.html active item', indexHtml.includes('home-dropdown-item active')],
  ['Has mobile Home dropdown', indexHtml.includes('mobileHomeDropdown')]
];
let allPassed = true;
indexChecks.forEach(([name, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n=== TEST 2: home-cleaning.html Home Dropdown ===');
const hcChecks = [
  ['Has home-dropdown-nav', homeCleaningHtml.includes('home-dropdown-nav')],
  ['Has home-dropdown-menu', homeCleaningHtml.includes('home-dropdown-menu')],
  ['Has Window Cleaning Service', homeCleaningHtml.includes('Window Cleaning Service')],
  ['Has Home Cleaning Service', homeCleaningHtml.includes('Home Cleaning Service')],
  ['Has mobile Home dropdown', homeCleaningHtml.includes('mobileHomeDropdown')]
];
hcChecks.forEach(([name, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n=== TEST 3: CSS in style.css ===');
const cssChecks = [
  ['Has .home-dropdown-nav', styleCss.includes('.home-dropdown-nav')],
  ['Has .home-nav-link', styleCss.includes('.home-nav-link')],
  ['Has .home-nav-bar', styleCss.includes('.home-nav-bar')],
  ['Has .home-nav-chevron', styleCss.includes('.home-nav-chevron')],
  ['Has .home-dropdown-menu', styleCss.includes('.home-dropdown-menu')],
  ['Has .home-dropdown-item', styleCss.includes('.home-dropdown-item')],
  ['Has .home-item-title', styleCss.includes('.home-item-title')],
  ['Has .home-item-desc', styleCss.includes('.home-item-desc')],
  ['Has dark mode for home dropdown', styleCss.includes('[data-bs-theme="dark"] .home-dropdown-menu')]
];
cssChecks.forEach(([name, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  if (!passed) allPassed = false;
});

console.log(`\nResult: ${allPassed ? 'ALL TESTS PASSED!' : 'SOME TESTS FAILED!'}`);
process.exit(allPassed ? 0 : 1);
