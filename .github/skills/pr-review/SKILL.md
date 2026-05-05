---
name: pr-review
description: Run React and Next.js performance optimization guidelines from Vercel Engineering on all modified .jsx and .tsx files in this project when a PR is created or updated, to improve code quality.
---

When a pull request targeting the main or master branch is opened or updated:

Perform code reviews on all modified .jsx and .tsx files in `/src` (except `*.{test|spec}.{jsx|tsx}` files) using the guidelines defined in:

1. ../../../.agents/skills/vercel-react-best-practices/SKILL.md
2. ../../../.agents/skills/web-design-guidelines/SKILL.md
3. ../../../.agents/skills/vercel-composition-patterns/SKILL.md

If the guidelines files are unavailable, fall back to general React and Next.js and accessibility best practices.

Focus on identifying issues related to:

- Rendering performance (unnecessary re-renders, memoization, expensive computations)
- Data fetching patterns
- Component structure and composition
- Accessibility (ARIA roles, keyboard navigation, semantic HTML)
- Proper use of React hooks and side effects
- Avoiding common anti-patterns

Only review lines that were added or modified in the pull request, unless surrounding context is necessary.

For each issue found, provide:

- A short explanation of the issue
- Why it matters (performance, accessibility, maintainability, etc.)
- A suggested code change or example fix

Prioritize issues by impact:

- High: performance regressions, accessibility violations, broken patterns
- Medium: maintainability concerns or suboptimal patterns
- Low: minor improvements

Avoid suggesting changes that do not provide meaningful improvements.
Do not suggest purely stylistic refactors unless they improve performance or maintainability.
