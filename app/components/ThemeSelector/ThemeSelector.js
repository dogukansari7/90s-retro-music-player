"use client";

import styles from "./ThemeSelector.module.css";

const themes = [
    { id: "winamp", name: "Winamp", icon: "💾", color: "#00ff00" },
    { id: "bmw", name: "BMW E38", icon: "🚗", color: "#ff8c00" },
    { id: "cdj", name: "CDJ-2000", icon: "🎧", color: "#ff0066" },
    { id: "walkman", name: "Walkman", icon: "📀", color: "#00bfff" },
    { id: "boombox", name: "Boombox", icon: "📻", color: "#ffd700" },
    { id: "technics", name: "Technics", icon: "🎵", color: "#c0c0c0" },
    { id: "atari", name: "Atari 2600", icon: "🕹️", color: "#ff6b35" },
];

export default function ThemeSelector({ currentTheme, onThemeChange }) {
    const currentIndex = themes.findIndex((t) => t.id === currentTheme);

    return (
        <div className={styles.selector}>
            <div className={styles.label}>SELECT SKIN</div>
            <div className={styles.themesContainer}>
                {themes.map((theme, index) => (
                    <button
                        key={theme.id}
                        className={`${styles.themeBtn} ${currentTheme === theme.id ? styles.active : ""
                            }`}
                        onClick={() => onThemeChange(theme.id)}
                        style={{ "--theme-color": theme.color }}
                    >
                        <span className={styles.icon}>{theme.icon}</span>
                        <span className={styles.name}>{theme.name}</span>
                        {currentTheme === theme.id && (
                            <span className={styles.indicator}>▼</span>
                        )}
                    </button>
                ))}
            </div>
            <div className={styles.sliderTrack}>
                <div
                    className={styles.sliderThumb}
                    style={{
                        left: `${(currentIndex / (themes.length - 1)) * 100}%`,
                        backgroundColor: themes[currentIndex]?.color || "#00ff00",
                    }}
                />
            </div>
        </div>
    );
}
