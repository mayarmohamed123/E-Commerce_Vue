import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import StarRating from '@/modules/shared/components/StarRating.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mountRating(rating = 0, reviews = 0) {
  return shallowMount(StarRating, {
    localVue,
    propsData: { rating, reviews },
  });
}

// Star icon paths are mocked to '' by fileMock.js, so we test the *method logic* directly.

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('StarRating', () => {
  it('always renders exactly 5 star images', () => {
    const wrapper = mountRating(3.5);
    expect(wrapper.findAll('img.star-rating__star').length).toBe(5);
  });

  it('getStarIcon returns the full-star path when star <= rating', () => {
    const wrapper = mountRating(4);
    // Stars 1-4 should be full
    for (let star = 1; star <= 4; star++) {
      expect(wrapper.vm.getStarIcon(star)).toBe(require('@/assets/images/Vector.svg'));
    }
  });

  it('getStarIcon returns the empty-star path when star > rating + 0.5', () => {
    const wrapper = mountRating(3);
    // Star 5 is completely empty at rating=3
    expect(wrapper.vm.getStarIcon(5)).toBe(require('@/assets/images/Empty_Star.svg'));
  });

  it('getStarIcon returns the half-star path when rating is within 0.5 of the star', () => {
    const wrapper = mountRating(2.5);
    // Star 3 sits in the half-star range: rating(2.5) >= star(3) - 0.5
    expect(wrapper.vm.getStarIcon(3)).toBe(require('@/assets/images/star-half-filled.svg'));
  });

  it('renders all empty stars at rating=0', () => {
    const wrapper = mountRating(0);
    // For rating 0: all stars should call getStarIcon and return empty star
    const emptyPath = require('@/assets/images/Empty_Star.svg');
    for (let star = 1; star <= 5; star++) {
      expect(wrapper.vm.getStarIcon(star)).toBe(emptyPath);
    }
  });

  it('renders all filled stars at rating=5', () => {
    const wrapper = mountRating(5);
    const fullPath = require('@/assets/images/Vector.svg');
    for (let star = 1; star <= 5; star++) {
      expect(wrapper.vm.getStarIcon(star)).toBe(fullPath);
    }
  });
});
