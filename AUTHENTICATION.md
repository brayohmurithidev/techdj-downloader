# Authentication System

This document describes the authentication system implemented in the TechDJ application.

## Overview

The authentication system provides:
- **User Persistence**: Users remain logged in across page refreshes
- **Token Management**: Automatic token refresh and expiration handling
- **Protected Routes**: Routes that require authentication are automatically protected
- **Error Handling**: Graceful handling of authentication errors

## Components

### AuthContext (`src/contexts/AuthContext.tsx`)
The main authentication context that manages user state and provides authentication methods.

**Key Features:**
- Manages user authentication state
- Provides login/logout methods
- Handles user data persistence
- Integrates with axios for token management

**Usage:**
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { user, isAuthenticated, login, logout } = useAuth();
```

### ProtectedRoute (`src/components/auth/ProtectedRoute.tsx`)
A wrapper component that protects routes requiring authentication.

**Features:**
- Automatically redirects unauthenticated users to login
- Shows loading state while checking authentication
- Preserves the intended destination for post-login redirect

### AuthErrorBoundary (`src/components/auth/AuthErrorBoundary.tsx`)
Error boundary specifically for authentication-related errors.

**Features:**
- Catches authentication errors
- Provides retry and logout options
- Graceful error display

## Utilities

### Auth Utils (`src/lib/authUtils.ts`)
Utility functions for token management and authentication checks.

**Key Functions:**
- `isTokenExpired()`: Check if current token is expired
- `setToken()`: Set token with optional expiration
- `refreshToken()`: Attempt to refresh expired token
- `clearAuth()`: Clear all authentication data
- `isAuthenticated()`: Check if user is currently authenticated

### Axios Configuration (`src/lib/axiosConfig.ts`)
HTTP client configuration with authentication interceptors.

**Features:**
- Automatic token injection in requests
- Token refresh on expiration
- Automatic logout on authentication failure
- Request retry after successful token refresh

## Flow

### Login Flow
1. User clicks "Login with Spotify"
2. Redirected to Spotify OAuth
3. Spotify redirects back to `/auth/callback` with token
4. AuthCallback component calls `login()` with token
5. User data is stored and user is redirected to dashboard

### Token Expiration Flow
1. API request fails with 401 "token expired" error
2. Axios interceptor attempts token refresh
3. If refresh succeeds, original request is retried
4. If refresh fails, user is logged out and redirected to login

### Logout Flow
1. User clicks logout or token refresh fails
2. All authentication data is cleared from localStorage
3. User state is reset
4. User is redirected to login page

## User Data

User data is stored in localStorage under the following keys:
- `spotify_token`: The access token
- `refresh_token`: The refresh token (if available)
- `user_data`: Serialized user profile data
- `token_expiry`: Token expiration timestamp (if available)

## Error Handling

The system handles various authentication errors:

1. **Token Expired**: Automatic refresh attempt, logout if refresh fails
2. **Network Errors**: Retry logic with exponential backoff
3. **Invalid Token**: Immediate logout and redirect to login
4. **Server Errors**: Graceful error display with retry options

## Security Considerations

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Token expiration is checked on each request
- Failed authentication immediately clears all data
- Error boundaries prevent authentication errors from crashing the app

## Backend Integration

The system expects the backend to:
- Provide tokens via OAuth flow
- Return 401 with specific error format for expired tokens
- Support token refresh endpoint (optional)
- Return user profile data

## Customization

To customize the authentication system:

1. **Token Storage**: Modify `authUtils.ts` to use different storage methods
2. **Error Handling**: Update axios interceptors in `axiosConfig.ts`
3. **UI Components**: Customize loading spinners and error displays
4. **User Data**: Extend the User interface in `AuthContext.tsx` 