<template>
  <div class="loading-state-container py-6">
    <!-- Top Status Banner with Progress Bar -->
    <v-card
      class="mb-6 loading-banner-card px-4 py-3"
      variant="outlined"
      elevation="0"
    >
      <div class="d-flex align-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="24"
          width="2.5"
          class="mr-3"
        />
        <div>
          <div class="text-subtitle-2 font-weight-medium text-primary">
            {{ message }}
          </div>
          <div class="text-caption text-grey-lighten-1">
            Establishing connection to Launch Library 2 telemetry services...
          </div>
        </div>
      </div>
      <v-progress-linear
        indeterminate
        color="primary"
        height="2"
        class="mt-3 rounded"
      />
    </v-card>

    <!-- Skeleton Card Grid -->
    <v-row>
      <v-col
        v-for="index in count"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="skeleton-card h-100"
          variant="outlined"
        >
          <!-- Image skeleton -->
          <v-skeleton-loader
            type="image"
            height="200"
            class="skeleton-image"
          />

          <v-card-text class="pa-4">
            <!-- Chip / Origin placeholder -->
            <v-skeleton-loader
              type="chip"
              class="mb-3"
            />

            <!-- Title placeholder -->
            <v-skeleton-loader
              type="heading"
              class="mb-2"
            />

            <!-- Description paragraph placeholder -->
            <v-skeleton-loader
              type="paragraph"
              class="mb-3"
            />

            <!-- Specs summary placeholder -->
            <v-skeleton-loader
              type="text"
              class="mt-4"
            />
          </v-card-text>

          <v-card-actions class="px-4 pb-4 pt-0">
            <v-skeleton-loader
              type="button"
              class="w-100"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  count?: number
  message?: string
}

withDefaults(defineProps<Props>(), {
  count: 8,
  message: 'Retrieving SpaceX launch vehicle catalog...',
})
</script>

<style scoped>
.loading-state-container {
  width: 100%;
}

.loading-banner-card {
  background: rgba(17, 24, 39, 0.7) !important;
  border-color: rgba(56, 189, 248, 0.25) !important;
  backdrop-filter: blur(8px);
}

.skeleton-card {
  background: rgba(17, 24, 39, 0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 12px !important;
  overflow: hidden;
}

.skeleton-image {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
</style>
