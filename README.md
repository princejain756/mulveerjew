# Mulveer Jewellers E-commerce Website

A full-featured e-commerce website for Mulveer Jewellers built with Next.js, MySQL, and modern web technologies.

## Features

### Admin Features
- **Product Management**: Add, edit, delete, and manage product inventory
- **Admin Dashboard**: Complete admin interface for managing the store
- **Order Management**: View and manage customer orders
- **User Management**: Manage customer accounts

### Customer Features
- **User Registration**: Create accounts with detailed profile information
- **User Login**: Secure authentication system
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout Process**: Secure checkout with multiple payment options
- **Order Tracking**: View order history and status
 - **Gold Price Ticker**: Homepage gold rate ticker driven by admin‑set rate (no external API required)
 - **WhatsApp Enquiry**: Floating WhatsApp chat button for instant assistance
 - **Store Locator & Enquiry Form**: Google Maps link and enquiry form for custom designs

### Payment Options
- **RazorPay Integration**: Online payment processing
- **Cash on Delivery**: COD option for customer convenience

### Branding
## Branding

### Logo
The website uses `mulverrlog.png` as the main logo, located in the `public/` directory. The logo is displayed in the main header component (`src/components/sections/main-header.tsx`).

### Hero Image
The hero slideshow uses `mulverhero.webp` as the main banner image, located in the `public/` directory. The hero component is defined in `src/components/sections/hero-slideshow.tsx`.

### Favicon
The favicon is configured to use `mulverrlog.png` from the public directory, ensuring consistent branding across browser tabs.
- **Mulveer Jewellers Branding**: All references updated to reflect the business

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Database**: MySQL 8.0+
- **Authentication**: JWT tokens
- **Payment**: RazorPay API
- **Deployment**: Ready for Vercel/Netlify

## Testing & Deployment

### Database Setup
Run the database initialization script:
```bash
npm run init-db
```

### Development
Start the development server:
```bash
npm run dev
```

### Testing Authentication
1. Visit `/register` to create a user account
2. Visit `/login` to authenticate
3. Access `/admin` with admin credentials for product management

### Payment Integration
- RazorPay: Configure merchant account and update API keys in environment variables
- Cash on Delivery: Already implemented in checkout process

### Production Deployment
1. Set up MySQL database in production
2. Configure environment variables for database and payment gateways
3. Build and deploy using `npm run build && npm start`

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products (Admin)
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Clear cart or remove item

### Checkout
- `POST /api/checkout` - Create order

## Pages

### Public Pages
- `/` - Homepage
- `/login` - User login page
- `/register` - User registration page

### Admin Pages
- `/admin` - Admin dashboard for product management

## Admin Access

Default admin credentials:
- **Email**: admin@mulveerjewellers.com
- **Password**: (Check the hashed password in schema.sql)

To access the admin dashboard:
1. Go to `/login`
2. Login with admin credentials
3. Navigate to `/admin`

## Payment Integration

### RazorPay Setup
1. Sign up at [RazorPay](https://razorpay.com)
2. Get your API keys from the dashboard
3. Add them to your environment variables
4. The checkout process will automatically handle RazorPay integration

### Cash on Delivery
- COD is enabled by default
- Orders with COD are marked as "paid" immediately
- No additional setup required

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── products/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # Shadcn/ui components
│   ├── AdminDashboard.tsx
│   ├── CreateAccountPage.tsx
│   └── sections/     # Page sections
├── lib/
│   ├── auth.ts       # Authentication utilities
│   └── db.ts         # Database connection
└── database/
    └── schema.sql    # Database schema
```

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive input validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: React's built-in XSS protection

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
JWT_SECRET=your_production_jwt_secret
RAZORPAY_KEY_ID=your_production_razorpay_key
RAZORPAY_KEY_SECRET=your_production_razorpay_secret
```

### Database Migration for Production
```bash
mysql -h your_production_host -u your_user -p your_database < database/schema.sql
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Mulveer Jewellers.

## Support

For support, contact the development team or create an issue in the repository.
# mulveerjew
