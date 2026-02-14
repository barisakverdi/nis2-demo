# NIS2 Demo - Cybersecurity Survey Application

## 🎯 Project Purpose
A visually-focused survey application designed to analyze companies' cybersecurity status. This project is a demo version of a full-scale application to be developed in the future.

## 🛠 Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Data Management**: Frontend mock data (no database)
- **State Management**: React Context API / Zustand (if needed)
- **Form Management**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📋 Application Flow

### 1. Login Screen
- User authentication screen (mock authentication)
- Email/password validation with form validation
- Modern, secure-looking UI

### 2. Company Profile
- Form for collecting company information
- Field priority levels:
  - **ESSENTIAL**: Required fields (company name, sector, employee count)
  - **IMPORTANT**: Important but not required fields
- User-friendly form structure with progressive disclosure

### 3. Survey Application
- Multi-step form structure
- Categorized questions (Network Security, Data Protection, Access Control, etc.)
- Progress indicator showing advancement
- Validation at each step
- Ability to go back

### 4. Results Screen
- Visual results dashboard
- Security score and charts
- Category-based analysis
- Downloadable report option

## 🎨 Design System Principles

### Color Palette
```css
/* Cybersecurity themed, professional color scheme */
--primary: Blue tones (reliability, technology)
--secondary: Dark gray/navy (professionalism)
--accent: Turquoise/green (security, approval)
--warning: Orange (warnings)
--danger: Red (risk, threat)
--success: Green (success, secure)
```

### Typography
- **Headings**: Modern, readable sans-serif (Inter, Geist)
- **Body**: Comfortable reading font (system-ui fallback)
- **Hierarchical scale**: h1 > h2 > h3 > body > small

### Spacing & Layout
- 8px grid system (8, 16, 24, 32, 48, 64px)
- Consistent padding/margin values
- Max-width constraints (prose, container)
- Responsive breakpoints (sm, md, lg, xl, 2xl)

### Component Patterns
- **Card-based layouts**: Each section within a card component
- **Consistent shadows**: Subtle elevation (shadow-sm, shadow-md)
- **Smooth animations**: Framer Motion or CSS transitions
- **Loading states**: Skeleton screens
- **Empty states**: Meaningful placeholders

## 📁 Project Structure

```
nis2-demo/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── company-profile/
│   │   │   │   └── page.tsx
│   │   │   ├── survey/
│   │   │   │   └── page.tsx
│   │   │   └── results/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── forms/                 # Form components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── CompanyProfileForm.tsx
│   │   │   └── SurveyForm.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── survey/                # Survey-specific components
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── CategorySection.tsx
│   │   └── results/               # Results-specific components
│   │       ├── ScoreCard.tsx
│   │       ├── CategoryChart.tsx
│   │       └── ReportDownload.tsx
│   ├── lib/
│   │   ├── mock-data/             # Mock data files
│   │   │   ├── questions.ts
│   │   │   ├── users.ts
│   │   │   └── companies.ts
│   │   ├── validations/           # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── company.ts
│   │   │   └── survey.ts
│   │   ├── utils.ts               # Utility functions
│   │   └── constants.ts           # App constants
│   ├── types/
│   │   ├── auth.ts
│   │   ├── company.ts
│   │   ├── survey.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useSurvey.ts
│   │   ├── useAuth.ts
│   │   └── useCompanyProfile.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/
│   └── icons/
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔧 Development Best Practices

### TypeScript Usage
- **Strict mode**: Always write type-safe code
- **Interface definitions**: Define interfaces for all data structures
- **Avoid `any`**: Use generic types whenever possible
- **Type exports**: Centralized type export from types/ folder

### Component Writing Rules
```typescript
// ✅ Good
export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  // Component logic
}

// ❌ Bad
export default function QuestionCard(props: any) {
  // Component logic
}
```

- Use **named exports** (instead of default export)
- Define **props interface** for every component
- **Composition over inheritance**: Small, reusable components
- **Single responsibility**: Each component is responsible for one thing

### State Management
- **Local state**: useState (component-specific state)
- **Global state**: Context API or Zustand (user auth, survey progress)
- **Form state**: React Hook Form (for all forms)
- **Derived state**: Calculated values with useMemo

### Data Flow - Mock Data
```typescript
// lib/mock-data/questions.ts
export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'network-security',
    text: 'Does your company use a firewall?',
    type: 'multiple-choice',
    options: ['Yes', 'No', 'Don\'t know'],
    weight: 10,
    priority: 'essential'
  },
  // ... more questions
]

// hooks/useSurvey.ts
export function useSurvey() {
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [currentStep, setCurrentStep] = useState(0)

  const submitAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  return { answers, currentStep, submitAnswer }
}
```

### Form Validation
```typescript
// lib/validations/company.ts
import { z } from 'zod'

export const companyProfileSchema = z.object({
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100),
  sector: z.enum(['technology', 'finance', 'healthcare', 'other']),
  employeeCount: z.number()
    .int()
    .positive('Employee count must be positive'),
  // ... other fields
})

