import type { CurrencyRate, SupportedCurrency } from '@/types';
import { SUPPORTED_CURRENCIES } from '@/types';

// Simple currency service - in a real app, you'd use a currency API
export class CurrencyService {
  private static rates: Map<string, CurrencyRate> = new Map();
  
  // Hardcoded rates for demo - in production, fetch from a currency API
  private static readonly DEMO_RATES: Record<string, Record<string, number>> = {
    CAD: {
      USD: 0.74,
      EUR: 0.68,
      GBP: 0.58,
      JPY: 110.5,
      CHF: 0.67,
      AUD: 1.08,
      NOK: 7.8,
      SEK: 7.6,
      DKK: 5.1
    },
    USD: {
      CAD: 1.35,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.8,
      CHF: 0.90,
      AUD: 1.46,
      NOK: 10.6,
      SEK: 10.3,
      DKK: 6.9
    },
    EUR: {
      CAD: 1.47,
      USD: 1.09,
      GBP: 0.86,
      JPY: 163.2,
      CHF: 0.98,
      AUD: 1.59,
      NOK: 11.5,
      SEK: 11.2,
      DKK: 7.5
    },
    GBP: {
      CAD: 1.71,
      USD: 1.27,
      EUR: 1.16,
      JPY: 190.1,
      CHF: 1.14,
      AUD: 1.85,
      NOK: 13.4,
      SEK: 13.0,
      DKK: 8.7
    }
  };

  static async getExchangeRate(from: string, to: string): Promise<number> {
    if (from === to) return 1;
    
    const cacheKey = `${from}-${to}`;
    const cachedRate = this.rates.get(cacheKey);
    
    // Check if we have a recent cached rate (less than 1 hour old)
    if (cachedRate && (Date.now() - cachedRate.timestamp.getTime()) < 3600000) {
      return cachedRate.rate;
    }

    // For demo purposes, use hardcoded rates
    const rate = this.DEMO_RATES[from]?.[to] || 1;
    
    // Cache the rate
    this.rates.set(cacheKey, {
      from,
      to,
      rate,
      timestamp: new Date()
    });

    return rate;
  }

  static async convertAmount(amount: number, from: string, to: string): Promise<number> {
    const rate = await this.getExchangeRate(from, to);
    return amount * rate;
  }

  static formatCurrency(amount: number, currency: string): string {
    const currencyData = SUPPORTED_CURRENCIES.find(c => c.code === currency);
    const symbol = currencyData?.symbol || currency;
    
    // Format with proper decimal places
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `${symbol}${formatter.format(amount)}`;
  }

  static getCurrencySymbol(currency: string): string {
    const currencyData = SUPPORTED_CURRENCIES.find(c => c.code === currency);
    return currencyData?.symbol || currency;
  }

  static getSupportedCurrencies(): SupportedCurrency[] {
    return SUPPORTED_CURRENCIES;
  }

  // In a real app, this would fetch from a currency API like exchangerate-api.com
  static async updateRatesFromAPI(): Promise<void> {
    // TODO: Implement API integration
    // const response = await fetch('https://api.exchangerate-api.com/v4/latest/CAD');
    // const data = await response.json();
    // Update this.rates with fresh data
  }
} 