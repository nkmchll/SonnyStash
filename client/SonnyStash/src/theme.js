export const colorTokens = {
    sonnyTheme: {
        10: "#ffacb7", // pink
        20: "#f6f6e9", // beige
        30: "#000000", // black
    } 
}

export const themeSettings = () => {
    return {
        palette: {
            primary: {
                main: colorTokens.sonnyTheme[10], // pink
            },
            secondary: {
                main: colorTokens.sonnyTheme[20], // beige
            },
            background: {
                black: colorTokens.sonnyTheme[30], // black
            },
            main: {
                pink: "#ffacb7", // pink
                beige: "#f6f6e9", // beige
                black: "#000000", // black
            } 
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Shrikhand", "sans-serif"].join(","),
                fontSize: 100,
            },
            h2: {
                fontFamily: ["Montserrat", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Montserrat", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Montserrat", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};
