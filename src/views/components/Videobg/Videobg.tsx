// src/components/VideoBackground.tsx
import React from 'react';
import './Videobg.css';

interface VideoBackgroundProps {
  videoSrc: string;
  children?: React.ReactNode;
  poster?: string; // Image de chargement optionnelle
}

const Videobg: React.FC<VideoBackgroundProps> = ({ videoSrc, children, poster }) => {
  return (
    <div className="video-background-container">
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
      
      {/* Calque de contenu optionnel pour assombrir ou centrer du texte */}
      <div className="video-overlay">
        {children}
      </div>
    </div>
  );
};

export default Videobg;   