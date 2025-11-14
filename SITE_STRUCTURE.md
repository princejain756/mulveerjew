# Mulveer Jewellers - Updated Site Structure

```
📦 Mulveer Jewellers Website
│
├── 🏠 Home (/)
│   ├── Hero with product showcase
│   ├── Collections preview
│   ├── Custom designs section
│   └── Store locator section
│
├── 📚 Collections (/collections)
│   ├── 8 Collection Cards (filterable)
│   │   ├── Signature Collections
│   │   ├── Bridal Elegance
│   │   ├── Everyday Elegance
│   │   ├── Ethnic Heritage
│   │   ├── Modern Minimalist
│   │   ├── Festival Specials
│   │   ├── Diamond Brilliance
│   │   └── Treasure Hunt (<₹99)
│   ├── Category Browse (Rings, Necklaces, Earrings, etc.)
│   ├── Metal Selection (22K, 18K, 925 Silver)
│   └── Latest Additions
│
├── 💍 Custom Designs (/custom-designs)
│   ├── Hero Section
│   ├── Why Custom Designs (3 benefits)
│   ├── 4-Step Process Timeline
│   │   ├── Step 1: Share Vision
│   │   ├── Step 2: Expert Evaluation
│   │   ├── Step 3: Craftsmanship
│   │   └── Step 4: Final Excellence
│   ├── Design Categories (6 types)
│   ├── Testimonials
│   ├── Investment Value Section
│   └── CTAs (Start Design, WhatsApp)
│
├── ℹ️ About (/about)
│   ├── Hero Section
│   ├── Our Story (24+ years heritage)
│   ├── Core Values (4 cards)
│   │   ├── Purity
│   │   ├── Craftsmanship
│   │   ├── Trust
│   │   └── Community
│   ├── Why Choose Us (6 advantages)
│   ├── Team Highlights
│   └── CTAs (Shop Now, Get in Touch)
│
├── ❓ FAQ (/faq)
│   ├── General Questions
│   ├── Custom Design Services
│   ├── Pricing & Payment
│   ├── Delivery & Shipping
│   ├── Maintenance & Care
│   ├── Showroom Visit
│   └── Contact Options (Phone, WhatsApp, Email)
│
├── 📞 Contact (/contact)
│   ├── Header Section
│   ├── Contact Info Cards (Left Sidebar)
│   │   ├── Location (with Google Maps link)
│   │   ├── Phone
│   │   ├── WhatsApp
│   │   └── Timings
│   ├── Main Content (Right Side)
│   │   ├── Embedded Google Maps
│   │   └── Enquiry Form with validation
│   ├── 360° Showroom Walkthrough (embedded Street View)
│   └── CTA Section
│
├── 🛍️ Products (/products)
│   ├── Category filters
│   ├── Collection filters
│   ├── Product grid
│   └── Product details
│
├── 👤 User Pages
│   ├── /login - Login
│   ├── /register - Registration
│   ├── /orders - Order History
│   └── /admin - Admin Dashboard
│
├── 💳 Checkout (/checkout)
│
└── 📧 API Endpoints
    ├── POST /api/enquiry - Submit enquiry form
    ├── GET /api/products - Get products
    ├── POST /api/orders - Create order
    ├── GET /api/gold-price - Get live gold prices
    ├── POST /api/auth/* - Authentication
    └── POST /api/checkout/* - Checkout process
```

## Page Hierarchy

### Level 1: Main Pages
- Home
- Products
- About
- Contact

### Level 2: Detailed Pages
- Collections
- Custom Designs
- FAQ

### Level 3: User Pages
- Login
- Register
- Orders
- Admin

### Level 4: Functional Pages
- Checkout
- Cart
- Product Details

## Navigation Flow

### Desktop Navigation
```
Home → Collections → Custom Designs → About → FAQ → Contact
                  ↓
        Settings & Login (Right corner)
```

### Mobile Navigation
```
Mobile Menu (Hamburger)
├── Home
├── Collections
├── Custom Designs
├── About
├── FAQ
├── Contact
└── Login/Account
```

### Footer Navigation
```
Informations          Customer Services      Collections          Contact Us
├── About             ├── Repair             ├── All Collections  ├── Address
├── Contact           ├── Exchange           ├── Custom Designs   ├── Phone
├── Order History     ├── Custom Designs     ├── Gold Jewellery   ├── Email
├── FAQ               └── Consultation       └── Diamond Jewellery└── Social Media
└── Terms                                    
```

## Content Strategy

### SEO Optimized Pages
- Each page has unique title, meta description, heading hierarchy
- Keywords: "custom jewelry", "gold jewelry belagavi", "BIS hallmarked", "jewelry design"

### User Journey Paths

**Path 1: New Customer → Browse → Learn → Order**
```
Home → Collections → Product Details → Cart → Checkout → Order Confirmation
```

**Path 2: Custom Design Customer**
```
Home → Custom Designs Page → Learn Process → Contact/WhatsApp → Design → Order
```

**Path 3: Research Customer**
```
Home → About → Collections → FAQ → Contact
```

**Path 4: Support Customer**
```
Any Page → FAQ → Contact → Form/WhatsApp/Phone
```

## Performance Optimizations
- Lazy loading for images
- Optimized Google Maps embed
- Form validation before API call
- Proper caching headers
- Mobile-first responsive design
- Minimal re-renders with React hooks

## Accessibility Features
- Proper heading hierarchy (H1, H2, H3)
- Alt text for images (using Next.js Image)
- Semantic HTML
- Color contrast compliance
- Keyboard navigation support
- Form labels and ARIA attributes

## Mobile Responsiveness
- Grid: 1 col (mobile) → 2 cols (tablet) → 3-4 cols (desktop)
- Navigation: Hamburger menu on mobile
- Forms: Full-width on mobile, optimized on desktop
- Images: Responsive with proper aspect ratios
- Touch targets: 44px minimum for mobile
