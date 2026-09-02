import { ref, watch, unref, type MaybeRef } from 'vue'
import type { Rocket } from '@/models/Rocket'
import type { IRocketService } from '@/services/IRocketService'
import { launchLibraryService } from '@/services/LaunchLibraryService'
import { useRocketCatalog } from './useRocketCatalog'

/**
 * Composable for single rocket lookup by ID with in-memory caching,
 * remote API fetching, and fallback handling.
 *
 * @param rocketId Target rocket ID (reactive ref or primitive)
 * @param service Optional injected rocket service
 */
export function useRocketDetail(
  rocketId: MaybeRef<string | number>,
  service: IRocketService = launchLibraryService,
) {
  const { getRocketById, loadRockets, rockets } = useRocketCatalog(service)

  const rocket = ref<Rocket | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const notFound = ref(false)

  /**
   * Resolves the rocket entity by checking in-memory catalog first,
   * then falling back to remote single-lookup or catalog fetch.
   *
   * @param idOverride Optional ID override
   */
  async function loadRocket(idOverride?: string | number): Promise<void> {
    const rawId = idOverride ?? unref(rocketId)
    if (rawId === undefined || rawId === null || rawId === '') {
      notFound.value = true
      return
    }

    const idStr = String(rawId)
    loading.value = true
    error.value = null
    notFound.value = false

    const cached = getRocketById(idStr)
    if (cached) {
      rocket.value = cached
      loading.value = false
      return
    }

    if (idStr.startsWith('custom-')) {
      if (rockets.value.length === 0) {
        await loadRockets()
        const customFound = getRocketById(idStr)
        if (customFound) {
          rocket.value = customFound
          loading.value = false
          return
        }
      }
      notFound.value = true
      loading.value = false
      return
    }

    try {
      const fetched = await service.fetchRocketById(idStr)
      rocket.value = fetched
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      if (message.includes('not found') || message.includes('404')) {
        notFound.value = true
      } else {
        error.value = message
      }
    } finally {
      loading.value = false
    }
  }

  watch(
    () => unref(rocketId),
    (newId) => {
      if (newId) {
        loadRocket(newId)
      }
    },
    { immediate: true },
  )

  return {
    rocket,
    loading,
    error,
    notFound,
    loadRocket,
  }
}
