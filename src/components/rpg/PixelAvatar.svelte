<script lang="ts">
  import { onMount } from 'svelte';
  import { float } from '$lib/animations';

  interface Props {
    src?: string;
    alt?: string;
    size?: number;
    enableFloat?: boolean;
    class?: string;
  }

  let {
    src = '/avatar-placeholder.svg',
    alt = 'Avatar',
    size = 128,
    enableFloat = true,
    class: className = ''
  }: Props = $props();

  let avatarElement: HTMLDivElement;

  onMount(() => {
    if (enableFloat && avatarElement) {
      float(avatarElement, 5, 3);
    }
  });
</script>

<div
  bind:this={avatarElement}
  class="pixel-avatar {className}"
  style="width: {size}px; height: {size}px;"
>
  <img src={src} {alt} class="avatar-image" />
</div>

<style>
  .pixel-avatar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: var(--border-rpg-thick) solid var(--color-border);
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--color-panel) 0%, #0a1220 100%);
    overflow: hidden;
    transition: border-color var(--duration-normal) var(--ease-out),
                transform var(--duration-normal) var(--ease-out);
  }

  .pixel-avatar::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(245, 166, 35, 0.1) 50%,
      transparent 70%
    );
    background-size: 200% 200%;
    animation: shimmer 3s ease-in-out infinite;
    pointer-events: none;
  }

  .pixel-avatar:hover {
    border-color: var(--color-accent);
    transform: scale(1.05);
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: pixelated;
    animation: breathe 3s ease-in-out infinite;
  }

  @keyframes breathe {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 200%;
    }
    100% {
      background-position: -200% -200%;
    }
  }
</style>
