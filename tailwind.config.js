/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                egPurple: {
                    default: '#6B00FF',
                    semiLght: '#6B00FF75',
                    light: '#E3DAF2',
                    superLight: '#F6F0FF',
                },
                egWhite: {
                    default: '#ffffff',
                },
                egGrey: {
                    default: '#8c8c8c',
                    semiLight: '#F3F3F3',
                    light: '#F9F9F9',
                },
                egBlack: {
                    default: '#252525',
                    semiLght: '#505050',
                    light: '#B5B5B5',
                    superLight: '#E1E1E1',
                },
                egRed: { default: '#DA1E28', semiLihgt: '#DA1E2840', light: '#FBE8E9' },
                egGreen: { default: '#35CF61', light: '#EBFAEF' },
                egYellow: { default: '#FED74C', semiLight: '#FED74C50', light: '#FFFBED' },
            },
            backgroundImage: {
                'login-bg': "url('assets/login/login_bg.jpeg')",
            },
        },
    },
    plugins: [],
};
