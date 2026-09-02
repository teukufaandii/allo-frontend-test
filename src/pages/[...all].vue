<template>
  <div class="not-found-page-wrapper d-flex align-center justify-center py-16 px-4">
    <v-card
      class="not-found-card pa-8 pa-md-10 text-center"
      max-width="600"
      variant="outlined"
      elevation="6"
    >
      <div class="space-icon-box mb-6 mx-auto">
        <v-icon
          icon="mdi-compass-off-outline"
          color="primary"
          size="56"
        />
      </div>

      <div class="text-overline font-weight-black text-primary mb-1 tracking-widest">
        TELEMETRY ERROR 404
      </div>

      <h1 class="text-h4 font-weight-black text-white mb-3">
        Lost in Deep Space
      </h1>

      <p class="text-body-1 text-grey-lighten-2 mb-8 max-w-md mx-auto">
        The coordinates or trajectory you requested do not correspond to any active SpaceX launcher configuration or system page.
      </p>

      <v-btn
        to="/"
        color="primary"
        size="x-large"
        variant="flat"
        prepend-icon="mdi-rocket-launch"
        class="text-none font-weight-bold px-8 rounded-lg"
      >
        Return to Rocket Catalog
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
//
</script>

<style scoped>
.not-found-page-wrapper {
  min-height: 60vh;
  width: 100%;
}

.not-found-card {
  background: rgba(17, 24, 39, 0.85) !important;
  border: 1px solid rgba(56, 189, 248, 0.25) !important;
  border-radius: 24px !important;
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 50px -15px rgba(56, 189, 248, 0.15) !important;
}

.space-icon-box {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tracking-widest {
  letter-spacing: 3px !important;
}

.max-w-md {
  max-width: 440px;
}
</style>
