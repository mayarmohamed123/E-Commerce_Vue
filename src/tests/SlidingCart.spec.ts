import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import SlidingCart from '../modules/cart/components/SlidingCart.vue';
import { useCartStore } from '../stores';

const mockItems = [
  {
    id: 1,
    title: 'Test Item',
    price: 50,
    quantity: 2,
    thumbnail: 'test.jpg'
  }
] as any;

describe('SlidingCart.vue', () => {
  it('renders cart items when open', () => {
    const wrapper = mount(SlidingCart, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            cart: {
              items: mockItems,
              isCartOpen: true
            }
          }
        })]
      }
    });

    expect(wrapper.text()).toContain('Shopping Cart');
    expect(wrapper.text()).toContain('Test Item');
    expect(wrapper.find('.sliding-cart__item-qty-value').text()).toBe('02');
  });

  it('shows empty message when cart is empty', () => {
    const wrapper = mount(SlidingCart, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            cart: {
              items: [],
              isCartOpen: true
            }
          }
        })]
      }
    });

    expect(wrapper.text()).toContain('Your cart is empty.');
  });

  it('calls closeCart when close button is clicked', async () => {
    const pinia = createTestingPinia({
      initialState: {
        cart: { items: [], isCartOpen: true }
      }
    });
    const cartStore = useCartStore();
    const wrapper = mount(SlidingCart, {
      global: {
        plugins: [pinia]
      }
    });

    await wrapper.find('.sliding-cart__close').trigger('click');
    expect(cartStore.closeCart).toHaveBeenCalled();
  });

  it('calls updateQuantity on arrow clicks', async () => {
    const pinia = createTestingPinia({
      initialState: {
        cart: { items: mockItems, isCartOpen: true }
      }
    });
    const cartStore = useCartStore();
    const wrapper = mount(SlidingCart, {
      global: {
        plugins: [pinia]
      }
    });

    const arrows = wrapper.findAll('.sliding-cart__item-qty-arrows button');
    await arrows[0].trigger('click'); // Increase
    expect(cartStore.updateQuantity).toHaveBeenCalledWith(1, 3);

    await arrows[1].trigger('click'); // Decrease
    expect(cartStore.updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('calls removeItem when remove button is clicked', async () => {
    const pinia = createTestingPinia({
      initialState: {
        cart: { items: mockItems, isCartOpen: true }
      }
    });
    const cartStore = useCartStore();
    const wrapper = mount(SlidingCart, {
      global: {
        plugins: [pinia]
      }
    });

    await wrapper.find('.sliding-cart__item-remove').trigger('click');
    expect(cartStore.removeItem).toHaveBeenCalledWith(1);
  });
});
