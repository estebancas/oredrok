<script lang="ts">
  import PixelModal from './PixelModal.svelte';
  import PixelButton from './PixelButton.svelte';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    appStoreUrl?: string | null;
    playStoreUrl?: string | null;
    projectTitle: string;
  }

  let { isOpen = $bindable(), onClose, appStoreUrl, playStoreUrl, projectTitle }: Props = $props();
</script>

<PixelModal bind:isOpen {onClose} title="Check out the app" variant="blue" size="sm">
  {#snippet children()}
    <div class="app-store-content">
      <p class="app-store-description pixel-body">
        Choose your platform to download <strong>{projectTitle}</strong>
      </p>

      <div class="app-store-buttons">
        {#if appStoreUrl}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="app-store-link"
          >
            <img
              src="/images/app-store/app-store-badge.svg"
              alt="Download on the App Store"
              class="store-badge"
              onerror={(e) => (e.currentTarget as HTMLImageElement).src='https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg'}
            />
          </a>
        {/if}

        {#if playStoreUrl}
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="app-store-link"
          >
            <img
              src="/images/app-store/google-play-badge.png"
              alt="Get it on Google Play"
              class="store-badge"
              onerror={(e) => (e.currentTarget as HTMLImageElement).src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'}
            />
          </a>
        {/if}
      </div>

      <div class="app-store-footer">
        <PixelButton variant="blue" size="sm" onclick={onClose}>
          Close
        </PixelButton>
      </div>
    </div>
  {/snippet}
</PixelModal>

<style>
  .app-store-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .app-store-description {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-secondary);
    text-align: center;
  }

  .app-store-description strong {
    color: var(--text-primary);
  }

  .app-store-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: center;
  }

  .app-store-link {
    display: block;
    transition: transform 0.2s ease, filter 0.2s ease;
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .app-store-link:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .app-store-link:active {
    transform: scale(0.98);
  }

  .store-badge {
    width: 200px;
    height: auto;
    display: block;
  }

  .app-store-footer {
    display: flex;
    justify-content: center;
    padding-top: var(--spacing-md);
    border-top: 2px solid var(--border-pixel);
  }

  @media (max-width: 768px) {
    .app-store-description {
      font-size: 14px;
    }

    .store-badge {
      width: 180px;
    }
  }
</style>
