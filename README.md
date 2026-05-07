# melodyjack.com

The published archive of Melody Jack — essays, stories, and lyrics from
three archetypes: Logic, Psyche, Instinct.

This repository contains the **static site as deployed**. There is no
build step. Every file under version control is served as-is by
GitHub Pages.

## Layout

```
melodyjack.com/
├── index.html              ← the door (Three forms. One author.)
├── archive.html            ← the full archive
├── essays/                 ← essays index + per-piece pages
├── stories/                ← stories index + per-piece pages
├── lyrics/                 ← lyrics index + per-piece pages
├── notebook/               ← the notebook
├── follow/                 ← follow links
├── subscribe/              ← newsletter signup
├── assets/                 ← hashed CSS, JS, fonts, images (built output)
├── audio/                  ← ambient track + per-story audio + sync JSON
├── brand/                  ← signature mark
├── og-image.jpg            ← Open Graph card
├── *.png / favicon.ico     ← favicons + apple touch icon
├── CNAME                   ← custom domain (melodyjack.com)
└── .nojekyll               ← tells GitHub Pages not to run Jekyll
```

## Deploy

Push to `main`. The workflow at `.github/workflows/deploy.yml` uploads the
repository contents to GitHub Pages and publishes them at `melodyjack.com`.

## Editing content

Each piece lives at `<form>/<slug>/index.html` (e.g.
`essays/architecture/index.html`). To change a piece, edit its HTML
directly. To add a piece, create a new folder with an `index.html` and
link to it from the corresponding form's index page.

> **Note.** The original Astro source for this site is no longer in
> version control. The files here are the pre-built output. If you want
> a content-managed pipeline back, that has to be rebuilt from scratch.
