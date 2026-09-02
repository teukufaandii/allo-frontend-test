import type { Rocket } from '../models/Rocket'
import type { IRocketService } from './IRocketService'
import type {
  LaunchLibraryLauncherConfigDto,
  LaunchLibraryListResponseDto,
} from './dto/LaunchLibraryDto'
import { RocketMapper } from '../mappers/RocketMapper'

/**
 * Concrete HTTP client communicating with Launch Library 2 API (v2.2.0)
 * for SpaceX launch vehicle configurations.
 */
export class LaunchLibraryService implements IRocketService {
  private readonly baseUrl: string
  private readonly fetchFn: typeof fetch

  constructor(
    baseUrl = 'https://lldev.thespacedevs.com/2.2.0',
    fetchFn: typeof fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.fetchFn = fetchFn
  }

  /**
   * Fetches all SpaceX rocket configurations from Launch Library 2.
   *
   * @throws Error on network failure or unexpected HTTP status
   */
  async fetchRockets(): Promise<Rocket[]> {
    const url = `${this.baseUrl}/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20`

    let response: Response
    try {
      response = await this.fetchFn(url, {
        headers: {
          Accept: 'application/json',
        },
      })
    } catch {
      throw new Error(
        'Unable to connect to Launch Library API. Please check your internet connection and try again.',
      )
    }

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Launch Library API rate limit reached. Please wait a moment and try again.')
      }
      if (response.status >= 500) {
        throw new Error('Launch Library API server error. Please try again later.')
      }
      throw new Error(`Failed to fetch rockets from Launch Library API (HTTP ${response.status}).`)
    }

    try {
      const data = (await response.json()) as LaunchLibraryListResponseDto
      return RocketMapper.listDtoToDomain(data.results)
    } catch {
      throw new Error('Failed to parse response from Launch Library API.')
    }
  }

  /**
   * Fetches a single rocket configuration by ID.
   *
   * @param id Rocket ID
   * @throws Error if not found or network fails
   */
  async fetchRocketById(id: string | number): Promise<Rocket> {
    const url = `${this.baseUrl}/config/launcher/${id}/`

    let response: Response
    try {
      response = await this.fetchFn(url, {
        headers: {
          Accept: 'application/json',
        },
      })
    } catch {
      throw new Error(
        'Unable to connect to Launch Library API. Please check your internet connection and try again.',
      )
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Rocket with ID ${id} was not found.`)
      }
      if (response.status === 429) {
        throw new Error('Launch Library API rate limit reached. Please wait a moment and try again.')
      }
      throw new Error(`Failed to fetch rocket with ID ${id} (HTTP ${response.status}).`)
    }

    try {
      const data = (await response.json()) as LaunchLibraryLauncherConfigDto
      return RocketMapper.dtoToDomain(data)
    } catch {
      throw new Error(`Failed to parse details for rocket with ID ${id}.`)
    }
  }
}

/** Default singleton instance for standard application usage */
export const launchLibraryService = new LaunchLibraryService()
