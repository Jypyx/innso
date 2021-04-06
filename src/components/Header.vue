<template>
  <header class="header">
    <div class="header__container">
      <section class="header__container__section header__container__section--align-start">
        <img :src="require('@/assets/images/logo.png')" class="header__container__section__logo" />
      </section>
      <section class="header__container__section header__container__section--align-end"></section>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  transition: border-bottom $transition-duration-fast $transition-effect-default;
  z-index: 6;
  border-bottom: 6px solid var(--product-color);
  box-shadow: $topbar-box-shadow;
  background-color: $topbar-color-bg;
  padding: 0 $gutter-tablet;
  width: 100%;
  height: $topbar-height;

  &__container {
    display: flex;
    align-items: center;
    height: 100%;

    &__section {
      display: flex;
      flex: 1;
      align-items: center;
      height: 100%;

      &--align-start {
        justify-content: flex-start;
      }

      &--align-end {
        justify-content: flex-end;
      }

      &__logo {
        height: 36px;
      }
    }
  }
}
</style>
