<template>
  <div class="about-stats">
    <div class="about-stats__box">
      <div class="about-stats__icon-wrapper">
        <div class="about-stats__icon-inner">
          <img :src="vectorIcon" alt="sellers" class="about-stats__icon" />
        </div>
      </div>
      <h3 class="about-stats__value">10.5k</h3>
      <p class="about-stats__label">Sallers active our site</p>
    </div>

    <div class="about-stats__box about-stats__box--active">
      <div class="about-stats__icon-wrapper about-stats__icon-wrapper--active">
        <div class="about-stats__icon-inner about-stats__icon-inner--active">
          <img
            :src="vectorIcon"
            alt="sales"
            class="about-stats__icon about-stats__icon--active" />
        </div>
      </div>
      <h3 class="about-stats__value">33k</h3>
      <p class="about-stats__label">Mopnthly Produduct Sale</p>
    </div>

    <div class="about-stats__box">
      <div class="about-stats__icon-wrapper">
        <div class="about-stats__icon-inner">
          <img :src="vectorIcon" alt="customers" class="about-stats__icon" />
        </div>
      </div>
      <h3 class="about-stats__value">45.5k</h3>
      <p class="about-stats__label">Customer active in our site</p>
    </div>

    <div class="about-stats__box">
      <div class="about-stats__icon-wrapper">
        <div class="about-stats__icon-inner">
          <img :src="vectorIcon" alt="gross" class="about-stats__icon" />
        </div>
      </div>
      <h3 class="about-stats__value">25k</h3>
      <p class="about-stats__label">Anual gross sale in our site</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import vectorImage from "@/assets/images/Vector.svg";

/**
 * AboutStats Component
 * Displays key business statistics (active sellers, monthly sales, etc.) in a grid.
 */

/** Vector icon asset */
const vectorIcon: string = vectorImage;
</script>
