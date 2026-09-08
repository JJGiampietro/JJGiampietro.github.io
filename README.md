# Jared Giampietro | Junior IT Analyst

Personal portfolio site, served from this repo via GitHub Pages at
[jjgiampietro.github.io](https://jjgiampietro.github.io/).

## Stack

Plain HTML, CSS, and vanilla JS — no framework, no build step, no
`node_modules`. Open `index.html` in a browser and it works; there's nothing
to compile.

```
index.html      All page content and markup
styles.css      All styling, organized to match the page's sections
script.js       Mobile menu toggle + auto-updating footer year (~40 lines)
favicon.svg     Tab icon
jared-profile.jpg, og.jpg   Photos, pre-sized and compressed for the web
robots.txt, sitemap.xml     Basic SEO plumbing
```

## Editing content

Everything visible on the page lives directly in `index.html` as plain
text — headings, paragraphs, card copy, and links. Open it in any editor,
change the text, save, and refresh.

## Local preview

Any static file server works, for example:

```
npx serve .
```

or Python's built-in server:

```
python3 -m http.server
```

## Deploying

This repo *is* the deployed site — GitHub Pages serves whatever is on the
`main` branch. Commit and push, and the live site updates within a minute
or two.
