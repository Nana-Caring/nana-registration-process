# Redux Store Setup

This application uses Redux Toolkit for state management, specifically for user authentication and registration.

## Store Structure

### Auth Slice (`src/store/authSlice.js`)
Handles user authentication, registration, and session management.

**State:**
- `user`: Current user information
- `token`: Authentication token
- `accounts`: User accounts array
- `isAuthenticated`: Boolean authentication status
- `loading`: Loading state for async operations
- `error`: Error messages
- `registrationSuccess`: Registration success flag

**Actions:**
- `loginUser`: Async thunk for user login
- `registerUser`: Async thunk for user registration
- `logout`: Clear user session
- `clearError`: Clear error messages
- `clearRegistrationSuccess`: Clear registration success flag

## Usage

### In Components

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, loginUser } from '../store/authSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleRegister = (userData) => {
    dispatch(registerUser(userData));
  };

  return (
    // Your component JSX
  );
};
```

### Custom Hook

Use the `useAuth` hook for easier access to auth state and actions:

```jsx
import { useAuth } from '../store/useAuth';

const MyComponent = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  
  return (
    // Your component JSX
  );
};
```

## API Integration

The store integrates with your backend API at:
- Registration: `https://nanacaring-backend.onrender.com/api/auth/register`
- Login: `https://nanacaring-backend.onrender.com/api/auth/login`

## Local Storage

The store automatically manages localStorage for:
- Authentication tokens
- User information
- Account details
- Session persistence

## Error Handling

Errors are captured and stored in the Redux state for display in components. Use the error state to show user-friendly error messages.
