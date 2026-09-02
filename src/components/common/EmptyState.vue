<template>
  <div class="empty-state-wrapper py-12 px-4 d-flex align-center justify-center">
    <v-card
      class="empty-card pa-8 text-center"
      max-width="520"
      variant="outlined"
      elevation="2"
    >
      <!-- Empty Icon Circle -->
      <div class="icon-bubble mb-4 mx-auto">
        <v-icon
          icon="mdi-filter-off-outline"
          color="primary"
          size="44"
        />
      </div>

      <!-- Title -->
      <h3 class="text-h5 font-weight-bold text-white mb-2">
        {{ title }}
      </h3>

      <!-- Message -->
      <p class="text-body-1 text-grey-lighten-2 mb-6">
        {{ message }}
      </p>

      <!-- Action Button -->
      <v-btn
        v-if="showReset"
        color="primary"
        variant="tonal"
        size="large"
        prepend-icon="mdi-filter-remove-outline"
        class="text-none font-weight-bold px-6 rounded-lg"
        @click="$emit('reset')"
      >
        {{ resetLabel }}
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  message?: string
  showReset?: boolean
  resetLabel?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No Matching Launch Vehicles',
  message: 'No rocket configurations matched your active search query or origin filter criteria.',
  showReset: true,
  resetLabel: 'Clear Search & Filters',
})

defineEmits<{
  (e: 'reset'): void
}>()
</script>

<style scoped>
.empty-state-wrapper {
  width: 100%;
  min-height: 320px;
}

.empty-card {
  background: rgba(17, 24, 39, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 20px !important;
  backdrop-filter: blur(12px);
}

.icon-bubble {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
