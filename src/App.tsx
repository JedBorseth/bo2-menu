import { Fragment, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ChevronRight, Volume1 } from "lucide-react";
import Globe from "./components/Globe";
import { Suspense } from "react";
import { cn } from "./lib/utils";
import AudioController from "./components/AudioController";

function App() {
  const [allowAudio, setAllowAudio] = useState<null | boolean>(null);
  const [hoveredItem, setHoveredItem] = useState<string>("");
  const [tranzitAudioPlayed, setTranzitAudioPlayed] = useState<boolean>(false);
  const [route, setRoute] = useState<string>("");
  const hoverTexts: Record<string, string> = {
    SOLO: "Play solo against zombies.",
    "CUSTOM GAMES": "Create your own custom zombie games.",
    THEATRE: "Watch gameplay replays in Theatre mode.",
    LEADERBOARDS: "Check out player rankings and scores.",
    OPTIONS: "Adjust your game settings.",
  };
  const globePosition = useMemo(() => {
    switch (route) {
      case "SOLO":
        return [0, 0, 0] as [number, number, number];
      case "CUSTOM GAMES":
        return [0, 0, 0] as [number, number, number];
      case "THEATRE":
        return [0, 0, 0] as [number, number, number];
      case "LEADERBOARDS":
        return [0, 0, 0] as [number, number, number];
      case "OPTIONS":
        return [0, 5, 5] as [number, number, number];
      default:
        return [-4, -1, 1] as [number, number, number];
    }
  }, [route]);
  const hoverAudio = new Audio("/assets/audio/misc/cac_edit_class.mp3");
  hoverAudio.volume = 0.01;
  hoverAudio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
  // I will change this later as this audio triggers on any rerender
  // // but I probably won't touch this code again

  return allowAudio === null ? (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-wrap items-center text-center justify-center gap-4 p-10 bg-gray-800 text-white rounded-lg">
        <h1 className="text-4xl w-full">Game Audio</h1>
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded"
          onClick={() => setAllowAudio(true)}
        >
          Yes, I want to hear the music!
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded ml-4"
          onClick={() => setAllowAudio(false)}
        >
          No, I prefer silence.
        </button>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        `flex flex-col items-start h-screen ${
          route === "" ? "" : "cursor-grab"
        }`
      )}
    >
      {route === "" ? (
        <div className="flex p-10 w-full">
          <div className="flex flex-col items-start h-screen w-1/2 md:pl-20">
            <h1 className="text-7xl">ZOMBIES</h1>
            <ul className="text-3xl my-10 capitalize">
              {Object.keys(hoverTexts).map((item, i) => (
                <Fragment key={i}>
                  <li
                    className="hover:text-orange-600 cursor-pointer"
                    onMouseEnter={() => setHoveredItem(item)}
                    onClick={() => {
                      setRoute(item);
                    }}
                  >
                    {item}
                  </li>
                  {i === 0 && <br />}
                  {i === 2 && <br />}
                  {i === 3 && <br />}
                </Fragment>
              ))}
            </ul>
            <span className="flex text-gray-300 max-w-56">
              {hoveredItem && <ChevronRight />}
              {hoveredItem ? hoverTexts[hoveredItem] : ""}
            </span>
          </div>

          <div className="w-1/2 max-md:hidden">
            <span className="flex text-gray-300 max-w-56">
              1 Player (8 Max) {route}
            </span>
            <div className="bg-[#00000085] bg-opacity-5 w-2/3 px-1 pt-1 -mb-2 flex border-2 hover:border-orange-600 border-[#00000085] cursor-pointer relative">
              <img
                src="/assets/images/zombierank_5_ded.png"
                alt=""
                width={32}
                height={32}
              />
              <p className="text-yellow-300 ml-2">Jedders</p>
              <Volume1 className="absolute -left-8" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-screen w-screen relative">
          <img
            src="/assets/images/menu_zm_map_signpost_transit.png"
            alt=""
            onClick={() => {
              const tranzitAudio = new Audio(
                "/assets/audio/misc/lovesong_for_the_damned.mp3"
              );
              tranzitAudio.volume = 0.8;
              if (!tranzitAudioPlayed)
                tranzitAudio.play().catch((error) => {
                  console.error("Error playing audio:", error);
                });
              setTranzitAudioPlayed(true);
            }}
          />
          <button
            className="absolute bottom-4 left-[20%] text-2xl flex gap-2"
            onClick={() => {
              setRoute("");
            }}
          >
            <img src="/assets/images/xenonbutton_b.png" alt="" />
            Back
          </button>
        </div>
      )}

      <div className="h-screen w-screen absolute top-0 left-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <fog attach="fog" args={["grey", 5, 20]} />
          <Suspense fallback={null}>
            <Globe targetPosition={globePosition} />
          </Suspense>

          <ambientLight intensity={0.8} />
          <directionalLight color="white" intensity={2} position={[0, 5, 8]} />
        </Canvas>
      </div>

      {/* Background images */}
      <img
        src="/assets/images/lui_bkg_zm.jpg"
        className="absolute top-0 left-0 -z-20 w-screen h-screen object-center md:object-fill object-none"
        alt="Background"
      />
      <img
        src="/assets/images/lui_bkg_zm_flare.png"
        className="absolute top-0 left-0 -z-20 w-screen h-screen object-center md:object-fill object-none"
        alt="Background"
      />
      <img
        src="/assets/images/lui_bkg_zm_flare_left.png"
        className="absolute top-0 left-0 -z-20 w-screen h-screen object-center md:object-fill object-none"
        alt="Background"
      />
      <img
        src="/assets/images/lui_bkg_zm_sun.png"
        className="absolute top-0 left-0 -z-20 w-screen h-screen object-center md:object-fill object-none"
        alt="Background"
      />
      {allowAudio && <AudioController globePos={globePosition} />}
    </div>
  );
}

export default App;
