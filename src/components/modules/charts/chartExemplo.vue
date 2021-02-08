<template>
    <div id="chartFatorOee">
        
    </div>
</template>

<script>

import storeData from '../utils/storeData'

import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'

// Temas
import padrao from 'highcharts/themes/grid-light'

import moment from 'moment'

export default {
    
   extends: storeData,
    
    methods: {



        dataSource() {
            
           
            // ***************** FILTROS *******************
           
           // Lista do OE            
            let ListaOeeSemFiltro = this.$store.state.graficos            
            // Variaveis com data inicial e final do filtro

            let startDate = (this.$store.state.filtroInicial)
            let startDateText = startDate
            startDate = new Date(startDate).getTime() 
            
            let endDate = (this.$store.state.filtroFinal)
            let endDateText = endDate
            endDate = new Date(endDate).getTime()
            
            
            
            //ListaOee             
            //lista do Oee depois do filtro
            let ListaOee = ListaOeeSemFiltro.filter((ListaOeeSemFiltro) => {                 
                let a = new Date(ListaOeeSemFiltro.data).getTime() 
                    if(a >= startDate && a <= (endDate + 86400000)) {
                        return ListaOeeSemFiltro                       
                    }                
            })
            
            // Filtrando 1 turno 
            const turno1 = ListaOee.filter((ListaOee) => {
                return ListaOee.turno === '1 Turno'                
            })

            // Filtrando 2 turno 
            const turno2 = ListaOee.filter((ListaOee) => {
                return ListaOee.turno === '2 Turno'
            })

            // Filtrando 3 turno 
            const turno3 = ListaOee.filter((ListaOee) => {
                return ListaOee.turno === '3 Turno'
            })            
            
            // *************** EFICIENCIA ******************
            // somando eficiencia 1º Turno          
            
            let efic1 = turno1.map(a => a.indice_performance).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            efic1 = ((efic1 / turno1.length) * 100)

            // somando eficiencia 2º Turno 

            let efic2 = turno2.map(a => a.indice_performance).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            efic2 = ((efic2 / turno2.length) * 100)

            // somando eficiencia 3º Turno 

            let efic3 = turno3.map(a => a.indice_performance).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            efic3 = ((efic3 / turno3.length) * 100)

            // Eficiencia Geral

            let eficg = ListaOee.map(a => a.indice_performance).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            eficg = ((eficg / ListaOee.length) * 100)

            // *************** PRODUTIVIDADE ******************
             // somando Produtividade 1º Turno          
            
            let prod1 = turno1.map(a => a.indice_produtividade).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            prod1 = ((prod1 / turno1.length) * 100)

            // somando Produtividade 2º Turno          
            
            let prod2 = turno2.map(a => a.indice_produtividade).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            prod2 = ((prod2 / turno2.length) * 100)

            // somando Produtividade 3º Turno          
            
            let prod3 = turno3.map(a => a.indice_produtividade).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            prod3 = ((prod3 / turno3.length) * 100)

            // somando Produtividade Geral          
            
            let prodg = ListaOee.map(a => a.indice_produtividade).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            prodg = ((prodg / ListaOee.length) * 100)

            // *************** REFUGO ******************
             // Indice Refugo 1º Turno          
            
            let ref1 = turno1.map(a => a.indice_refugo).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            ref1 = ((ref1 / turno1.length) * 100)

            // Indice Refugo 2º Turno          
            
            let ref2 = turno2.map(a => a.indice_refugo).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            ref2 = ((ref2 / turno2.length) * 100)

            // Indice Refugo 3º Turno          
            
            let ref3 = turno3.map(a => a.indice_refugo).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            ref3 = ((ref3 / turno3.length) * 100)

            // Indice Refugo Geral  
                        
            let refg = ListaOee.map(a => a.indice_refugo).reduce(function(acumulador, atual) {           
            return acumulador + atual
            }, 0)

            refg = ((refg / ListaOee.length) * 100)

             // *************** OEE ******************
            
            // Indice OEE 1º Turno            
            let oee1 = (((efic1/100) * (prod1/100) * (1 - (ref1/100)))*100)    
           
           // Indice OEE 2º Turno 
            let oee2 = (((efic2/100) * (prod2/100) * (1 - (ref2/100)))*100)
            
            // Indice OEE 3º Turno            
            let oee3 = (((efic3/100) * (prod3/100) * (1 - (ref3/100)))*100)
            
            // Indice OEE Geral
            let oeeg = parseFloat(((((eficg/100) * (prodg/100) * (1 - (refg/100)))*100)).toFixed(2))

            
            // Dados que serão passados para o Grafico
            
            const refugos = [ref1 , ref2, ref3, refg]
            const produtividade = [prod1, prod2, prod3, prodg]
            const eficiencia = [efic1, efic2, efic3, eficg]
            const oee = [oee1, oee2, oee3, oeeg]
            
            // Chamada para o Grafico            

            this.setup({  refugos, produtividade, eficiencia, oee, startDateText, endDateText })         
          
          
        },

        /**
         * Utilizado para montar o grafico e exibi-lo na tela.
         * Obs: este metodo só poderá ser chamado quando a fonte
         * de dados estiver pronta
         */

        setup(obj){
            

            const {  refugos, produtividade, eficiencia, oee, startDateText, endDateText } = obj
           
           // Iniciando serviço para impressão
           exportingInit(Highcharts)

            // Aplicando o Tema

            
            padrao(Highcharts)
            
            Highcharts.chart('chartFatorOee', {

                credits: {
                     enabled: false
                },

                exporting: {

                     menuItemDefinitions: {
                    
                    // Custom definition
                    label: {               
                    }
                    },
                    // Botoes chamados para o menu de impressão
                    buttons: {
                        contextButton: {               
                            menuItems: ['viewFullscreen', 'separator', 'downloadPDF','downloadPNG']
                        }
                    }, 
                    chartOptions: { // specific options for the exported image
                    plotOptions: {                    
                    series: {
                    
                        dataLabels: {
                            enabled: true,
                            color: '#BFEFFF', 
                            fontSize: '8px',       
                            headerFormat: '<span style="font-size:8px">{point.key};padding:0</span><table>',
                            pointFormat: '<tr><td style=" font-size:3px; color:{series.color};padding:0"> </td>' +
                                '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true 
                                    }
                                }
                            }
                        },
                    fallbackToExportServer: false
                },                

                // Inicio da Plotagem do Grafico

                chart: {
                    type: 'column',                    
                },
                title: {
                    text: 'Empresa'
                },
                 
                subtitle: {
                    text: `FATOR OEE x TURNO - (${moment(startDateText).format('DD/MM/YYYY')} a ${moment(endDateText).format('DD/MM/YYYY')})`
                },                
                xAxis: {
                    categories: [
                        '1º Turno',
                        '2º Turno',
                        '3º Turno',                        
                        'Geral'
                    ],                    
                    crosshair: false, 
                                    
                },                
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Percentual (%)'
                    }
                }, 
                tooltip: {
                    headerFormat: '<span style="font-size:16px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
                    footerFormat: '</table>',
                    shared: false,
                    useHTML: true
                 },              
                plotOptions: {
                    column: {
                        pointPadding: 0.05,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Eficiência',
                    color: '#00FF7F',
                    data: eficiencia

                }, {
                    name: 'Produtividade',
                    color: '#FFB6C1',
                    data: produtividade

                }, {
                    name: 'Refugo',
                    color: '#FFD700',
                    data: refugos

                }, 
                {
                    name: 'OEE',
                    color: '#9370DB',
                    data: oee,                                        
                },
                
                ]
            });

        }

    },
    mounted() {
        this.dataSource()
    }

}

</script>

<style>

</style>