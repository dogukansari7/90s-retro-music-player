"use client";

import { useRef, useState, useEffect } from "react";

// Import all theme styles
import winampStyles from "./themes/WinampTheme.module.css";
import bmwStyles from "./themes/BMWTheme.module.css";
import cdjStyles from "./themes/CDJTheme.module.css";
import walkmanStyles from "./themes/WalkmanTheme.module.css";
import boomboxStyles from "./themes/BoomboxTheme.module.css";
import technicsStyles from "./themes/TechnicsTheme.module.css";
import atariStyles from "./themes/AtariTheme.module.css";

const themeMap = {
  winamp: winampStyles,
  bmw: bmwStyles,
  cdj: cdjStyles,
  walkman: walkmanStyles,
  boombox: boomboxStyles,
  technics: technicsStyles,
  atari: atariStyles,
};

export default function Player({ songs = [], theme = "winamp" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [jogRotation, setJogRotation] = useState(0);
  const [visualizerBars, setVisualizerBars] = useState(Array(16).fill(10));
  const [waveformBars, setWaveformBars] = useState(Array(50).fill(20));

  const styles = themeMap[theme] || winampStyles;
  const currentSong = songs[currentSongIndex] || { name: "No Track", file: "" };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setJogRotation((prev) => prev + 3);
        // Update visualizer bars for animation
        setVisualizerBars(Array(16).fill(0).map(() => Math.random() * 100));
        setWaveformBars(Array(50).fill(0).map(() => 20 + Math.random() * 60));
      }, 50);
    } else {
      setVisualizerBars(Array(16).fill(10));
      setWaveformBars(Array(50).fill(20));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    if (audioRef.current && currentSong.file) {
      audioRef.current.play().catch((error) => {
        // Handle missing audio file gracefully
        console.warn("Audio playback failed:", error.message);
        // Still show visual animation even without audio
        setIsPlaying(true);
      });
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handlePrevious = () => {
    const newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    setCurrentSongIndex(newIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleNext = () => {
    const newIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    setCurrentSongIndex(newIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleEnded = () => {
    handleNext();
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Common audio element
  const audioElement = (
    <audio
      ref={audioRef}
      src={currentSong.file}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
    />
  );

  // ==================== WINAMP LAYOUT ====================
  const renderWinamp = () => (
    <div className={styles.player}>
      {audioElement}
      <div className={styles.titleBar}>
        <span className={styles.titleText}>RETRO PLAYER</span>
        <div className={styles.titleButtons}>
          <button className={styles.titleBtn}>_</button>
          <button className={styles.titleBtn}>□</button>
          <button className={styles.titleBtn}>×</button>
        </div>
      </div>
      <div className={styles.display}>
        <div className={styles.visualizer}>
          {visualizerBars.map((height, i) => (
            <div key={i} className={styles.bar} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className={styles.songInfo}>
          <div className={styles.songName}><span className={styles.marquee}>{currentSong.name}</span></div>
          <div className={styles.timeDisplay}>{formatTime(currentTime)} / {formatTime(duration)}</div>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={handlePrevious}>⏮</button>
        <button className={styles.controlBtn} onClick={handlePlay}>▶</button>
        <button className={styles.controlBtn} onClick={handlePause}>⏸</button>
        <button className={styles.controlBtn} onClick={handleStop}>⏹</button>
        <button className={styles.controlBtn} onClick={handleNext}>⏭</button>
      </div>
      <div className={styles.volumeContainer}>
        <span className={styles.volumeIcon}>🔊</span>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className={styles.volumeSlider} />
        <span className={styles.volumeValue}>{Math.round(volume * 100)}%</span>
      </div>
      <div className={styles.playlist}>
        <div className={styles.playlistTitle}>♪ PLAYLIST ♪</div>
        {songs.map((song, i) => (
          <div key={i} className={`${styles.playlistItem} ${i === currentSongIndex ? styles.active : ""}`} onClick={() => handleSongSelect(i)}>
            <span className={styles.trackNumber}>{i + 1}.</span>
            <span className={styles.trackName}>{song.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ==================== BMW E30 CAR STEREO LAYOUT ====================
  const renderBMW = () => (
    <div className={styles.player}>
      {audioElement}
      {/* Top LCD Display */}
      <div className={styles.lcdDisplay}>
        <div className={styles.lcdTop}>
          <span className={styles.radioFreq}>FM1</span>
          <span className={styles.lcdTime}>{formatTime(currentTime)}</span>
        </div>
        <div className={styles.lcdSong}>{currentSong.name}</div>
        <div className={styles.lcdProgress}>
          <div className={styles.lcdProgressBar} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Cassette Slot */}
      <div className={styles.cassetteSlot}>
        <div className={styles.cassetteInner}>
          <div className={styles.cassetteLabel}>DIGITAL AUDIO</div>
          <div className={styles.cassetteReels}>
            <div className={`${styles.reel} ${isPlaying ? styles.spinning : ""}`} />
            <div className={`${styles.reel} ${isPlaying ? styles.spinning : ""}`} />
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className={styles.presetRow}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            className={`${styles.presetBtn} ${currentSongIndex === num - 1 ? styles.active : ""}`}
            onClick={() => songs[num - 1] && handleSongSelect(num - 1)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Control Row */}
      <div className={styles.controlRow}>
        <button className={styles.seekBtn} onClick={handlePrevious}>◀ SEEK</button>
        <div className={styles.playControls}>
          <button className={styles.playBtn} onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className={styles.stopBtn} onClick={handleStop}>⏹</button>
        </div>
        <button className={styles.seekBtn} onClick={handleNext}>SEEK ▶</button>
      </div>

      {/* Volume Knob */}
      <div className={styles.volumeSection}>
        <div className={styles.volumeKnob}>
          <div className={styles.knobInner} style={{ transform: `rotate(${volume * 270 - 135}deg)` }}>
            <div className={styles.knobMarker} />
          </div>
        </div>
        <span className={styles.volumeLabel}>VOLUME</span>
      </div>
    </div>
  );

  // ==================== CDJ-2000 NEXUS LAYOUT ====================
  const renderCDJ = () => (
    <div className={styles.player}>
      {audioElement}
      {/* Top Display */}
      <div className={styles.display}>
        <div className={styles.waveform}>
          {waveformBars.map((height, i) => (
            <div key={i} className={styles.waveBar} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className={styles.displayInfo}>
          <div className={styles.trackInfo}>
            <span className={styles.trackName}>{currentSong.name}</span>
            <span className={styles.bpm}>128.00 BPM</span>
          </div>
          <div className={styles.timeInfo}>
            <span className={styles.timePlayed}>{formatTime(currentTime)}</span>
            <span className={styles.timeRemaining}>-{formatTime(duration - currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Jog Wheel */}
      <div className={styles.jogSection}>
        <div className={styles.jogWheel} style={{ transform: `rotate(${jogRotation}deg)` }}>
          <div className={styles.jogInner}>
            <div className={styles.jogDot} />
            <div className={styles.jogRing} />
            <div className={styles.jogCenter}>
              <span>CDJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transport Controls */}
      <div className={styles.transport}>
        <button className={`${styles.cueBtn} ${!isPlaying ? styles.active : ""}`} onClick={handleStop}>CUE</button>
        <button className={`${styles.playPauseBtn} ${isPlaying ? styles.active : ""}`} onClick={isPlaying ? handlePause : handlePlay}>
          {isPlaying ? "▶ PAUSE" : "▶ PLAY"}
        </button>
      </div>

      {/* Hot Cues */}
      <div className={styles.hotCues}>
        {songs.slice(0, 4).map((song, i) => (
          <button key={i} className={`${styles.hotCueBtn} ${i === currentSongIndex ? styles.active : ""}`} onClick={() => handleSongSelect(i)}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* Tempo Slider */}
      <div className={styles.tempoSection}>
        <span className={styles.tempoLabel}>TEMPO</span>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className={styles.tempoSlider} />
        <span className={styles.tempoValue}>{((volume - 0.5) * 16).toFixed(1)}%</span>
      </div>

      {/* Track Skip */}
      <div className={styles.trackSkip}>
        <button className={styles.skipBtn} onClick={handlePrevious}>◀◀</button>
        <button className={styles.skipBtn} onClick={handleNext}>▶▶</button>
      </div>
    </div>
  );

  // ==================== SONY WALKMAN CD LAYOUT ====================
  const renderWalkman = () => (
    <div className={styles.player}>
      {audioElement}
      {/* CD Lid */}
      <div className={styles.cdLid}>
        <div className={`${styles.cdDisc} ${isPlaying ? styles.spinning : ""}`}>
          <div className={styles.cdLabel}>
            <span>COMPACT</span>
            <span>DISC</span>
          </div>
          <div className={styles.cdHole} />
          <div className={styles.cdRing} />
        </div>
      </div>

      {/* Small LCD */}
      <div className={styles.lcdScreen}>
        <div className={styles.lcdRow}>
          <span className={styles.trackNum}>TR {currentSongIndex + 1}</span>
          <span className={styles.lcdTime}>{formatTime(currentTime)}</span>
        </div>
        <div className={styles.lcdSongName}>{currentSong.name.substring(0, 12)}</div>
        <div className={styles.batteryIndicator}>
          <span>🔋</span>
          <div className={styles.batteryLevel}>
            <div className={styles.batteryFill} style={{ width: "80%" }} />
          </div>
        </div>
      </div>

      {/* Horizontal Controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={handlePrevious}>⏮</button>
        <button className={styles.controlBtn} onClick={handlePlay}>▶</button>
        <button className={styles.controlBtn} onClick={handlePause}>⏸</button>
        <button className={styles.controlBtn} onClick={handleStop}>⏹</button>
        <button className={styles.controlBtn} onClick={handleNext}>⏭</button>
      </div>

      {/* Volume */}
      <div className={styles.volumeRow}>
        <span className={styles.volLabel}>VOL</span>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className={styles.volumeSlider} />
      </div>

      {/* Hold Switch & Extras */}
      <div className={styles.bottomRow}>
        <div className={styles.holdSwitch}>
          <span>HOLD</span>
          <div className={styles.switchTrack}><div className={styles.switchThumb} /></div>
        </div>
        <div className={styles.bassBoost}>
          <span>MEGA BASS</span>
        </div>
      </div>
    </div>
  );

  // ==================== 80s BOOMBOX LAYOUT ====================
  const renderBoombox = () => (
    <div className={styles.player}>
      {audioElement}
      {/* Handle */}
      <div className={styles.handle} />

      {/* Main Body */}
      <div className={styles.body}>
        {/* Left Speaker */}
        <div className={styles.speaker}>
          <div className={styles.speakerCone}>
            <div className={styles.speakerInner} />
          </div>
          <div className={styles.speakerGrill}>
            {[...Array(8)].map((_, i) => <div key={i} className={styles.grillLine} />)}
          </div>
        </div>

        {/* Center Section */}
        <div className={styles.center}>
          {/* VU Meters */}
          <div className={styles.vuMeters}>
            <div className={styles.vuMeter}>
              <div className={styles.vuNeedle} style={{ transform: `rotate(${isPlaying ? -45 + volume * 90 : -45}deg)` }} />
              <div className={styles.vuScale} />
            </div>
            <div className={styles.vuMeter}>
              <div className={styles.vuNeedle} style={{ transform: `rotate(${isPlaying ? -45 + volume * 90 : -45}deg)` }} />
              <div className={styles.vuScale} />
            </div>
          </div>

          {/* Display */}
          <div className={styles.display}>
            <div className={styles.freqDisplay}>FM 98.5</div>
            <div className={styles.songDisplay}>{currentSong.name}</div>
            <div className={styles.timeDisplay}>{formatTime(currentTime)}</div>
          </div>

          {/* Cassette Deck */}
          <div className={styles.cassetteDeck}>
            <div className={styles.cassetteWindow}>
              <div className={`${styles.cassetteReel} ${isPlaying ? styles.spinning : ""}`} />
              <div className={`${styles.cassetteReel} ${isPlaying ? styles.spinning : ""}`} />
            </div>
            <div className={styles.deckButtons}>
              <button onClick={handlePrevious}>◀◀</button>
              <button onClick={handlePlay}>▶</button>
              <button onClick={handlePause}>⏸</button>
              <button onClick={handleStop}>⏹</button>
              <button onClick={handleNext}>▶▶</button>
            </div>
          </div>

          {/* EQ Sliders */}
          <div className={styles.eqSection}>
            <input type="range" className={styles.eqSlider} min="0" max="1" defaultValue="0.5" />
            <input type="range" className={styles.eqSlider} min="0" max="1" defaultValue="0.6" />
            <input type="range" className={styles.eqSlider} min="0" max="1" defaultValue="0.7" />
            <input type="range" className={styles.eqSlider} min="0" max="1" value={volume} onChange={handleVolumeChange} />
          </div>
        </div>

        {/* Right Speaker */}
        <div className={styles.speaker}>
          <div className={styles.speakerCone}>
            <div className={styles.speakerInner} />
          </div>
          <div className={styles.speakerGrill}>
            {[...Array(8)].map((_, i) => <div key={i} className={styles.grillLine} />)}
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className={styles.trackList}>
        {songs.map((song, i) => (
          <button key={i} className={`${styles.trackBtn} ${i === currentSongIndex ? styles.active : ""}`} onClick={() => handleSongSelect(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );

  // ==================== TECHNICS SL-1200 LAYOUT ====================
  const renderTechnics = () => (
    <div className={styles.player}>
      {audioElement}
      <div className={styles.turntable}>
        {/* Platter */}
        <div className={styles.platter}>
          <div className={`${styles.record} ${isPlaying ? styles.spinning : ""}`} style={{ transform: `rotate(${jogRotation}deg)` }}>
            <div className={styles.recordLabel}>
              <span>{currentSong.name.substring(0, 10)}</span>
            </div>
            <div className={styles.recordGrooves} />
          </div>
          <div className={styles.slipmat} />
        </div>

        {/* Tonearm */}
        <div className={styles.tonearm} style={{ transform: `rotate(${isPlaying ? 15 + progressPercent * 0.2 : 0}deg)` }}>
          <div className={styles.armBase} />
          <div className={styles.arm} />
          <div className={styles.headshell} />
        </div>

        {/* Controls Panel */}
        <div className={styles.controlPanel}>
          {/* Start/Stop */}
          <button className={`${styles.startStop} ${isPlaying ? styles.active : ""}`} onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? "STOP" : "START"}
          </button>

          {/* Pitch Slider */}
          <div className={styles.pitchSection}>
            <span className={styles.pitchLabel}>PITCH</span>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className={styles.pitchSlider} />
            <span className={styles.pitchValue}>{((volume - 0.5) * 16).toFixed(1)}%</span>
          </div>

          {/* RPM Selector */}
          <div className={styles.rpmSelector}>
            <button className={styles.rpmBtn}>33</button>
            <button className={styles.rpmBtn}>45</button>
          </div>

          {/* Track Skip */}
          <div className={styles.skipButtons}>
            <button onClick={handlePrevious}>◀</button>
            <button onClick={handleNext}>▶</button>
          </div>
        </div>

        {/* Info Display */}
        <div className={styles.infoDisplay}>
          <span className={styles.trackNum}>TR {currentSongIndex + 1}</span>
          <span className={styles.timeDisplay}>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );

  // ==================== ATARI 2600 LAYOUT ====================
  const renderAtari = () => (
    <div className={styles.player}>
      {audioElement}
      {/* Wood Panel Top */}
      <div className={styles.woodPanel} />

      {/* Cartridge Slot */}
      <div className={styles.cartridgeSlot}>
        <div className={styles.cartridge}>
          <div className={styles.cartridgeLabel}>
            <span>RETRO</span>
            <span>PLAYER</span>
          </div>
        </div>
      </div>

      {/* LED Display */}
      <div className={styles.ledDisplay}>
        <div className={styles.ledRow}>
          {currentSong.name.substring(0, 12).split("").map((char, i) => (
            <span key={i} className={styles.ledChar}>{char}</span>
          ))}
        </div>
        <div className={styles.ledTime}>{formatTime(currentTime)}</div>
      </div>

      {/* Switches Row */}
      <div className={styles.switchRow}>
        <div className={styles.switch}>
          <span>POWER</span>
          <div className={styles.toggleSwitch}><div className={styles.toggleKnob} /></div>
        </div>
        <div className={styles.switch}>
          <span>SELECT</span>
          <button className={styles.momentaryBtn} onClick={handleNext}>●</button>
        </div>
        <div className={styles.switch}>
          <span>RESET</span>
          <button className={styles.momentaryBtn} onClick={handleStop}>●</button>
        </div>
      </div>

      {/* Joystick Controls */}
      <div className={styles.joystickSection}>
        <div className={styles.joystick}>
          <div className={styles.joystickBase}>
            <button className={styles.joyUp} onClick={handleVolumeChange}>▲</button>
            <div className={styles.joyMiddle}>
              <button className={styles.joyLeft} onClick={handlePrevious}>◀</button>
              <button className={styles.joyFire} onClick={isPlaying ? handlePause : handlePlay}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button className={styles.joyRight} onClick={handleNext}>▶</button>
            </div>
            <button className={styles.joyDown}>▼</button>
          </div>
        </div>
      </div>

      {/* Track Selection */}
      <div className={styles.trackSelect}>
        {songs.slice(0, 4).map((song, i) => (
          <button key={i} className={`${styles.trackBtn} ${i === currentSongIndex ? styles.active : ""}`} onClick={() => handleSongSelect(i)}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* Volume */}
      <div className={styles.volumeSection}>
        <span>VOL</span>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className={styles.volumeSlider} />
      </div>
    </div>
  );

  // Render based on theme
  switch (theme) {
    case "bmw": return renderBMW();
    case "cdj": return renderCDJ();
    case "walkman": return renderWalkman();
    case "boombox": return renderBoombox();
    case "technics": return renderTechnics();
    case "atari": return renderAtari();
    default: return renderWinamp();
  }
}
