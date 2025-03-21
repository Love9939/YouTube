import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router";
import { YOUTUBE_API_KEY } from "../utils/constant";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(closeMenu());
    
    const fetchVideoDetails = async () => {
      try {
        const data = await fetch(YOUTUBE_API_KEY);
        const json = await data.json();
        
        if (json.items && json.items.length > 0) {
          // Find the video with matching ID
          const video = json.items.find(item => item.id === videoId);
          
          if (video) {
            setVideoDetails(video);
          }
          
          // Use the remaining videos as "related" videos
          const related = json.items.filter(item => item.id !== videoId).slice(0, 10);
          setRelatedVideos(related);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setLoading(false);
      }
    };
    
    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId, dispatch]);
  
  if (loading) {
    return <div className="p-4 m-4">Loading...</div>;
  }
  
  if (!videoDetails) {
    return <div className="p-4 m-4">Video not found. ID: {videoId}</div>;
  }
  
  const { snippet, statistics } = videoDetails;
  
  const formatCount = (count) => {
    if (!count) return "0";
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Function to truncate description and add "...more" button
  const renderDescription = () => {
    if (!snippet.description) return <p className="text-sm">No description available</p>;
    
    const shortDescription = snippet.description.slice(0, 100);
    const hasMoreContent = snippet.description.length > 100;
    
    if (!showFullDescription && hasMoreContent) {
      return (
        <>
          <p className="text-sm whitespace-pre-line">{shortDescription}...</p>
          <button 
            className="text-sm text-gray-600 cursor-pointer hover:text-gray-800"
            onClick={() => setShowFullDescription(true)}
          >
            ...more
          </button>
        </>
      );
    } else {
      return (
        <>
          <p className="text-sm whitespace-pre-line">{snippet.description}</p>
          {showFullDescription && hasMoreContent && (
            <button 
              className="text-sm text-gray-600 cursor-pointer hover:text-gray-800 mt-2"
              onClick={() => setShowFullDescription(false)}
            >
              Show less
            </button>
          )}
        </>
      );
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 p-4">
        {/* Video Player */}
        <div className="rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}${"?&autoplay=1"}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Video Title */}
        <h1 className="text-xl font-bold mt-4">{snippet.title}</h1>
        
        {/* Channel and Stats */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
            <div>
              <p className="font-medium">{snippet.channelTitle}</p>
              <p className="text-sm text-gray-600">Subscribers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
              </svg>
              <span>{formatCount(statistics?.likeCount)} likes</span>
            </div>
            <div>
              <span>{formatCount(statistics?.viewCount)} views</span>
            </div>
          </div>
        </div>
        
        {/* Description with expand/collapse */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          {renderDescription()}
        </div>
      </div>
      
      {/* Related Videos */}
      <div className="w-full md:w-1/4 p-4">
        <h2 className="font-bold mb-2">Related Videos</h2>
        <div className="space-y-4">
          {relatedVideos.map((video) => (
            <a 
              href={`/watch?v=${video.id}`} 
              key={video.id} 
              className="flex mb-2 hover:bg-gray-100 p-1 rounded"
            >
              <img 
                src={video.snippet?.thumbnails?.medium?.url} 
                alt={video.snippet?.title} 
                className="w-40 h-24 object-cover rounded"
              />
              <div className="ml-2">
                <p className="text-sm font-medium line-clamp-2">{video.snippet?.title}</p>
                <p className="text-xs text-gray-600 mt-1">{video.snippet?.channelTitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;