import { useEffect, useState } from "react";

const drumPads = [
  {
    id: "Heater 1",
    key: "Q",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
  },
  {
    id: "Heater 2",
    key: "W",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
  },
  {
    id: "Heater 3",
    key: "E",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
  },
  {
    id: "Heater 4",
    key: "A",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
  },
  {
    id: "Clap",
    key: "S",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
  },
  {
    id: "Open-HH",
    key: "D",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
  },
  {
    id: "Kick-n'-Hat",
    key: "Z",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
  },
  {
    id: "Kick",
    key: "X",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
  },
  {
    id: "Closed-HH",
    key: "C",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
  },
];

function DrumPad({ pad, setDisplay, volume, isOn }) {
  const [isActive, setIsActive] = useState(false);
  const playSound = () => {
    const audio = document.getElementById(pad.key);
    if (isOn) {
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
      setDisplay(pad.id);
      setIsActive(true);
      setTimeout(() => setIsActive(false), 200);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toUpperCase() === pad.key) {
        playSound();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [volume, isOn]);

  return (
    <div
      className={`drum-pad ${isActive ? "active" : ""}`}
      id={pad.id}
      onClick={playSound}
    >
      {pad.key}
      <audio className="clip" id={pad.key} src={pad.src}></audio>
    </div>
  );
}

export default function App() {
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [isOn, setIsOn] = useState(true);

  const toggleOn = () => {
    setIsOn((prevState) => !prevState);
    if (isOn) {
      setDisplay("Power OFF");
      setTimeout(() => setDisplay(""), 2000);
    } else {
      setDisplay("Power ON");
      setTimeout(() => setDisplay(""), 2000);
    }
  };

  const handleVolumeChange = (e) => {
    const Volume = Math.round(e.target.value * 100);
    setVolume(e.target.value);
    setDisplay(`Volume ${Volume}`);
    setTimeout(() => setDisplay(""), 2000);
  };

  return (
    <div className="App">
      <div id="drum-machine">
        <div className="drum-pads">
          {drumPads.map((pad) => (
            <DrumPad
              key={pad.id}
              pad={pad}
              setDisplay={setDisplay}
              isOn={isOn}
              volume={volume}
            />
          ))}
        </div>
        <div className="control">
          <div className="power">
            <h3>Power</h3>
            <div className={`button ${isOn ? "on" : ""}`} onClick={toggleOn}>
              <div className="button-slider"></div>
            </div>
          </div>
          <div id="display">{display}</div>
          <div className="volume">
            <h3>Volume</h3>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
