import { reactive, ref } from 'vue'
import type { Rocket, CreateRocketInput } from '@/models/Rocket'
import { useRocketCatalog } from './useRocketCatalog'

export interface CreateRocketFormState {
  name: string
  description: string
  launchCost: string
  country: string
  maidenFlight: string
  imageUrl: string
}

const INITIAL_FORM_STATE: CreateRocketFormState = {
  name: '',
  description: '',
  launchCost: '',
  country: '',
  maidenFlight: '',
  imageUrl: '',
}

/**
 * Composable for managing custom rocket form inputs, validation rules,
 * and dispatching creation to the central catalog store.
 */
export function useCreateRocket() {
  const { addCustomRocket } = useRocketCatalog()

  const form = reactive<CreateRocketFormState>({ ...INITIAL_FORM_STATE })
  const errors = reactive<Record<string, string>>({})
  const isSubmitting = ref(false)

  /**
   * Resets form fields and clears all validation error messages.
   */
  function resetForm(): void {
    Object.assign(form, INITIAL_FORM_STATE)
    Object.keys(errors).forEach(key => delete errors[key])
  }

  /**
   * Validates form fields according to domain constraints.
   * Returns true if valid, false otherwise.
   */
  function validate(): boolean {
    Object.keys(errors).forEach(key => delete errors[key])
    let isValid = true

    // 1. Name validation (mandatory, min 2 chars, max 100 chars)
    const trimmedName = form.name.trim()
    if (!trimmedName) {
      errors.name = 'Rocket designation/name is required.'
      isValid = false
    } else if (trimmedName.length < 2) {
      errors.name = 'Rocket name must be at least 2 characters long.'
      isValid = false
    } else if (trimmedName.length > 100) {
      errors.name = 'Rocket name cannot exceed 100 characters.'
      isValid = false
    }

    // 2. Description validation (optional, max 1000 chars)
    if (form.description && form.description.length > 1000) {
      errors.description = 'Description cannot exceed 1000 characters.'
      isValid = false
    }

    // 3. Launch Cost validation (optional, non-negative numeric)
    if (form.launchCost !== '') {
      const parsedCost = Number(form.launchCost)
      if (Number.isNaN(parsedCost) || parsedCost < 0) {
        errors.launchCost = 'Launch cost must be a valid non-negative number.'
        isValid = false
      }
    }

    // 4. Country validation (optional, max 50 chars)
    if (form.country && form.country.length > 50) {
      errors.country = 'Country code/name cannot exceed 50 characters.'
      isValid = false
    }

    // 5. Maiden Flight Date validation (optional, format YYYY-MM-DD if provided)
    if (form.maidenFlight) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(form.maidenFlight.trim())) {
        errors.maidenFlight = 'Maiden flight must be a valid date formatted as YYYY-MM-DD.'
        isValid = false
      }
    }

    // 6. Image URL validation (optional, must be valid URL if provided)
    if (form.imageUrl && form.imageUrl.trim() !== '') {
      try {
        const url = new URL(form.imageUrl.trim())
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          errors.imageUrl = 'Image URL must use http:// or https:// protocol.'
          isValid = false
        }
      } catch {
        errors.imageUrl = 'Please enter a valid image URL.'
        isValid = false
      }
    }

    return isValid
  }

  /**
   * Submits the custom rocket payload after successful validation.
   *
   * @returns Newly created Rocket entity or null if validation failed
   */
  function submit(): Rocket | null {
    if (!validate()) {
      return null
    }

    isSubmitting.value = true

    const payload: CreateRocketInput = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      launchCost: form.launchCost !== '' ? Number(form.launchCost) : null,
      country: form.country.trim() || null,
      maidenFlight: form.maidenFlight.trim() || null,
      imageUrl: form.imageUrl.trim() || null,
    }

    try {
      const createdRocket = addCustomRocket(payload)
      resetForm()
      return createdRocket
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    validate,
    submit,
    resetForm,
  }
}
