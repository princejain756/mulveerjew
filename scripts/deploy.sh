#!/bin/bash

echo "🚀 Mulveer Jewellers - Quick Deployment Setup"
echo "============================================="
echo ""

# Step 1: Build
echo "📦 Building application..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi
echo "✅ Build completed successfully"
echo ""

# Step 2: Create deployment package
echo "📦 Creating deployment package..."
tar --exclude=node_modules --exclude=.git --exclude=.next/.cache \
    --exclude=.env --exclude=.env.local -czf mulveer-jewellers.tar.gz .

FILESIZE=$(du -h mulveer-jewellers.tar.gz | cut -f1)
echo "✅ Deployment package created: mulveer-jewellers.tar.gz ($FILESIZE)"
echo ""

# Step 3: Instructions
echo "📋 Next Steps:"
echo "============="
echo ""
echo "1. Upload mulveer-jewellers.tar.gz to your Hostinger server"
echo ""
echo "2. SSH into your server and run:"
echo "   cd /path/to/hosting"
echo "   tar -xzf mulveer-jewellers.tar.gz"
echo "   npm install --production"
echo ""
echo "3. Create .env.local file with:"
echo "   DB_HOST=localhost"
echo "   DB_USER=your_user"
echo "   DB_PASSWORD=your_password"
echo "   DB_NAME=mulveer_jewellers"
echo "   JWT_SECRET=your_secret_key"
echo ""
echo "4. Initialize database:"
echo "   node scripts/reset-db.js"
echo ""
echo "5. Start application:"
echo "   npm install -g pm2"
echo "   pm2 start npm --name 'mulveer' -- start"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
