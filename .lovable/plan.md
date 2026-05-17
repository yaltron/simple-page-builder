## Goal
Ensure only the Edit and Delete buttons in each gallery admin card are clickable. No other part of the card triggers anything.

## File
`src/routes/admin.gallery.index.tsx`

## Findings
- Card wrapper (`<div className="bg-white rounded-xl border ...">`, line 75): no `onClick` — already clean.
- Image/thumbnail (`<img>`, line 77): no `onClick` — already clean.
- Hover overlay (line 80): no `onClick` — already clean.
- Edit button (line 84): has `onClick={() => setEditing(it)}` — correct.
- Delete button (line 93): has `onClick={() => remove(...)}` — correct.

No card-level click handler currently exists. The reported behavior is likely the entire overlay reading as a click target visually; we'll harden the buttons defensively.

## Change
Wrap the Edit and Delete `onClick` handlers to stop event propagation and prevent default, so no ancestor (now or later) can react to button clicks:

```tsx
onClick={(e) => { e.stopPropagation(); e.preventDefault(); setEditing(it); }}
```
```tsx
onClick={(e) => { e.stopPropagation(); e.preventDefault(); remove(it.id, it.url, it.media_type); }}
```

Also add `type="button"` to both buttons as a safety measure.

No other edits. No design/layout changes.