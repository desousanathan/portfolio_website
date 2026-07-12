# Portfolio Website — Learning Notes

This project is a small portfolio website built using modern web development tools.
It is designed to be easy to understand and extend, and this README explains the code in a beginner-friendly way.

---

## What this project is

This website is a single-page portfolio.
It shows a hero section, skills, achievements, projects, technology stack, and contact links.

It is built with:
- `Next.js` for page structure and routing
- `React` for component-based UI
- `TypeScript` for typed JavaScript and safer code
- `Tailwind CSS` for styling using utility classes
- plain CSS for global styling and animations

The page uses a custom animated background and scroll-based effects to make the site feel polished.

---

## What languages and technologies are used?

### TypeScript

TypeScript is a superset of JavaScript that adds types.
In this project, most files are `.tsx` or `.ts`.
`tsx` means the file contains JSX (HTML-like code inside JavaScript).

Why it matters:
- helps catch mistakes before you run the code
- makes it easier to understand what data is expected
- provides safer refactoring when the app grows

Example:
```tsx
const projects: { title: string; desc: string }[] = [ ... ];
```
This means `projects` is an array of objects where each object has a `title` and a `desc`, both strings.

### React

React is the UI library used to build the page.
React lets us write components, which are reusable pieces of the page.

Each component is a function that returns JSX.
JSX looks like HTML but is actually JavaScript.

Example:
```tsx
export function Footer() {
  return <footer>...</footer>;
}
```

React also uses hooks, which are special functions that add behavior to components.
This project uses hooks for scroll detection and animation.

### Next.js

Next.js is the framework that runs React on the web.
It provides:
- page routing
- layout files
- fast refresh in development
- production builds

This project uses the App Router, which means the app is built in `src/app/`.
The homepage is `src/app/page.tsx`, and the global page wrapper is `src/app/layout.tsx`.

### Tailwind CSS

Tailwind is a utility-first CSS framework.
Instead of writing custom CSS for most elements, Tailwind uses class names like `px-6`, `text-white`, and `rounded-xl`.
This keeps styling close to the HTML structure.

Example:
```tsx
<div className="rounded-2xl border border-white/10 p-6">
  ...
</div>
```
That means the box has rounded corners, a border, and padding.

### CSS

In addition to Tailwind, there is a `globals.css` file.
It contains:
- the Tailwind imports
- custom global rules
- the `.reveal` animation styles
- a grain overlay texture
- reduced motion support

This file is loaded once by `src/app/layout.tsx`.

### Node / NPM / Package.json

The project uses `package.json` to describe the app dependencies.
Dependencies are libraries the website needs to run.
Dev dependencies are tools used during development.

`npm install` downloads the dependencies.
`npm run dev` starts the development server.

---

## How the project is organized

### `src/app/layout.tsx`

This is the root layout. It renders elements that appear on every page:
- fonts
- global CSS
- the animated background
- the custom cursor
- the navigation bar
- the footer
- the main page content

Since this is a portfolio with one page, the same layout is used for the entire site.

### `src/app/page.tsx`

This file is the home page.
It imports each section component and renders them in order.
That makes the page easy to read and change.

### `src/components/background/`

These files create the animated background and page effects:
- `Landscape.tsx` — the parallax sun, clouds, and ridges behind the page
- `ProgressLine.tsx` — the small line at the top that fills as you scroll
- `CustomCursor.tsx` — the custom circle cursor on desktop devices

### `src/components/layout/`

Contains page layout parts:
- `Navbar.tsx` — top navigation bar
- `Footer.tsx` — footer text at the bottom of the page

### `src/components/sections/`

Contains the main content sections:
- `HeroSection.tsx`
- `AboutSection.tsx`
- `AchievementsSection.tsx`
- `ProjectsSection.tsx`
- `StackSection.tsx`
- `ContactSection.tsx`

Each section is a separate component, which makes the page modular.

### `src/hooks/`

This folder has custom hooks for scroll behavior:
- `useScrollProgress.ts` — computes scroll position and progress percentage
- `useScrollReveal.ts` — detects when elements enter the viewport and triggers reveal animation

### `src/lib/utils.ts`

A small helper used for building class names safely.
It combines classes and resolves Tailwind conflicts.

---

## Detailed walkthrough: each main file

### `src/app/layout.tsx`

This file does three important jobs:
1. imports fonts and global CSS
2. renders background components and navigation
3. wraps page content in `<main>`

Important patterns:
- `export const metadata` is a Next.js feature for page title and description.
- The body has class `font-body text-white antialiased` to set default styles.
- The background components are rendered first, then `children` appear above them.

### `src/app/page.tsx`

This file is very simple:
It imports the sections and returns them as JSX.
That means the homepage is made by stacking components.

Why this is good for learning:
- you can understand the page structure at a glance
- adding a new section is as easy as adding one more import and JSX element

### `src/hooks/useScrollProgress.ts`

This custom hook reads how far the user has scrolled.
It uses browser APIs:
- `window.scrollY` gives the vertical position
- `document.documentElement.scrollHeight` gives the page height
- `window.innerHeight` gives the visible window height

It also uses `requestAnimationFrame` to avoid updating too fast.

What it returns:
- `scrollY` = current scroll position in pixels
- `progress` = percentage from 0 to 100

This hook is used in three places:
- `ProgressLine.tsx` to set the width of the top bar
- `Navbar.tsx` to change navigation style after scrolling
- `Landscape.tsx` to move background layers slightly

### `src/hooks/useScrollReveal.ts`

This hook makes elements fade in when they enter the screen.
It uses `IntersectionObserver`, which watches elements as the page scrolls.

The hook returns:
- `ref`: attach this to the element you want to observe
- `inView`: becomes `true` when the element is visible

