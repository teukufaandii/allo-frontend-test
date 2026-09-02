<template>
  <v-dialog
    v-model="dialogModel"
    max-width="640"
    persistent
    scrollable
  >
    <v-card
      class="add-rocket-dialog-card rounded-xl"
      variant="outlined"
      elevation="8"
    >
      <!-- Dialog Header -->
      <v-card-title class="dialog-header pa-5 d-flex align-center justify-space-between border-b">
        <div class="d-flex align-center">
          <div class="icon-badge mr-3">
            <v-icon
              icon="mdi-rocket-launch-outline"
              color="primary"
              size="22"
            />
          </div>
          <div>
            <div class="text-h6 font-weight-bold text-white">
              Add Custom Rocket
            </div>
            <div class="text-caption text-grey-lighten-1">
              Configure a local vehicle configuration for this session
            </div>
          </div>
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          color="grey-lighten-1"
          @click="handleCancel"
        />
      </v-card-title>

      <!-- Dialog Body / Form -->
      <v-card-text class="dialog-body pa-5 pa-sm-6">
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <!-- 1. Rocket Designation / Name (Mandatory) -->
            <v-col
              cols="12"
              class="py-2"
            >
              <label class="form-label text-caption font-weight-bold text-grey-lighten-1 mb-1 d-block">
                Rocket Designation / Name <span class="text-error">*</span>
              </label>
              <v-text-field
                v-model="form.name"
                placeholder="e.g. Starship HLS Lunar Lander"
                variant="outlined"
                density="comfortable"
                bg-color="surface-variant"
                counter="100"
                :error-messages="errors.name"
                class="form-field rounded-lg"
                prepend-inner-icon="mdi-format-title"
                clearable
              />
            </v-col>

            <!-- 2. Description (Optional) -->
            <v-col
              cols="12"
              class="py-2"
            >
              <label class="form-label text-caption font-weight-bold text-grey-lighten-1 mb-1 d-block">
                Vehicle Overview / Description
              </label>
              <v-textarea
                v-model="form.description"
                placeholder="Detailed vehicle configuration, booster architecture, and payload specs..."
                variant="outlined"
                density="comfortable"
                bg-color="surface-variant"
                rows="3"
                counter="1000"
                :error-messages="errors.description"
                class="form-field rounded-lg"
                prepend-inner-icon="mdi-text-box-outline"
                clearable
              />
            </v-col>

            <!-- 3. Launch Cost (Optional) -->
            <v-col
              cols="12"
              sm="6"
              class="py-2"
            >
              <label class="form-label text-caption font-weight-bold text-grey-lighten-1 mb-1 d-block">
                Estimated Launch Cost (USD)
              </label>
              <v-text-field
                v-model="form.launchCost"
                type="number"
                min="0"
                step="100000"
                placeholder="e.g. 100000000"
                prefix="$"
                variant="outlined"
                density="comfortable"
                bg-color="surface-variant"
                :error-messages="errors.launchCost"
                class="form-field rounded-lg"
                prepend-inner-icon="mdi-currency-usd"
                clearable
              />
            </v-col>

            <!-- 4. Country / Manufacturer (Optional) -->
            <v-col
              cols="12"
              sm="6"
              class="py-2"
            >
              <label class="form-label text-caption font-weight-bold text-grey-lighten-1 mb-1 d-block">
                Country / Origin
              </label>
              <v-text-field
                v-model="form.country"
                placeholder="e.g. USA"
                variant="outlined"
                density="comfortable"
                bg-color="surface-variant"
                :error-messages="errors.country"
                class="form-field rounded-lg"
                prepend-inner-icon="mdi-earth"
                clearable
              />
            </v-col>

            <!-- 5. Maiden Flight Date (Optional) -->
            <v-col
              cols="12"
              sm="6"
              class="py-2"
            >
              <label class="form-label text-caption font-weight-bold text-grey-lighten-1 mb-1 d-block">
                Maiden Flight Date
              </label>
              <v-text-field
                v-model="form.maidenFlight"
                type="date"
                placeholder="YYYY-MM-DD"
                variant="outlined"
                density="comfortable"
                bg-color="surface-variant"
                :error-messages="errors.maidenFlight"
                class="form-field rounded-lg"
                prepend-inner-icon="mdi-calendar-star"
                clearable
              />
            </v-col>

            <!-- 6. Photograph Image URL (Optional) -->
            <v-col
              cols="12"
              sm="6"
              class="py-2"
            >
              <label class="form-label text-caption font-weight-bold text-grey-lighten-1 mb-1 d-block">
                Image Preview URL
              </label>
              <v-text-field
                v-model="form.imageUrl"
                placeholder="https://..."
                variant="outlined"
                density="comfortable"
                bg-color="surface-variant"
                :error-messages="errors.imageUrl"
                class="form-field rounded-lg"
                prepend-inner-icon="mdi-image-outline"
                clearable
              />
            </v-col>
          </v-row>

          <!-- Defensive Hint Sheet -->
          <v-sheet
            color="surface-variant"
            class="pa-3 mt-2 rounded-lg d-flex align-start text-caption text-grey-lighten-1 border-subtle"
            elevation="0"
          >
            <v-icon
              icon="mdi-information-outline"
              size="18"
              class="mr-2 text-primary mt-0.5"
            />
            <div>
              Custom configurations are preserved in active session memory (<code class="text-primary">sessionStorage</code>) across browser page refreshes. Leave Image URL empty to use the stylized SVG rocket graphic.
            </div>
          </v-sheet>
        </v-form>
      </v-card-text>

      <!-- Dialog Actions -->
      <v-card-actions class="dialog-actions pa-5 d-flex justify-end gap-2 border-t">
        <v-btn
          variant="tonal"
          color="grey-lighten-1"
          class="text-none font-weight-medium px-4"
          @click="handleCancel"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-plus"
          :loading="isSubmitting"
          class="text-none font-weight-bold px-6 text-black"
          @click="handleSubmit"
        >
          Create Rocket Configuration
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Rocket } from '@/models/Rocket'
import { useCreateRocket } from '@/composables/useCreateRocket'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'created', rocket: Rocket): void
}>()

const dialogModel = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const {
  form,
  errors,
  isSubmitting,
  submit,
  resetForm,
} = useCreateRocket()

function handleCancel() {
  resetForm()
  dialogModel.value = false
}

function handleSubmit() {
  const newRocket = submit()
  if (newRocket) {
    emit('created', newRocket)
    dialogModel.value = false
  }
}
</script>

<style scoped>
.add-rocket-dialog-card {
  background: rgba(17, 24, 39, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  backdrop-filter: blur(20px);
}

.icon-badge {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.border-t {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.form-label {
  letter-spacing: 0.5px;
}

.gap-2 {
  gap: 8px;
}
</style>
