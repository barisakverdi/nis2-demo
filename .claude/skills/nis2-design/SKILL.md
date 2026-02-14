---
name: nis2-design-system
description: Enforce NIS2 CRM design system and CSS architecture standards. Use when creating new pages, components, or UI elements, or when refactoring existing styling. Ensures consistent spacing, naming conventions, and component patterns across the application.
allowed-tools: Read, Grep, Glob
---

# NIS2 Design System Enforcement

This Skill ensures all UI code follows the NIS2 CRM design system architecture and CSS standards defined in CLAUDE.md.

## When to Use This Skill

Automatically apply this Skill when:

- Creating new pages or route components
- Building new UI components
- Refactoring existing components
- User mentions "design system", "styling", "layout", or "UI"
- Creating cards, forms, grids, or page layouts

## Core Principles

### 1. Spacing System (8px Grid)

**CRITICAL: Use semantic spacing tokens from the design system**

NIS2 uses an **8px grid system** based on UX research (Material Design, Carbon, Apple HIG).

#### Spacing Scale

**Base Grid (8px multiples):**

- `--spacing-2`: 8px - Smallest standard spacing
- `--spacing-4`: 16px - Default spacing (MOST USED)
- `--spacing-6`: 24px - Comfortable spacing
- `--spacing-8`: 32px - Section spacing
- `--spacing-12`: 48px - Major sections
- `--spacing-16`: 64px - Page-level spacing

**Micro Adjustments (4px):**

- `--spacing-1`: 4px - Tight spacing, small gaps
- `--spacing-3`: 12px - Compact spacing

#### Semantic Spacing Tokens

**ALWAYS use semantic tokens instead of raw values:**

```tsx
// ✅ CORRECT - Semantic tokens
<div className="p-container-md">  {/* 24px padding */}
  <div className="gap-stack-md">  {/* 16px vertical gap */}
    {/* Content */}
  </div>
</div>

// ❌ WRONG - Raw Tailwind values
<div className="p-6">
  <div className="space-y-4">
    {/* Content */}
  </div>
</div>
```

**Available Semantic Tokens:**

**Component Padding:**

- `--spacing-component-xs`: 4px
- `--spacing-component-sm`: 8px
- `--spacing-component-md`: 16px
- `--spacing-component-lg`: 24px
- `--spacing-component-xl`: 32px

**Container Padding:**

- `--spacing-container-xs`: 12px
- `--spacing-container-sm`: 16px
- `--spacing-container-md`: 24px (default for cards)
- `--spacing-container-lg`: 32px
- `--spacing-container-xl`: 48px

**Stack Spacing (vertical):**

- `--spacing-stack-xs`: 4px
- `--spacing-stack-sm`: 8px
- `--spacing-stack-md`: 16px
- `--spacing-stack-lg`: 24px
- `--spacing-stack-xl`: 32px

**Inline Spacing (horizontal):**

- `--spacing-inline-xs`: 4px
- `--spacing-inline-sm`: 8px
- `--spacing-inline-md`: 12px
- `--spacing-inline-lg`: 16px
- `--spacing-inline-xl`: 24px

**Layout Spacing (major sections):**

- `--spacing-layout-xs`: 16px
- `--spacing-layout-sm`: 24px
- `--spacing-layout-md`: 32px (default)
- `--spacing-layout-lg`: 48px
- `--spacing-layout-xl`: 64px
- `--spacing-layout-2xl`: 96px

**Specific Use Cases:**

- `--spacing-page-padding`: 24px
- `--spacing-page-section`: 32px
- `--spacing-card-padding`: 24px
- `--spacing-card-gap`: 16px
- `--spacing-form-field`: 16px
- `--spacing-button-gap`: 8px

#### Utility Classes

```tsx
/* Padding utilities */
.p-container-xs → 12px padding
.p-container-md → 24px padding (default for cards)
.p-container-lg → 32px padding

/* Gap utilities (for flexbox/grid) */
.gap-stack-md → 16px vertical gap
.gap-inline-md → 12px horizontal gap
.gap-content-md → 16px content gap
.gap-layout-md → 32px section gap
```

#### When to Use Tailwind vs Semantic Tokens

