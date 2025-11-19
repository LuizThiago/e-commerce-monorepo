# TrendLama E-Commerce

A modern, full-featured e-commerce application built with Next.js 15, featuring a shopping cart, product filtering, and a complete checkout flow.

![TrendLama](./public/logo.png)

## Features

- **Product Catalog** - Browse through a curated selection of products
- **Search & Filter** - Find products by category, price, and other attributes
- **Shopping Cart** - Add, remove, and manage items with persistent state
- **Checkout Process** - Complete shipping and payment forms with validation
- **Responsive Design** - Seamless experience across all devices
- **Modern UI** - Clean and intuitive interface with Tailwind CSS
- **Performance** - Optimized with Next.js 15 and Turbopack

## Tech Stack

### Core

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management & Forms

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management for cart
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - Schema validation

### UI & Icons

- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development

## Project Structure

```
e-commerce-monorepo/
├── public/
│   ├── products/          # Product images
│   └── logo.png          # Brand logo
├── src/
│   ├── app/
│   │   ├── cart/         # Shopping cart page
│   │   ├── products/     # Product listing & details
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   ├── ShoppingCartIcon.tsx
│   │   ├── Categories.tsx
│   │   ├── Filter.tsx
│   │   ├── Searchbar.tsx
│   │   ├── ShippingForm.tsx
│   │   └── PaymentForm.tsx
│   ├── stores/
│   │   └── cartStore.tsx  # Zustand cart store
│   └── types.ts           # TypeScript types & schemas
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LuizThiago/e-commerce-monorepo.git
cd e-commerce-monorepo
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Key Features Explained

### Shopping Cart

The shopping cart uses Zustand for state management with localStorage persistence. It supports:

- Adding items with specific size and color variations
- Quantity management
- Persistent state across sessions
- Real-time cart updates

### Form Validation

All forms use React Hook Form with Zod schemas for validation:

- Shipping information validation
- Payment card validation
- Real-time error feedback
- Type-safe form data

### Product Management

- Dynamic product pages with color and size selection
- Image optimization with Next.js Image component
- Responsive product grid
- Product filtering and search

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LuizThiago/e-commerce-monorepo)

For other platforms, build the application:

```bash
pnpm build
pnpm start
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Luiz Thiago**

- Email: hello@luizthiago.com
- GitHub: [@LuizThiago](https://github.com/LuizThiago)

---

Made by Luiz Thiago
