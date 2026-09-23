# VPS Multi-Site Deployment Guide for PrabhaTech

This guide covers deploying PrabhaTech on an existing Linux VPS (Ubuntu/Debian) running multiple websites alongside an existing reverse proxy (e.g., Host Nginx, Caddy, or Traefik).

---

## Architecture Summary

- **Frontend Container**: Nginx Alpine serving React SPA & proxying `/api/` traffic to the backend. Binds to `127.0.0.1:3005` (customizable via `.env`).
- **Backend Container**: Spring Boot 3 on JRE 17 Alpine communicating on internal network `prabhatech_net:8080`.
- **Database Container**: PostgreSQL 16 Alpine on internal network `prabhatech_net:5432` with persistent Docker volume `prabhatech_pgdata`.
- **Host Reverse Proxy**: Your existing VPS Nginx/Caddy handles ports 80/443, SSL termination, and proxies to `127.0.0.1:3005`.

---

## Step 1: Clone Repository on VPS

```bash
# Navigate to your web directory on VPS
cd /var/www  # or your preferred folder

# Clone the repository
git clone https://github.com/nnr9848/prabha-tech.git
cd prabha-tech
```

---

## Step 2: Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Set your production values in `.env`:
```env
APP_PORT=3005
POSTGRES_DB=prabhatech_db
POSTGRES_USER=prabhatech_user
POSTGRES_PASSWORD=YourStrongDatabasePassword123!
JWT_SECRET=Your64CharacterRandomHexSecret
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

> **Tip**: Generate a secure JWT secret with `openssl rand -hex 32`.

---

## Step 3: Build and Start Containers

```bash
docker compose up -d --build
```

Verify that all 3 containers are healthy and running:
```bash
docker compose ps
docker compose logs -f backend
```

---

## Step 4: Configure Host Reverse Proxy (Nginx)

On your VPS host, create a new Nginx site configuration:

```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Paste the following block (replace `yourdomain.com` and `3005` if you chose a different port):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 5: Secure with Free SSL (Certbot / Let's Encrypt)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically configure HTTPS redirect and SSL certificates without disrupting your other websites.

---

## Maintenance & Useful Commands

### Check logs:
```bash
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f db
```

### Update application after pushing new code:
```bash
git pull origin main
docker compose up -d --build
```

### Backup database:
```bash
docker compose exec db pg_dump -U prabhatech_user uxda_db > backup_$(date +%F).sql
```
