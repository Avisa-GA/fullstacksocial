
import { createContext, useContext, useReducer, useEffect } from "react";
import { auth } from './firebase';


export const AuthContext = createContext();
AuthContext.displayName = 'Auth';

function authReducer(state, { type, payload }) {
    switch(type) {
        case 'setUser': {
            return {
                ...state,
                user: payload
            };
        }
        case 'unsetUser': {
            return { user: null }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`);
        }
    }
}

export function AuthProvider({ children }) {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: 'setUser', payload: user });
            } else {
                dispatch({ type: 'unsetUser' });
            }
        });
        return unsubscribe
    }, []);

    const value = { state, dispatch };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export function useAuth() {
     const context = useContext(AuthContext);
     if (context === undefined) {
         throw new Error('useAuth must be used within an AuthContext Provider');
     }
     return context;
}