import { createHash } from 'crypto';

import type { NextApiRequest } from 'next';

export const getSessionId = (req: NextApiRequest) => {
  // Get IP address from headers, handling both string and array formats
  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : Array.isArray(forwarded)
      ? forwarded[0]
      : 'localhost';

  // Use SHA-256 (cryptographically stronger than MD5) to hash the user's
  // IP address combined with a salt to create a unique session ID that
  // preserves the user's privacy by obscuring their IP address.
  const salt = process.env.SALT_IP_ADDRESS || '';
  const currentSessionId = createHash('sha256')
    .update(`${salt}:${ipAddress}`, 'utf-8')
    .digest('hex');

  return currentSessionId;
};