**Use Tailwind utilities (p-4, gap-6) for:**

- Quick prototyping
- One-off adjustments
- Responsive overrides: `<div className="p-container-md md:p-container-lg">`

**Use semantic tokens for:**

- Production components
- Repeated patterns
- Design system consistency
- CSS variables: `padding: var(--spacing-card-padding);`

### 1.1 Shadow & Elevation System

**CRITICAL: Use semantic shadow tokens from the design system**

NIS2 uses a **multi-layer shadow system** based on UX research showing elevated elements are processed **30% faster** (MIT study).

#### Shadow Scale (8 Levels + None)

**Base Elevation Scale:**

- `--shadow-none`: No shadow - Flat surface, disabled elements
- `--shadow-xs`: 4dp - Subtle hover, barely visible
- `--shadow-sm`: 8dp - **Default cards, buttons** (MOST USED)
- `--shadow-md`: 12dp - Dropdowns, elevated surfaces
- `--shadow-lg`: 16dp - **Modals, popovers, AI cards**
- `--shadow-xl`: 20dp - Navigation drawers, large overlays
- `--shadow-2xl`: 24dp - Large modals, side panels
- `--shadow-3xl`: 32dp - Full-screen overlays
- `--shadow-max`: 40dp - Maximum elevation, hero elements

**Inner Shadows (Inset):**

- `--shadow-inner-xs`: Subtle inset depth
- `--shadow-inner-sm`: **Default input fields** (MOST USED)
- `--shadow-inner-md`: Medium inset (pressed buttons)
- `--shadow-inner-lg`: Strong inset (embedded areas)

#### Semantic Shadow Tokens

**ALWAYS use semantic tokens instead of raw values:**

```tsx
// ✅ CORRECT - Semantic tokens
<Card className="shadow-card hover:shadow-card-hover shadow-transition">
  Content
</Card>

<Button className="hover:shadow-button-hover shadow-transition">
  Click me
</Button>

<Input className="shadow-inner-sm focus:shadow-input-focus" />

// ❌ WRONG - Raw Tailwind values
<Card className="shadow-sm hover:shadow-md">Content</Card>
<Button className="hover:shadow-lg">Click me</Button>
<Input className="shadow-inner" />
```

**Available Semantic Tokens:**

**UI Element Shadows:**

- `--shadow-button-hover`: Elevated button on hover (8dp)
- `--shadow-button-active`: Pressed button (4dp)
- `--shadow-card`: Default card elevation (8dp)
- `--shadow-card-hover`: Card hover state (12dp)
- `--shadow-input`: Input field subtle depth (4dp)
- `--shadow-input-focus`: Input focus state (12dp)

**Overlay Shadows:**

- `--shadow-dropdown`: Dropdown menus (12dp)
- `--shadow-popover`: Popovers, tooltips (16dp)
- `--shadow-modal`: Modal dialogs (20dp)
- `--shadow-drawer`: Side drawers (24dp)
- `--shadow-toast`: Toast notifications (16dp)

**AI Component Shadows (Higher Elevation):**

- `--shadow-ai-card`: AI feature cards (16dp)
- `--shadow-ai-chat`: AI chat bubbles (12dp)
- `--shadow-ai-input`: AI input container (20dp) - extra prominent
- `--shadow-ai-suggestion`: AI suggestions (12dp)

**Focus & Glow Effects:**

- `--shadow-focus-ring`: Focus outline (3px)
- `--shadow-glow-sm`: Small glow effect
- `--shadow-glow-md`: Medium glow effect
- `--shadow-glow-lg`: Large glow effect

#### Shadow Guidelines

**Key Rules:**

1. **Elevation Hierarchy**: Higher elevation = closer to user = more shadow

   ```tsx
   /* Resting elements (Level 0-1) */
   <div className="shadow-none">Background</div>

   /* Cards & Surfaces (Level 2) */
   <Card className="shadow-card">Content</Card>

   /* Dropdowns (Level 3) */
   <DropdownMenu className="shadow-dropdown">Menu</DropdownMenu>

   /* Modals (Level 4-5) */
   <Dialog className="shadow-modal">Dialog</Dialog>
   ```

