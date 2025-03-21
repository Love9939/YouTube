import React from "react";
import { useSelector } from "react-redux";

const VideoCard = ({ info }) => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!info) {
    return null;
  }

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  const formatViewCount = (count) => {
    if (!count) return "0 views";
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M views";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K views";
    }
    return num.toString() + " views";
  };

  const cardClassName = isMenuOpen
    ? "px-1 py-2 w-75 mx-2 cursor-pointer"
    : "px-1 py-2 w-68 mx-2 cursor-pointer";

  return (
    <div className={cardClassName}>
      <div className="relative">
        <img
          src={thumbnails.medium.url}
          alt="thumbnail"
          className="w-full rounded-xl"
        />
      </div>

      <div className="flex mt-2">
        <img
          src={thumbnails.default.url}
          alt="icon"
          className="w-9 h-9 rounded-full bg-gray-300 mr-2 flex-shrink-0"
        />

        <div className="flex-1">
          <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-600 text-xs">{channelTitle}</p>

          <p className="text-gray-600 text-xs">
            {formatViewCount(statistics.viewCount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
