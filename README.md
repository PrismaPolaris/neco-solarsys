# Cosmic Explorer - Solar System Full-Stack Application

A comprehensive full-stack application for exploring our solar system, featuring interactive content, e-commerce merchandise, community discussions, and user authentication.

## Technology Stack

### Frontend
- **Next.js 16** with App Router
- **React 19** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling with cosmic dark theme
- **shadcn/ui** for component library

### Backend
- **Express.js** for REST API
- **MongoDB** with Mongoose ODM for data persistence
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **Helmet.js** for security headers

## Project Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Homepage with hero carousel
│   ├── login/page.tsx           # Login page
│   ├── register/page.tsx        # Registration page
│   ├── explore/page.tsx         # Explore celestial bodies
│   ├── merchandise/page.tsx     # Shop products
│   ├── company/page.tsx         # Company info & contact
│   ├── layout.tsx               # Root layout with providers
│   └── globals.css              # Cosmic theme design tokens
├── components/
│   └── navigation.tsx           # Main navigation component
├── lib/
│   ├── auth-context.tsx         # Authentication context
│   ├── cart-context.tsx         # Shopping cart context
│   └── utils.ts                 # Utility functions
├── server/                      # Express backend
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── ExploreItem.js      # Celestial body schema
│   │   ├── Comment.js          # Comment schema
│   │   └── Product.js          # Product schema
│   ├── routes/
│   │   ├── auth.js             # Authentication endpoints
│   │   ├── explore.js          # Explore endpoints
│   │   ├── comments.js         # Comments endpoints
│   │   └── products.js         # Products endpoints
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   └── index.js                # Express app setup
└── package.json                # Dependencies
```

## Features

### 1. Homepage
- Beautiful hero carousel with 4 space-themed slides
- Auto-rotating slides with manual controls (dots and arrows)
- Featured destinations preview
- Call-to-action buttons linking to explore and shop

### 2. Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Client-side auth context for state management
- Protected routes with auth checks

### 3. Explore Page
- Sidebar with 5 celestial bodies (Mercury, Venus, Earth, Mars, Jupiter)
- Detail panel showing comprehensive information
- Sub-articles for each celestial body
- Community comment section
- Real-time comments fetching from backend

### 4. Merchandise Store
- Product grid with 8 cosmic-themed products
- Add to cart functionality
- Floating shopping cart sidebar
- Quantity management (add/remove)
- Local cart persistence
- Order total calculation

### 5. Company Page
- About section with company mission
- Three-tab interface (About, Contact, Settings)
- Contact form with validation
- Account settings for logged-in users
- Logout functionality

### 6. Navigation
- Sticky header with logo
- Responsive navigation menu
- Auth state indicators
- Mobile-friendly hamburger menu
- Quick access to main sections

## Getting Started

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies (already done):
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/solar-system
JWT_SECRET=your-secret-key-here
CLIENT_URL=http://localhost:3000
PORT=5000
```

5. Start MongoDB locally or use MongoDB Atlas cloud

6. Start the Express server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Install dependencies (via pnpm in v0 environment):
```bash
pnpm install
```

2. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
pnpm dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Explore Items
- `GET /api/explore` - Get all celestial bodies
- `GET /api/explore/:id` - Get specific body details
- `POST /api/explore` - Create new item (admin only)

### Comments
- `GET /api/comments/:itemId` - Get comments for an item
- `POST /api/comments` - Add comment (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create product (admin only)

## Design System

### Color Palette
- **Background**: Deep space black (oklch 0.08)
- **Primary**: Cosmic purple (oklch 0.6 0.25 290)
- **Accent**: Purple accent (oklch 0.65 0.3 290)
- **Borders**: Deep space borders (oklch 0.2)

### Typography
- **Headings**: Geist font family
- **Body**: Geist Sans
- **Monospace**: Geist Mono

### Components
- Responsive grid layouts
- Glassmorphic cards with purple tints
- Smooth transitions and hover effects
- Mobile-first design approach

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

1. Add email verification for registration
2. Implement OAuth (Google, GitHub)
3. Add admin dashboard for managing content
4. Integrate Stripe for real payments
5. Add image uploads for user profiles
6. Implement real-time notifications
7. Add search and filtering
8. Create API documentation with Swagger
9. Add unit and integration tests
10. Deploy to Vercel and MongoDB Atlas

## Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Heroku/Railway)
```bash
git push heroku main
```

Configure environment variables in hosting platform for:
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`

## Development Tips

1. Use the backend health check: `GET /api/health`
2. Test auth with JWT tokens in Authorization header
3. Enable CORS for local development
4. Use MongoDB Compass for data visualization
5. Check network tab in dev tools for API calls

## License

MIT License - Feel free to use this project as a foundation for your own cosmic explorer!

---

**Happy exploring!** 🚀🌌
