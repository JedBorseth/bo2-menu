import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ChevronRight, Volume1 } from "lucide-react";
import Globe from "./components/Globe";
import { Suspense } from "react";

function App() {
  const [hoveredItem, setHoveredItem] = useState<string>("");
  const hoverTexts: Record<string, string> = {
    SOLO: "Play solo against zombies.",
    "CUSTOM GAMES": "Create your own custom zombie games.",
    THEATRE: "Watch gameplay replays in Theatre mode.",
    LEADERBOARDS: "Check out player rankings and scores.",
    OPTIONS: "Adjust your game settings.",
  };

  return (
    <div className="flex flex-col items-start h-screen">
      <div className="flex p-10 w-full">
        <div className="flex flex-col items-start h-screen w-1/2 pl-20">
          <h1 className="text-7xl" onClick={() => {}}>
            ZOMBIES
          </h1>
          <ul className="text-3xl my-10 capitalize">
            {Object.keys(hoverTexts).map((item, i) => (
              <>
                <li
                  key={item}
                  className="hover:text-orange-600 cursor-pointer"
                  onMouseEnter={() => setHoveredItem(item)}
                >
                  {item}
                </li>
                {i === 0 && <br />}
                {i === 2 && <br />}
                {i === 3 && <br />}
              </>
            ))}
          </ul>
          <span className="flex text-gray-300 max-w-56">
            {hoveredItem && <ChevronRight />}
            {hoveredItem ? hoverTexts[hoveredItem] : ""}
          </span>
        </div>

        <div className="w-1/2">
          <span className="flex text-gray-300 max-w-56">1 Player (8 Max)</span>
          <div className="bg-[#00000085] bg-opacity-5 w-2/3 px-1 pt-1 -mb-2 flex border-2 hover:border-orange-600 border-[#00000085] cursor-pointer relative">
            <img
              src="/images/zombierank_5_ded.png"
              alt=""
              width={32}
              height={32}
            />
            <p className="text-yellow-300 ml-2">Jedders</p>
            <Volume1 className="absolute -left-8" />
          </div>
        </div>
      </div>

      <div className="h-screen w-screen absolute top-0 left-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <fog attach="fog" args={["grey", 5, 20]} />
          <Suspense fallback={null}>
            <Globe />
          </Suspense>
          <ambientLight intensity={0.8} />
          <directionalLight
            color="white"
            intensity={2}
            position={[0, 10, 10]}
          />
        </Canvas>
      </div>

      {/* Background images */}
      <img
        src="/images/lui_bkg_zm.jpg"
        className="absolute top-0 left-0 -z-20 w-screen h-screen"
        alt="Background"
      />
      <img
        src="/images/lui_bkg_zm_flare.png"
        className="absolute top-0 left-0 -z-20 w-screen h-screen"
        alt="Background"
      />
      <img
        src="/images/lui_bkg_zm_flare_left.png"
        className="absolute top-0 left-0 -z-20 w-screen h-screen"
        alt="Background"
      />
      <img
        src="/images/lui_bkg_zm_sun.png"
        className="absolute top-0 left-0 -z-20 w-screen h-screen"
        alt="Background"
      />
    </div>
  );
}

export default App;
