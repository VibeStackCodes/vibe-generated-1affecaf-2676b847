/**
 * ID Generator Utility
 * Generates unique identifiers with prefixes for different resource types
 */

/**
 * Generate a unique ID with a prefix
 * @param prefix - Resource type prefix (e.g., 'trx', 'cat', 'usr', 'card')
 * @returns A unique ID string
 */
export const generateId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}_${randomStr}`;
};

/**
 * Parse prefix from ID
 */
export const getPrefixFromId = (id: string): string => {
  return id.split('_')[0];
};

/**
 * Check if ID has a specific prefix
 */
export const hasPrefix = (id: string, prefix: string): boolean => {
  return getPrefixFromId(id) === prefix;
};
