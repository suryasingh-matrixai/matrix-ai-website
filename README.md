# Matrix AI Research

Marketing site for Matrix AI Research — applied AI research across trading,
agentic AI, generative AI, RAG, context engineering, and enterprise agent
platforms.

## Structure

- `index.html` — single-page site
- `css/style.css` — styles
- `js/main.js` — header/nav behavior, digital-rain hero effect
- `.github/workflows/deploy.yml` — deploys `main` to Hostinger over FTPS

## Local development

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which uploads the
site to Hostinger over FTPS using `SamKirkland/FTP-Deploy-Action`.

Configure these repository secrets under **Settings → Secrets and variables
→ Actions** before the first deploy (set them directly in GitHub's UI, not
via chat/CI logs):

| Secret                        | Value                                              |
|--------------------------------|-----------------------------------------------------|
| `HOSTINGER_FTP_HOST`           | FTP hostname from Hostinger (e.g. `ftp.yourdomain.com` or an IP) |
| `HOSTINGER_FTP_USERNAME`       | FTP username from Hostinger hPanel                 |
| `HOSTINGER_FTP_PASSWORD`       | FTP password from Hostinger hPanel                 |
| `HOSTINGER_FTP_SERVER_DIR`     | Target directory, usually `/public_html/`          |

You can trigger a manual deploy from the Actions tab via "Run workflow"
(`workflow_dispatch`) without pushing a commit.
