# Vue 3 E-Commerce App (Composition API)

A modern E-Commerce frontend built with Vue 3, Pinia, and Vite, migrated from the legacy Options API to the modern Composition API.

## 🚀 Features

- **Vue 3 Composition API**: Leveraging `<script setup lang="ts">` for better type safety and code organization.
- **Pinia State Management**: Centralized store for cart, products, and home data.
- **Dynamic Routing**: Vue Router 4 with lazy-loaded modules and dynamic title management.
- **Responsive Design**: Mobile-first layout with smooth transitions and animations.
- **Mock Integration**: Fully integrated with DummyJSON API for products, categories, and cart sync.

## 🏗 Architecture Overview

The project follows a modular architecture organized by feature:

```text
src/
├── assets/             # Global styles (SCSS) and image assets
├── modules/            # Feature-based modules
│   ├── about/          # About page components and views
│   ├── cart/           # Shopping cart logic and sliding drawer
│   ├── contact/        # Contact form and location views
│   ├── core/           # Layout-invariant views (NotFound)
│   ├── home/           # Landing page components and home store
│   ├── products/       # Catalog, filtering, and product details
│   └── shared/         # Reusable UI components (ProductCard, Buttons)
├── services/           # Axios-based API services
├── stores/             # Pinia store definitions
├── types/              # Global TypeScript interfaces
├── App.vue             # Root component
└── main.ts             # App entry point
```

## 🛠 Tech Stack

- **Framework**: Vue 3.5+
- **Build Tool**: Vite 6+
- **Language**: TypeScript
- **State Management**: Pinia
- **Styling**: SCSS (SASS)
- **API Client**: Axios

## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file (optional, defaults are in code):
   ```env
   VITE_API_BASE_URL=https://dummyjson.com
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 📝 Technical Documentation

### Component Migration
All components have been migrated to the Composition API. We use:
- `defineProps` for typed props.
- `defineEmits` for typed events.
- `computed` for derived state.
- `ref` for reactive primitives.

### Store Patterns
Stores are implemented using the Pinia Options Store syntax (with state, getters, and actions) for clarity, fully documented with JSDoc to describe data flow and async operations.

---
*Created as part of the Week 4 Migration & Documentation Sprint.*
