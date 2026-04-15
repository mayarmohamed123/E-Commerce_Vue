<template>
  <div
    class="app-skeleton"
    :class="[
      `app-skeleton--${variant}`,
      { 'app-skeleton--animated': animated }
    ]"
    :style="skeletonStyle"
  ></div>
</template>

<script>
export default {
  name: 'AppSkeleton',
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '20px'
    },
    variant: {
      type: String,
      default: 'text', // 'text', 'rect', 'circle'
      validator: (val) => ['text', 'rect', 'circle'].includes(val)
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    skeletonStyle() {
      const w = typeof this.width === 'number' ? `${this.width}px` : this.width;
      const h = typeof this.height === 'number' ? `${this.height}px` : this.height;
      return {
        width: w,
        height: h
      };
    }
  }
};
</script>
