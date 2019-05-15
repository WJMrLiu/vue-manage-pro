import router from '../../router';
import fetch from '@/config/fetch';
const state = {
    step: {
        payAccount: '123456',
        receiverAccount: ''
    },
};

const actions = {
    async submitStepForm({ commit }, { payload }) {
        const res = await fetch('/api/form', payload, 'POST');
        if (res.message == 'OK') {
            commit('saveStepFormData', { payload });
            router.push('/result');
        }
    },
};

const mutations = {
    saveStepFormData(state, { payload }) {
        state.step = {
            ...state.step,
            ...payload,
        };
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
