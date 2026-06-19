# Dekorbuy Handicraft & Handlooms LLP — Website

Premium North East India cane & bamboo furniture brand website.
Production-ready. Mobile responsive. Built for B2B lead generation.

---

## 📁 Folder Structure

```
dekorbuy/
├── index.html              ← Main website (all pages, SPA)
├── netlify.toml            ← Netlify deployment config
├── vercel.json             ← Vercel deployment config
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← All JavaScript
├── data/
│   └── products.json       ← Product database (add products here)
├── images/                 ← Add product and brand photos here
│   ├── hero-bg.jpg
│   ├── sofa-heritage.jpg
│   ├── chair-lounge.jpg
│   ├── dining-khasi.jpg
│   ├── table-coffee.jpg
│   ├── outdoor-set.jpg
│   ├── resort-room.jpg
│   ├── cafe-package.jpg
│   └── bespoke.jpg
└── README.md
```

---

## ⚙️ Before Going Live — Checklist

### 1. Update WhatsApp Number
In `js/main.js`, find the CONFIG block at the top:
```js
const CONFIG = {
  whatsappNumber: '919800000000', // ← Replace with your actual number (country code + number, no +)
  ...
};
```
Also update all `href="https://wa.me/919800000000"` links in `index.html`.

**Quick find & replace:** Search for `919800000000` and replace with your number.

### 2. Update Contact Details
In `index.html`, search for:
- `+91-98000-00000` → your phone number
- `hello@dekorbuy.in` → your email address
- Meghalaya address → your actual address

### 3. Add Your Images
Add real product and brand photos to the `/images/` folder:

| Filename | What it shows |
|---|---|
| `hero-bg.jpg` | Hero section background (bamboo forest / product shoot) |
| `sofa-heritage.jpg` | Meghalaya Heritage Sofa Set |
| `chair-lounge.jpg` | Brahmaputra Lounge Chair |
| `dining-khasi.jpg` | Khasi Highlands Dining Set |
| `table-coffee.jpg` | Nokrek Forest Coffee Table |
| `outdoor-set.jpg` | Valley Breeze Outdoor Set |
| `resort-room.jpg` | Resort Room Package |
| `cafe-package.jpg` | Café Seating Package |
| `bespoke.jpg` | Bespoke Project Service |

**Recommended image specs:** 1200×900px minimum, JPG, under 500KB each.

### 4. Update Open Graph / Social Meta Tags
In `index.html` `<head>`:
- Update `og:url` to your actual domain
- Add `og:image` with URL to a product or brand photo (1200×630px)

### 5. Update the Catalog URL
In `js/main.js`:
```js
catalogUrl: '#', // ← Replace with your catalog PDF URL or Google Drive link
```

---

## ➕ Adding Products (No Coding Required)

Open `data/products.json` and add a new object to the `"products"` array:

```json
{
  "id": "p009",
  "name": "Your Product Name",
  "category": "cane-chairs",
  "description": "Describe the product in 2-3 sentences...",
  "material": "Natural cane with teak accents",
  "dimensions": "60W × 65D × 90H cm",
  "finish": "Natural or dark walnut",
  "moq": "4 pieces",
  "leadTime": "15-20 working days",
  "badge": "New",
  "image": "images/your-product-image.jpg"
}
```

**Available categories:**
- `cane-sofa-sets`
- `cane-chairs`
- `dining-sets`
- `coffee-tables`
- `outdoor-furniture`
- `hospitality-furniture`
- `custom-furniture`

**Badge options:** `"Bestseller"`, `"Featured"`, `"New"`, `"Popular"`, `"Hospitality"`, `"Custom"`, or `""` (no badge)

---

## 🚀 Deploy on Netlify (Free)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag your entire `dekorbuy/` folder into the Netlify drop zone
4. Your site is live in 30 seconds!

**For a custom domain (dekorbuy.in):**
1. In Netlify → Site settings → Domain management
2. Add custom domain → Enter `dekorbuy.in`
3. Update your domain's DNS nameservers to Netlify's (shown in dashboard)

---

## 🚀 Deploy on Vercel (Alternative)

1. Install Vercel CLI: `npm i -g vercel`
2. In the `dekorbuy/` folder, run: `vercel`
3. Follow the prompts

Or via Vercel dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import from GitHub or upload folder
4. Deploy

---

## 📱 Pages Included

| Page | URL route | Description |
|---|---|---|
| Home | `/` | Hero, story, featured products, hospitality, why us, CTA |
| Collection | `/collection` | Full product grid with category filters |
| Hospitality | `/hospitality` | B2B solutions for resorts, homestays, cafes |
| Artisans | `/artisans` | Artisan stories and craft process |
| Gallery | `/gallery` | Project photo grid |
| About | `/about` | Company story, mission, values |
| Designers | `/designers` | Trade partner program for architects |
| Contact | `/contact` | Inquiry form + WhatsApp |

---

## 🔧 Customization Quick Reference

| What to change | Where |
|---|---|
| Brand colors | `css/style.css` → `:root` variables |
| Fonts | `css/style.css` → `@import` line + `--ff-*` variables |
| WhatsApp number | `js/main.js` CONFIG + `index.html` (search & replace) |
| Products | `data/products.json` |
| Testimonials | `index.html` → testimonials section |
| Stats (500+, 80+, etc.) | `index.html` → hero stats section |
| Footer links | `index.html` → footer section |

---

## 📊 SEO

The site includes:
- Meta title and description optimised for hospitality furniture keywords
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (LocalBusiness schema)
- Semantic HTML5 with ARIA labels
- Mobile-first responsive design

For Google Search Console: after deployment, submit your sitemap at `yoursite.com/sitemap.xml`. Create a simple sitemap with just your homepage URL.

---

## 📞 Support

For customizations, add products, or photo integration help — contact the Dekorbuy team or your web developer.

**Built with:** Pure HTML, CSS, and JavaScript. No frameworks. No build tools required. Deploy directly.
