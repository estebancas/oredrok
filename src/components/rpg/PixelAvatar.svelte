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
    border: var(--border-thick) solid;
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
