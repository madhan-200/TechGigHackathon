# Orientation-Based Multi-Tool Web App

A responsive web application that dynamically changes its functionality based on the orientation of the user's device. Built with vanilla HTML, CSS, and JavaScript.

## 🎯 Features

### 📱 Orientation-Based Modes

- **Portrait Up** → **Alarm Clock**
  - Set, update, and cancel alarms
  - Real-time alarm checking
  - Visual and audio notifications

- **Landscape Right** → **Stopwatch**
  - Start, pause, and reset functionality
  - Accurate time tracking with tenths of a second
  - Real-time display updates

- **Portrait Down** → **Countdown Timer**
  - Set custom countdown duration
  - Start, pause, and reset controls
  - Alert notification when timer finishes

- **Landscape Left** → **Weather Display**
  - Real-time weather data via OpenWeatherMap API
  - Current location detection
  - Temperature, description, and city display

### ✨ Key Features

- **Responsive Design**: Mobile-first approach with smooth transitions
- **Orientation Detection**: Automatic mode switching based on device orientation
- **Clean Architecture**: Modular component-based structure
- **Smooth Transitions**: Beautiful animations between mode changes
- **Error Handling**: Graceful handling of API failures and permission issues

## 🚀 Getting Started

### Prerequisites

- A modern web browser with orientation support
- OpenWeatherMap API key (for weather functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/madhan-200/TechGigHackathon.git
   cd TechGigHackathon
   ```

2. **Get OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key

3. **Configure API Key**
   - Open `weather.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key

4. **Run the Application**
   - Open `index.html` in a web browser
   - Or serve it using a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

## 📱 Usage

### Testing on Mobile Devices

1. **Enable Developer Tools** (if testing on desktop)
   - Open browser developer tools
   - Toggle device toolbar
   - Select a mobile device

2. **Test Orientation Changes**
   - Rotate your device or use browser orientation controls
   - Watch the app switch between different modes
   - Each mode maintains its state independently

### Component Testing

#### Alarm Clock
- Set a time using the time picker
- Click "Set Alarm" to activate
- The alarm will ring at the specified time
- Use "Cancel Alarm" to deactivate

#### Stopwatch
- Click "Start" to begin timing
- "Pause" to stop temporarily
- "Reset" to return to zero

#### Timer
- Enter minutes and seconds
- Click "Start" to begin countdown
- "Pause" to stop temporarily
- "Reset" to return to original time

#### Weather
- Automatically detects your location
- Displays current weather conditions
- Shows temperature, description, and city

## 🏗️ Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Responsive CSS with animations
├── main.js             # Orientation detection and mode switching
├── alarm.js            # Alarm clock component
├── stopwatch.js        # Stopwatch component
├── timer.js            # Countdown timer component
├── weather.js          # Weather component
└── README.md           # Project documentation
```

## 🔧 Technical Details

### Architecture

- **Modular Design**: Each component is self-contained
- **Event-Driven**: Uses event listeners for user interactions
- **State Management**: Local state for each component
- **Cleanup Functions**: Proper resource management when switching modes

### Technologies Used

- **HTML5**: Semantic markup and modern features
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, async/await, DOM manipulation
- **OpenWeatherMap API**: Real-time weather data
- **Geolocation API**: Device location detection

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Design Features

- **Gradient Backgrounds**: Modern visual appeal
- **Glass Morphism**: Translucent UI elements with backdrop blur
- **Smooth Animations**: CSS transitions and keyframe animations
- **Responsive Typography**: Scalable text across devices
- **Touch-Friendly**: Optimized for mobile interactions

## 🔒 Privacy & Security

- **Location Data**: Only used for weather functionality
- **API Keys**: Should be kept secure and not shared
- **No Data Storage**: No user data is stored locally or remotely

## 🐛 Troubleshooting

### Common Issues

1. **Weather not loading**
   - Check your API key in `weather.js`
   - Ensure location permissions are granted
   - Verify internet connection

2. **Orientation not changing**
   - Test on a physical device
   - Check browser orientation support
   - Try refreshing the page

3. **Alarm not ringing**
   - Check browser notification permissions
   - Ensure the page is active/tab is open
   - Verify the time is set correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Modern CSS techniques and design inspiration
- Browser vendors for orientation API support

---

**Built with ❤️ for the TechGig Hackathon** 