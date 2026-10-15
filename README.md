# CrystalClean Window Services - Premium Window Cleaning HTML5 Template

Version 2.0.0 | Bootstrap 5.3.3 | Pure HTML5, CSS3 and vanilla ES6 JavaScript.

## What is Included

33 fully responsive, hand-crafted pages designed specifically for Residential and Commercial Window Cleaning:
- **Landing Pages**: Home 1 (General Window Cleaning) & Home 2 (Residential & Commercial Glass Specialists).
- **Company Pages**: About Us (Pure-Water history & team), Team, Careers, Testimonials, FAQ.
- **Service Catalog**: 15 Window Cleaning Services with dynamic filtering, plus interactive Service Details.
- **Window Care Journal**: Blog & 4 detailed technical window cleaning guides with search and category filters.
- **Interactive Booking Flow**: 6-step estimator with real-time zone pricing, add-ons (frames, screens, tracks, hard water descaling), and instant confirmation.
- **Customer Dashboard**: Appointments, fleet crew tracking with 0-TDS calibration status, invoices, profile management, and rescheduling.
- **Admin Operations Portal (12 Pages)**: Dashboard, Bookings, Users, Cleaners, Analytics, Messages, Payments, Reviews, Settings, and Add Entry forms.
- **Authentication**: Customer & Admin Sign In, Registration, Password Reset, and Admin Creation with password toggles and demo credentials.
- **Utility Pages**: 404 Streak-Free Error Page & Coming Soon Announcement with live countdown timer.

## Getting Started

No build step and no backend required. Open `index.html` directly in any web browser, or serve the directory with any static server:

```bash
# Using Node.js npx serve
npx serve .

# Or using VS Code Live Server extension
```

## Structure

```
├── index.html                   General Window Cleaning Landing Page
├── home-2.html                  Residential & Commercial Glass Specialist
├── home-cleaning.html           Commercial & Industrial Specialist
├── about.html                   Mission, Pure-Water Tech & Team
├── services.html                15-Service Window Cleaning Catalog
├── service-details.html         Interactive Service Details Viewer
├── pricing.html                 Transparent Residential & Commercial Pricing
├── booking.html                 6-Step Window Cleaning Estimator & Booking
├── blog.html                    Window Cleaning Journal & Tips
├── blog-details-1.html          Article: How Often to Clean Residential Windows
├── blog-details-2.html          Article: The Science of Pure Water & Zero TDS
├── blog-details-3.html          Article: High-Rise Safety & Rigging Standards
├── blog-details-4.html          Article: Conservatory & Skylight Glass Care
├── contact.html                 Interactive Quote Form & Service Area Map
├── customer-dashboard.html      Customer Portal, Crew Tracking & History
├── faq.html                     Pure Water, Rain Guarantee & Safety FAQs
├── team.html                    Master Technicians & Certified Riggers
├── testimonials.html            Verified Home & Business Reviews
├── careers.html                 Technician & Route Lead Careers
├── login.html                   Customer & Admin Sign In
├── register.html                Customer Account Registration
├── forgot-password.html         Password Recovery
├── admin-register.html          Admin Registration
├── 404.html                     Custom 404 Glass Care Error Page
├── coming-soon.html             Pure-Water Route Expansion & Countdown
├── admin/                       Full 12-page Admin Portal
├── assets/
│   ├── css/style.css            CrystalClean Design System & Components
│   ├── css/dark.css             Dark Mode Design Tokens
│   ├── css/rtl.css              Right-to-Left Layout Rules
│   ├── css/responsive.css       Mobile Breakpoint Optimizations
│   ├── js/main.js               UI Interactions & Mobile Navigation
│   ├── js/auth.js               Client-side Auth & LocalStorage Session
│   ├── js/dashboard.js          Customer Dashboard Logic
│   ├── js/darkmode.js           Persistent Light/Dark Theme Switcher
│   ├── js/rtl.js                Persistent LTR/RTL Layout Switcher
│   └── images/                  High-Resolution Window Cleaning Imagery
```

## Customising Design Tokens

All colors, radii, shadows, gradients and spacing live as CSS custom properties in the `:root` block of `assets/css/style.css`:
- `--sp-brand`: `#0ea5e9` (Crystal Sky)
- `--sp-brand-dark`: `#0284c7` (Deep Ocean)
- `--sp-brand-soft`: `#e0f2fe` (Glass Sheen)
- `--sp-accent`: `#2563eb` (Pure Water Royal Blue)

Dark mode tokens are maintained in `assets/css/dark.css` under `[data-bs-theme="dark"]`.

## Third-Party Libraries (CDN Loaded)

- Bootstrap 5.3.3 & Bootstrap Icons 1.11.3
- AOS 2.3.4 (Animate on Scroll)
- Swiper 11
- GLightbox
- Isotope Layout 3
- PureCounter Vanilla
- Choices.js 10
- Google Fonts: Plus Jakarta Sans & Sora
