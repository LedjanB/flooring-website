# Elite Flooring Website

A modern, responsive flooring business website built with Tailwind CSS.

## Features

- Modern and responsive design
- Interactive UI elements with smooth animations
- Mobile-first approach
- Optimized performance
- SEO-friendly structure

## Tech Stack

- HTML5
- Tailwind CSS
- Font Awesome Icons
- Google Fonts (Inter & Playfair Display)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flooring-website.git
cd flooring-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the Tailwind CSS build process:
```bash
npm run build
```

This will watch for changes in your HTML files and automatically rebuild the CSS.

## Project Structure

```
flooring-website/
├── inance-html/
│   ├── index.html
│   ├── about.html
│   ├── service.html
│   ├── contact.html
│   ├── css/
│   ├── js/
│   └── images/
├── src/
│   └── input.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Customization

### Colors

The website uses a custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  'flooring': {
    primary: '#2C3E50',    // Deep blue-gray
    secondary: '#E67E22',  // Warm orange
    accent: '#27AE60',     // Forest green
    light: '#ECF0F1',      // Light gray
    dark: '#2C3E50',       // Dark blue-gray
  }
}
```

To modify the color scheme:

1. Open `tailwind.config.js`
2. Update the color values in the `colors.flooring` object
3. Rebuild the CSS with `npm run build`

### Typography

The website uses two main fonts:
- Inter (sans-serif) for body text
- Playfair Display (serif) for headings

To change fonts:

1. Update the Google Fonts link in the HTML files
2. Modify the font family settings in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
}
```

### Components

Common components are defined in `src/input.css` using Tailwind's `@layer components`:

```css
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-flooring-secondary text-white rounded-lg hover:bg-opacity-90 transition-all duration-300;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300;
  }
}
```

To modify component styles:

1. Open `src/input.css`
2. Update the component classes in the `@layer components` section
3. Rebuild the CSS

## Responsive Design

The website is built with a mobile-first approach using Tailwind's responsive breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Example usage:
```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Content -->
</div>
```

## Animations

Custom animations are defined in `tailwind.config.js`:

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.5s ease-in-out',
}
```

To add new animations:

1. Add the animation definition in `tailwind.config.js`
2. Add the corresponding keyframes
3. Use the animation class in your HTML:
```html
<div class="animate-fade-in">
  <!-- Content -->
</div>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 