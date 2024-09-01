import { mount } from '@vue/test-utils';
import Footer from '../../src/components/Footer.vue';
import { describe, it, expect } from 'vitest';

describe('Footer.vue', () => {
  it('renders the correct content', () => {
    const wrapper = mount(Footer);
    expect(wrapper.text()).toContain('Made by Jordi Bonet');
  });

  it('contains GitHub icon', () => {
    const wrapper = mount(Footer);
    const githubIcon = wrapper.find('a[aria-label="GitHub"]');
    expect(githubIcon.exists()).toBe(true);
  });

  it('contains Repository icon', () => {
    const wrapper = mount(Footer);
    const repoIcon = wrapper.find('a[aria-label="Repository"]');
    expect(repoIcon.exists()).toBe(true);
  });

  it('contains LinkedIn icon', () => {
    const wrapper = mount(Footer);
    const linkedinIcon = wrapper.find('a[aria-label="LinkedIn"]');
    expect(linkedinIcon.exists()).toBe(true);
  });
});
