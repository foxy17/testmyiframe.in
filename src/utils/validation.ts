export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url.trim()) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    // Add protocol if missing
    const urlToTest = url.includes('://') ? url : `https://${url}`;
    const urlObj = new URL(urlToTest);
    
    // Check for valid protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL must use HTTP or HTTPS protocol' };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
};

export const validateDimension = (value: string | number, unit: 'px' | '%'): { isValid: boolean; error?: string } => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Must be a positive number' };
  }

  if (unit === '%' && numValue > 100) {
    return { isValid: false, error: 'Percentage cannot exceed 100%' };
  }

  if (unit === 'px' && numValue > 5000) {
    return { isValid: false, error: 'Pixel value too large (max: 5000px)' };
  }

  return { isValid: true };
};

export const sanitizeUrl = (url: string): string => {
  const trimmed = url.trim();

  // If no protocol, add https
  if (!trimmed.includes('://')) {
    return `https://${trimmed}`;
  }

  // Convert http to https for better compatibility
  if (trimmed.startsWith('http://') && window.location.protocol === 'https:') {
    console.warn('Converting HTTP URL to HTTPS to avoid mixed content issues');
    return trimmed.replace('http://', 'https://');
  }

  return trimmed;
};

export const formatDimension = (value: number | string, unit: 'px' | '%'): string => {
  return `${value}${unit}`;
};