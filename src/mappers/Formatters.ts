/**
 * Formatting and presentation helpers for domain attributes with defensive fallbacks.
 */

/**
 * Formats a monetary amount in USD currency notation (e.g., $50,000,000).
 * Returns the provided fallback string if value is null, undefined, NaN, or non-numeric.
 *
 * @param amount Numeric value or string representation of currency amount
 * @param fallback Fallback string when value is null/empty/invalid (default: 'Not available')
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  fallback = 'Not available',
): string {
  if (amount === null || amount === undefined || amount === '') {
    return fallback
  }

  const numericValue = typeof amount === 'number' ? amount : Number(amount)

  if (Number.isNaN(numericValue) || !Number.isFinite(numericValue)) {
    return fallback
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(numericValue)
  } catch {
    return fallback
  }
}

/**
 * Formats an ISO date string (e.g., '2010-06-04') into a localized human-readable date (e.g., 'Jun 4, 2010').
 * Uses UTC timezone to prevent day shifting on date-only strings.
 *
 * @param dateStr ISO date string or date representation
 * @param fallback Fallback string when date is null/empty/invalid (default: 'Unknown')
 */
export function formatDate(
  dateStr: string | null | undefined,
  fallback = 'Unknown',
): string {
  if (!dateStr || typeof dateStr !== 'string' || dateStr.trim() === '') {
    return fallback
  }

  const trimmed = dateStr.trim()

  try {
    let dateObj: Date

    // Handle YYYY-MM-DD explicitly to prevent UTC timezone shift
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      const [year, month, day] = trimmed.split('-').map(Number)
      dateObj = new Date(Date.UTC(year, month - 1, day))
    } else {
      dateObj = new Date(trimmed)
    }

    if (Number.isNaN(dateObj.getTime())) {
      return fallback
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(dateObj)
  } catch {
    return fallback
  }
}

/**
 * Formats country name or country code with a defensive fallback.
 *
 * @param country Country string
 * @param fallback Fallback string when null or empty (default: 'Unknown')
 */
export function formatCountry(
  country: string | null | undefined,
  fallback = 'Unknown',
): string {
  if (!country || typeof country !== 'string' || country.trim() === '') {
    return fallback
  }
  return country.trim()
}

/**
 * Formats rocket description with a defensive fallback.
 *
 * @param description Description text
 * @param fallback Fallback string when null or empty (default: 'No description available.')
 */
export function formatDescription(
  description: string | null | undefined,
  fallback = 'No description available.',
): string {
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return fallback
  }
  return description.trim()
}
