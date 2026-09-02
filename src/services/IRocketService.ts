import type { Rocket } from '../models/Rocket'

/**
 * Service interface abstraction for rocket data operations.
 * Decouples domain/presentation layers from concrete HTTP transport implementations.
 */
export interface IRocketService {
  /**
   * Fetches all SpaceX rocket configurations.
   * Normalizes external API schemas into domain Rocket models.
   * @throws Error with user-friendly message on network or HTTP failure
   */
  fetchRockets(): Promise<Rocket[]>

  /**
   * Fetches a single rocket configuration by ID.
   * @param id Rocket unique identifier
   * @throws Error if rocket is not found or request fails
   */
  fetchRocketById(id: string | number): Promise<Rocket>
}
