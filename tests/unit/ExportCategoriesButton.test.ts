import { mount } from '@vue/test-utils'
import ExportCategoriesButton from '../../src/components/ExportCategoriesButton.vue'
import { describe, it, expect } from 'vitest'

describe('ExportCategoriesButton.vue', () => {
  it('renders the export button', () => {
    const wrapper = mount(ExportCategoriesButton)
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  it('button has an accessible name', () => {
    const wrapper = mount(ExportCategoriesButton)
    const button = wrapper.find('button')
    expect(button.attributes('aria-label')).toBe('Export Categories')
  })
})
