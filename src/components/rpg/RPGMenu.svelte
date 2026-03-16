<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  interface MenuItem {
    label: string;
    href: string;
    active?: boolean;
  }

  interface Props {
    items: MenuItem[];
    class?: string;
  }

  let { items, class: className = '' }: Props = $props();

  let cursorElement: HTMLSpanElement;
  let activeIndex = $state(items.findIndex((item) => item.active) || 0);
  let menuItems: HTMLElement[] = [];

  const handleClick = (index: number) => {
    activeIndex = index;
    animateCursor(index);
  };

  const animateCursor = (index: number) => {
    const targetItem = menuItems[index];
    if (!targetItem || !cursorElement) return;

    const itemRect = targetItem.getBoundingClientRect();
    const parentRect = targetItem.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    const targetY = itemRect.top - parentRect.top + itemRect.height / 2 - 6;

    gsap.to(cursorElement, {
      y: targetY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  onMount(() => {
    // Initial cursor position
    if (menuItems.length > 0) {
      animateCursor(activeIndex);
    }
  });
</script>

<nav class="rpg-menu {className}">
  <ul class="menu-list">
    {#each items as item, i}
      <li
        bind:this={menuItems[i]}
        class="menu-item"
      >
        <a
          href={item.href}
          class="menu-link text-pixel"
          class:active={i === activeIndex}
          onclick={() => handleClick(i)}
        >
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
  <span bind:this={cursorElement} class="menu-cursor">◾</span>
</nav>

<style>
  .rpg-menu {
    position: relative;
  }

  .menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .menu-item {
    position: relative;
  }

  .menu-link {
    display: block;
    padding: var(--spacing-sm) 0;
  }

  .menu-cursor {
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    will-change: transform;
  }
</style>
