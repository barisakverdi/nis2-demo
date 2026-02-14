# NIS2 Demo - Siber Güvenlik Anket Uygulaması

## 🎯 Proje Amacı
Şirketlerin siber güvenlik durumunu analiz etmek için tasarlanmış, görselliği ön planda tutan bir anket uygulaması. Bu proje, ileride geliştirilecek tam kapsamlı projenin demo versiyonudur.

## 🛠 Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **UI Kütüphanesi**: shadcn/ui
- **Styling**: Tailwind CSS
- **Data Yönetimi**: Frontend mock data (DB kullanılmayacak)
- **State Management**: React Context API / Zustand (ihtiyaç durumunda)
- **Form Yönetimi**: React Hook Form + Zod validation
- **İkonlar**: Lucide React

## 📋 Uygulama Akışı

### 1. Login Ekranı
- Kullanıcı kimlik doğrulama ekranı (mock authentication)
- Form validasyonu ile email/password kontrolü
- Modern, güvenli görünümlü UI

### 2. Şirket Profili
- Şirket bilgilerinin toplandığı form
- Alan öncelik seviyeleri:
  - **ESSENTIAL**: Zorunlu alanlar (şirket adı, sektör, çalışan sayısı)
  - **IMPORTANT**: Önemli ama zorunlu olmayan alanlar
- Progressive disclosure ile kullanıcı dostu form yapısı

### 3. Anket Uygulaması
- Multi-step form yapısı
- Kategorize edilmiş sorular (Ağ Güvenliği, Veri Koruma, Erişim Kontrolü, vb.)
- Progress indicator ile ilerleme göstergesi
- Her adımda validation
- Geri dönme imkanı

### 4. Sonuç Ekranı
- Görsel sonuç dashboard'u
- Güvenlik skoru ve grafikler
- Kategori bazlı analizler
- İndirilebilir rapor seçeneği

## 🎨 Design System Prensipleri

### Renk Paleti
```css
/* Siber güvenlik temalı, profesyonel renk şeması */
--primary: Mavi tonları (güvenilirlik, teknoloji)
--secondary: Koyu gri/lacivert (profesyonellik)
--accent: Turkuaz/yeşil (güvenlik, onay)
--warning: Turuncu (uyarılar)
--danger: Kırmızı (risk, tehdit)
--success: Yeşil (başarı, güvenli)
```

### Tipografi
- **Başlıklar**: Modern, okunabilir sans-serif (Inter, Geist)
- **Body**: Rahat okunur font (system-ui fallback)
- **Hierarchical scale**: h1 > h2 > h3 > body > small

### Spacing & Layout
- 8px grid system (8, 16, 24, 32, 48, 64px)
- Consistent padding/margin değerleri
- Max-width constraints (prose, container)
- Responsive breakpoints (sm, md, lg, xl, 2xl)

### Component Patterns
- **Card-based layouts**: Her bölüm card component'i içinde
- **Consistent shadows**: Subtle elevation (shadow-sm, shadow-md)
- **Smooth animations**: Framer Motion veya CSS transitions
- **Loading states**: Skeleton screens
- **Empty states**: Meaningful placeholders

## 📁 Proje Yapısı

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

### TypeScript Kullanımı
- **Strict mode**: Her zaman type-safe kod yazın
- **Interface definitions**: Tüm data structures için interface tanımlayın
- **Avoid `any`**: Mümkün olduğunca generic types kullanın
- **Type exports**: types/ klasöründen merkezi type export

### Component Yazım Kuralları
```typescript
// ✅ İyi
export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  // Component logic
}

// ❌ Kötü
export default function QuestionCard(props: any) {
  // Component logic
}
```

- **Named exports** kullanın (default export yerine)
- **Props interface** her component için tanımlayın
- **Composition over inheritance**: Küçük, reusable component'ler
- **Single responsibility**: Her component tek bir işten sorumlu

### State Management
- **Local state**: useState (component-specific state)
- **Global state**: Context API veya Zustand (user auth, survey progress)
- **Form state**: React Hook Form (tüm formlar için)
- **Derived state**: useMemo ile hesaplanan değerler

