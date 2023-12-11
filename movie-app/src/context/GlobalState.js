import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// başlangıç durumu
const initialState = {
  watchlist: localStorage.getItem('watchlist')
    ? JSON.parse(localStorage.getItem('watchlist'))
    : [],
  watched: localStorage.getItem('watched')
    ? JSON.parse(localStorage.getItem('watched'))
    : [],
};

// bağlam oluştur
export const GlobalContext = createContext(initialState);

// sağlayıcı bileşen
const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    localStorage.setItem('watched', JSON.stringify(state.watched));
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    console.log('movie :>> ', movie);
    dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    console.log('id :>> ', id);
    dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: id });
  };

  const addMovieToWatched = (movie) =>{
    dispatch({type:"ADD_MOVIE_TO_WATCHED",payload:movie})
  }

const movieToWatchlist = (movie) =>{
  dispatch({type:"MOVIE_TO_WATCHLIST",payload:movie})
}
const removeFromWatched = (id) =>{
  dispatch({type:"REMOVE_FROM_WATCHED",payload:id})
}
  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        movieToWatchlist,
        removeFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
