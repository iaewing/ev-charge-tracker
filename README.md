# EV Charging Tracker

A comprehensive iOS and web application for tracking electric vehicle charging events, costs, and efficiency metrics.

## Technology Stack

- **Frontend**: Ionic 7 with Vue 3 (Composition API), TypeScript
- **Mobile**: Capacitor for native iOS features
- **State Management**: Pinia stores
- **Charts**: Chart.js or ApexCharts for data visualization
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Styling**: Ionic components with custom CSS

## Features

- **Charge Event Tracking**: Log charging sessions with location, vendor, costs, and energy data
- **Saved Locations**: Manage frequently used charging locations
- **Analytics**: Calculate cost per km, efficiency metrics, and charging patterns
- **Visualizations**: Interactive charts and graphs for data analysis
- **Offline Support**: Work seamlessly without internet connection
- **Cross-Platform**: Native iOS app and responsive web application

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── charts/          # Chart components for analytics
│   ├── forms/           # Form components for data entry
│   └── ui/              # Basic UI components
├── views/               # Page components
│   ├── ChargeEvents/    # Charge event management
│   ├── Analytics/       # Statistics and charts
│   ├── Locations/       # Saved locations management
│   └── Settings/        # User settings and preferences
├── services/            # Business logic & API calls
│   ├── firebase.ts      # Firebase configuration
│   ├── chargeEvents.ts  # Charge event operations
│   ├── analytics.ts     # Calculation services
│   └── locations.ts     # Location services
├── stores/              # Pinia stores
│   ├── auth.ts          # Authentication state
│   ├── chargeEvents.ts  # Charge events state
│   └── analytics.ts     # Analytics state
├── composables/         # Reusable composition functions
│   ├── useLocation.ts   # Location-related logic
│   ├── useAnalytics.ts  # Analytics calculations
│   └── useCharts.ts     # Chart configuration
├── types/               # TypeScript interfaces
└── utils/               # Helper functions
```

## Database Schema (Firestore)

### Core Entities
- **Users**: Authentication and user settings
- **Vehicles**: User's EV information (subcollection under users)
- **ChargeEvents**: Individual charging sessions
- **SavedLocations**: Frequently used charging locations
- **OdometerReadings**: Odometer tracking for cost/km calculations

### Key Fields
**ChargeEvent**:
- location (name, address, coordinates)
- vendor (optional)
- chargeType: 'AC' | 'DC_FAST'
- kwh: number (kWh added)
- totalCost: number
- kwhCost: number (cost per kWh)
- odometerReading: number
- timestamps (startTime, endTime, createdAt)

## Core Features Implementation

### Analytics Calculations
- **Cost per km**: Total charging cost / distance traveled
- **Efficiency**: kWh/100km consumption
- **Cost efficiency**: $/100km
- **DC Fast Charging**: Separate tracking and averages
- **Time-based analysis**: Lifetime vs specific periods

### Data Entry Forms
- Charge event input with location services
- Saved locations management
- Odometer reading tracking
- Vendor management (optional field)

### Visualization Components
- Cost trends over time
- AC vs DC charging comparison
- Efficiency trends
- Geographic charging patterns
- Cost per km trends

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- iOS development environment (for iOS builds)

### Installation

1. Install Ionic CLI globally:
```bash
npm install -g @ionic/cli
```

2. Create the project:
```bash
ionic start charge-tracker tabs --type=vue --capacitor
cd charge-tracker
```

3. Install dependencies:
```bash
npm install firebase chart.js vue-chartjs pinia
```

4. Set up Firebase:
   - Create a Firebase project
   - Enable Firestore and Authentication
   - Add your Firebase configuration

5. Run the development server:
```bash
ionic serve
```

### iOS Setup
```bash
ionic capacitor add ios
ionic capacitor run ios
```

## Development Guidelines

### Vue Composition API Patterns
- Use `<script setup>` syntax
- Prefer composables for reusable logic
- Use Pinia stores for global state
- Implement proper TypeScript interfaces

### Firebase Integration
- Use Firestore for real-time data sync
- Implement offline persistence
- Use optimistic updates for better UX
- Secure with proper Firestore rules

### Mobile-First Design
- Responsive layouts for iOS and web
- Touch-friendly interface elements
- Native iOS features via Capacitor
- Offline functionality support

### Code Quality Standards
- TypeScript strict mode enabled
- ESLint and Prettier configuration
- Component testing with Vitest
- E2E testing for critical paths

## Implementation Phases

### Phase 1: Foundation
- Project setup with Ionic Vue
- Firebase configuration
- Authentication system
- Basic navigation structure

### Phase 2: Core Features
- Charge event CRUD operations
- Saved locations management
- Basic analytics calculations
- Data persistence

### Phase 3: Analytics
- Cost per km calculations
- Efficiency metrics
- Statistical summaries
- Date range filtering

### Phase 4: Visualization
- Chart.js integration
- Interactive dashboards
- Trend analysis
- Export functionality

### Phase 5: Polish
- iOS-specific optimizations
- Performance improvements
- Advanced filtering
- User experience enhancements

## Security Considerations
- Firestore security rules for user data isolation
- Input validation on all forms
- Sanitization of user-generated content
- Secure authentication flows

## Performance Optimization
- Lazy loading of chart components
- Pagination for large datasets
- Efficient Firestore queries
- Image optimization for location photos
- Offline-first architecture

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 