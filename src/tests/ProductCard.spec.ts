import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ProductCard from '../modules/shared/components/ProductCard.vue';
import { useCartStore } from '../stores';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  originalPrice: 120,
  discountPercentage: 16.67,
  rating: 4.5,
  thumbnail: 'test.jpg',
  isNew: true,
  reviews: []
} as any;

describe('ProductCard.vue', () => {
  it('renders product details correctly', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
          'PriceDisplay': true,
          'StarRating': true
        }
      }
    });

    expect(wrapper.text()).toContain('Test Product');
    expect(wrapper.find('price-display-stub').exists()).toBe(true);
  });

  it('shows discount badge when showDiscount is true', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct, showDiscount: true },
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
          'PriceDisplay': true,
          'StarRating': true
        }
      }
    });

    expect(wrapper.find('.product-card__badge--discount').exists()).toBe(true);
    expect(wrapper.text()).toContain('-17%');
  });

  it('shows NEW badge when showNewBadge is true', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct, showNewBadge: true },
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
          'PriceDisplay': true,
          'StarRating': true
        }
      }
    });

    expect(wrapper.find('.product-card__badge--new').exists()).toBe(true);
    expect(wrapper.text()).toContain('NEW');
  });

  it('calls addToCart when add to cart button is clicked', async () => {
    const pinia = createTestingPinia();
    const cartStore = useCartStore();
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        plugins: [pinia],
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
          'PriceDisplay': true,
          'StarRating': true
        }
      }
    });

    const button = wrapper.find('.add-to-cart-button');
    await button.trigger('click');
    expect(cartStore.addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
