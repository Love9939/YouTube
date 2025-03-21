import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_API_KEY } from "../utils/constant";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    listOfPopularVideos();
  }, []);

  const listOfPopularVideos = async () => {
    const data = await fetch(YOUTUBE_API_KEY);
    const json = await data.json();
    //console.log(json.items);
    setVideos(json.items);
  };

  return (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video}  />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
