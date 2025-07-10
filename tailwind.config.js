/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Make sure your src is covered
    ],
    theme: {
        extend: {
            colors: {
                primary: 'hsl(var(--primary))', // Use CSS variable in Tailwind
            },
        },
    },
    plugins: [],
}
