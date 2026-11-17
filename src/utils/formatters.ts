/**
 * Format number to Indonesian Rupiah (IDR) currency format
 * e.g. 185000 -> "Rp 185.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format numbers with thousand separators
 * e.g. 18450 -> "18.450"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

/**
 * Format date string to Indonesian localized date
 * e.g. "2026-11-09" -> "9 November 2026"
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format date with time
 */
export function formatDateTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateTimeString;
  }
}

