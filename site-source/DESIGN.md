# Jared Giampietro portfolio

Recruiter-facing personal profile. Apple-inspired restraint, Microsoft Fluent foundation, and a clear Power Platform identity.

## Design controls

- DESIGN_VARIANCE: 7. An asymmetric hero and mixed feature sizes give the profile its own composition.
- MOTION_INTENSITY: 5. Entry reveals, interactive example state changes, and the existing outdoor Easter egg.
- VISUAL_DENSITY: 3. Short copy, generous space, and a focused hierarchy.
- Official foundation: Fluent UI React v9 buttons, tabs, tooltips, accessibility primitives, and theme tokens.
- Typography: locally bundled Geist Variable. No external font requests.
- Palette: cool neutral surfaces and restrained Power Platform violet. Product marks keep their official colors as identity assets.
- Theme: one site-wide light or dark theme, defaulting to system preference.
- Shapes: 24px feature surfaces, 16px inner previews, pill controls.
- Layers: 10 navigation; 20 outdoor scenery; 30 outdoor card.

## Current site audit

- Preserve JG wordmark, role title, About/Focus/Approach/Contact anchors, LinkedIn-only contact, portrait, and Beyond the Desk vehicle.
- Consolidate repeated skills and support copy into the focus section and an expandable supporting-skills row.
- Replace simulated hero workspace with a diagram using official Microsoft product marks.
- Interactive workflow is an explicitly labeled local example, never a claimed client project.
- Do not invent employers, certifications, metrics, seniority, or project results.
- Keep natural professional copy. Never use em dashes.
- Maintain keyboard navigation, clear focus, meaningful alt text, and reduced-motion behavior.

## Interaction refinements

- Product marks orbit once every 40 seconds. Counter-rotation keeps the logos and labels upright.
- Rotation pauses on hover, keyboard focus, explicit pause, or when the hero leaves view. Reduced motion makes it static.
- Skill surfaces have a stronger edge, subtle depth, and pointer-responsive tilt using Motion values rather than React render state.
- Supporting skills are all visible. Basic information does not require a tab interaction.

## Visual assets

The hero uses official Microsoft Power Apps, Power Automate, SharePoint, and Power BI artwork in a connected ecosystem diagram. These are tool identities, not a personal logo. Jared's personal wordmark remains JG.

A ribbon sculpture was generated with the built-in image tool, reviewed by Jared, and rejected. It is not used by the page.
