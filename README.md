# 🎟️ Event Management System

A modern, full-stack event management platform built with **Next.js**, **Strapi CMS**, **TypeScript** and **tRPC**. This system provides a comprehensive solution for managing events, venues, organizers, tickets, and accessibility features.

## 🚀 Quick Setup Guide

### Prerequisites

- **Node.js** 18+ and npm
- **Git**

### 📋 Step-by-Step Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Artzkaizen/event-cms.git
   cd event-cms
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment files**

   ```bash
   npm run setup:env
   ```

   This automatically copies `.env.sample` to `.env` in both apps:

   - `apps/admin/.env.sample` → `apps/admin/.env`
   - `apps/strapi/.env.sample` → `apps/strapi/.env`

4. **Configure environment variables**

   **Edit `apps/strapi/.env`:**

   ```env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your-app-keys-here
   API_TOKEN_SALT=your-api-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   ENCRYPTION_KEY=your-encryption-key

   # Database (SQLite for development)
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   ```

5. **Start development servers**

   ```bash
   npm run dev
   ```

   This starts both applications:

   - 🔧 **Strapi CMS**: http://localhost:1337
   - 🎨 **Admin (Frontend) Dashboard**: http://localhost:3000

6. **Complete initial setup**

   **Create Strapi Admin User:**

   - Visit http://localhost:1337/admin
   - Create your first admin account
   - Complete the setup wizard

   **Access Admin Dashboard:**

   - Visit http://localhost:3000
   - Register a new account or login
   - Start managing your events!

### 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start all apps in development mode
npm run setup:env        # Copy environment sample files


# Individual app commands
cd apps/admin && npm run dev      # Start only admin dashboard
cd apps/strapi && npm run dev     # Start only Strapi CMS
```

### 🏗️ Project Structure

```
├── apps/
│   ├── admin/          # Next.js Admin Dashboard (Port 3000)
│   │   ├── .env        # Admin environment variables
│   │   └── src/        # Source code
│   └── strapi/         # Strapi CMS Backend (Port 1337)
│       ├── .env        # Strapi environment variables
│       └── src/        # API & content types
└── package.json        # Root scripts and dependencies
```

---

**🎉 You're all set! Happy event managing!**
