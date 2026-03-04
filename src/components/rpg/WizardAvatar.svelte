<script lang="ts">
  interface Props {
    class?: string;
    size?: string;
  }

  let { class: className = '', size = 'w-32 h-32' }: Props = $props();

  const matrix = [
    // 01234567890123456789012345678901
    "................................",
    "......................YY........",
    "........KKK..........YOOY.......",
    ".......KBBBKK........YRRY.......",
    "......KBBbbBBK.......YOOY.......",
    ".....KBBbbbbBBK......KTTK.......",
    "....KBBBbbbbBBBK.....KTTK.......",
    "...KBBBBbbbbBBBBK....KTTK.......",
    "...KBBBBbbbBBBBBK....KTTK.......",
    "..KBBBBBbbbBBBBBBK...KttK.......",
    ".KKKBBBBbbbBBBBBBK...KTTK.......",
    "KbbbBBBBbbbBBBBBBK...KTTK.......",
    "KBBbbbbBBBBBBBBBBK...KttK.......",
    "KKKKKKKKKKKKKKKKKKK..KTTK.......",
    ".......KSSWSKWSSK....KTTK.......",
    ".......KSsSSKSSSsK...KTTK.......",
    ".......KSSWSKSWSK....KTTK.......",
    "......KBBGGWGKGGK....KSSK.......",
    ".....KBBBGGWWWGGK....KssK.......",
    "....KBBBBbGGWGGbbBK..KttK.......",
    "...KBBBBbbbWWWbbBBBK.KTTK.......",
    "..KBBBBBbbbWWWbbBBBBKTTK.......",
    "..KBBBBBbbbWWWbbBBBBKttK.......",
    ".KBBBBBBbbbWWWbbBBBBKTTK.......",
    ".KBBBBBBKbbWWWbKBBBBKKttK.......",
    "KBBBBBBK.KKKKKK.KBBBKTTK.......",
    "KBBBBBK..KYYYK..KBBK.KttK.......",
    "KKKKKK...KUUUK...KKKKKTTK.......",
    ".........KDDDK.......KttK.......",
    "........KDDDDDK......KTTK.......",
    "........KDD.DDK......KTTK.......",
    "........KKK.KKK......KKKK......."
  ];

  const palette: Record<string, string> = {
    'K': '#141414', // Outline
    'B': '#1E3A8A', // Dark Blue Robe
    'b': '#3B82F6', // Lighter Blue Robe
    'W': '#F8FAFC', // White Beard/Eyes
    'G': '#94A3B8', // Grey Beard shadow
    'S': '#FCD34D', // Light skin
    's': '#F59E0B', // Dark skin shadow
    'T': '#451A03', // Staff Dark Brown
    't': '#92400E', // Staff Light Brown
    'D': '#1E1B4B', // Boots Dark
    'Y': '#FBBF24', // Yellow flame/belt
    'O': '#F97316', // Orange flame
    'R': '#EF4444', // Red flame
    'U': '#D97706', // Belt Buckle
  };

  // Grouping paths into two animated sets
  const characterPaths: Record<string, string> = {};
  const flamePaths: Record<string, string> = {};

  Object.keys(palette).forEach(c => {
    characterPaths[c] = '';
    flamePaths[c] = '';
  });

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const char = matrix[y][x];
      if (char !== '.' && palette[char]) {
        // Flame is located specifically at rows 1-4, columns 21-24
        const isFlame = (y >= 1 && y <= 4 && x >= 21 && x <= 24);
        const target = isFlame ? flamePaths : characterPaths;
        target[char] += `M${x},${y}h1v1h-1z `;
      }
    }
  }
</script>

<div class="pixel-wizard {className} {size}" aria-label="Wizard Avatar" role="img">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    class="w-full h-full"
    style="shape-rendering: crispEdges;"
  >
    <!-- Character (Breathing Animation) -->
    <g class="wizard-character">
      {#each Object.entries(characterPaths) as [color, pathData]}
        {#if pathData}
          <path fill={palette[color]} d={pathData} />
        {/if}
      {/each}
    </g>

    <!-- Flame (Flickering Animation) -->
    <g class="wizard-flame">
      {#each Object.entries(flamePaths) as [color, pathData]}
        {#if pathData}
          <!-- Apply intense pulsing purely for the inner yellow core flame if needed -->
          <path class={color === 'Y' ? 'flame-core' : ''} fill={palette[color]} d={pathData} />
        {/if}
      {/each}
    </g>
  </svg>
</div>

<style>
  .pixel-wizard {
    /* Creates a soft shadow around the pixel art */
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
  }

  .wizard-character {
    /* Pin origin to the bottom center so "breathing" scales upward smoothly */
    transform-origin: 50% 100%;
    animation: breathe 4s ease-in-out infinite;
  }

  .wizard-flame {
    /* Pin origin to the base of the fire to flicker left/right naturally */
    transform-origin: 22.5px 4.5px;
    animation: flickerScale 0.15s ease-in-out infinite alternate;
  }

  .flame-core {
    /* A fast color pulse specifically for the bright center of the flame */
    animation: pulseCore 0.3s ease-in-out infinite alternate;
  }

  /* Keyframes */
  @keyframes breathe {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(1.03); }
  }

  @keyframes flickerScale {
    0% { transform: scale(1) rotate(-2deg); }
    50% { transform: scale(1.05) rotate(2deg); }
    100% { transform: scale(0.95) rotate(0deg); }
  }

  @keyframes pulseCore {
    0% { fill: #FBBF24; }
    100% { fill: #FEF08A; }
  }
</style>
