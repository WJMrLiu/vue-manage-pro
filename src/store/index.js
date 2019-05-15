import Vue from 'vue';
import Vuex from 'vuex';
import form from './modules/form';
import userInfo from './modules/userInfo';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        form,
        userInfo,
    },
});