The CSS class `.reveal` is hidden by default.
When `data-in=\"true\"` is set, the CSS makes the element appear.

This pattern is powerful because it keeps animation logic out of each component.

### `src/lib/utils.ts`

`cn` is a helper for class names.
It uses two libraries:
- `clsx` to join classes conditionally
- `tailwind-merge` to prevent duplicate Tailwind classes

Example:
```ts
cn("text-white", isActive && "bg-blue")
```
This returns a string with only the classes that are true.

---

## Section components explained

### HeroSection

This is the first section the user sees.
It includes:
- a small status line
- a large heading
- a paragraph
- summary cards with stats
- buttons linking to the projects section and external profiles

The section uses Tailwind classes for spacing and text size.
The big heading uses `bg-clip-text` to apply a color gradient to the text.

### AboutSection

This section shows skills grouped into categories.
It uses local data arrays for the skills, so the component is easy to update.
Each skill has a `tier` to control color styling.

The helper `SkillGroup` renders each group and uses `useScrollReveal`.
This shows how to reuse a component for repeated content.

### AchievementsSection

This section shows a list of achievement cards.
It uses an array of objects with `title`, `desc`, and `accent`.
Each card gets a small animation delay based on its position.

This demonstrates how to render repeated cards from data.

### ProjectsSection

This section shows project cards.
Each project object includes:
- `accent` for color styling
- optional `featured` badge
- `title`, `desc`, `tags`, and `link`

The cards are rendered from the `projects` array.
This is a beginner-friendly pattern: store the content in data, then map it into UI.

### StackSection

This section explains the technologies used to build the site.
It uses a simple array of `{ name, role }` and maps over it.

### ContactSection

This section has contact links to GitHub and LinkedIn.
It uses the same card style as the other sections, showing consistency.

---

## Background and animation files

### `Landscape.tsx`

This file builds the animated landscape behind the site.
The main ideas are:
- use fixed positioning so the background stays behind the page
- create layers for parallax motion
- use simple SVG shapes for the mountains
- move layers using the scroll position from `useScrollProgress`

The component also includes clouds and moving motes.
The cloud and mote positions are calculated with a seeded function so they stay the same on every render.

### `ProgressLine.tsx`

A very small component.
It simply renders a narrow bar at the top with a dynamic width.
The width is set with inline style and `progress` from the hook.

### `CustomCursor.tsx`

This adds a custom cursor effect on desktop.
It does a few things:
- hides the default cursor with CSS on desktop
- listens for `mousemove` to move a small dot
- uses `requestAnimationFrame` to move a ring smoothly
- changes appearance when hovered over interactive links

This is a good example of a client-only component, because it uses browser APIs.

---

## Styling files

### `src/app/globals.css`

This file contains global styles and animation helpers.
Important sections:
- `@tailwind base`, `@tailwind components`, `@tailwind utilities` imports Tailwind into the project
- `body { cursor: none; }` hides the default cursor on devices that support hover
- `.grain-overlay` adds a subtle texture over the page
- `.reveal` defines the fade-up animation for scroll reveals
- `prefers-reduced-motion` support disables animations for users who need it

### `tailwind.config.ts`

This file extends Tailwind with custom fonts, colors, and animations.
The site defines its own color palette: `gold`, `teal`, `violet`, `sky`, `ridge`, and `ink`.
It also defines animation names like `fade-up`, `sun-pulse`, and `cloud-drift`.

Tailwind config is where the design tokens are declared, and it powers the utility classes used in the page.

---

## Configuration files

### `package.json`

This file lists dependencies and scripts.
The most important scripts are:
- `npm run dev` — start the development server
- `npm run build` — make a production build
- `npm run start` — run the built app

### `tsconfig.json`

This file configures TypeScript.
Important settings:
- `strict: true` enables strict type checking
- `jsx: preserve` keeps JSX syntax for Next.js
- `paths` makes `@/` aliases possible

### `next.config.ts`

This file configures Next.js.
It allows images from `images.unsplash.com`.
If you do not use remote images, this file can stay minimal.

---

## How to learn from this code as a beginner

### 1. Start with the page structure

Open `src/app/page.tsx`.
This file shows the order in which sections appear.
It is the simplest entry point.

### 2. Read the layout file next

`src/app/layout.tsx` shows what is always present on the page:
- global styles
- background layers
- navigation and footer

### 3. Learn React component structure

Each section is a function that returns JSX.
Look at one section at a time:
- `HeroSection.tsx`
- `AboutSection.tsx`
- `ProjectsSection.tsx`

Try changing text or adding a new item to a list.

### 4. Study the hooks

Custom hooks are reusable behavior.
Read `useScrollProgress.ts` first, then `useScrollReveal.ts`.
Ask yourself:
- what data does the hook return?
- how does the component use that data?

### 5. Inspect the styling

Open `src/app/globals.css` and `tailwind.config.ts`.
See how global styles and animation names are defined.
Tailwind classes in the JSX are the fastest way to understand the layout.

### 6. Modify the data arrays

The project uses arrays for skill groups, achievements, and projects.
This is a beginner-friendly pattern.
Change one item and refresh the site to see the effect.

---

## Practical steps to become more professional from this project

1. Change the text in one section.
2. Add a new skill to `AboutSection`.
3. Add a new project card to `ProjectsSection`.
4. Change one color class in `tailwind.config.ts` and see how it updates.
5. Add a new background layer in `Landscape.tsx`.
6. Replace one `useScrollReveal` section with a plain static section to compare the behavior.

Each change teaches you a different part of the stack.

---

## How to run the project

From the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in the browser.

To build for production:

```bash
npm run build
npm start
```

---

## Final note

This README is meant to be a study guide as much as documentation.
If you want, I can also add inline comments directly to the source files so each line explains what it does.
