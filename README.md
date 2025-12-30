# 🎉 New Year 2026 Celebration Website

A beautiful, festive New Year-themed website built with Next.js, TypeScript, and Tailwind CSS. Features a countdown timer, resolution tracker, and celebratory animations.

## Features

### 🎊 New Year Countdown Page
- **Real-time countdown** to January 1, 2026
- **Fireworks animations** when countdown reaches zero
- **Glowing number effects** with celebratory animations
- **"Happy New Year 2026!" message** with festive effects
- **Automatic state transitions** (counting → celebrating → days passed)

### 📝 Mini Resolution Tracker App
- **Add, edit, and delete** personal or career resolutions for 2026
- **Category system** (Personal/Career) with color coding
- **Progress tracking** with visual progress bar
- **Checkbox system** to mark completed resolutions
- **localStorage persistence** - data saved between page reloads
- **Clean, intuitive UI** with responsive design

### 🔔 Fun Automation Script
- **Browser notifications** that automatically trigger at midnight on January 1, 2026
- **Permission handling** for browser notifications
- **Celebratory notification** with custom message
- **Works silently in the background**

### 🎨 Additional Features
- ✨ Beautiful New Year-themed UI with festive decorations
- 🎆 Animated confetti and fireworks effects
- 🎁 Interactive gift card creation form
- 🖨️ Print-ready gift card preview
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Using the Features

#### Countdown Timer
- Navigate to the **"Countdown"** tab to see the live countdown to New Year 2026
- Watch for fireworks and glowing effects as the countdown approaches zero
- When January 1, 2026 arrives, you'll see celebratory animations and messages

#### Resolution Tracker
- Click on the **"Resolutions"** tab
- Add new resolutions by selecting a category (Personal or Career) and entering your goal
- Click the checkbox to mark resolutions as completed
- Use the "Edit" button to modify existing resolutions
- Use the "Delete" button to remove resolutions
- Your progress is automatically saved and persists between page reloads

#### Browser Notifications
- The notification system works automatically in the background
- When you first visit the site, your browser will ask for notification permission
- Grant permission to receive a celebratory notification at midnight on January 1, 2026
- Notifications will trigger automatically when the countdown reaches zero

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Main page with tab navigation
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles and animations
├── components/
│   ├── NewYearCountdown.tsx  # Countdown timer with fireworks
│   ├── ResolutionTracker.tsx # Resolution management component
│   ├── NewYearNotification.tsx # Browser notification handler
│   ├── Fireworks.tsx         # Fireworks animation component
│   ├── Confetti.tsx          # Confetti animation
│   └── ...                    # Other components
└── Public/                   # Static assets
```

## Technologies Used

- **Next.js 14+** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Animations** - Custom keyframe animations for effects
- **localStorage API** - Client-side data persistence
- **Browser Notifications API** - Desktop notifications

## Code Features

- ✅ **Modular components** - Clean, reusable React components
- ✅ **Well-commented code** - Easy to understand and maintain
- ✅ **TypeScript** - Full type safety throughout
- ✅ **Responsive design** - Works on all device sizes
- ✅ **Performance optimized** - Efficient state management and animations
- ✅ **Accessibility** - Semantic HTML and proper ARIA labels

## Browser Compatibility

- Chrome/Edge (recommended for notifications)
- Firefox
- Safari
- Opera

**Note:** Browser notifications require user permission and work best in Chrome/Edge.

## Build for Production

```bash
npm run build
npm start
```

The production build will be optimized and ready for deployment.

## Customization

### Changing the Target Date
To change the target year, edit `components/NewYearCountdown.tsx`:
- Find `new Date(2026, 0, 1, 0, 0, 0, 0)` and update the year
- Update any text references to "2026"

### Styling
- Colors are defined in `tailwind.config.js`
- Animations are in `app/globals.css`
- Component styles use Tailwind utility classes

## Troubleshooting

### Notifications Not Working
- Ensure you've granted notification permissions in your browser
- Check that your browser supports the Notification API
- Try refreshing the page and granting permission again

### Data Not Persisting
- Ensure localStorage is enabled in your browser
- Check browser console for any errors
- Clear browser cache if issues persist

## License

This project is open source and available for personal and commercial use.

## Happy New Year 2026! 🎉🎊✨



