# Progressive Web App (PWA) Configuration

## PWA Architecture

### Service Worker & Caching
- **Service Worker**: Automatic generation via Vite PWA plugin with Workbox
- **Caching Strategy**: Cache-first for fonts and static assets, runtime caching for dynamic content
- **Offline Support**: Custom offline page with IronForge branding and feature list
- **Install Prompts**: Cross-platform installation with custom iOS Safari instructions
- **App Manifest**: Comprehensive PWA manifest with proper icons and metadata
- **Theme Integration**: Native mobile browser theming with app color scheme

## PWA Features Implementation

### Service Worker & Caching
- Automatic service worker generation via Vite PWA plugin
- Workbox-powered caching strategies for optimal performance
- Cache-first strategy for static assets (CSS, JS, images)
- Runtime caching for Google Fonts and external resources
- Offline fallback page with IronForge branding

### App Installation
- Cross-platform install prompt integration in Dashboard Header menu
- Custom useInstallPrompt hook for installation management
- Android/Chrome: Native beforeinstallprompt event handling
- iOS Safari: Custom instruction alert with step-by-step guidance
- Automatic detection of installed state

### PWA Manifest & Branding
- Comprehensive web app manifest with IronForge branding
- App icons in multiple sizes (192x192, 512x512, maskable)
- Standalone display mode for app-like experience
- Theme color integration (#2196F3) for native browser styling
- Portrait-primary orientation lock

### Offline Capabilities
- Custom offline.html page with gradient background matching app theme
- Automatic network status detection and reconnection attempts
- Cached app shell for instant loading
- Local storage persistence for user data
- Graceful degradation when network is unavailable

### Mobile Optimization
- iOS homescreen support with apple-touch-icon meta tags
- Android Chrome theme-color for address bar styling
- Microsoft PWA support with browserconfig
- Open Graph and Twitter Card metadata for social sharing
- Full-screen immersive experience when installed

## PWA Development Notes

### Testing PWA Features
- **Development Mode**: `npm run dev` - Regular development, PWA features disabled
- **PWA Testing**: `npm run build && npm run preview` - Full PWA functionality enabled
- **Mobile Testing**: Use `npm run preview -- --host` and access via local IP on mobile devices
- **Install Testing**: HTTPS required for install prompts on mobile (`--https` flag)

### PWA Build Requirements
- Service worker only generated during production build
- Web app manifest requires production environment
- Install prompts need HTTPS (except localhost)
- Mobile theme-color only applies to built/served applications

### Troubleshooting
- **Build Errors**: Remove invalid Workbox configurations (e.g., `cacheKeyWillBeUsed`)
- **No Install Prompt**: Ensure HTTPS and valid manifest with required fields
- **Theme Color Issues**: Update both `index.html` meta tag and PWA manifest
- **Service Worker Issues**: Check browser dev tools Application tab for registration status

## Implementation Details

### PWA Configuration & Setup
- **Vite PWA Plugin Integration** - Configured automatic service worker generation with Workbox
- **Web App Manifest Creation** - Comprehensive manifest with IronForge branding, theme colors, and app metadata
- **Icon System Implementation** - Created PWA icon structure with 192x192 and 512x512 sizes including maskable variants
- **Service Worker Registration** - Added automatic service worker registration in main.tsx

### Offline Support & Caching
- **Custom Offline Page** - Designed branded offline.html with gradient background and feature list
- **Caching Strategies** - Implemented cache-first for static assets and runtime caching for external fonts
- **Network Detection** - Added automatic network status monitoring and reconnection attempts
- **App Shell Caching** - Configured comprehensive asset precaching for instant loading

### Installation & Mobile Integration
- **Install Prompt Hook** - Created useInstallPrompt custom hook for cross-platform installation
- **Global Header Integration** - Added "Install App" menu item with platform-specific handling
- **iOS Safari Support** - Custom instruction alert for iOS users with step-by-step Add to Home Screen guidance
- **Android Chrome Support** - Native beforeinstallprompt event handling for seamless installation

### Mobile Browser Optimization
- **Theme Color Integration** - Applied #2196F3 theme color for native browser styling
- **iOS Meta Tags** - Comprehensive iOS homescreen support with apple-touch-icon configurations
- **Microsoft PWA Support** - Added Windows PWA meta tags and browserconfig support
- **Social Media Meta** - Included Open Graph and Twitter Card metadata for sharing

### Technical Implementation
- **Build Process Enhancement** - Configured production-only PWA feature generation
- **Development Workflow** - Established build + preview testing pattern for PWA functionality
- **Error Resolution** - Fixed Workbox configuration issues (cacheKeyWillBeUsed removal)
- **HTTPS Testing Setup** - Documented mobile testing requirements with host and HTTPS flags

### Key Files Created/Modified
- **vite.config.ts**: Added VitePWA plugin configuration with manifest and caching strategies
- **public/manifest.json**: Updated with IronForge branding and comprehensive PWA metadata  
- **index.html**: Enhanced with PWA meta tags, theme colors, and cross-platform support
- **public/offline.html**: Created custom offline page with IronForge styling
- **src/hooks/useInstallPrompt.ts**: Developed installation management hook
- **src/components/GlobalHeader.tsx**: Integrated install prompt and iOS instructions
- **public/assets/icon/**: Established icon directory with placeholder PWA icons

### PWA Capabilities Achieved
- **Installable App Experience** - Users can install IronForge as native-like app on any platform
- **Offline Functionality** - Core features work without internet connection
- **Fast Loading Performance** - Cached assets for instant startup and smooth navigation
- **Mobile-Optimized UI** - Native browser theming and full-screen standalone mode
- **Cross-Platform Compatibility** - Supports iOS Safari, Android Chrome, and desktop browsers