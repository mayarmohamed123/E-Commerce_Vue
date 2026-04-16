<template>
  <div class="products-page__sort">
    <label for="products-sort" class="products-page__sort-label">Sort by</label>
    <select
      id="products-sort"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="products-page__sort-select"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SortDropdown',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>
