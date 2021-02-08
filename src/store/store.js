import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({    
    state: {        
        user: {
            name: 'Alécio',
            email: 'alecio18@hotmail.com'
        },

        //Listao OEE
        graficos: [],
            
        //filtroInicial: moment().subtract({months:3}).format('YYYY-MM-DD'),
        // data setada manualmente
        

        filtroInicial: '01/06/2015',
        filtroFinal: moment().format('YYYY-MM-DD'),


    },
    //modules: { chartOee, chartOeeMaquina, chartRefugosPercentual, controleParadas, pesquisaItem, controleProducao, itemCliente },
    
    mutations: { 

        // GRAFICOS  
        SET_GRAFICOS(state, obj){
            state.graficos = obj
        },  

        SET_INICIAL(state, obj){
            state.filtroInicial = obj
        },

        SET_FINAL(state, obj){
            state.filtroFinal = obj
        },       

    },
    
})