2. **Always Add Transitions**: Smooth shadow changes

   ```tsx
   <Card className="shadow-card hover:shadow-card-hover shadow-transition">
     {/* 200ms smooth elevation change */}
   </Card>
   ```

3. **Multi-Layer Shadows**: Ambient + Key light (automatic)

   ```css
   /* --shadow-sm has 2 layers for natural depth */
   --shadow-sm:
     0 1px 3px 0 rgb(0 0 0 / 0.04), /* Ambient */ 0 1px 2px -1px rgb(0 0 0 / 0.12); /* Key light */
   ```

4. **Dark Mode Auto-Adjustment**: Rim lighting added automatically

   ```tsx
   <Card className="shadow-card">{/* Automatically adjusts in dark mode with .dark class */}</Card>
   ```

5. **AI Components Higher Elevation**: Emphasizes AI-first philosophy

   ```tsx
   <div className="shadow-ai-input rounded-ai-input p-container-lg">
     <input placeholder="Ask AI..." />
   </div>
   ```

#### Utility Classes

```tsx
/* Base shadow scale */
.shadow-none  → No shadow (flat)
.shadow-xs    → 4dp (subtle hover)
.shadow-sm    → 8dp (default cards)
.shadow-md    → 12dp (dropdowns)
.shadow-lg    → 16dp (modals)
.shadow-xl    → 20dp (drawers)
.shadow-2xl   → 24dp (large overlays)
.shadow-3xl   → 32dp (full-screen)
.shadow-max   → 40dp (maximum)

/* Inner shadows */
.shadow-inner-xs  → Subtle inset
.shadow-inner-sm  → Default input inset
.shadow-inner-md  → Medium inset
.shadow-inner-lg  → Strong inset

/* Semantic shadows */
.shadow-card            → Default card (8dp)
.shadow-card-hover      → Card hover (12dp)
.shadow-button-hover    → Button hover (8dp)
.shadow-dropdown        → Dropdown (12dp)
.shadow-modal           → Modal (20dp)
.shadow-ai-input        → AI input (20dp)

/* Focus effects */
.shadow-focus-ring      → Focus outline (3px)
.shadow-glow-md         → Glow effect

/* Transitions */
.shadow-transition      → 200ms smooth (default)
.shadow-transition-fast → 100ms quick
.shadow-transition-slow → 300ms slow
```

#### When to Use Each Shadow

**Cards & Containers:**

```tsx
/* Resting state */
<Card className="shadow-card">Content</Card>

/* Hover state */
<Card className="shadow-card hover:shadow-card-hover shadow-transition">
  Interactive card
</Card>
```

**Buttons:**

```tsx
/* Default: No shadow */
<Button>Click me</Button>

/* Hover elevation */
<Button className="hover:shadow-button-hover shadow-transition">
  Elevated on hover
</Button>

/* Active/pressed (reduced shadow) */
<Button className="hover:shadow-button-hover active:shadow-button-active shadow-transition">
  Press me
</Button>
```

**Inputs & Forms:**

```tsx
/* Inset shadow (carved look) */
<Input className="shadow-inner-sm focus:shadow-input-focus shadow-transition" />

/* With focus ring */
<Input className="shadow-inner-sm focus:shadow-input-focus focus:shadow-focus-ring shadow-transition" />
```

**Dropdowns & Overlays:**

```tsx
<DropdownMenuContent className="shadow-dropdown">
  Menu items
</DropdownMenuContent>

<Popover className="shadow-popover">
  Popover content
</Popover>

<Dialog className="shadow-modal">
  Dialog content
</Dialog>
```

**AI Components (Higher Elevation):**

```tsx
<div className="shadow-ai-input rounded-ai-input p-container-lg">
  <input placeholder="Ask AI..." />
</div>

<Card className="shadow-ai-card rounded-card-lg">
  AI feature card
</Card>
```

### 1.2 Border Radius System

**CRITICAL: Use semantic radius tokens from the design system**

NIS2 uses a **progressive border radius scale** based on UX research showing rounded corners are perceived 200ms faster than sharp edges.

#### Border Radius Scale

**Base Scale (0-48px + full):**

