# URL Shortener Project

A modern URL shortening service with analytics, inspired by Bitly. This project provides a full-featured platform for creating and managing shortened URLs with detailed usage statistics.


## Tech Stack


- **Frontend**: React.js with TailwindCSS
- **State Management**: React Query for efficient API data fetching and caching
- **Authentication**: JWT-based authentication system
- **Styling**: TailwindCSS for responsive design

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/tbenjamin1/shortener_web_app
   cd url-shortener
   ```

2. Install dependencies
   ```
   npm install 
   ```

3. Start the development server
   ```
   npm start
   ```
   
4. Open [http://localhost:5175](http://localhost:5175) to view the application in your browser

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. The page will reload when you make changes, and you may see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized for best performance with minified files and hashed filenames.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you need full control over the build configuration, you can eject at any time.

## Project Structure

```
src/
├── components/         
├── screens/            
├── redux/                  
```

## Key Pages

1. **Landing Page**: A Bitly-inspired landing page showcasing the service's features
2. **Login & Register**: User authentication pages with form validation
3. **Dashboard**: Central hub for managing all shortened URLs
4. **URL Shortener**: Interface for creating new shortened URLs
5. **Analytics**: Detailed statistics for URL usage and clicks

## API Integration

- JWT authentication for secure API requests
- Comprehensive error handling for API failures
- Real-time data updates using React Query

## Deployment

Follow these steps to deploy the application:

1. Build the production-ready version
   ```
   npm run build
   ```

2. Deploy the contents of the `build` folder to your hosting provider of choice

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.