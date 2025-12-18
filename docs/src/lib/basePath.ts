/**
 * Returns the base path for assets and links.
 * In production (GitHub Pages), returns '/pgd-petrvs-publico'.
 * In development, returns empty string.
 */
export function getBasePath(): string {
  return process.env.NODE_ENV === 'production' ? '/pgd-petrvs-publico' : '';
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
