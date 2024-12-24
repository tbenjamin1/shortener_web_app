import { mount } from '@vue/test-utils';
import LoginScreens from '../../components/authScreens/LoginScreens.vue';

describe('LoginScreens.vue Data', () => {
    it('has correct initial data', () => {
        const wrapper = mount(LoginScreens);
        const vm = wrapper.vm;

        expect(vm.telephone).toBe('');
        expect(vm.password).toBe('');
        expect(vm.loginError).toBe('');
        expect(vm.loading).toBe(false);
    });
});