- `--radius-none`: 0px - Sharp corners, formal, precise
- `--radius-xs`: 2px - Micro elements, tight corners
- `--radius-sm`: 4px - Small components, subtle softness
- `--radius-md`: 8px - Default UI elements (MOST USED)
- `--radius-lg`: 12px - Cards, panels, containers
- `--radius-xl`: 16px - Large components, prominent elements
- `--radius-2xl`: 24px - Hero cards, featured content
- `--radius-3xl`: 32px - Extra large components
- `--radius-4xl`: 48px - Massive components, modals
- `--radius-full`: 9999px - Pills, avatars, badges (circular)

#### Semantic Radius Tokens

**ALWAYS use semantic tokens instead of raw values:**

```tsx
// ✅ CORRECT - Semantic tokens
<Button className="rounded-button">Save</Button>
<Card className="rounded-card">Content</Card>
<AiInput className="rounded-ai-input" />

// ❌ WRONG - Raw Tailwind values
<Button className="rounded-md">Save</Button>
<Card className="rounded-xl">Content</Card>
<AiInput className="rounded-2xl" />
```

**Available Semantic Tokens:**

**Buttons:**

- `--radius-button-sm`: 4px → `.rounded-button-sm`
- `--radius-button-md`: 8px → `.rounded-button` (default)
- `--radius-button-lg`: 12px → `.rounded-button-lg`
- `--radius-button-pill`: full → `.rounded-button-pill`

**Cards & Containers:**

- `--radius-card-sm`: 8px → `.rounded-card-sm`
- `--radius-card-md`: 12px → `.rounded-card` (default)
- `--radius-card-lg`: 16px → `.rounded-card-lg`
- `--radius-card-featured`: 24px → `.rounded-card-featured`

**Inputs & Forms:**

- `--radius-input`: 8px → `.rounded-input`
- `--radius-select`: 8px → `.rounded-select`
- `--radius-checkbox`: 4px (for checkboxes)
- `--radius-radio`: full (circular radio buttons)

**Modals:**

- `--radius-modal-sm`: 12px → `.rounded-modal-sm`
- `--radius-modal-md`: 16px → `.rounded-modal` (default)
- `--radius-modal-lg`: 24px → `.rounded-modal-lg`

**Badges & Tags:**

- `--radius-badge`: 4px → `.rounded-badge`
- `--radius-badge-pill`: full → `.rounded-badge-pill`
- `--radius-tag`: 8px (for tags)

**AI Components (NIS2-specific):**

- `--radius-ai-chat-bubble`: 16px → `.rounded-ai-chat`
- `--radius-ai-input`: 24px → `.rounded-ai-input` (extra friendly)
- `--radius-ai-suggestion`: 12px → `.rounded-ai-suggestion`

**Avatars:**

- `--radius-avatar`: full → `.rounded-avatar` (circular)
- `--radius-avatar-square`: 12px → `.rounded-avatar-square`

**Images:**

- `--radius-image-sm`: 8px → `.rounded-image-sm`
- `--radius-image-md`: 12px → `.rounded-image` (default)
- `--radius-image-lg`: 16px → `.rounded-image-lg`
- `--radius-image-hero`: 24px → `.rounded-image-hero`

#### Border Radius Guidelines

**Psychology & Usage:**

- **Subtle (2-4px):** Professional, clean, minimal → Financial/enterprise UIs
- **Moderate (8-12px):** Friendly, modern, balanced → Standard NIS2 UI (DEFAULT)
- **High (16-24px):** Approachable, playful, engaging → AI chat interfaces
- **Full (9999px):** Pills, badges, avatars, circular elements

**Key Rules:**

1. **Size Matching:** Larger components = more radius

   ```tsx
   <Button size="sm" className="rounded-button-sm">Small</Button>
   <Button size="lg" className="rounded-button-lg">Large</Button>
   ```

2. **Nested Elements:** Inner radius = Outer radius - Padding (or use smaller scale)

   ```tsx
   <Card className="rounded-xl p-container-md">
     {' '}
     {/* 16px radius, 24px padding */}
     <div className="rounded-md">Nested</div> {/* 8px radius */}
   </Card>
   ```

3. **Consistency:** Maintain consistent radius within component families

   ```tsx
   {/* All form elements use rounded-input (8px) */}
   <Input className="rounded-input" />
   <Select className="rounded-select" />
   <Textarea className="rounded-input" />
   ```

