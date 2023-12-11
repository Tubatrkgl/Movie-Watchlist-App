import React, { useContext } from 'react'
import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState"
const MovieControls = ({ movie, type }) => {

    const { removeMovieFromWatchlist,
        addMovieToWatched,
        movieToWatchlist,
        removeFromWatched} =
        useContext(GlobalContext);

    return (
        <div>
            <div className="inner-card-controls">
                {
                    type === 'watchlist' && (
                        <>
                            <button
                                className="ctrl-btn"
                                onClick={() => addMovieToWatched(movie)}>
                                <FaEye />
                            </button>

                            <button
                                className="ctrl-btn"
                                onClick={() => removeMovieFromWatchlist(movie.id)}>
                                <RxCross2 />
                            </button>

                        </>

                    )}
                {
                    type === 'watched' && (
                        <>
                            <button
                                className="ctrl-btn"
                                onClick={()=>movieToWatchlist(movie)}>
                                <FaRegEyeSlash />
                            </button>
                            <button
                                className="ctrl-btn"
                                onClick={() => removeFromWatched(movie.id)}>
                                <RxCross2 />
                            </button>

                        </>
                    )
                }
            </div>

        </div>
    )
}

export default MovieControls