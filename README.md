# LinkedIn Business Card Chrome Extension

A Chrome extension built with Vue.js that allows you to generate and print a custom business card based on the LinkedIn profile page you are currently viewing.

Currently available at: https://chromewebstore.google.com/detail/business-card-creator

## Features

- **Capture LinkedIn Profile Data:** Scrapes profile details such as profile image, background image, job role, and company information.
- **Customizable Card Design:** Adjust the layout and style through interactive UI controls.
- **Downloadable Card:** Generate a printable business card and download it as a PNG image.
- **Chrome Extension:** Easily loaded in developer mode for quick testing and development.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/alexandresanchograca/linkedin-card.git
   cd linkedin-card-extension
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Development

Start the development server with hot-reload:

```sh
npm run serve
```

This will launch the Vue.js application. Open your browser to see changes in real time.

## Production Build

Compile and minify the project for production:

```sh
npm run build
```

A `dist` folder will be created containing the production-ready extension files.

## How to Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** by toggling the switch in the top right.
3. Click on **Load unpacked** and select the `dist` folder generated from the production build.
4. Navigate to a LinkedIn profile page, click the extension's popup, and press **Generate Card** to create your business card.

## Project Structure

- **public/**: Contains the static assets and `index.html` template.
- **src/**: Contains the source code for the extension.
  - **components/**: Vue components for rendering the business card (front and back), QR code, range slider, etc.
  - **composables/**: Reusable composition functions (`useCardConfig`, `userAuthState`).
  - **entry/**: Entry files for various extension pages (e.g., `popup.js`).
  - **utils/**: Helper functions (e.g., `getActiveDoc`, `Profile`, `textOperations`).
  - **view/**: Main view rendered inside the extension popup.

## Configuration

This project uses `vue.config.js` for the build configuration. It copies the appropriate manifest file from `src/manifest.development.json` or `src/manifest.production.json` to the `dist` folder depending on the build mode.

For further customization, please refer to the [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).

## Contributing

Feel free to open issues or submit pull requests for improvements.
