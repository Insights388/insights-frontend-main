// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	],
	theme: {
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		keyframes: {
		  "accordion-down": {
			from: { height: 0 },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: 0 },
		  },
		  "fade-in": {
			from: { opacity: 0 },
			to: { opacity: 1 },
		  },
		  "fade-out": {
			from: { opacity: 1 },
			to: { opacity: 0 },
		  },
		  "pulse": {
			"0%, 100%": { opacity: 1 },
			"50%": { opacity: 0.5 },
		  },
		  "bounce": {
			"0%, 100%": { 
			  transform: "translateY(0)",
			  animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
			},
			"50%": { 
			  transform: "translateY(-25%)",
			  animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
			},
		  },
		  "spin": {
			from: { transform: "rotate(0deg)" },
			to: { transform: "rotate(360deg)" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fade-in 0.3s ease-in-out",
		  "fade-out": "fade-out 0.3s ease-in-out",
		  "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
		  "bounce": "bounce 1s infinite",
		  "spin": "spin 1s linear infinite",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }