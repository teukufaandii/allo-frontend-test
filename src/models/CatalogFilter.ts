/**
 * Origin provenance filter options.
 * - 'all': All rockets
 * - 'spacex': Official SpaceX rockets from remote API
 * - 'custom': User-created local session rockets
 */
export type OriginFilter = 'all' | 'spacex' | 'custom'

/**
 * Filter state representing active search and filter constraints on the catalog.
 */
export interface CatalogFilterState {
  query: string
  origin: OriginFilter
}
