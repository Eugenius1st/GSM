/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                egPurple: {
                    light: '#67e8f9',
                    default: '#6B00FF',
                    dark: '#0e7490',
                },
                egWhite: {
                    default: '#ffffff',
                },
                egBlack: {
                    light: '#D9D9D9',
                    default: '#000000',
                },
            },
        },
    },
    plugins: [],
};
