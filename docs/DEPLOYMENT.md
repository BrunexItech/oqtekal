# Deploying oqtekal.com

Runs on the company VPS alongside other sites: **Cloudflare → host nginx → 127.0.0.1:8092 (`WEB_PORT`) → Docker (web + Postgres)**. The server has the standalone `docker-compose` command.

## First-time setup

1. **DNS (Cloudflare):** `A oqtekal.com → VPS IP` and `CNAME www → oqtekal.com`, both proxied.
   SSL/TLS mode **Full (strict)**. Create an **Origin Certificate** and save it on the VPS as
   `/etc/ssl/cloudflare/oqtekal.com.pem` and `.key`.
2. **Code:** `git clone <repo> /srv/oqtekal && cd /srv/oqtekal`
3. **Secrets:** `cp .env.production.example .env.production` and fill it in
   (generate secrets with `openssl rand -hex 32`). Never commit this file.
4. **nginx:** copy `docker/nginx/oqtekal.com.conf` to `/etc/nginx/sites-available/oqtekal.com`
   (port must equal `WEB_PORT`), symlink into `sites-enabled/`, then
   `sudo nginx -t && sudo systemctl restart nginx` (on this VPS a reload does not pick up new sites).
5. **Start:** `docker compose -f docker/compose.prod.yml --env-file .env.production up -d --build`
   Database migrations run automatically when the web container starts.
6. **Content:** either restore a backup from staging (`scripts/ops/restore.sh`) or create the first
   admin at `https://oqtekal.com/admin` and enter content.
7. **Email DNS:** add SPF, DKIM and DMARC records for the mail provider so enquiry emails are delivered.
8. **Backups:** add the cron line from `scripts/ops/backup.sh`, set `BACKUP_REMOTE` for off-site copies,
   and **run a restore drill** before launch.
9. **Monitoring:** point an uptime monitor at `https://oqtekal.com/next/health`.

## Every deploy

```bash
cd /srv/oqtekal && ./scripts/ops/deploy.sh
```

Pulls `main`, builds, swaps the container, checks health, and rolls back automatically if the check fails.

## Launch checklist

- [ ] `LAUNCH_CHECK=1 npx playwright test launch-checklist` passes against production
- [ ] Real phone, WhatsApp, address and social links in Company details
- [ ] SMTP set; a test enquiry arrives by email and in the admin
- [ ] Turnstile keys set (spam protection)
- [ ] Backups running and a restore tested
- [ ] Google Search Console: submit `https://oqtekal.com/sitemap.xml`
