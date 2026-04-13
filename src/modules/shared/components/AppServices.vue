<template>
  <section class="app-services">
    <div class="app-services__feature">
      <div class="app-services__icon-wrapper">
         <div class="app-services__icon-wrapper-inner">
             <img :src="icons.delivery" alt="delivery" class="app-services__icon" />
         </div>
      </div>
      <h4 class="app-services__title">FREE AND FAST DELIVERY</h4>
      <p class="app-services__desc">Free delivery for all orders over $140</p>
    </div>
    <div class="app-services__feature">
      <div class="app-services__icon-wrapper">
         <div class="app-services__icon-wrapper-inner">
             <img :src="icons.customerService" alt="customer service" class="app-services__icon" />
         </div>
      </div>
      <h4 class="app-services__title">24/7 CUSTOMER SERVICE</h4>
      <p class="app-services__desc">Friendly 24/7 customer support</p>
    </div>
    <div class="app-services__feature">
      <div class="app-services__icon-wrapper">
         <div class="app-services__icon-wrapper-inner">
             <img :src="icons.guarantee" alt="guarantee" class="app-services__icon" />
         </div>
      </div>
      <h4 class="app-services__title">MONEY BACK GUARANTEE</h4>
      <p class="app-services__desc">We return money within 30 days</p>
    </div>
  </section>
</template>

<script>
import iconDelivery from "@/assets/images/icon-delivery.svg";
import iconCustomerService from "@/assets/images/Icon-Customer service.svg";
import iconGuarantee from "@/assets/images/shield-tick.svg";

export default {
  name: "AppServices",
  data() {
    return {
      icons: {
        delivery: iconDelivery,
        customerService: iconCustomerService,
        guarantee: iconGuarantee
      }
    };
  }
};
</script>
