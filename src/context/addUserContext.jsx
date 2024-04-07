import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      // Add logic to handle adding a new user to state
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'GET_ADD_USERS': // Corrected case name
      return { 
        ...state,
        users: [...state.users, action.payload],
      };
      case 'DELETE_WORKOUT':
        return { 
          workouts: state.workouts.filter(w => w._id !== action.payload._id) 
        }
    // Add more cases for other user-related actions if needed

    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: [],
  });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
