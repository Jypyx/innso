<template>
  <div class="status" :style="{ '--color': statusConf[status].color }">
    <div class="status__dot"></div>
    <div class="status__label">
      {{ statusConf[status].label }}
    </div>
  </div>
</template>

<script>
import { statusConf } from '@/config/status.config'

export default {
  name: 'Status',
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      statusConf,
    }
  },
}
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  border-radius: 16px;
  background-color: rgba(var(--color), 0.1);
  padding: 0 6px;
  height: 24px;

  &__dot {
    border-radius: 50%;
    background-color: rgba(var(--color), 1);
    width: 14px;
    height: 14px;
  }

  &__label {
    margin-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: $font-size-sm;
  }
}
</style>
