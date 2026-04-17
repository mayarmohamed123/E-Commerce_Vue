import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ProductCard from '@/modules/shared/components/ProductCard.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

// ─── Factory ──────────────────────────────────────────────────────────────────

function createStore(actions = {}) {
  return new Vuex.Store({
    modules: {
      cart: {
        namespaced: true,
        actions: {
          addToCart: actions.addToCart || jest.fn(),
        },
      },
    },
  });
}

function mountCard(productOverrides = {}, propsOverrides = {}, storeActions = {}) {
  const product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    thumbnail: 'https://example.com/img.jpg',
    discountPercentage: 10,
    isNew: false,
    rating: 4,
    reviews: [],
    ...productOverrides,
  };

  const store = createStore(storeActions);
  const router = new VueRouter();

  return shallowMount(ProductCard, {
    localVue,
    store,
    router,
    propsData: {
      product,
      showDiscount: true,
      showNewBadge: false,
      ...propsOverrides,
    },
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ProductCard', () => {
  it('renders the product title', () => {
    const wrapper = mountCard({ title: 'Cool Sneakers' });
    expect(wrapper.find('h3.product-card__name').text()).toBe('Cool Sneakers');
  });

  it('renders the product thumbnail as img src', () => {
    const wrapper = mountCard({ thumbnail: 'https://example.com/shoe.jpg' });
    const img = wrapper.find('.product-card__image');
    expect(img.attributes('src')).toBe('https://example.com/shoe.jpg');
  });

  it('renders a router-link pointing to /product/:id', () => {
    const wrapper = mountCard({ id: 42 });
    const link = wrapper.findComponent({ name: 'RouterLink' });
    expect(link.props('to')).toMatchObject({ path: '/product/42' });
  });

  it('shows the discount badge when showDiscount=true and product has discountPercentage', () => {
    const wrapper = mountCard({ discountPercentage: 20 }, { showDiscount: true });
    expect(wrapper.find('.product-card__badge--discount').exists()).toBe(true);
  });

  it('hides the discount badge when showDiscount=false', () => {
    const wrapper = mountCard({ discountPercentage: 20 }, { showDiscount: false });
    expect(wrapper.find('.product-card__badge--discount').exists()).toBe(false);
  });

  it('hides the discount badge when product has no discountPercentage', () => {
    const wrapper = mountCard({ discountPercentage: 0 }, { showDiscount: true });
    expect(wrapper.find('.product-card__badge--discount').exists()).toBe(false);
  });

  it('shows the NEW badge when showNewBadge=true and product.isNew=true', () => {
    const wrapper = mountCard({ isNew: true }, { showNewBadge: true });
    expect(wrapper.find('.product-card__badge--new').exists()).toBe(true);
  });

  it('hides the NEW badge when showNewBadge=false even if product.isNew=true', () => {
    const wrapper = mountCard({ isNew: true }, { showNewBadge: false });
    expect(wrapper.find('.product-card__badge--new').exists()).toBe(false);
  });

  it('dispatches cart/addToCart when "Add To Cart" is clicked', async () => {
    const addToCart = jest.fn();
    const wrapper = mountCard({}, {}, { addToCart });

    await wrapper.find('.add-to-cart-button').trigger('click');

    expect(addToCart).toHaveBeenCalledTimes(1);
  });

  it('passes the full product object to addToCart', async () => {
    const addToCart = jest.fn();
    const product = { id: 7, title: 'Widget', price: 19, thumbnail: '', rating: 3, reviews: [] };
    const wrapper = mountCard(product, {}, { addToCart });

    await wrapper.find('.add-to-cart-button').trigger('click');

    // The first arg of the dispatched action is the context; second is the payload
    const payload = addToCart.mock.calls[0][1];
    expect(payload.id).toBe(7);
    expect(payload.title).toBe('Widget');
  });
});
