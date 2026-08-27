# Responsive check

`responsive-check.html` measures the page at real phone viewports.

## How to use it

```bash
pnpm dev                                    # serve the site
cp tools/responsive-check.html public/      # serve the harness from the same origin
# open http://localhost:3000/responsive-check.html
rm public/responsive-check.html             # remove before committing
```

It has to live under `public/` while running — an iframe can only be measured
from JavaScript if it is same-origin, and a `file://` page cannot read a
`localhost` frame. It does **not** belong in `public/` permanently, because
everything there ships to production.

## Why it exists

An earlier version of this check ran in the page's own window: it set
`body.style.width = '375px'` and skipped `<pre>` elements when listing
offenders. Both choices were wrong, and together they hid a real bug.

- **Resizing the body does not re-evaluate media queries.** `lg:grid-cols-2`
  stayed active, so the single-column mobile layout — the one that actually
  breaks — was never tested.
- **Excluding `<pre>` skipped the element that overflowed.** The exclusion
  existed because a scrollable code block is *allowed* to be wider than the
  viewport. But that is only true when an ancestor clips it, and here nothing
  did.

The check reported a clean page. A real iPhone showed 70px of horizontal
scroll, with the code block spilling past the right edge.

## What it checks now

An iframe gets its own viewport, so breakpoints behave exactly as they do on a
device. The pass condition is the one that matters to a user:

> `document.documentElement.scrollWidth` must not exceed the viewport width.

Individual elements may be wider — that is what a scrollable code block or
table is — as long as an ancestor clips them. Only when the document itself
scrolls sideways does the check walk the tree, and then it reports only
elements that **no** ancestor clips. Touch targets are measured at each phone
width too, not at desktop width, which is how a 20px footer link went unnoticed
before.

## The bug it found

Grid and flex children get an implicit `min-width: auto`, so they refuse to
shrink below their content. A `<pre overflow-x-auto>` inside such a child never
gets to scroll — it widens its parent instead, and the whole page goes with it.

The fix is `min-w-0` on the grid child, plus `min-w-0 max-w-full` on the `<pre>`
and `display: block` on the inner `<code>`. It only shows up once the grid
collapses to one column, which is why desktop testing never catches it.
