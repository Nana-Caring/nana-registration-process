import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Registration async thunk
export const registerUser = createAsyncThunk(
  'authentication/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Format user data with proper ID handling and optional middleName
      const formattedData = {
        firstName: userData.firstName?.trim() || '',
        middleName: userData.middleName?.trim() || '',
        surname: userData.surname?.trim() || '',
        email: userData.email?.trim().toLowerCase() || '',
        phoneNumber: userData.phoneNumber?.trim() || '',
        Idnumber: userData.idNumber?.toString().trim() || '', // Match server field name
        accountType: userData.accountType || '',
        password: userData.password || '',
        role: userData.accountType || 'user' // Set role based on account type
      };

      // Remove any undefined or empty string values
      Object.keys(formattedData).forEach(key => {
        if (formattedData[key] === undefined || formattedData[key] === '') {
          if (key === 'middleName') {
            formattedData[key] = ''; // Keep middleName as empty string if optional
          } else if (key === 'Idnumber') {
            delete formattedData[key]; // Remove Idnumber if empty to avoid database error
          }
        }
      });

      // Debug log
      console.log('Formatted Registration Data:', formattedData);

      const response = await fetch('https://nanacaring-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });

      const data = await response.json();
      
      // Enhanced error handling
      if (!response.ok) {
        console.error('Server Response:', data);
        return rejectWithValue({
          message: data.message || 'Registration failed',
          status: response.status,
          details: data.error || null
        });
      }

      // Update localStorage with registration success
      if (data.user && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('firstName', data.user.firstName);
        localStorage.setItem('middleName', data.user.middleName || '');
        localStorage.setItem('role', data.user.role);
      }

      return data;
    } catch (error) {
      console.error('Registration Error:', error);
      return rejectWithValue({
        message: 'Registration failed - Network or server error',
        details: error.message
      });
    }
  }
);

// Simplified initial state for registration only
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationSuccess: false
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
    resetForm: (state) => {
      state.error = null;
      state.registrationSuccess = false;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Registration cases only
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.error = null;
        
        // Optionally auto-login after successful registration
        if (action.payload.user && action.payload.token) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      });
  }
});

export const { 
  clearError,
  clearRegistrationSuccess,
  resetForm
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
