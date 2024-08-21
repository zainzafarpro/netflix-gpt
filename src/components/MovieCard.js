import { useDispatch, useSelector } from "react-redux";
import { MOVIE_POSTER_CDN, MOVIE_API_OPTIONS } from "../utils/constants";
import Popup from "reactjs-popup";
import { addCardTrailers } from "../utils/moviesSlice";
import { useState } from "react";

const MovieCard = ({ id, poster, name, releaseDate, rating, overview }) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies?.cardTrailers?.[id]);

  const ytFilter = trailer?.results?.filter(
    (item) => item.type === "Trailer" && item.key
  );

  const clipId = ytFilter?.length > 0 ? ytFilter[0]?.key : null;

  return (
    <div className="w-1/6 flex-shrink-0 px-2 cursor-pointer">
      <Popup
        trigger={
          <div className="text-white">
            <img src={MOVIE_POSTER_CDN + poster} alt={name} />
            <div className="text-sm">{name}</div>
            <div className="text-xs">{releaseDate}</div>
          </div>
        }
        modal
        lockScroll
        onOpen={() => {
          const fetchTrailers = async () => {
            try {
              const data = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos`,
                MOVIE_API_OPTIONS
              );
              const response = await data.json();
              dispatch(addCardTrailers({ id, cardTrailers: response }));
            } catch (error) {
              console.error("Error fetching trailers:", error);
            }
          };

          if (id && !trailer) {
            fetchTrailers();
          }
        }}
      >
        <div className="text-white">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${clipId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>

          <div className="text-sm p-5">
            <strong className="text-2xl block mb-3">{name}</strong>
            <div>
              <span className="font-semibold">Rating:</span> {rating}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Release date:</span> {releaseDate}
            </div>
            <p>{overview}</p>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default MovieCard;