export type CompanyProfile = z.infer<typeof companyProfileSchema>
```

### Styling Conventions
- **Tailwind first**: Use Tailwind utilities first
- **Component variants**: Variants with CVA (class-variance-authority)
- **Responsive design**: Mobile-first approach
- **Dark mode**: (Optional) color-scheme support

```typescript
// Example component with Tailwind
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary/90',
        variant === 'secondary' && 'bg-secondary text-white hover:bg-secondary/90'
      )}
      {...props}
    />
  )
}
```

## 📝 Important Notes

### Authentication Mock

**🔐 Login Credentials:**
```
Email    : demo@nis2.com
Password : Demo123!
```

**Implementation:**
- Login page: `http://localhost:3000/login`
- Redirect to home page after successful login
- Show error message on failed login

**Code Implementation:**
```typescript
// components/login-form.tsx
const MOCK_USER = {
  email: "demo@nis2.com",
  password: "Demo123!"
}

// Mock authentication check
if (email === MOCK_USER.email && password === MOCK_USER.password) {
  router.push("/") // Redirect to home page
} else {
  setError("Invalid email or password")
}
```

```typescript
// lib/mock-data/users.ts (For future use - multiple users)
export const MOCK_USERS = [
  { email: 'demo@nis2.com', password: 'Demo123!', role: 'admin' },
  { email: 'user@company.com', password: 'User123!', role: 'user' }
]

// User login check (no real auth, just mock)
export function authenticateUser(email: string, password: string) {
  return MOCK_USERS.find(u => u.email === email && u.password === password)
}
```

### Survey Logic
- **Weighted scoring**: Each question has a weight
- **Category grouping**: Questions are divided into categories
- **Progress calculation**: (answered / total) * 100
- **Score calculation**: Weighted average of answers

### Responsive Design
- **Mobile**: Single column, stacked layout
- **Tablet**: 2-column grid where appropriate
- **Desktop**: Full layout with sidebar/navigation

### Performance
- **Code splitting**: Dynamic imports for heavy components
- **Image optimization**: Next.js Image component
- **Lazy loading**: React.lazy for non-critical components
- **Memoization**: useMemo, useCallback where needed

## 🚀 Development Workflow

### Starting Development
1. `npm install` - Install dependencies
2. `npm run dev` - Start development server
3. `http://localhost:3000` - Open in browser

### Adding New Components
1. Add shadcn/ui component: `npx shadcn@latest add [component]`
2. Create custom component: in `src/components/`
3. Define types: in `src/types/`
4. Add mock data: in `src/lib/mock-data/`

### Git Commit Messages
- `feat: Add login form with validation`
- `ui: Design company profile page`
- `fix: Resolve survey progress calculation`
- `refactor: Simplify question card component`

## 🎯 Task Prioritization

### Phase 1: Base Structure
- [ ] Next.js project setup
- [ ] shadcn/ui integration
- [ ] Tailwind config and design tokens
- [ ] Base layout and routing

### Phase 2: Authentication
- [ ] Login page UI
- [ ] Mock authentication logic
- [ ] Protected routes
- [ ] User context

### Phase 3: Company Profile
- [ ] Profile form UI
- [ ] Field prioritization (Essential/Important)
- [ ] Form validation
- [ ] Data persistence (localStorage)

### Phase 4: Survey
- [ ] Multi-step form structure
- [ ] Question components
- [ ] Progress tracking
- [ ] Category navigation
- [ ] Answer persistence

### Phase 5: Results
- [ ] Results calculation logic
- [ ] Score visualization
- [ ] Charts and graphs
- [ ] Report download feature

### Phase 6: Polish
- [ ] Animations and transitions
- [ ] Loading states
- [ ] Error handling
- [ ] Accessibility (a11y)
- [ ] Final design review

## 🎨 Visual Guidelines

### Icons Usage
- **Security**: Shield, Lock, Key
- **Network**: Wifi, Server, Cloud
- **Data**: Database, FileText, Archive
- **Actions**: Check, AlertCircle, Info
- **Navigation**: ChevronRight, ArrowLeft, Menu

### Micro-interactions
- **Hover states**: Subtle color/scale changes
- **Click feedback**: Active states
- **Form interactions**: Real-time validation feedback
- **Page transitions**: Smooth fade-in/out

### Empty States
- Meaningful illustrations
- Clear call-to-action
- Helpful messaging

## 🔒 Security Considerations (Mock Context)
- Client-side validation (sufficient, since there's no backend)
- Input sanitization
- XSS prevention (Next.js automatic escape)
- CSRF tokens not required (static demo)

## 📚 Useful Resources
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

## 💡 Development Tips
- Don't hesitate to customize shadcn/ui components
- Keep mock data organized and type-safe
- Make components small and reusable
- Consider Storybook (optional)
- Test performance during development

---

**Note**: All rules and structures in this document are to ensure consistency and quality of the demo project. Stay faithful to this guide during development.