4. **Brand Alignment (NIS2):**
   - Standard UI: Moderate roundness (8-12px)
   - AI interactions: Higher roundness (16-24px) for friendliness
   - Data displays: Lower roundness (4-8px) for professionalism

#### Utility Classes

```tsx
/* Semantic radius utilities */
.rounded-button       → 8px  (default button)
.rounded-card         → 12px (default card)
.rounded-input        → 8px  (form inputs)
.rounded-modal        → 16px (modals)
.rounded-badge-pill   → full (pill badges)
.rounded-avatar       → full (circular avatars)
.rounded-ai-input     → 24px (AI chat input - extra friendly)
.rounded-ai-chat      → 16px (AI chat bubbles)
```

### 2. CSS Class Naming Convention

**CRITICAL: Use the correct naming pattern**

#### ✅ Layout/Semantic Classes → NO PREFIX

These are internal to our app, no namespace collision risk:

```tsx
// ✅ CORRECT - Layout/semantic classes
<div className="page">
  <div className="page-header">
    <h1 className="page-title">Products</h1>
    <p className="page-description">Description</p>
  </div>
</div>

<div className="card">
  <div className="card-header">
    <h3 className="card-title">Title</h3>
  </div>
</div>
```

#### ✅ Typography Utilities → `.text-*` PREFIX (Tailwind style)

These are reusable utility classes:

```tsx
// ✅ CORRECT - Typography utilities
<h1 className="text-h1">Heading</h1>
<p className="text-body-lg">Body text</p>
<span className="text-caption">Caption</span>
<code className="text-code">Code</code>
```

#### ❌ WRONG - Don't use `nis2-` for everything

```tsx
// ❌ WRONG - Unnecessary prefix for internal classes
<div className="nis2-page">
  <h1 className="nis2-page-title">Title</h1>
</div>

// ❌ WRONG - Old typography naming
<h1 className="nis2-h1">Title</h1>
<p className="nis2-body-md">Text</p>
```

### 2. Complete Class Name Reference

#### Page Layout Classes (no prefix)

```tsx
.page                    // Main page container
.page-header             // Header with title + actions
.page-title              // H1 page title (40px, bold)
.page-description        // Subtitle (18px, muted)
```

#### Card Classes (no prefix)

```tsx
.card                    // Card container
.card-header             // Card header section
.card-title              // Card title (22px, semibold)
.card-description        // Card subtitle (14px, muted)
.card-content            // Card body content
.card-footer             // Card footer section
```

#### Typography Utilities (`.text-*` prefix)

```tsx
// Display sizes
.text-display-xl         // 72px - Hero headlines
.text-display-lg         // 60px - Large headlines
.text-display-md         // 48px - Section headlines
.text-display-fluid      // Responsive display

// Headings
.text-h1                 // 40px - Page titles
.text-h2                 // 32px - Major sections
.text-h3                 // 26px - Sub-sections
.text-h4                 // 22px - Card titles
.text-h5                 // 18px - Small headings
.text-h6                 // 16px - Micro headings

// Body text
.text-body-xl            // 20px - Large body
.text-body-lg            // 18px - Emphasized body
.text-body-md            // 16px - Default body
.text-body-sm            // 14px - Secondary text
.text-body-xs            // 12px - Captions

// Body variants
.text-emphasis           // Medium weight
.text-strong             // Semibold weight
.text-relaxed            // Relaxed line height (long-form)

// UI elements
.text-ui-lg              // 16px - Large buttons
.text-ui-md              // 14px - Default UI
.text-ui-sm              // 13px - Small UI
.text-ui-xs              // 11px - Tiny labels

// Special purpose
.text-label              // Form labels (uppercase)
.text-caption            // Captions (12px, muted)
.text-overline           // Section labels (uppercase, tiny)
.text-code               // Code snippets (monospace)
.text-quote              // Blockquotes (italic, relaxed)

// Text modifiers
.text-gradient           // Gradient text effect
.text-balance            // Balance text across lines
.text-pretty             // Pretty text wrapping
.text-truncate           // Single line ellipsis
.text-clamp-2            // 2-line ellipsis
.text-clamp-3            // 3-line ellipsis
```

