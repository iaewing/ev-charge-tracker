# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `ev-charge-tracker` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

## 3. Create Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your preferred location
5. Click "Done"

## 4. Add Web App

1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and select Web (</> icon)
4. Enter app nickname: `EV Charge Tracker`
5. Check "Also set up Firebase Hosting"
6. Click "Register app"
7. Copy the Firebase config object

## 5. Configure Environment Variables

Create a `.env` file in your project root with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 6. Firestore Security Rules

Replace the default Firestore rules with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Vehicles subcollection
      match /vehicles/{vehicleId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Charge events - users can only access their own
    match /chargeEvents/{eventId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Saved locations - users can only access their own
    match /savedLocations/{locationId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Odometer readings - users can only access their own
    match /odometerReadings/{readingId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 7. Optional: Firebase Emulators (for Development)

For local development, you can use Firebase emulators:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
   - Select "Emulators"
   - Choose "Authentication Emulator" and "Firestore Emulator"
   - Use default ports (9099 for Auth, 8080 for Firestore)
4. Start emulators: `firebase emulators:start`

The app will automatically connect to emulators in development mode.

## 8. Deploy to Firebase Hosting (Optional)

1. Build the app: `npm run build`
2. Deploy: `firebase deploy`

Your app will be available at `https://your-project.web.app` 