<template>
<Loading v-if="!$store.state.graficos.length > 0" />  <div class="percentual" v-else> 
    <div class="conteudo-fator-oee">

        <b-card>
            <filtroData componente="SET_INICIAL" componente2="SET_FINAL"></filtroData>
        </b-card>
        <hr />
            
        <b-row> 
            <b-col xl="2"></b-col>
            <b-col xl="8" md="12">
                <TarefasPie />
            </b-col>
            <b-col xl="2"></b-col>
        </b-row>

        <b-row> 
            <b-col xl="2"></b-col>
            <b-col xl="8" md="12">
                 
            </b-col>
            <b-col xl="2"></b-col>
        </b-row>
        
        <b-row> 
            <b-col xl="2"></b-col>
            <b-col xl="8" md="12">
                 
            </b-col>
            <b-col xl="2"></b-col>
        </b-row>

    </div>
    </div>
</template>

<script>    
      
    import TarefasPie from './tarefasPie'  
    import filtroData from '../utils/filtroData'
    
    import Loading from '../../template/Loading'

    export default {
        
      components: { TarefasPie, Loading, filtroData }
    
}
</script>

<style>   

</style>