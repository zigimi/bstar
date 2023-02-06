import React from "react";
// import "./music/004 아이유 - 너의 의미 (Feat. 김창완).mp3";
// import "../ui/music/004 아이유 - 너의 의미 (Feat. 김창완).mp3"
import music1 from "./music/G-Dragon - R.O.D. (feat. Lydia Paek).mp3";
import music2 from "./music/After school - love letter.mp3";
import music3 from "./music/004 아이유 - 너의 의미 (Feat. 김창완).mp3";
import music4 from "./music/MC Mong - 죽을 만큼 아파서 (Feat. 멜로우).mp3";
import ReactAudioPlayer from 'react-audio-player';



function MusicBox(props) {
  return (
    <div>
      <h3>
        The Weeknd - I Feel It Coming ( cover by <b>J.Fla</b> )
      </h3>

 
      <ReactAudioPlayer
        src= {music2}
        type="audio/mp3"
        autoPlay
        controls
        volume = "0.2"
      >오디오 지원 안함 </ReactAudioPlayer>
    </div>
  );
}

export default MusicBox;
