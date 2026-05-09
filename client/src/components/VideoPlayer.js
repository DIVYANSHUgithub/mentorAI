import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaExpand, 
  FaCompress,
  FaComments,
  FaRobot,
  FaStickyNote,
  FaHeart,
  FaShare,
  FaPaperPlane,
  FaBookmark,
  FaChevronLeft,
  FaTimes,
  FaUser,
  FaClock,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';

function VideoPlayer() {
  return(
    <div>
      <video src="/presentation-app.mp4" controls />
      
    </div>
  )
}

export default VideoPlayer; 