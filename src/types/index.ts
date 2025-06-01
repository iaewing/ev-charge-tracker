export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  defaultCurrency: string;
  displayCurrency: string;
  distanceUnit: string;
  defaultVehicle?: string;
  darkMode?: boolean;
}

export interface Vehicle {
  id: string;
  userId: string;
  name: string;
  make: string;
  model: string;
  year: number;
  batteryCapacity: number;
  efficiency?: number;
  createdAt: Date;
}

export interface ChargeEvent {
  id: string;
  userId: string;
  vehicleId: string;
  location: ChargeLocation;
  vendor?: string;
  chargeType: 'AC' | 'DC_FAST';
  kwh: number;
  totalCost: number;
  currency: string;
  kwhCost?: number;
  exchangeRate?: number;
  convertedCost?: number;
  convertedCurrency?: string;
  startTime: Date;
  endTime?: Date;
  odometerReading?: number;
  notes?: string;
  createdAt: Date;
}

export interface ChargeLocation {
  name: string;
  address?: string;
  coordinates?: Coordinates;
  savedLocationId?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SavedLocation {
  id: string;
  userId: string;
  name: string;
  address: string;
  coordinates?: Coordinates;
  vendor?: string;
  chargeType: 'AC' | 'DC_FAST' | 'BOTH';
  createdAt: Date;
}

export interface OdometerReading {
  id: string;
  userId: string;
  vehicleId: string;
  reading: number;
  date: Date;
  createdAt: Date;
}

export interface AnalyticsData {
  costPerKm: number;
  totalChargingCost: number;
  costPer100Km: number;
  kwhPer100Km: number;
  totalDcFastCost: number;
  averageDcFastCost: number;
  efficiency: number;
  currency: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  timestamp: Date;
}

export interface SupportedCurrency {
  code: string;
  name: string;
  symbol: string;
}

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  { code: 'CAD', name: 'Canadian Dollar', symbol: '$' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'AUD', name: 'Australian Dollar', symbol: '$' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' }
]; 