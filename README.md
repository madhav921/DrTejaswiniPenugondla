# 🏥 Dr. Tejaswini Penugondla — Gynecologist Website

A beautiful, modern, and fully responsive website for **Dr. Tejaswini Penugondla**, Gynecologist at **Srikara Hospitals, Lakdikapul, Hyderabad**. Built with pure HTML, CSS, and JavaScript — no frameworks required.

## ✨ Features

- **Burgundy / Maroon & White** color theme (matches Srikara Hospitals branding)
- **Premium animations** — smooth scroll reveals, hover effects, parallax, magnetic buttons, animated counters
- **Fully responsive** — desktop, tablet, and mobile
- **SEO optimized** — meta tags, Open Graph, Twitter Cards, Schema.org Physician markup
- **Auto-fallback images** — placeholders show automatically until real photos are added

### Sections
1. Top bar (contact + social)
2. Sticky navigation
3. Hero with stats (10+ years, 4000+ patients, 1500+ procedures)
4. Why Choose Us
5. About the Doctor
6. Services (6 areas of expertise)
7. Clinic Gallery (with lightbox)
8. Testimonials (carousel)
9. FAQ (accordion)
10. Appointment booking form
11. Contact (map + form + details)
12. Footer

## 🖼️ Images To Add

Drop these into the `images/` folder. Until you do, the site shows styled placeholders automatically.

| File | Purpose | Recommended Size |
|------|---------|-----------------|
| `logo.png` | Srikara Hospitals logo (header) | ~200x60px, transparent |
| `logo-white.png` | White logo for dark footer | ~200x60px, transparent |
| `doctor-hero.png` | Dr. Tejaswini photo (hero) | 600x760px, transparent bg ideal |
| `doctor-about.jpg` | Dr. Tejaswini photo (about) | 600x700px |
| `gallery-1.jpg` … `gallery-6.jpg` | Clinic photos | 800x600px |
| `patient-1.jpg` … `patient-4.jpg` | Testimonial photos (optional) | 150x150px |
| `og-image.jpg` | Social sharing preview | 1200x630px |
| `favicon-32x32.png`, `favicon-16x16.png` | Browser tab icon | 32px / 16px |

## ✅ Content Already Filled In

- Name, specialty, hospital, tagline
- Bio & personal quote
- Stats: 10+ years, 4000+ patients, 1500+ procedures
- All 6 services with descriptions
- All 4 FAQs
- Full contact details, phones, email, working hours
- Social links (Facebook, Instagram, website, WhatsApp)

## ⏳ Content Still To Add (currently placeholders)

- **Doctor photos** (hero + about)
- **Clinic photos** (gallery)
- **Real testimonials** — the 4 shown are sample reviews. Replace the text in the "Testimonials" section of `index.html` with genuine patient reviews (with permission).
- **Credentials** — education, certifications, awards were not provided. Add them in the "About" section's `about-details` block when available.
- **Exact Google Maps location** — currently searches "Srikara Hospitals Lakdikapul". For a precise pin, get the embed code from Google Maps and replace the `<iframe src>` in the Contact section.

## 🚀 Deploying to GitHub Pages

Your GitHub username is **madhav921**. For a clean URL, name the repo `dr-tejaswini` (not `DrTejaswiniPenugondla.github.io`).

1. Put `index.html`, `styles.css`, `script.js`, and the `images/` folder at the **root** of the repo (not inside a subfolder).
2. Push to GitHub.
3. Repo → **Settings** → **Pages** → Source: branch `main`, folder `/ (root)` → **Save**.
4. Wait 1–2 minutes. Your site will be live at:
   ```
   https://madhav921.github.io/dr-tejaswini/
   ```

> If you rename the repo to exactly `madhav921.github.io`, it will instead be served at `https://madhav921.github.io/` (root). You only get one such user site per account.

## 📧 Making the Forms Actually Send

Right now the appointment and contact forms show a success popup but don't email anyone. Easiest free fix — **Formspree**:

1. Sign up at [formspree.io](https://formspree.io) and create a form to get your form ID.
2. In `index.html`, change both `<form ... action="#">` to `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`.

Or use the WhatsApp button / phone number, which already work.

## 🎨 Changing Colors

Edit the CSS variables at the top of `styles.css`:
```css
:root {
    --primary-color: #85173a;    /* Burgundy */
    --secondary-color: #4d0e23;  /* Deep wine */
    --accent-color: #c8a04b;     /* Rose gold */
}
```

---

**Dr. Tejaswini Penugondla • Gynecologist • Srikara Hospitals, Lakdikapul, Hyderabad**
