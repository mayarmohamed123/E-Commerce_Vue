import { shallowMount } from '@vue/test-utils';
import SortDropdown from '@/modules/products/components/SortDropdown.vue';

// ─── Factory ──────────────────────────────────────────────────────────────────

const DEFAULT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low', 'Rating'];

function mountDropdown(propsData = {}) {
  return shallowMount(SortDropdown, {
    propsData: {
      options: DEFAULT_OPTIONS,
      value: DEFAULT_OPTIONS[0],
      ...propsData,
    },
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('SortDropdown', () => {
  it('renders a <select> element', () => {
    const wrapper = mountDropdown();
    expect(wrapper.find('select').exists()).toBe(true);
  });

  it('renders the correct number of <option> elements', () => {
    const wrapper = mountDropdown();
    expect(wrapper.findAll('option').length).toBe(DEFAULT_OPTIONS.length);
  });

  it('renders each option label correctly', () => {
    const wrapper = mountDropdown();
    const rendered = wrapper.findAll('option').wrappers.map(o => o.text());
    expect(rendered).toEqual(DEFAULT_OPTIONS);
  });

  it('binds the value prop to the <select> element', () => {
    const wrapper = mountDropdown({ value: 'Rating' });
    expect(wrapper.find('select').element.value).toBe('Rating');
  });

  it('emits an "input" event with the new value when the selection changes', async () => {
    const wrapper = mountDropdown({ value: DEFAULT_OPTIONS[0] });
    const select = wrapper.find('select');

    // Simulate changing the select to the second option
    await select.setValue(DEFAULT_OPTIONS[1]);

    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[0]).toEqual([DEFAULT_OPTIONS[1]]);
  });

  it('shows a "Sort by" label', () => {
    const wrapper = mountDropdown();
    expect(wrapper.find('label').text()).toBe('Sort by');
  });

  it('associates the label with the select via htmlFor / id', () => {
    const wrapper = mountDropdown();
    const labelFor = wrapper.find('label').attributes('for');
    const selectId = wrapper.find('select').attributes('id');
    expect(labelFor).toBe(selectId);
  });
});
