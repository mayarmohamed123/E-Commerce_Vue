<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb__item"
        :class="{ 'breadcrumb__item--active': isLast(index) }"
      >
        <router-link
          v-if="item.to && !isLast(index)"
          :to="item.to"
          class="breadcrumb__link"
        >
          {{ item.label }}
        </router-link>
        <span
          v-else
          class="breadcrumb__current"
          :aria-current="isLast(index) ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "AppBreadcrumb",
  props: {
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(
          (item) => typeof item.label === "string"
        );
      },
    },
  },
  methods: {
    isLast(index) {
      return index === this.items.length - 1;
    },
  },
};
</script>
