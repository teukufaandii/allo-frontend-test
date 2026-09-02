import type { Rocket, CreateRocketInput } from '../models/Rocket'
import type { LaunchLibraryLauncherConfigDto } from '../services/dto/LaunchLibraryDto'

/**
 * Normalization and sanitization mapper for converting raw API DTOs and local creation payloads
 * into strongly-typed domain Rocket entities.
 */
export class RocketMapper {
  /**
   * Normalizes a raw Launch Library launcher configuration DTO into a domain Rocket entity
   * with defensive fallbacks for missing/null attributes.
   *
   * @param dto External API DTO
   */
  static dtoToDomain(dto: LaunchLibraryLauncherConfigDto): Rocket {
    let launchCost: number | null = null
    if (typeof dto.launch_cost === 'number' && !Number.isNaN(dto.launch_cost)) {
      launchCost = dto.launch_cost
    } else if (typeof dto.launch_cost === 'string' && dto.launch_cost.trim() !== '') {
      const parsed = Number(dto.launch_cost)
      if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
        launchCost = parsed
      }
    }

    const name = dto.full_name?.trim() || dto.name?.trim() || 'Unnamed Rocket'
    const description = dto.description?.trim() || 'No description available.'
    const imageUrl = dto.image_url?.trim() || null
    const country = dto.manufacturer?.country_code?.trim() || dto.manufacturer?.name?.trim() || 'Unknown'
    const maidenFlight = dto.maiden_flight?.trim() || null

    return {
      id: dto.id,
      name,
      description,
      imageUrl,
      launchCost,
      country,
      maidenFlight,
      isLocal: false,
    }
  }

  /**
   * Transforms an array of Launch Library launcher config DTOs into domain Rocket entities.
   *
   * @param dtos Array of external API DTOs
   */
  static listDtoToDomain(dtos: LaunchLibraryLauncherConfigDto[] | null | undefined): Rocket[] {
    if (!dtos || !Array.isArray(dtos)) {
      return []
    }
    return dtos.map(dto => RocketMapper.dtoToDomain(dto))
  }

  /**
   * Converts a user creation payload into a domain Rocket entity.
   *
   * @param input User input data
   * @param generatedId Optional pre-generated ID
   */
  static fromCreateInput(input: CreateRocketInput, generatedId?: string | number): Rocket {
    const id = generatedId ?? `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const name = input.name?.trim() || 'Unnamed Rocket'
    const description = input.description?.trim() || 'No description available.'
    const imageUrl = input.imageUrl?.trim() || null

    let launchCost: number | null = null
    if (input.launchCost !== undefined && input.launchCost !== null) {
      const parsed = Number(input.launchCost)
      if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
        launchCost = parsed
      }
    }

    const country = input.country?.trim() || 'Unknown'
    const maidenFlight = input.maidenFlight?.trim() || null

    return {
      id,
      name,
      description,
      imageUrl,
      launchCost,
      country,
      maidenFlight,
      isLocal: true,
    }
  }
}
