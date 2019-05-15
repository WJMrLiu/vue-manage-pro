import { getAdminInfo } from '@/api/getData';

const state = {
    adminInfo: {
        avatar: 'default',
    },
};

const actions = {
    async getAdminInfo({ commit }) {
        const res = await getAdminInfo();
        if (res.status == 1) {
            commit('saveAdminInfo', { ...res.data });
        }
    },
};

const mutations = {
    saveAdminInfo(state, payload ) {
        state.adminInfo = {
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
