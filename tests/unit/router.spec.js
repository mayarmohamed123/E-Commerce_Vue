import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Vue Router', () => {
  it('Should have the correct routes for verification', () => {
    const routes = router.options.routes;
    
    expect(routes.find(r => r.name === 'Home').path).toBe('/');
    expect(routes.find(r => r.name === 'Contact').path).toBe('/contact');
    expect(routes.find(r => r.name === 'About').path).toBe('/about');
    expect(routes.find(r => r.name === 'Products').path).toBe('/products');
    expect(routes.find(r => r.name === 'Product').path).toBe('/product/:id');
    expect(routes.find(r => r.name === 'NotFound').path).toBe('*');
  });
});
