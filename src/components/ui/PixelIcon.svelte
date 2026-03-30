<script lang="ts">
  let { 
    name,
    color = 'currentColor', 
    class: className = '' 
  }: {
    name: 'sword' | 'shield' | 'chevron' | 'tome';
    color?: string;
    class?: string;
  } = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 16 16" 
  width="1em"
  height="1em"
  fill={color} 
  class={className}
>
  {#if name === 'sword'}
    <!-- Detailed pixel art fantasy sword with hollow fuller -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 1 h2 v1 h1 v8 h3 v2 h-2 v-1 h-2 v3 h1 v1 h-1 v1 h-2 v-1 h-1 v-1 h1 v-3 h-2 v1 h-2 v-2 h3 v-8 h1 Z M7 3 h2 v6 h-2 Z" />
  {:else if name === 'shield'}
    <!-- Classic crusader shield with cross cutout -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2 h12 v6 h-1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v1 h-2 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 Z M7 3 h2 v2 h3 v2 h-3 v3 h-2 v-3 h-3 v-2 h3 Z" />
  {:else if name === 'chevron'}
    <!-- Pixel chevron pointing right -->
    <path d="M4 2 h4 v4 h4 v4 h-4 v4 h-4 v-4 h4 v-4 h-4 Z" />
  {:else if name === 'tome'}
    <!-- Pixel art true magic tome with a ribbon and star -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3 h4 v1 h-4 Z M2 4 h1 v1 h-1 Z M1 5 h1 v7 h-1 Z M2 12 h1 v1 h-1 Z M3 13 h4 v1 h-4 Z M9 3 h4 v1 h-4 Z M13 4 h1 v1 h-1 Z M14 5 h1 v7 h-1 Z M13 12 h1 v1 h-1 Z M9 13 h4 v1 h-4 Z M7 4 h2 v10 h-2 Z M7 14 h1 v2 h-1 Z M8 14 h1 v1 h-1 Z M3 6 h3 v1 h-3 Z M3 8 h3 v1 h-3 Z M3 10 h3 v1 h-3 Z M11 6 h1 v1 h-1 Z M10 7 h3 v1 h-3 Z M11 8 h1 v1 h-1 Z M10 10 h2 v1 h-2 Z" />
  {/if}
</svg>
