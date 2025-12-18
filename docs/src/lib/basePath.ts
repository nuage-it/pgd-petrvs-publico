/**
 * Returns the base path for assets and links.
 * In production, returns '/generated-docs'.
 * In development, returns empty string.
 */
export function getBasePath(): string {
  return process.env.NODE_ENV === 'production' ? '/generated-docs' : '';
}

/**
 * Prepends the base path to an asset path.
 * @param path - The asset path (e.g., '/govbr.webp')
 * @returns The path with base path prepended
 */
export function withBasePath(path: string): string {
  const basePath = getBasePath();
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  return `${basePath}/${path}`;
}
