# Cosmic Explorer • Solar System e-Shop

A full-stack React app (made for a uni project) exploring our solar system, featuring interactive content, some inspired merchandise, and open community discussions.

## Technology Stack

### Frontend
- **Next.js 16** for App Router
- **React 19** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling with a cosmic ✨ dark theme
- **shadcn/ui** for some component libraries

### Backend
- **Express.js** for REST API
- **MongoDB** with Mongoose ODM for data persistence
- **JWT** for authentication
- **bcryptjs** for user accounts password hashing
- **Express-validator** for input validation
- **Helmet.js** for security headers

## Project Structure

```
./
├── app/                         # Next.js main app
│   ├── page.tsx                    # Homepage
│   ├── login/page.tsx              # Login
│   ├── register/page.tsx           # Registration
│   ├── explore/page.tsx            # Solar System explorer
│   ├── merchandise/page.tsx        # Shop
│   ├── company/page.tsx            # Info on Cosmic inc.
│   ├── layout.tsx                  # Root
│   └── globals.css                 # Root tailwind
├── components/
│   └── navigation.tsx           # Main navigation comp.
├── lib/
│   ├── auth-context.tsx            # Authentication context (sub-page)
│   ├── cart-context.tsx            # Shopping cart context
│   └── utils.ts                    # Utility functions
├── server/                      # Express
│   ├── models/
│   │   ├── User.js                # For new/existing users
│   │   ├── ExploreItem.js         # For all exploration objects
│   │   ├── Comment.js             # For user comments
│   │   └── Product.js             # For merch objects
│   ├── routes/
│   │   ├── auth.js                # Authentication endpoints
│   │   ├── explore.js             # Explore endpoints
│   │   ├── comments.js            # Comments endpoints
│   │   └── products.js            # Products endpoints
│   ├── middleware/
│   │   └── auth.js                # JWT
│   └── index.js                   # Express app setup
└── package.json                # Dependencies
```

## Features

### 1. Homepage
- Hero carousel with 4 space-themed slides
- Auto-rotating slides with manual controls
- Action buttons for quick navigation

### 2. Explore Page
- Sidebar with different celestial classes
- Detail panel showing comprehensive information
- Sub-articles for each celestial body
- Community comment section, linked w/ MongoDB

### 3. Merchandise Store
- Purchaseable cosmic-themed products
- Floating shopping cart sidebar
- Quantity & Price logic (add/remove/total calc.)
- **Local** cart persistence (for now)

### 4. Company Page
- About section with company mission
- Three-tab interface: About, Contact (form), Settings (for users)
- Logout functionality

### 5. Navigation
- Sticky header with logo
- Responsive navigation menu
- Auth state indicators
- Mobile-friendly display
- Quick access to main sections

### 6. Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Client-side auth context for state management
- Protected routes with auth checks

## Performance Optimizations

1. **Frontend**
   - Next.js App Router for optimized routing
   - Client-side caching with Context API
   - Lazy loading with React.lazy
   - CSS-in-JS with Tailwind for smaller bundle

2. **Backend**
   - Mongoose schema indexing for faster queries
   - JWT for stateless authentication
   - Input validation with express-validator
   - Security headers with Helmet.js

3. **Data**
   - Cart persistence in localStorage
   - Auth token caching
   - Comment pagination ready

## Security Features

1. **Authentication**
   - JWT tokens with expiration
   - Password hashing with bcrypt
   - Protected API routes with middleware
   - Secure session management

2. **Input Validation**
   - Server-side validation with express-validator
   - Email format validation
   - Password strength requirements
   - Sanitized text inputs

3. **Headers**
   - CORS configuration
   - Helmet.js security headers
   - XSS protection
   - CSRF token support ready

## Future Enhancements

1. Add email verification for **registration**
2. Deploy to Vercel and MongoDB Atlas
3. Add admin dashboard for managing content
4. Add unit and integration tests (Jasmin maybe)
5. Add image uploads for user profiles
6. Add search and filtering


**_Happy exploring!_** 🚀🌌
