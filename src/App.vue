<template>
  <v-app class="app-root">
    <!-- Top Navigation Bar -->
    <v-app-bar
      class="app-header px-4"
      color="background"
      elevation="0"
      border="b"
      density="comfortable"
    >
      <v-container class="d-flex align-center justify-space-between pa-0 max-w-container">
        <!-- Logo & Title Link to Home -->
        <router-link
          to="/"
          class="d-flex align-center text-decoration-none brand-link"
        >
          <div class="brand-icon-wrapper mr-3">
            <v-icon
              icon="mdi-rocket-launch-outline"
              color="primary"
              size="22"
            />
          </div>
          <div>
            <div class="text-subtitle-1 font-weight-black text-white brand-text">
              SPACEX <span class="text-primary">CATALOG</span>
            </div>
            <div class="text-caption text-grey-lighten-1 brand-subtext">
              Fleet & Launch Vehicle Explorer
            </div>
          </div>
        </router-link>

        <!-- Right Bar Meta Status -->
        <div class="d-flex align-center">
          <v-chip
            size="small"
            variant="tonal"
            color="primary"
            class="d-none d-sm-inline-flex font-weight-medium"
            prepend-icon="mdi-satellite-uptime"
          >
            LL2 API v2.2.0
          </v-chip>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content Container -->
    <v-main class="main-content">
      <v-container class="py-6 px-4 px-md-6 max-w-container">
        <router-view />
      </v-container>
    </v-main>

    <!-- Minimal Clean Footer -->
    <v-footer
      color="background"
      border="t"
      class="app-footer py-4 text-center text-caption text-grey-lighten-1 d-flex flex-column align-center"
    >
      <div class="mb-1">
        SpaceX Rocket Catalog • Powered by Vue 3, TypeScript & Vuetify 3
      </div>
      <div class="text-grey-darken-1">
        Data sourced from Launch Library 2 API (The Space Devs)
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

<style scoped>
.app-root {
  background: radial-gradient(ellipse at 50% -20%, #1e293b 0%, #0b0f19 70%) fixed !important;
  min-height: 100vh;
  color: #f3f4f6;
}

.app-header {
  background: rgba(11, 15, 25, 0.85) !important;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.max-w-container {
  max-width: 1320px;
}

.brand-link {
  color: inherit;
}

.brand-icon-wrapper {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.brand-link:hover .brand-icon-wrapper {
  transform: scale(1.05);
  border-color: #38bdf8;
}

.brand-text {
  letter-spacing: 1.5px;
  line-height: 1.2;
}

.brand-subtext {
  font-size: 11px;
  line-height: 1;
}

.main-content {
  min-height: calc(100vh - 120px);
}

.app-footer {
  background: rgba(11, 15, 25, 0.95) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>
