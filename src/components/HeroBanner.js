import { useSelector } from "react-redux";
import { useTrailers } from "../hooks/useTrailers";
import { YOUTUBE_CLIP_CDN } from "../utils/constants";
import Popup from "reactjs-popup";

const HeroBanner = ({ trailerId, title, description, votes, releaseDate }) => {
  useTrailers(trailerId);

  const trailers = useSelector((store) => store.movies?.trailers?.[trailerId]);

  if (!trailers || !trailers.results) return null;

  const ytFilter = trailers.results.filter(
    (item) => item.type === "Trailer" && item.key
  );

  const clipId = ytFilter.length > 0 ? ytFilter[0].key : null;

  if (!clipId) return null;

  return (
    <div className="relative min-h-dvh">
      <iframe
        className="w-screen aspect-video"
        src={`${YOUTUBE_CLIP_CDN}${clipId}?autoplay=1&&mute=1&&controls=0&&showinfo=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="md:absolute text-white w-screen aspect-video top-0 left-0 bg-gradient-to-t from-black flex items-center">
        <div className="w-full mt-[10%] md:w-[40%] md:pl-10 md:pr-0 md:mt-[20%] px-10">
          <h1 className="text-5xl font-bold mb-8">{title}</h1>
          <p className="font-thin text-lg mb-4">{description}</p>
          <div className="flex">
            <Popup
              trigger={
                <button className="bg-white text-black px-5 rounded py-2 mr-5">
                  ▶️ Play
                </button>
              }
              modal
              lockScroll
            >
              <iframe
                className="w-full aspect-video"
                src={`${YOUTUBE_CLIP_CDN}${clipId}?autoplay=1&&mute=1&&controls=0&&showinfo=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </Popup>

            <Popup
              trigger={
                <button className="bg-black/50 text-white px-5 rounded py-2">
                  ℹ More info
                </button>
              }
              modal
              lockScroll
            >
              <div className="text-white py-5 px-6">
                <h2 className="text-5xl font-bold mb-8">{title}</h2>
                <div>Rating: {votes}</div>
                <div className="mb-6">Release Date: {releaseDate}</div>
                <p className="font-thin text-lg mb-4">{description}</p>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
