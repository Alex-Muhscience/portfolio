# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

# Alex M. Kamau Professional Portfolio - WARP Guide

## 1. Overview

This repository contains the professional portfolio website for Alex M. Kamau, a Kenyan Computer Science student and Full-Stack Developer. The site showcases skills, projects, and professional experience with modern web technologies and comprehensive SEO optimization.

**Live URLs:**
- GitHub Pages: https://alex-muhscience.github.io/My-profile/
- Vercel: https://portfolio-alex-m-kamau.vercel.app/
- Repository: https://github.com/Alex-Muhscience/portfolio.git

**Key Features:**
- Vanilla HTML, CSS, JavaScript SPA architecture
- 5-theme color switching system
- Dark/light mode toggle
- Typed.js animations
- Portfolio filtering system
- SEO optimization with JSON-LD schema
- Fully responsive design
- Contact form with validation

## 2. Project Structure and Architecture

```
.
├─ index.html                 # Main SPA file with all sections
├─ README.md                  # Project documentation
├─ LICENSE                    # MIT License
├─ robots.txt                 # SEO crawler instructions
├─ sitemap.xml                # SEO sitemap
├─ SEO_IMPROVEMENTS_REPORT.md # SEO implementation details
├─ css/
│  ├─ style.css               # Main stylesheet with CSS variables
│  ├─ style-switcher.css      # Theme switcher UI styles
│  └─ skins/
│     ├─ color-1.css          # Default theme (--skin-color: #ec1839)
│     ├─ color-2.css          # Alternative themes
│     ├─ color-3.css
│     ├─ color-4.css
│     └─ color-5.css
├─ js/
│  ├─ script.js               # Main functionality, navigation, form handling
│  └─ style-switcher.js       # Theme switching logic
├─ images/
│  ├─ Profile Pic.jpg         # Profile image
│  └─ portfolio/              # Project screenshots
│     ├─ utdrs.png
│     ├─ truckerlog.png
│     ├─ healthcare.png
│     ├─ keygen.png
│     ├─ cybercafe.png
│     └─ techlabs.png
└─ .vscode/
   └─ settings.json           # Live Server port configuration (5501)
```

**Architecture Notes:**
- **SPA Design**: Single-page application with section-based navigation
- **Theme System**: CSS custom properties (--skin-color) overridden by skin files
- **Responsive**: Mobile-first design with breakpoints for tablets and desktops
- **CDN Dependencies**: Font Awesome, Google Fonts, Typed.js from CDNs
- **SEO**: Comprehensive meta tags, JSON-LD structured data, sitemap

## 3. Quick Start and Local Development

### VS Code Live Server (Recommended)
```bash
# Install Live Server extension in VS Code
# Right-click index.html → "Open with Live Server"
# Configured port: 5501 (see .vscode/settings.json)
```

### Python HTTP Server
```bash
python -m http.server 8000
# Access at http://localhost:8000
```

### Node.js HTTP Server
```bash
npx http-server
# Access at http://localhost:8080
```

**Development Tips:**
- Always use a local server to avoid CORS issues
- Hard refresh (Ctrl+F5) to bypass cache when editing CSS/JS
- Test theme switching and responsive design during development

## 4. Development Workflow

### Git Branching
```bash
# Feature development
git checkout -b feature/new-theme-colors
git checkout -b fix/portfolio-filter-bug

# Commit with conventional commits
git commit -m "feat(theme): add color-6 purple theme"
git commit -m "fix(portfolio): correct filter data-category logic"
git commit -m "docs(readme): update deployment instructions"
```

### Release Tagging
```bash
git tag -a v2.1 -m "Portfolio v2.1 - Added new themes and fixed filtering"
git push origin v2.1
```

## 5. Theme Architecture and Customization

### How Themes Work
Each theme file in `css/skins/` defines a single CSS custom property:
```css
/* css/skins/color-1.css */
:root {
  --skin-color: #ec1839;
}
```

