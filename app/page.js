"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Player from "./components/Player/Player";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";

// Şarkı listesi - public/Music klasöründen yüklenen NCS şarkılar
const songs = [
  { name: "BENJAMINRICH & Daniel Javan - Too Late", file: "/Music/BENJAMINRICH, Daniel Javan - Too Late  Hip-Hop  NCS - Copyright Free Music.mp3" },
  { name: "Cartoon - On & On (feat. Daniel Levi)", file: "/Music/Cartoon - On & On (feat. Daniel Levi) [NCS Release].mp3" },
  { name: "Sean Pitaro - Passport", file: "/Music/Sean Pitaro - Passport  Hyperpop  NCS - Copyright Free Music.mp3" },
  { name: "Spektrem - Shine", file: "/Music/Spektrem - Shine [NCS Release].mp3" },
  { name: "Sub Urban - Cradles", file: "/Music/Sub Urban - Cradles [NCS Release].mp3" },
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("winamp");

  return (
    <main className={styles.main}>
      {/* Animated Background Grid */}
      <div className={styles.grid}></div>

      {/* Scanlines Effect */}
      <div className={styles.scanlines}></div>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>🎵</span>
          RETRO PLAYER
          <span className={styles.titleIcon}>🎵</span>
        </h1>
        <p className={styles.subtitle}>~ Nostaljik Arayüz ~</p>
      </header>

      {/* Theme Selector */}
      <section className={styles.themeSelectorSection}>
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />
      </section>

      {/* Player Component */}
      <section className={styles.playerSection}>
        <Player songs={songs} theme={currentTheme} />
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Doğukan SARI | Basit bir müzik oynatıcı!</p>
        <div className={styles.footerIcons}>
          <span>💾</span>
          <span>📼</span>
          <span>📻</span>
        </div>
      </footer>
    </main>
  );
}
