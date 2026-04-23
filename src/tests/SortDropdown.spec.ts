import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SortDropdown from '../modules/products/components/SortDropdown.vue';

describe('SortDropdown.vue', () => {
  const options = ['Price: Low to High', 'Price: High to Low', 'Default'];
  const modelValue = 'Default';

  it('renders all options', () => {
    const wrapper = mount(SortDropdown, {
      props: { options, modelValue }
    });

    const selectOptions = wrapper.findAll('option');
    expect(selectOptions).toHaveLength(options.length);
    expect(selectOptions[0].text()).toBe(options[0]);
  });

  it('displays the correct modelValue', () => {
    const wrapper = mount(SortDropdown, {
      props: { options, modelValue: options[1] }
    });

    const select = wrapper.find('select').element as HTMLSelectElement;
    expect(select.value).toBe(options[1]);
  });

  it('emits update:modelValue when an option is selected', async () => {
    const wrapper = mount(SortDropdown, {
      props: { options, modelValue }
    });

    const select = wrapper.find('select');
    await select.setValue(options[0]);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([options[0]]);
  });
});