The main stylesheet uses `var(--skin-color)` throughout. The style-switcher.js enables/disables alternate stylesheets by title attribute.

### Adding a New Theme
1. Create `css/skins/color-6.css`:
```css
:root {
  --skin-color: #5b8def;
}
```

2. Register in `index.html` head:
```html
<link rel="stylesheet" href="./css/skins/color-6.css" 
      class="alternate-style" title="color-6" disabled />
```

3. Add color dot to style switcher:
```html
<span class="color-6" onclick="setActiveStyle('color-6')"></span>
```

### Dark Mode
Dark mode adds/removes the `dark` class on `<body>`. CSS variables are redefined for dark theme in the main stylesheet.

## 6. Content Customization Guide

### Personal Information
Update directly in `index.html`:
- Name, titles, descriptions in hero section
- Contact details (email, phone, social links)
- About section paragraphs
- Education and experience timelines

### Skills Badges
Add new skills by duplicating existing skill-badge elements:
```html
<span class="skill-badge languages">
  <i class="fab fa-python"></i>
  Python
</span>
```

### Portfolio Projects
Duplicate portfolio-item blocks and update:
- Image src and alt text
- Title and description
- GitHub link href
- `data-category` attribute (cybersecurity, web, mobile)

### Typing Animation
Edit the strings array in `js/script.js`:
```javascript
let typed = new Typed(".typing", {
  strings: [
    "",
    "Software Engineer",
    "Full-Stack Web Developer", 
    "Freelancer",
    "Cyber Security Enthusiast"
  ],
  typeSpeed: 100,
  backSpeed: 60,  // Note: lowercase 'b' in backSpeed
  loop: true
});
```

**IMPORTANT FIX NEEDED**: The current code uses `BackSpeed` (capital B) which is incorrect. It should be `backSpeed`.

## 7. Portfolio Filter Bug Fix

**Current Issue**: Filter logic checks for CSS classes but portfolio items use `data-category` attributes.

**Fix Required**: Replace the filter logic in `js/script.js`:
```javascript
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
      } else {
        item.style.display = 'none';
        item.classList.remove('animate');
      }
    });

    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});
```

## 8. Contact Form Integration Options

The current form shows success message after 2-second simulation. For real functionality:

### EmailJS Integration
```javascript
function sendEmail() {
  emailjs.init("YOUR_PUBLIC_KEY");
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  }).then(() => {
    document.getElementById('successMessage').style.display = 'block';
  }).catch(() => {
    document.getElementById('errorMessage').style.display = 'block';
  });
}
```

### Formspree
Point form action to your Formspree endpoint and submit via fetch.

### Netlify Forms
Add `name="contact"` to form and `data-netlify="true"`.

### Vercel Serverless
Create API endpoint and submit via fetch to your function.

## 9. SEO and Analytics Maintenance

### Meta Tags Checklist
- Title tag optimized for target keywords
- Meta description under 160 characters
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URL pointing to primary domain

### JSON-LD Schema
Keep structured data updated:
- Person schema with contact and skills
- Organization schema for CyberMuhscience Tech iLabs
- Website schema with search functionality

### Canonical Domain Alignment
**IMPORTANT**: Choose one primary domain and update all references:
- `index.html` canonical URL
- Open Graph and Twitter URLs
- `sitemap.xml` loc entries
- `robots.txt` sitemap reference

### Sitemap Maintenance
Update lastmod dates to current date:

**Windows PowerShell:**
```powershell
$today = Get-Date -Format "yyyy-MM-dd"
(Get-Content sitemap.xml) -replace "<lastmod>.*?</lastmod>", "<lastmod>$today</lastmod>" | Set-Content sitemap.xml -Encoding UTF8
```

**macOS/Linux:**
```bash
sed -E -i '' 's#<lastmod>[^<]+</lastmod>#<lastmod>'"$(date +%Y-%m-%d)"'</lastmod>#g' sitemap.xml
```

