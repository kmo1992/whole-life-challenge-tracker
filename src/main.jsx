import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// registerType is 'autoUpdate' makes a new service worker activate
// immediately (skipWaiting + clientsClaim), but the plugin leaves two gaps
// this file has to fill itself:
//
// 1. The browser only looks for a new worker on navigation — and iOS resumes
//    installed PWAs (and desktop keeps tabs sitting open) with no navigation
//    — so we run the check on focus/visibility and hourly.
// 2. Nothing reloads the page when the new worker takes control, so the tab
//    keeps running the old bundle until a manual reload (verified: shipped
//    bundles contain no controllerchange listener). We reload ourselves —
//    unless a workout is on screen, where losing the timer/recording would
//    be worse than staying one version behind.
if ('serviceWorker' in navigator) {
  let hadController = !!navigator.serviceWorker.controller
  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // The very first install claiming this page is not an update
    if (!hadController) {
      hadController = true
      return
    }
    if (refreshing) return
    if (document.querySelector('.flow-timer-overlay')) return
    refreshing = true
    window.location.reload()
  })
}

registerSW({
  immediate: true,
  onRegisteredSW(swUrl, registration) {
    if (!registration) return
    const checkForUpdate = () => registration.update().catch(() => {})
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdate()
    })
    // visibilitychange misses app switches that never occlude the window
    // (common on macOS) — focus fires regardless
    window.addEventListener('focus', checkForUpdate)
    window.setInterval(checkForUpdate, 60 * 60 * 1000)
  },
})
