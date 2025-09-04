import { ContactSubmission } from "../../lib/email";

// Validation helper functions
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }

  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0) {
    return { isValid: false, error: 'Email cannot be empty' };
  }

  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true, value: trimmedEmail };
};

const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }

  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return { isValid: false, error: 'Name cannot be empty' };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, error: 'Name is too long (maximum 100 characters)' };
  }

  // Allow letters, spaces, hyphens, apostrophes, and periods
  const nameRegex = /^[a-zA-Z\s\-'.]+$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }

  return { isValid: true, value: trimmedName };
};

const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    // Phone is optional, so return empty string if not provided
    return { isValid: true, value: '' };
  }

  const trimmedPhone = phone.trim();
  if (trimmedPhone.length === 0) {
    return { isValid: true, value: '' };
  }

  if (trimmedPhone.length > 20) {
    return { isValid: false, error: 'Phone number is too long' };
  }

  // Allow various phone number formats: (123) 456-7890, 123-456-7890, +1-123-456-7890, etc.
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[1-9][\d]{0,2}[\s\-\(\)]*[\d\s\-\(\)]{7,15}$/;

  // More permissive regex that allows common phone number formats
  const simplePhoneRegex = /^[\+]?[\d\s\-\(\)\.]{7,20}$/;

  if (!simplePhoneRegex.test(trimmedPhone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  return { isValid: true, value: trimmedPhone };
};

const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required' };
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }



  if (trimmedMessage.length > 2000) {
    return { isValid: false, error: 'Message is too long (maximum 2000 characters)' };
  }

  // Basic sanitization - remove potentially harmful HTML/script content
  const sanitizedMessage = trimmedMessage
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  return { isValid: true, value: sanitizedMessage };
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export default async (req, res) => {
  const start = Date.now();

  try {
    // Check request method
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method Not Allowed',
        error: 'Only POST requests are allowed',
        results: false
      });
    }

    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({
        message: 'Bad Request',
        error: 'Request body is required',
        results: false
      });
    }

    const { name, email, phone, message } = req.body;

    // Validate all fields
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      return res.status(400).json({
        message: 'Validation Error',
        error: nameValidation.error,
        field: 'name',
        results: false
      });
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        message: 'Validation Error',
        error: emailValidation.error,
        field: 'email',
        results: false
      });
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      return res.status(400).json({
        message: 'Validation Error',
        error: phoneValidation.error,
        field: 'phone',
        results: false
      });
    }

    const messageValidation = validateMessage(message);
    if (!messageValidation.isValid) {
      return res.status(400).json({
        message: 'Validation Error',
        error: messageValidation.error,
        field: 'message',
        results: false
      });
    }

    // Additional security check - ensure no suspicious patterns in any field
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\(/i,
      /document\./i,
      /window\./i,
      /alert\(/i,
      /confirm\(/i,
      /prompt\(/i
    ];

    const allFields = [nameValidation.value, emailValidation.value, phoneValidation.value, messageValidation.value].join(' ');

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allFields)) {
        console.warn('Suspicious content detected in contact form submission');
        return res.status(400).json({
          message: 'Validation Error',
          error: 'Invalid content detected',
          results: false
        });
      }
    }

    // Rate limiting check (basic implementation)
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const currentTime = Date.now();

    // This is a basic rate limiting - in production, you'd want to use Redis or similar
    if (global.contactFormSubmissions && global.contactFormSubmissions[clientIP]) {
      const lastSubmission = global.contactFormSubmissions[clientIP];
      const timeDiff = currentTime - lastSubmission;

      // Allow only one submission per minute per IP
      if (timeDiff < 60000) {
        return res.status(429).json({
          message: 'Too Many Requests',
          error: 'Please wait before submitting another message',
          results: false
        });
      }
    }

    // Update rate limiting data
    if (!global.contactFormSubmissions) {
      global.contactFormSubmissions = {};
    }
    global.contactFormSubmissions[clientIP] = currentTime;

    // Process the validated and sanitized data
    await ContactSubmission({
      name: nameValidation.value,
      email: emailValidation.value,
      phone: phoneValidation.value,
      message: messageValidation.value
    });

    console.log(`Contact form submission processed successfully in ${Date.now() - start}ms`);

    return res.status(200).json({
      message: 'Successful',
      results: true
    });

  } catch (err) {
    console.error('Contact API Error:', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: 'Something went wrong on our end, please try again later',
      results: false
    });
  }
};