## 10. Deployment

### GitHub Pages
```bash
# Push to main branch
git add .
git commit -m "docs: add WARP.md and align SEO to canonical domain"
git push

# Configure in GitHub: Settings → Pages → main branch, root folder
```

### Vercel
```bash
# Optional Vercel CLI
npm i -g vercel
vercel
vercel --prod

# Or import GitHub repo in Vercel dashboard
# Framework: Other, Build command: none, Output: root
```

### Post-Deploy Checklist
- Verify all assets load over HTTPS
- Test theme switching functionality
- Validate SEO meta tags in social debuggers
- Check responsive design on multiple devices
- Test contact form validation

## 11. QA and Performance Checklist

### Functional Testing
- [ ] Navigation between sections works
- [ ] All 5 color themes switch properly
- [ ] Dark/light mode toggles correctly
- [ ] Typing animation displays and loops
- [ ] Portfolio filter shows correct categories
- [ ] Contact form validation works
- [ ] Social links open correctly

### Accessibility
- [ ] Sufficient color contrast ratios
- [ ] Focus styles on interactive elements
- [ ] Descriptive alt text for all images
- [ ] Semantic HTML structure
- [ ] Keyboard navigation support

### Performance
- [ ] Images optimized and compressed
- [ ] CDN resources load properly
- [ ] Minimal render-blocking resources
- [ ] Lighthouse scores: 90+ for Performance, Accessibility, Best Practices, SEO

## 12. Maintenance Playbook

### Monthly Tasks
- Update `sitemap.xml` lastmod dates and resubmit to Search Console
- Refresh project descriptions and skills if needed
- Verify external links and badge endpoints

### Quarterly Tasks
- Review Google Analytics and Search Console data
- Optimize images and check CDN performance
- Run accessibility and performance audits
- Update JSON-LD schema with new achievements

### Annual Tasks
- Comprehensive SEO review and keyword optimization
- Tech stack audit for CDN dependencies
- Competitor analysis and design refresh consideration

## 13. Troubleshooting

### Common Issues
**GitHub Pages 404**: Ensure Pages settings use main branch and root folder. Verify relative paths.

**Typed.js Not Working**: Check CDN accessibility and element selector existence before initialization.

**Theme Not Switching**: Verify alternate-style links exist with correct title attributes matching setActiveStyle calls.

**Portfolio Filter Not Working**: Update JavaScript to use `data-category` instead of CSS classes (see section 7).

**SEO Previews Wrong**: Clear social media debugger caches after updating meta tags.

### Debug Commands
```bash
# Check git status and remote
git status
git remote -v

# Serve locally for testing
python -m http.server 8000

# View file structure
tree /F  # Windows
ls -la   # Mac/Linux
```

## 14. Appendices

### Quick Fixes

**Portfolio Filter Fix:**
```javascript
const category = item.getAttribute('data-category');
if (filter === 'all' || category === filter) {
  item.style.display = 'block';
}
```

**Typed.js Options:**
```javascript
backSpeed: 60  // lowercase 'b'
```

**New Theme Template:**
```css
:root { --skin-color: #5b8def; }
```

### Useful Commands

**Git Tagging:**
```bash
git tag -a v2.0 -m "Portfolio 2.0"
git push origin v2.0
```

**Development Server:**
```bash
npx http-server -c-1  # Disable caching
```

### Optional GitHub Action (Link Checker)
```yaml
name: Link Checker
on:
  schedule:
    - cron: "0 5 * * 1"  # Weekly Monday 5 AM
  workflow_dispatch:

jobs:
  lychee:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: lycheeverse/lychee-action@v1
        with:
          args: --verbose --no-progress --exclude-mail --timeout 30 .
```

---

This WARP guide provides comprehensive information for maintaining and developing Alex M. Kamau's professional portfolio. For questions or contributions, refer to the GitHub repository issues section.
