import { shallowMount } from '@vue/test-utils';
import PriceDisplay from '@/modules/shared/components/PriceDisplay.vue';

// ─── Factory ──────────────────────────────────────────────────────────────────

function mountPrice(propsData = {}) {
  return shallowMount(PriceDisplay, {
    propsData: {
      currentPrice: 49.99,
      originalPrice: null,
      discount: null,
      ...propsData,
    },
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('PriceDisplay', () => {
  it('renders the current price', () => {
    const wrapper = mountPrice({ currentPrice: 49.99 });
    expect(wrapper.find('.price-display__current').text()).toContain('49.99');
  });

  it('renders the original price when provided', () => {
    const wrapper = mountPrice({ currentPrice: 35, originalPrice: 50 });
    expect(wrapper.find('.price-display__original').exists()).toBe(true);
    expect(wrapper.find('.price-display__original').text()).toContain('50');
  });

  it('does NOT render the original price element when originalPrice is null', () => {
    const wrapper = mountPrice({ currentPrice: 35, originalPrice: null });
    expect(wrapper.find('.price-display__original').exists()).toBe(false);
  });

  it('renders the discount badge when discount is provided', () => {
    const wrapper = mountPrice({ currentPrice: 35, discount: 30 });
    expect(wrapper.find('.price-display__discount').exists()).toBe(true);
    expect(wrapper.find('.price-display__discount').text()).toContain('30%');
  });

  it('does NOT render the discount badge when discount is null', () => {
    const wrapper = mountPrice({ currentPrice: 35, discount: null });
    expect(wrapper.find('.price-display__discount').exists()).toBe(false);
  });

  it('renders both original price and discount badge together', () => {
    const wrapper = mountPrice({ currentPrice: 70, originalPrice: 100, discount: 30 });
    expect(wrapper.find('.price-display__original').exists()).toBe(true);
    expect(wrapper.find('.price-display__discount').exists()).toBe(true);
  });

  it('accepts a string currentPrice', () => {
    const wrapper = mountPrice({ currentPrice: '99.99' });
    expect(wrapper.find('.price-display__current').text()).toContain('99.99');
  });
});
