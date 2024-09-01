import { mount } from '@vue/test-utils';
import ImportCategoriesButton from '../../src/components/ImportCategoriesButton.vue';
import { describe, it, expect } from 'vitest';

describe('ImportCategoriesButton.vue', () => {
  it('renders the import button', () => {
    const wrapper = mount(ImportCategoriesButton);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });

  it('button has an accessible name', () => {
    const wrapper = mount(ImportCategoriesButton);
    const button = wrapper.find('button');
    expect(button.attributes('aria-label')).toBe('Import Categories');
  });
});
