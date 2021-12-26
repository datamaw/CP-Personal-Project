import React from "react";
import PropTypes from "prop-types";

// const YoutubeEmbed = ({ embedId }) => (
const YoutubeEmbed = () => (
  <div className="video-responsive">
    <iframe
      width="353"
      height="280"
      src={`https://www.youtube.com/embed/NfurkrZEn3Q`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;