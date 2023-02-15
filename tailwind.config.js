module.exports = {
    content: ['./src/**/*.{html,js}'],
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                starfall: {
                    dark: '#050917',
                    darker: '#04060E',
                },
            },
            fontFamily: {
                poiret: ['Poiret'],
            },
            zIndex: {
                '-10': '-10',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
