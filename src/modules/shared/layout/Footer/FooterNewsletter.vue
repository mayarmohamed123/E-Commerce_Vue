<template>
  <div class="newsletter">
    <h4 class="newsletter__subtitle">Subscribe</h4>
    <p class="newsletter__text">Get 10% off your first order</p>
    <div class="newsletter__subscribe">
      <input
        type="email"
        class="newsletter__subscribe-input"
        placeholder="Enter your email" />
      <button class="newsletter__subscribe-btn">
        <img :src="sendIcon" alt="Send" class="newsletter__subscribe-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import sendIcon from "@/assets/images/icon-send.svg";
</script>

<style lang="scss">
</style>
