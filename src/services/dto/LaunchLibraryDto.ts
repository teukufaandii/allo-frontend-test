/**
 * Data Transfer Objects (DTO) representing the raw response schemas from
 * Launch Library 2 API (v2.2.0) launcher config endpoints.
 */

export interface LaunchLibraryManufacturerDto {
  id?: number
  url?: string
  name?: string
  country_code?: string | null
}

export interface LaunchLibraryLauncherConfigDto {
  id: number
  url?: string
  name?: string
  full_name?: string | null
  description?: string | null
  launch_cost?: string | number | null
  maiden_flight?: string | null
  image_url?: string | null
  manufacturer?: LaunchLibraryManufacturerDto | null
}

export interface LaunchLibraryListResponseDto {
  count: number
  next?: string | null
  previous?: string | null
  results: LaunchLibraryLauncherConfigDto[]
}
