<script lang="ts">
  import PixelAvatar from '../rpg/PixelAvatar.svelte';
  import RPGPanel from '../rpg/RPGPanel.svelte';
  import RPGMenu from '../rpg/RPGMenu.svelte';

  interface Props {
    currentPath?: string;
  }

  let { currentPath = '/' }: Props = $props();

  const menuItems = [
    { label: 'Character', href: '/', active: currentPath === '/' },
    { label: 'Missions', href: '/missions', active: currentPath === '/missions' },
    { label: 'Expeditions', href: '/expeditions', active: currentPath === '/expeditions' },
    { label: 'Send a Raven', href: '/contact', active: currentPath === '/contact' }
  ];

  const stats = [
    { label: 'TypeScript', value: 95, icon: '/icons/typescript.svg' },
    { label: 'JavaScript', value: 90, icon: '/icons/javascript.svg' },
    { label: 'Node.js', value: 85, icon: '/icons/nodejs.svg' },
    { label: 'Svelte 5', value: 80, icon: '/icons/tool.svg' }
  ];

  const equipment = [
    { slot: 'Weapon', item: 'Claude Code', icon: '/icons/tool.svg' },
    { slot: 'Shield', item: 'AWS', icon: '/icons/tool.svg' },
    { slot: 'Spell', item: 'Terraform', icon: '/icons/tool.svg' },
    { slot: 'Boots', item: 'Docker', icon: '/icons/tool.svg' }
  ];
</script>

<div class="left-panel-container">
  <!-- Avatar Section -->
  <div class="avatar-section">
    <PixelAvatar size={120} enableFloat={true} />
  </div>

  <!-- Info Section -->
  <RPGPanel title="INFO" variant="gold" padding="md" class="info-panel">
    <div class="wizard-info">
      <h2 class="text-pixel text-lg text-[var(--color-accent)]">OREDROK</h2>
      <p class="text-sm text-[var(--color-text-muted)] mt-2">Software Wizard</p>
      <p class="text-xs mt-4 leading-relaxed">
        A seasoned adventurer in the realms of TypeScript and Node.js, wielding modern frameworks as
        magical artifacts.
      </p>
    </div>
  </RPGPanel>

  <!-- Stats Section (Compact) -->
  <RPGPanel title="STATS" variant="gold" padding="sm" class="stats-panel">
    <div class="compact-stats">
      {#each stats as stat}
        <div class="stat-item">
          <img src={stat.icon} alt={stat.label} class="stat-icon pixel-art" />
          <div class="stat-info">
            <span class="stat-name text-pixel">{stat.label}</span>
            <div class="stat-bar-mini">
              <div class="stat-fill" style="width: {stat.value}%;"></div>
            </div>
          </div>
          <span class="stat-percent text-pixel">{stat.value}%</span>
        </div>
      {/each}
    </div>
  </RPGPanel>

  <!-- Equipment Section (Compact) -->
  <RPGPanel title="EQUIPMENT" variant="default" padding="sm" class="equipment-panel">
    <div class="compact-equipment">
      {#each equipment as item}
        <div class="equipment-item">
          <img src={item.icon} alt={item.slot} class="equipment-icon pixel-art" />
          <div class="equipment-info">
            <span class="equipment-slot text-xs text-[var(--color-text-muted)]">{item.slot}</span>
            <span class="equipment-name text-pixel text-xs text-[var(--color-accent)]">{item.item}</span>
          </div>
        </div>
      {/each}
    </div>
  </RPGPanel>

  <!-- Menu Section -->
  <RPGPanel title="MENU" variant="accent" padding="md" class="menu-panel">
    <RPGMenu items={menuItems} />
  </RPGPanel>

  <!-- Status Section -->
  <div class="status-section">
    <div class="status-item">
      <span class="status-label text-pixel text-xs text-[var(--color-text-muted)]">STATUS</span>
      <span class="status-value text-pixel text-xs text-[var(--color-active)]">AVAILABLE</span>
    </div>
  </div>
</div>

<style>
  .left-panel-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    height: 100%;
  }

  .avatar-section {
    display: flex;
    justify-content: center;
    padding: var(--spacing-md) 0;
  }

  .wizard-info {
    display: flex;
    flex-direction: column;
  }

  /* Compact Stats */
  .compact-stats {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs);
  }

  .stat-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .stat-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .stat-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stat-bar-mini {
    height: 6px;
    overflow: hidden;
    position: relative;
  }

  .stat-fill {
    height: 100%;
  }

  .stat-percent {
    flex-shrink: 0;
  }

  /* Compact Equipment */
  .compact-equipment {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .equipment-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs);
  }

  .equipment-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .equipment-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .equipment-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status-section {
    margin-top: auto;
    padding: var(--spacing-md);
  }

  .status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .left-panel-container {
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-md);
      height: auto;
    }

    .avatar-section {
      padding: 0;
    }

    .info-panel,
    .menu-panel,
    .stats-panel,
    .equipment-panel,
    .status-section {
      display: none;
    }
  }
</style>
