const fs = require('fs');
const path = require('path');

const files = [
  'about.html',
  'services.html',
  'service-details.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'blog-details-1.html',
  'blog-details-2.html',
  'blog-details-3.html',
  'blog-details-4.html',
  'contact.html',
  'booking.html',
  'careers.html',
  'faq.html',
  'home-2.html',
  'home-cleaning.html',
  'privacy-policy.html',
  'team.html',
  'terms-of-service.html',
  'testimonials.html'
];

const targetPattern = /\r?\n\s*<li class="nav-item"><a class="nav-link" href="customer-dashboard\.html">Customer Dashboard<\/a><\/li>\r?\n\s*<li class="nav-item"><a class="nav-link" href="admin\/dashboard\.html">Admin Dashboard<\/a><\/li>/g;

let updatedCount = 0;
files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (targetPattern.test(content)) {
      targetPattern.lastIndex = 0;
      content = content.replace(targetPattern, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${file}`);
      updatedCount++;
    } else {
      console.log(`Pattern not matched in: ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log(`\nSuccessfully updated ${updatedCount} files.`);
