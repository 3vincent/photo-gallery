<template>
  <div class="container">
    <TopMenuBar />

    <main v-if="page" class="content">
      <header class="page-header">
        <p class="eyebrow">Jane Doe Studio</p>
        <h1>{{ page.title }}</h1>
        <p class="intro">{{ page.description }}</p>
      </header>

      <article class="prose">
        <ContentRenderer :value="page" />
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100dvh;
  background:
    radial-gradient(circle at 85% 8%, rgba(150, 183, 178, 0.2), transparent 28rem),
    #f7f6f2;

  .content {
    width: min(100% - 3rem, 880px);
    margin: 3rem auto 0;
    padding: 3rem 0 7rem;
  }

  .page-header {
    max-width: 760px;
    padding-bottom: 2.5rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba(47, 67, 66, 0.2);
  }

  .eyebrow {
    margin: 0 0 1rem;
    color: #607875;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    padding: 0;
    color: #263a38;
    font-size: clamp(3.2rem, 9vw, 6.5rem);
    font-weight: 750;
    letter-spacing: -0.06em;
    line-height: 0.92;
  }

  .intro {
    max-width: 680px;
    margin: 1.5rem 0 0;
    color: #5b6967;
    font-size: clamp(1.2rem, 2.5vw, 1.65rem);
    line-height: 1.45;
  }

  .prose {
    max-width: 720px;
  }

  .prose :deep(h2) {
    margin: 3.25rem 0 1rem;
    padding: 0;
    color: #263a38;
    font-size: clamp(1.65rem, 3vw, 2.25rem);
    letter-spacing: -0.035em;
    line-height: 1.15;
  }

  .prose :deep(h3) {
    margin: 2rem 0 0.55rem;
    padding: 0;
    color: #344b48;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0;
  }

  .prose :deep(p),
  .prose :deep(li) {
    color: #465653;
    font-size: 1.06rem;
    line-height: 1.8;
  }

  .prose :deep(p) {
    margin: 0 0 1.2rem;
  }

  .prose :deep(ul) {
    display: grid;
    gap: 0.6rem;
    margin: 1.25rem 0 2rem;
    padding-left: 1.25rem;
  }

  .prose :deep(blockquote) {
    margin: 2.5rem 0;
    padding: 0.4rem 0 0.4rem 1.5rem;
    border-left: 3px solid #77948f;
  }

  .prose :deep(blockquote p) {
    margin: 0;
    color: #314744;
    font-family: Georgia, serif;
    font-size: clamp(1.35rem, 2.5vw, 1.8rem);
    font-style: italic;
    line-height: 1.5;
  }

  .prose :deep(a) {
    color: #275f59;
    text-decoration-color: rgba(39, 95, 89, 0.4);
    text-underline-offset: 0.2em;
  }

  .prose :deep(a:hover) {
    text-decoration-color: currentColor;
  }

  .prose :deep(hr) {
    margin: 3rem 0;
    border: 0;
    border-top: 1px solid rgba(47, 67, 66, 0.2);
  }

  @media (min-width: $md) {
    .content {
      width: min(100% - 6rem, 880px);
      padding-top: 5rem;
    }
  }
}
</style>
