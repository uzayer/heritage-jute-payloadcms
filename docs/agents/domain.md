# Domain Docs

How engineering skills should consume this repository's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root
- **`docs/adr/`**: read ADRs that touch the area being changed

If any of these files do not exist, proceed silently. The `/domain-modeling` skill creates them lazily when terms or decisions are resolved.

## File structure

This is a single-context repository:

```text
/
├── CONTEXT.md
├── docs/adr/
└── src/
```

## Use the glossary's vocabulary

When naming a domain concept in an issue title, proposal, hypothesis, or test, use the term defined in `CONTEXT.md`. If a relevant ADR conflicts with a proposed change, surface the conflict explicitly rather than silently overriding it.
