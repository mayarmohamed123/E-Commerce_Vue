<template>
  <div class="product-details__related" v-if="relatedProducts.length > 0">
    <SectionHeader subtitle="Related Item" title="More of this category" />
    <div class="products-grid">
      <ProductCard
        v-for="item in relatedProducts"
        :key="item.id"
        :product="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SectionHeader from "@/modules/shared/components/SectionHeader.vue";
import ProductCard from "@/modules/shared/components/ProductCard.vue";

export default {
  name: "RelatedProducts",
  components: {
    SectionHeader,
    ProductCard,
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("products", ["relatedProducts"]),
  },
  watch: {
    category: {
      immediate: true,
      handler(newCategory) {
        if (newCategory) {
          this.fetchRelatedProducts(newCategory);
        }
      },
    },
  },
  methods: {
    ...mapActions("products", ["fetchRelatedProducts"]),
  },
};
</script>
