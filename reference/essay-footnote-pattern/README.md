# Essay section — margin footnote pattern

This folder preserves the **interaction and layout wiring** from the exported v0 essays (not essay text).

## Expected DOM

| Element | Role |
|--------|------|
| `#essayProse` | Main article; contains `<a class="fn-ref" data-fn="…" href="#fn-…">` callouts and `<aside class="fn-margin" data-fn="…" id="fn-…">` blocks (source order varied). |
| `#essayFootnotes` | Right-rail footnote column; script may move `.fn-margin` asides here at wide widths. |
| `#essayProgress` | Optional fixed progress bar; receives `--progress` (0–100%). |
| `#essayConnector` | Optional wrapper with `<path>` bezier linking ref to margin note (wide layout). |

## Files

- **`footnote-coordinator.source.js`** — Client script (originally bundled with other islands; imports stripped here).
- **`legacy-essay-layout-and-footnotes.css`** — Full exported stylesheet for essay reading mode, including `.fn-ref`, `.fn-margin`, `.essay__footnotes`, grids, and progress UI. Class names are semantic in this bundle (not hashed).

Re-integrate into a new stack without copying v0 design tokens; use this only as a behavioral/layout reference.
