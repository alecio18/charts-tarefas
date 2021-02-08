<template>
    <div class="admin-pages">
            <PageTitle icon="fa fa-bar-chart" main="Titulo"
                sub="Subtitulo" />
        
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    
                    <b-tab title="Chart">
                        <Charts />
                    </b-tab>

                </b-tabs>
            </b-card>    
        </div>
        
    </div>

</template>

<script>

import axios from 'axios'

//charts
import Charts from '../modules/charts/charts'
import { graficosUrl } from '@/global'

import PageTitle from '../template/PageTitle'

export default {
    name: 'ChartsPages',
    components: { Charts, PageTitle },


    mounted() { 

               axios.get(`${graficosUrl}`).then(resposta => { 
                      
                    this.$store.commit('SET_GRAFICOS', resposta.data.body) 
                })            
        },

}
</script>

<style>
 
</style>