### 3. File Structure Awareness

Before creating styles, check existing files:

```bash
# Check for existing component styles
ls src/styles/components/

# Check for existing layout patterns
ls src/styles/layouts/

# Check for existing utilities
ls src/styles/utilities/
```

**CSS file locations:**

- Component overrides: `src/styles/components/[name].css`
- Layout patterns: `src/styles/layouts/[name].css`
- Typography: `src/styles/foundations/typography.css`
- Custom utilities: `src/styles/utilities/utilities.css`

### 4. Standard Page Structure

Every page MUST follow this pattern:

```tsx
<div className="page">
  {/* Page Header: Title + Actions */}
  <div className="page-header">
    <div>
      <h1 className="page-title">{t('pageTitle')}</h1>
      <p className="page-description">{t('pageDescription')}</p>
    </div>
    {/* Optional: Action buttons */}
    <div className="flex gap-2">
      <Button>Action</Button>
    </div>
  </div>

  {/* Page Content */}
  <div className="card">
    <div className="card-content">{/* Content here */}</div>
  </div>
</div>
```

### 5. Standard Card Structure

Cards MUST use predefined classes with proper radius:

```tsx
<div className="card rounded-card">
  {/* Optional Header */}
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
    <p className="card-description">Card description</p>
  </div>

  {/* Content */}
  <div className="card-content">{/* Content here */}</div>

  {/* Optional Footer */}
  <div className="card-footer">
    <Button className="rounded-button">Action</Button>
  </div>
</div>;

{
  /* Featured Card */
}
<div className="card rounded-card-featured">
  <div className="card-content">
    <h2 className="text-h2">Featured Content</h2>
    <p className="text-body-md">Extra prominent card with 24px radius</p>
  </div>
</div>;

{
  /* AI Component Card */
}
<div className="card rounded-ai-input p-container-lg">
  <div className="card-content">
    <p className="text-body-md">AI chat interface with extra friendly radius</p>
  </div>
</div>;
```

### 6. Typography Usage Examples

```tsx
{
  /* Page with typography utilities */
}
<div className="page">
  <div className="page-header">
    {/* Use semantic class for page title */}
    <h1 className="page-title">Products</h1>
    <p className="page-description">Manage your catalog</p>
  </div>

  <div className="card">
    <div className="card-content">
      {/* Use utility classes for content */}
      <h2 className="text-h2">Section Title</h2>
      <p className="text-body-md">This is body text with optimal readability.</p>
      <p className="text-caption">Helper text or caption</p>
    </div>
  </div>
</div>;
```

### 7. When to Use Each Pattern

**Use semantic classes (no prefix) for:**

- Page structure (`.page`, `.page-header`)
- Card structure (`.card`, `.card-header`)
- Automatic typography application (`.page-title`, `.card-title`)

**Use utility classes (`.text-*`) for:**

- Custom typography needs
- Content within cards/pages
- Fine-grained control over text appearance
- One-off text styling

## Validation Checklist

Before completing any UI task, verify:

```
- [ ] Spacing uses semantic tokens (--spacing-card-padding, gap-stack-md)
- [ ] No raw Tailwind spacing values in production components (p-6, space-y-4)
- [ ] 8px grid system followed (multiples of 8px: 8, 16, 24, 32, 48, 64)
- [ ] Border radius uses semantic tokens (rounded-card, rounded-button)
- [ ] No raw Tailwind radius in production (rounded-lg, rounded-xl)
- [ ] Nested elements follow inner radius rule (inner < outer - padding)
- [ ] AI components use higher roundness (rounded-ai-input, rounded-ai-chat)
- [ ] Shadows use semantic tokens (shadow-card, shadow-modal, shadow-ai-input)
- [ ] No raw Tailwind shadow values in production (shadow-sm, shadow-lg)
- [ ] Elevation hierarchy followed (higher elevation = more shadow)
- [ ] Hover shadows include shadow-transition class
- [ ] Focus states include shadow-focus-ring when appropriate
- [ ] AI components use higher elevation (shadow-ai-card, shadow-ai-input)
- [ ] Dark mode tested (shadows automatically adjust)
- [ ] Layout classes have NO prefix (.page, .card)
- [ ] Typography utilities use .text-* prefix (.text-h1, .text-body-md)
- [ ] Page follows .page → .page-header structure
- [ ] Cards use .card and sub-components with proper spacing
- [ ] No inline utility classes for repeated patterns
- [ ] Checked src/styles/ for existing classes
- [ ] Used predefined grid utilities for layouts
- [ ] Responsive design uses Tailwind breakpoints (sm:, md:, lg:)
```

