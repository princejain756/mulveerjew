# Mulveer Jewellers - Deployment Guide for Hostinger

This guide will help you deploy the Mulveer Jewellers e-commerce platform to Hostinger.

## Prerequisites

✅ Hostinger account with Node.js hosting plan
✅ FTP/SFTP access credentials
✅ MySQL database access
✅ Domain name (optional, can use Hostinger subdomain)

## Step-by-Step Deployment

### 1. **Prepare Files Locally**

The production build is already created. The `.next` folder contains optimized code for production.

Files to upload:
```
✓ src/
✓ public/
✓ scripts/
✓ database/
✓ .next/          (generated from npm run build)
✓ package.json
✓ next.config.ts
✓ tsconfig.json
✗ node_modules/   (Do NOT upload - will reinstall on server)
✗ .git/          (Do NOT upload)
```

### 2. **Create Deployment Package**

Run this command to create a compressed file:

```bash
tar --exclude=node_modules --exclude=.git --exclude=.next/.cache \
    --exclude=.env --exclude=.env.local -czf mulveer-jewellers.tar.gz .
```

This creates `mulveer-jewellers.tar.gz` (~50-100MB depending on images)

### 3. **Set Up Hostinger**

#### A. Create MySQL Database

1. Log in to Hostinger control panel
2. Navigate to **Databases** → **Create New Database**
3. Database name: `mulveer_jewellers`
4. Note down:
   - Database name
   - Username
   - Password
   - Host (usually localhost or specific IP)

#### B. Upload Files via FTP

1. **Connect to FTP** (use FileZilla or Hostinger File Manager):
   - Host: `ftp.yourdomain.com` or provided FTP host
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

2. **Navigate to** `public_html` or `public_html/app` (depends on your setup)

3. **Upload** the deployment package:
   ```
   Upload mulveer-jewellers.tar.gz
   ```

4. **Extract on server** (via SSH or Hostinger terminal):
   ```bash
   cd /home/yourusername/public_html
   tar -xzf mulveer-jewellers.tar.gz
   rm mulveer-jewellers.tar.gz
   ```

### 4. **Install Dependencies**

Via SSH (Hostinger's Terminal feature or SSH client):

```bash
cd /home/yourusername/public_html
npm install --production
```

This installs only production dependencies (skips dev tools).

### 5. **Set Environment Variables**

Create `.env.local` file on the server:

```bash
# Via SSH or File Manager, create .env.local with:
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=mulveer_jewellers
DB_PORT=3306
JWT_SECRET=generate_random_string_here
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NODE_ENV=production
```

**Generate secure JWT_SECRET:**
```bash
# On your local machine:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. **Initialize Database**

Run once to create tables:

```bash
cd /home/yourusername/public_html
node scripts/reset-db.js
```

This creates all tables and inserts sample data + admin user.

### 7. **Start the Application**

#### Option A: Using PM2 (Recommended - keeps app running)

```bash
# Install PM2 globally
npm install -g pm2

# Start app
pm2 start npm --name "mulveer-jewellers" -- start

# Make it run on reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs mulveer-jewellers
```

#### Option B: Using Node directly (simpler)

```bash
npm start
```

⚠️ Note: Process will stop if SSH connection closes

### 8. **Configure Domain/SSL**

1. Point domain to Hostinger nameservers
2. SSL certificate is auto-installed (Let's Encrypt)
3. Configure domain in Hostinger panel → Domains

### 9. **Access Your Site**

- **Website:** `https://yourdomain.com`
- **Admin Panel:** `https://yourdomain.com/admin`

**Admin Login:**
- Email: `admin@mulveerjewellers.com`
- Password: `admin123`

---

## Post-Deployment Checklist

- [ ] Test login/register at `/login` and `/register`
- [ ] Test adding products in admin panel `/admin`
- [ ] Add products to cart
- [ ] Test checkout (both COD and Razorpay if configured)
- [ ] Verify order creation and cancellation
- [ ] Check SSL certificate (green lock in browser)
- [ ] Test on mobile devices

## Troubleshooting

### 1. **"npm: command not found"**
- Hostinger might not have npm in PATH
- Use full path: `/usr/local/bin/npm install --production`
- Or use Node version manager

### 2. **Database Connection Error**
```
Error: Unknown database 'mulveer_jewellers'
```
- Run: `node scripts/reset-db.js`
- Verify DB credentials in `.env.local`
- Check database user has proper permissions

### 3. **Out of Memory**
```bash
node --max-old-space-size=2048 npm start
```

### 4. **Port 3000 Already in Use**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### 5. **PM2 Not Starting**
```bash
pm2 delete mulveer-jewellers
pm2 start npm --name "mulveer-jewellers" -- start
pm2 logs
```

## Performance Tips

1. **Enable Gzip Compression** (in Hostinger panel)
2. **Enable Caching** (set cache headers in next.config.ts)
3. **Optimize Images** (use Next.js Image component)
4. **Monitor Disk Usage** (npm modules can be large)

## Updating Application

To update code on server:

```bash
cd /home/yourusername/public_html

# Pull latest code
git pull

# Rebuild
npm run build

# Restart app
pm2 restart mulveer-jewellers
```

## Support

For issues:
1. Check PM2 logs: `pm2 logs mulveer-jewellers`
2. Check Hostinger error logs in control panel
3. Verify `.env.local` variables
4. Ensure database is running and accessible

---

**Deployment completed successfully! Your e-commerce store is live!** 🎉
