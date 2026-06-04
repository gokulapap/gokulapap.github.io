# gokulap.me — Gokul A P

Personal portfolio of **Gokul A P** — Senior Software Engineer (DevOps) at Moveworks,
security researcher, and creator of [DevOps CTF](https://www.devops-ctf.com).

A single, self-contained **`index.html`** (inline CSS + vanilla JS — **no build step**)
in a warm "Blueprint" editorial theme, where each section is rendered as a recognizable
DevOps tool's UI:

| Section | Inspired by |
|---|---|
| Hero | Kubernetes cluster / ArgoCD health overview |
| About | Kubernetes `manifest.yaml` |
| Skills | Cloud-console service catalog (AWS · GCP · K8s) |
| Impact | Grafana stat panels |
| Experience | ArgoCD application / release history |
| Projects | GitHub repository explorer |
| DevOps CTF | GitHub README + product landing |
| Security | Findings / disclosure dashboard |
| Journey | `git log --graph` commit graph |
| Contact | ArgoCD application — channels as Pods |

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire site (HTML + CSS + JS). |
| `gokul.jpg` | Profile photo (rendered B&W in-page). |
| `CNAME` | Custom domain → `gokulap.me`. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |

## Deploy (GitHub Pages — user site)

Served at **gokulap.me**. In the repo: **Settings → Pages → Build and deployment →
Source: _Deploy from a branch_ → Branch `master` → `/ (root)`**. The custom domain is
configured in Settings (the `CNAME` file is a backup).

## Editing

All external links (email, GitHub, LinkedIn, X, résumé, DevOps CTF, project repos) live
in the `LINKS = { … }` object near the bottom of `index.html`. Section content is plain
HTML inside the relevant `<section>`.
