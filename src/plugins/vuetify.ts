/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#38bdf8',
          secondary: '#818cf8',
          accent: '#c084fc',
          background: '#0b0f19',
          surface: '#111827',
          'surface-variant': '#1f2937',
          'on-surface-variant': '#9ca3af',
          error: '#ef4444',
          info: '#38bdf8',
          success: '#10b981',
          warning: '#f59e0b',
        },
      },
    },
  },
})

