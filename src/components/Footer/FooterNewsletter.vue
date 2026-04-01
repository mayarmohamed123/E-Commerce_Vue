<template>
  <div class="newsletter">
    <h4 class="newsletter__subtitle">Subscribe</h4>
    <p class="newsletter__text">Get 10% off your first order</p>
    <div class="newsletter__subscribe">
      <input
        type="email"
        class="newsletter__subscribe-input"
        placeholder="Enter your email"
      />
      <button class="newsletter__subscribe-btn">
        <img
          :src="require('@/assets/images/icon-send.svg')"
          alt="Send"
          class="newsletter__subscribe-icon"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterNewsletter',
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.newsletter {
  &__subtitle {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 16px 0;
    color: $secondary-white;
  }

  &__text {
    font-size: 14px;
    color: #cccccc;
    margin: 0 0 12px 0;
    line-height: 1.5;
  }

  &__subscribe {
    display: flex;
    align-items: center;
    border: 1px solid $secondary-white;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 4px;

    &-input {
      background: transparent;
      border: none;
      outline: none;
      color: $secondary-white;
      font-size: 13px;
      font-family: $font-family-poppins;
      padding: 10px 12px;
      flex: 1;
      min-width: 0;

      &::placeholder {
        color: $text-muted;
      }
    }

    &-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity $transition-default;

      &:hover {
        opacity: 0.7;
      }

      .newsletter__subscribe-icon {
        width: 20px;
        height: 20px;
        filter: invert(1);
      }
    }
  }
}
</style>
