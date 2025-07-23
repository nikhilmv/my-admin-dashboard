 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

let storedAdminAuth: any = undefined;

if (typeof window !== 'undefined') {
  const storedAdminAuthString = localStorage.getItem("adminAuth");
  storedAdminAuth = storedAdminAuthString ? JSON.parse(storedAdminAuthString) : undefined;
}

const initialState = {
  isAdminAuthenticated: storedAdminAuth?.isAdminAuthenticated || false,
  accessToken: storedAdminAuth?.accessToken,
  admin: storedAdminAuth?.admin,
};

const adminauthSlice = createSlice({
    name: 'adminauth',
    initialState,
    reducers: { 
        adminLoggedin :(state, action) => {
            state.isAdminAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.admin = action.payload.admin;
            if (typeof window !== 'undefined') { 
                localStorage.setItem("adminAuth", JSON.stringify({
                    accessToken: action.payload.accessToken,
                    admin: action.payload.admin,
                    isAdminAuthenticated: true
                }));
            }
        },
        adminLoggedout: (state) => {
            state.isAdminAuthenticated = false;
            state.accessToken = undefined;
            state.admin = undefined;
            if (typeof window !== 'undefined') {
                localStorage.removeItem("adminAuth");
            }
        },
    }  
});
export const {adminLoggedin, adminLoggedout} = adminauthSlice.actions;
export default adminauthSlice.reducer;