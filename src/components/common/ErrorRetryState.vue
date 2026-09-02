<template>
  <div class="error-retry-container d-flex align-center justify-center py-12 px-4">
    <v-card
      class="error-card pa-6 text-center"
      max-width="560"
      elevation="4"
    >
      <!-- Error / Offline Icon -->
      <div class="icon-wrapper mb-4 mx-auto">
        <v-icon
          icon="mdi-satellite-variant"
          color="error"
          size="48"
        />
      </div>

      <!-- Title -->
      <h2 class="text-h5 font-weight-bold mb-2 text-white">
        {{ title }}
      </h2>

      <!-- Description / Message -->
      <p class="text-body-1 text-grey-lighten-1 mb-6">
        {{ message }}
      </p>

      <!-- Troubleshooting hint -->
      <v-sheet
        class="pa-3 mb-6 rounded-lg text-caption text-grey-lighten-2 text-left"
        color="surface-variant"
        elevation="0"
      >
        <div class="d-flex align-center mb-1 font-weight-medium">
          <v-icon
            icon="mdi-information-outline"
            size="16"
            class="mr-1 text-warning"
          />
          Troubleshooting Notes:
        </div>
        <ul class="pl-5 ma-0 text-grey-lighten-1">
          <li>Check if you have an active network connection</li>
          <li>Launch Library API rate limits (15 requests/hour on free tier) may require waiting a moment</li>
        </ul>
      </v-sheet>

      <!-- Action Button -->
      <v-btn
        color="primary"
        size="large"
        variant="flat"
        prepend-icon="mdi-refresh"
        :loading="loading"
        :disabled="loading"
        class="px-6 font-weight-bold text-none rounded-lg"
        @click="$emit('retry')"
      >
        Retry Telemetry
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  message?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Telemetry Connection Error',
  message: 'Unable to connect to Launch Library API. Please check your internet connection and try again.',
  loading: false,
})

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<style scoped>
.error-retry-container {
  width: 100%;
  min-height: 380px;
}

.error-card {
  background: rgba(17, 24, 39, 0.9) !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px -10px rgba(239, 68, 68, 0.2) !important;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(239, 68, 68, 0.25);
}
</style>
