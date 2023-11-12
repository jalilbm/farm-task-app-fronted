module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			ringColor: {
				"focus-visible": "#17A34A", // Your desired green color
			},
			colors: {
				primary: {
					600: "#17A34A",
				},
			},
		},
	},
	plugins: [],
};
