import { mount } from '@vue/test-utils';
import Register from '../../components/authScreens/Register.vue';

describe('Register.vue Data', () => {
    it('has correct initial data', () => {
        const wrapper = mount(Register);
        const vm = wrapper.vm;

        expect(vm.firstName).toBe('');
        expect(vm.lastName).toBe('');
        expect(vm.telephone).toBe('');
        expect(vm.password).toBe('');
        expect(vm.confirmPassword).toBe('');
        expect(vm.telephoneError).toBe(false);
        expect(vm.passwordMismatch).toBe(false);
        expect(vm.loading).toBe(false);
    });
});

describe('Register.vue Methods', () => {
    it('shows error message if telephone is invalid', async () => {
        const wrapper = mount(Register);
        const vm = wrapper.vm;

        // Simulate an invalid telephone input
        vm.telephone = 'invalid-phone';
        await vm.validateTelephone();

        expect(vm.telephoneError).toBe(true);
    });

    it('shows error message if passwords do not match', async () => {
        const wrapper = mount(Register);
        const vm = wrapper.vm;

        // Simulate password mismatch
        vm.password = 'password123';
        vm.confirmPassword = 'differentPassword123';
        await vm.validatePassword();

        expect(vm.passwordMismatch).toBe(true);
    });
});
