import React, { createContext, useReducer, useEffect } from 'react';
import Axios from "axios";
import {AppReducer} from './AppReducer';

//initial state;
const initialState = {
    positions: []
}

// create Context
export const GlobalContext = createContext(initialState);

// provider component;
export const GlobalProvider = (({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
        useEffect(() => {
            Axios.get("http://localhost:3004/read").then((response) => {
                dispatch({type: 'INITIAL_DATA', payload: response.data})
            });
        }, []);

    //actions
    const removePosition = (id) => {
        dispatch({
            type: 'REMOVE_POSITION',
            payload: id
        })

    }

    const addPosition = (position) => {
        dispatch({
            type: 'ADD_POSITION',
            payload: position
        })

        setTimeout(() => {
            Axios.get("http://localhost:3004/read").then((response) => {
                dispatch({type: 'INITIAL_DATA', payload: response.data})
            });  
        },500)
    }

    const editPosition = (position) => {
        dispatch({
            type: 'EDIT_POSITION',
            payload: position,
        })
    }
     
    return(
        <GlobalContext.Provider value={{
            positions: state.positions,
            removePosition,
            addPosition,
            editPosition,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}) ;