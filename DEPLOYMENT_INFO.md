# Mulveer Jewellery Deployment Information

## Deployment Date
November 14, 2025

## Domain
https://mulveerjewellery.adelev8.com

## Server Configuration

### Software Stack
- **OS**: Ubuntu Linux
- **Web Server**: Nginx 1.24.0
- **Application Server**: Node.js 24.11.1 with Next.js 15.3.5
- **Database**: MySQL 8.0.43
- **SSL**: Let's Encrypt (via Certbot)

### Services

#### Next.js Application Service
- **Service Name**: mulveerjew.service
- **Port**: 3000 (internal)
- **Status**: Active and enabled on boot
- **Working Directory**: /root/websites/mulveerjew
- **User**: root

Commands:
```bash
systemctl status mulveerjew.service
systemctl restart mulveerjew.service
systemctl stop mulveerjew.service
systemctl start mulveerjew.service
```

#### Nginx Configuration
- **Config File**: /etc/nginx/sites-available/mulveerjewellery.adelev8.com
- **Enabled**: Yes (symlinked in sites-enabled)
- **SSL Certificate**: /etc/letsencrypt/live/mulveerjewellery.adelev8.com/
- **Auto-renewal**: Enabled via certbot.timer

Commands:
```bash
systemctl status nginx
systemctl restart nginx
nginx -t  # Test configuration
certbot renew --dry-run  # Test certificate renewal
```

### Database Configuration

#### MySQL Database
- **Database Name**: mulveer_jewellers
- **User**: mulveer
- **Host**: localhost
- **Port**: 3306

Commands:
```bash
mysql -umulveer -p'MulveerJew2024!' mulveer_jewellers
systemctl status mysql
```

### Environment Variables
Located in: `/root/websites/mulveerjew/.env`

Key variables:
- DB_HOST=localhost
- DB_USER=mulveer
- DB_PASSWORD=MulveerJew2024!
- DB_NAME=mulveer_jewellers
- NEXTAUTH_URL=https://mulveerjewellery.adelev8.com

### SSL Certificate
- **Issued by**: Let's Encrypt
- **Expires**: February 12, 2026
- **Auto-renewal**: Configured (runs twice daily)
- **Certificate Path**: /etc/letsencrypt/live/mulveerjewellery.adelev8.com/fullchain.pem
- **Private Key Path**: /etc/letsencrypt/live/mulveerjewellery.adelev8.com/privkey.pem

## Deployment Process

### To update the application:
```bash
cd /root/websites/mulveerjew
git pull  # If using git
npm install  # If dependencies changed
npm run build
systemctl restart mulveerjew.service
```

### To view logs:
```bash
# Next.js application logs
journalctl -u mulveerjew.service -f

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# MySQL logs
tail -f /var/log/mysql/error.log
```

### Backup Commands
```bash
# Database backup
mysqldump -umulveer -p'MulveerJew2024!' mulveer_jewellers > backup_$(date +%Y%m%d).sql

# Application backup
tar -czf mulveerjew_backup_$(date +%Y%m%d).tar.gz /root/websites/mulveerjew
```

## Security Notes
1. SSL/TLS certificate is automatically renewed by Certbot
2. HTTP traffic is automatically redirected to HTTPS
3. Database credentials are stored in .env file (ensure proper file permissions)
4. Regular backups should be scheduled

## Monitoring
- Check service status regularly: `systemctl status mulveerjew nginx mysql`
- Monitor disk space: `df -h`
- Monitor certificate expiry: `certbot certificates`

## Support
For issues or updates, check application logs and service status first.
