<template>
  <div class="about">
    <p>Alfonz is a collection of youtube playlists. </p>
    <p class="copy">Original creation of <a href="https://nathanaeljageni.fr" target="_blank" rel="noreferer noopener" class="link">Accolade Polyglotte</a>.</p>
  </div>
</template>

<style lang="scss">
  .about {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: auto;
    text-align: center;
    font-size: 1.75rem;
    transform: translate(-50%, -50%);
    padding: 0 2rem;

    .copy {
      font-size: 1.25rem;
      .link {
        text-decoration: none;
        color: var(--primary);
        &:hover {
          color: var(--white);
        }
      }
    }
  }
</style>
