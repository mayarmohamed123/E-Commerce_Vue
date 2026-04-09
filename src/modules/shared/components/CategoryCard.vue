<template>
  <div
    class="category-card"
    :class="{ 'category-card--active': isActive }"
    @click="$emit('click')">
    <div class="category-card__icon-wrapper">
      <img
        :src="require(`@/assets/images/${iconName}`)"
        :alt="category"
        class="category-card__icon" />
    </div>
    <span class="category-card__name">{{ category }}</span>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    category: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      const icons = {
        phone: "Category-CellPhone.svg",
        computer: "Category-Computer.svg",
        smartwatch: "Category-SmartWatch.svg",
        camera: "Category-Camera.svg",
        headphone: "Category-Headphone.svg",
        gaming: "Category-Gamepad.svg",
      };
      return icons[this.icon] || this.icon;
    },
  },
};
</script>