### Data Flow - Mock Data
```typescript
// lib/mock-data/questions.ts
export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'network-security',
    text: 'Şirketinizde firewall kullanıyor musunuz?',
    type: 'multiple-choice',
    options: ['Evet', 'Hayır', 'Bilmiyorum'],
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
    .min(2, 'Şirket adı en az 2 karakter olmalıdır')
    .max(100),
  sector: z.enum(['teknoloji', 'finans', 'saglik', 'diger']),
  employeeCount: z.number()
    .int()
    .positive('Çalışan sayısı pozitif olmalıdır'),
  // ... other fields
})

export type CompanyProfile = z.infer<typeof companyProfileSchema>
```

### Styling Conventions
- **Tailwind first**: Öncelikle Tailwind utilities kullanın
- **Component variants**: CVA (class-variance-authority) ile variant'lar
- **Responsive design**: Mobile-first approach
- **Dark mode**: (Opsiyonel) color-scheme support

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

## 📝 Önemli Noktalar

### Authentication Mock

**🔐 Login Bilgileri:**
```
Email    : demo@nis2.com
Password : Demo123!
```

**Uygulama:**
- Login sayfası: `http://localhost:3000/login`
- Başarılı giriş sonrası ana sayfaya yönlendirme
- Hatalı giriş durumunda hata mesajı gösterimi

**Kod Implementasyonu:**
```typescript
// components/login-form.tsx
const MOCK_USER = {
  email: "demo@nis2.com",
  password: "Demo123!"
}

// Mock authentication check
if (email === MOCK_USER.email && password === MOCK_USER.password) {
  router.push("/") // Ana sayfaya yönlendir
} else {
  setError("Invalid email or password")
}
```

```typescript
// lib/mock-data/users.ts (İleride kullanılacak - çoklu kullanıcı için)
export const MOCK_USERS = [
  { email: 'demo@nis2.com', password: 'Demo123!', role: 'admin' },
  { email: 'user@company.com', password: 'User123!', role: 'user' }
]

// Kullanıcı login kontrolü (gerçek auth yok, sadece mock)
export function authenticateUser(email: string, password: string) {
  return MOCK_USERS.find(u => u.email === email && u.password === password)
}
```

### Survey Logic
- **Weighted scoring**: Her sorunun ağırlığı var
- **Category grouping**: Sorular kategorilere ayrılmış
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
1. `npm install` - Dependencies yükle
2. `npm run dev` - Development server başlat
3. `http://localhost:3000` - Browser'da aç

### Adding New Components
1. shadcn/ui component ekle: `npx shadcn@latest add [component]`
2. Custom component oluştur: `src/components/` altında
3. Types tanımla: `src/types/` altında
4. Mock data ekle: `src/lib/mock-data/` altında

### Git Commit Messages
- `feat: Add login form with validation`
- `ui: Design company profile page`
- `fix: Resolve survey progress calculation`
- `refactor: Simplify question card component`

## 🎯 Görev Önceliklendirmesi

### Phase 1: Temel Yapı
- [ ] Next.js projesi kurulumu
- [ ] shadcn/ui entegrasyonu
- [ ] Tailwind config ve design tokens
- [ ] Base layout ve routing

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
- [ ] Animations ve transitions
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
- Client-side validation (yeterli, çünkü backend yok)
- Input sanitization
- XSS prevention (Next.js otomatik escape)
- CSRF tokens gerekli değil (statik demo)

## 📚 Useful Resources
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

## 💡 Development Tips
- shadcn/ui component'lerini customize etmekten çekinmeyin
- Mock data'yı düzenli ve type-safe tutun
- Component'leri küçük ve reusable yapın
- Storybook düşünebilirsiniz (opsiyonel)
- Performance'ı development sırasında test edin

---

**Not**: Bu dokümandaki tüm kurallar ve yapılar, demo projenin tutarlılığını ve kalitesini sağlamak içindir. Geliştirme sırasında bu rehbere sadık kalın.
