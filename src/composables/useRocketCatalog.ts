import { computed, ref } from 'vue'
import type { Rocket, CreateRocketInput } from '@/models/Rocket'
import type { OriginFilter } from '@/models/CatalogFilter'
import type { AsyncStatus } from '@/models/AsyncState'
import type { IRocketService } from '@/services/IRocketService'
import { launchLibraryService } from '@/services/LaunchLibraryService'
import { RocketMapper } from '@/mappers/RocketMapper'

const STORAGE_KEY = 'allo_spacex_custom_rockets'

const apiRockets = ref<Rocket[]>([])
const customRockets = ref<Rocket[]>([])
const status = ref<AsyncStatus>('idle')
const error = ref<string | null>(null)
const searchQuery = ref<string>('')
const selectedOrigin = ref<OriginFilter>('all')

/**
 * Loads custom rockets stored in browser sessionStorage.
 */
function loadFromSessionStorage(): Rocket[] {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return []
  }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.warn('Failed to parse custom rockets from sessionStorage:', err)
    return []
  }
}

/**
 * Persists custom rockets array into browser sessionStorage.
 */
function saveToSessionStorage(rockets: Rocket[]): void {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rockets))
  } catch (err) {
    console.warn('Failed to save custom rockets to sessionStorage:', err)
  }
}

// Initialize custom rockets from sessionStorage on module load
if (typeof window !== 'undefined') {
  customRockets.value = loadFromSessionStorage()
}

/**
 * Composable for managing SpaceX Rocket Catalog state, async lifecycle, filtering, and storage synchronization.
 *
 * @param service Optional injected rocket service (defaults to launchLibraryService)
 */
export function useRocketCatalog(service: IRocketService = launchLibraryService) {
  /** Combined rocket inventory (custom rockets prepended before remote API rockets) */
  const rockets = computed<Rocket[]>(() => {
    return [...customRockets.value, ...apiRockets.value]
  })

  /** Filtered and searched rocket catalog */
  const filteredRockets = computed<Rocket[]>(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const origin = selectedOrigin.value

    return rockets.value.filter((rocket) => {
      if (origin === 'spacex' && rocket.isLocal) {
        return false
      }
      if (origin === 'custom' && !rocket.isLocal) {
        return false
      }

      if (query !== '') {
        const nameMatch = rocket.name.toLowerCase().includes(query)
        const descMatch = rocket.description.toLowerCase().includes(query)
        if (!nameMatch && !descMatch) {
          return false
        }
      }

      return true
    })
  })

  const loading = computed(() => status.value === 'loading')
  const isSuccess = computed(() => status.value === 'success')

  /**
   * Fetches rocket configurations from remote service and rehydrates custom rockets.
   *
   * @param force Force re-fetch even if data is already cached
   */
  async function loadRockets(force = false): Promise<void> {
    if (status.value === 'loading') return
    if (!force && apiRockets.value.length > 0 && status.value === 'success') {
      return
    }

    status.value = 'loading'
    error.value = null

    customRockets.value = loadFromSessionStorage()

    try {
      const fetched = await service.fetchRockets()
      apiRockets.value = fetched
      status.value = 'success'
    } catch (err) {
      status.value = 'error'
      error.value = err instanceof Error ? err.message : 'An unknown error occurred while retrieving rockets.'
    }
  }

  /**
   * Adds a new custom rocket to the catalog, prepends it to the list,
   * and persists it to sessionStorage.
   *
   * @param input User input data
   */
  function addCustomRocket(input: CreateRocketInput): Rocket {
    const newRocket = RocketMapper.fromCreateInput(input)
    customRockets.value = [newRocket, ...customRockets.value]
    saveToSessionStorage(customRockets.value)
    return newRocket
  }

  /**
   * Finds a rocket by its unique ID (numeric or string) in the current inventory.
   *
   * @param id Rocket ID
   */
  function getRocketById(id: string | number): Rocket | undefined {
    const targetId = String(id)
    return rockets.value.find(r => String(r.id) === targetId)
  }

  return {
    rockets,
    filteredRockets,
    searchQuery,
    selectedOrigin,
    status,
    loading,
    error,
    isSuccess,
    loadRockets,
    addCustomRocket,
    getRocketById,
  }
}
