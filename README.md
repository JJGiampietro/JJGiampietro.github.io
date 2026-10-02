# Jared Giampietro | JR IS Analyst

Personal portfolio focused on Power Platform and SharePoint Administration.
Published at [jjgiampietro.github.io](https://jjgiampietro.github.io/).

## Project structure

- `index.html` and `assets/`: the approved production build served by GitHub Pages.
- `site-source/`: editable React source, Microsoft Fluent UI components, Motion interactions, and design guide.
- Older root-level CSS, scripts, and images are retained for reference. The current site does not load them.

## Edit and preview

```sh
cd site-source
npm ci
npm run dev
```

The local preview is available at http://127.0.0.1:5175/.

## Publish updates

Run `npm run build` from `site-source`, then copy the contents of `site-source/dist/` into the repository root. Commit the reviewed build and source changes to `main`. GitHub Pages publishes the root of that branch.

The site preserves Jared's portrait, LinkedIn-only contact, and the Beyond the Desk pixel 4Runner feature. The approval flow is an illustrative browser-only example and submits no data.

Microsoft product marks come from official Microsoft product/CDN assets. See `site-source/DESIGN.md` for design decisions.
