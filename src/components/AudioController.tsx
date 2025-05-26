import { useMemo } from "react";

const AudioController = ({
  globePos,
}: {
  globePos: [number, number, number];
}) => {
  useMemo(() => {
    if (globePos[0] === 0 && globePos[1] === 0 && globePos[2] === 0) {
      const globeStop = new Audio("/assets/audio/globe/globe_spin_stop.mp3");
      const globeIn1 = new Audio("/assets/audio/globe/globe_in_short_1.mp3");
      const globeIn2 = new Audio("/assets/audio/globe/globe_in_short_2.mp3");
      const globeIn3 = new Audio("/assets/audio/globe/globe_move_in.mp3");
      const globeInArr = [globeIn1, globeIn2, globeIn3];
      const randomIndex = Math.floor(Math.random() * globeInArr.length);
      globeInArr[randomIndex].volume = 0.3;
      globeInArr[randomIndex].play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setTimeout(() => {
        globeStop.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }, 1000);
    }
    if (globePos[0] === -4 && globePos[1] === -1 && globePos[2] === 1) {
      const globeStop = new Audio("/assets/audio/globe/globe_spin_stop.mp3");
      const globeIn1 = new Audio("/assets/audio/globe/town_zoom_out.mp3");
      globeIn1.volume = 0.3;
      globeStop.volume = 0.3;
      globeIn1.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setTimeout(() => {
        globeStop.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }, 1000);
    }
  }, [globePos]);
  useMemo(() => {
    const audio = new Audio("/assets/audio/main-theme.mp3");
    audio.pause();
    audio.loop = true;
    audio.volume = 0.1;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  return "";
};

export default AudioController;
