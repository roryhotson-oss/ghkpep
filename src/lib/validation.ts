// Input validation utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }

  const trimmed = email.trim().toLowerCase();
  
  if (trimmed.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true, sanitized: trimmed };
}

export function validateName(name: string): ValidationResult {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }

  const trimmed = name.trim();
  
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { isValid: false, error: 'Name is too long' };
  }

  // Remove potentially dangerous characters
  const sanitized = trimmed.replace(/[<>\"'&]/g, '');

  return { isValid: true, sanitized };
}

export function validateMessage(message: string): ValidationResult {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required' };
  }

  const trimmed = message.trim();
  
  if (trimmed.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters' };
  }

  if (trimmed.length > 5000) {
    return { isValid: false, error: 'Message is too long (max 5000 characters)' };
  }

  // Remove potentially dangerous characters
  const sanitized = trimmed.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  return { isValid: true, sanitized };
}

export function validateSubject(subject: string): ValidationResult {
  if (!subject || typeof subject !== 'string') {
    return { isValid: false, error: 'Subject is required' };
  }

  const trimmed = subject.trim();
  
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Subject must be at least 3 characters' };
  }

  if (trimmed.length > 200) {
    return { isValid: false, error: 'Subject is too long (max 200 characters)' };
  }

  const sanitized = trimmed.replace(/[<>\"'&]/g, '');

  return { isValid: true, sanitized };
}

export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .slice(0, 10000); // Max length
}

export function validateOrderMessage(message: string): ValidationResult {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Order message is required' };
  }

  if (message.length > 10000) {
    return { isValid: false, error: 'Message is too long' };
  }

  return { isValid: true, sanitized: sanitizeString(message) };
}