## When to Use Tailwind Utilities Directly

Use Tailwind utilities for:

- One-off styling that won't be reused
- Component-specific adjustments: `<div className="card bg-red-50">`
- Responsive overrides: `<h1 className="page-title md:text-4xl">`
- Spacing adjustments: `<div className="card mb-4">`

**DON'T create new generic utilities without proper naming**

## Creating New CSS Classes

If you need to create a new reusable pattern:

1. **Choose the file:**
   - Component: `src/styles/components/[name].css`
   - Layout: `src/styles/layouts/[name].css`
   - Typography: Already complete
   - Utility: `src/styles/utilities/utilities.css`

2. **Use `@layer` directive:**

   ```css
   @layer components {
     .my-component {
       @apply /* Tailwind utilities */;
     }
   }
   ```

3. **Import in `globals.css`:**

   ```css
   @import '../styles/components/my-component.css';
   ```

## Common Patterns Reference

### Empty State

```tsx
<div className="empty-state">
  <Icon className="empty-icon" />
  <h3 className="text-h4">No items found</h3>
  <p className="text-body-sm text-muted-foreground">Description text</p>
</div>
```

### Loading State

```tsx
<div className="loading">
  <Loader2 className="h-4 w-4 animate-spin" />
  <span className="text-body-sm">Loading...</span>
</div>
```

## Error Prevention

**Common mistakes to avoid:**

1. ❌ Using `nis2-` prefix for page/card classes
2. ❌ Using old `.nis2-h1` instead of `.text-h1`
3. ❌ Not checking `src/styles/` before creating new classes
4. ❌ Inconsistent spacing across pages
5. ❌ Mixing naming conventions

## Quick Decision Tree

```
Are you creating UI?
├─ Yes → Is it page structure?
│   ├─ Yes → Use .page, .page-header, .page-title (no prefix)
│   └─ No → Is it a card?
│       ├─ Yes → Use .card, .card-header, .card-title (no prefix)
│       └─ No → Is it typography?
│           ├─ Yes → Use .text-* utilities (.text-h1, .text-body-md)
│           └─ No → Check src/styles/ for existing patterns
│                   ├─ Found → Use existing class
│                   └─ Not found → Create without prefix (internal use)
└─ No → This Skill doesn't apply
```

## Example: Creating a New Page

```tsx
// src/app/(dashboard)/customers/page.tsx

import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default async function CustomersPage() {
  const t = await getTranslations('customers');

  return (
    <div className="page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('pageTitle')}</h1>
          <p className="page-description">{t('pageDescription')}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('addCustomer')}
        </Button>
      </div>

      {/* Content Card */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Customer List</h2>
          <p className="card-description">All your customers in one place</p>
        </div>
        <div className="card-content">
          {/* Use typography utilities in content */}
          <p className="text-body-md">
            You have no customers yet. Add your first customer to get started.
          </p>
          <p className="text-caption">Customers will appear here once added.</p>
        </div>
      </div>
    </div>
  );
}
```

## Reference

For complete CSS architecture details, see:

- **CLAUDE.md** - "CSS Architecture & Design System" section
- **src/styles/** - Actual CSS files
- **src/app/(dashboard)/** - Example page implementations

## Summary

1. **Layout/semantic → No prefix** (`.page`, `.card`, `.page-title`)
2. **Typography utilities → `.text-*` prefix** (`.text-h1`, `.text-body-md`)
3. **Check existing styles first** in `src/styles/`
4. **Follow standard patterns** for pages and cards
5. **Use the validation checklist** before completing tasks
6. **Create new classes only when needed**, following proper naming

This Skill ensures visual consistency, maintainability, and follows industry best practices across the entire NIS2 CRM application.
