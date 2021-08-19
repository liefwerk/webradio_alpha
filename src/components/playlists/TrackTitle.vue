<template>
  <div class="track-title">
    <h2>{{this.title}}</h2>
    <a :href="url" rel="noreferrer noopener" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" class="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'PlaylistTitle',
  props: {
    title: String,
    url: String
  }
}
</script>

<style lang="scss">
  .track-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--secondary);
    font-family: 'Courier New', monospace;
    text-align: right;
    h2 {
      margin: 0;
    }
    a {
      align-self: end;
    }

    .link-icon {
      width: 1.5rem;
      height: auto;
      color: var(--secondary);
      cursor: pointer;
      margin-left: .75rem;

      &:hover {
        color: var(--primary);
      }
    }
  }
</style>
