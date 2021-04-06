<template>
  <div id="app">
    <Header class="app__header" />
    <router-view class="app__main" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
  async mounted() {
    await this.getData()
  },
  computed: {
    ...mapState({
      data: state => state.data,
    }),
  },
  methods: {
    ...mapActions(['getData']),
  },
}
</script>

<style lang="scss" scoped>
.app {
  &__main {
    display: flex;
    position: absolute;
    top: $topbar-height;
    right: 0;
    bottom: 0;
    left: 0;
    flex-direction: column;
    padding: $gutter-tablet;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
