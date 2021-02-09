<template>
    <div id="pieTarefas">
        
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
                           
            let ChartsSemFiltro = this.$store.state.graficos            
            // Variaveis com data inicial e final do filtro

            let startDate = (this.$store.state.filtroInicial)
            let startDateText = startDate
            startDate = new Date(startDate).getTime() 
            
            let endDate = (this.$store.state.filtroFinal)
            let endDateText = endDate
            endDate = new Date(endDate).getTime()
            
            
            
            //ListaOee             
            //lista do Oee depois do filtro
            let Charts = ChartsSemFiltro.filter((ChartsSemFiltro) => {                 
                let a = new Date(ChartsSemFiltro.dataCriacao).getTime() 
                    if(a >= startDate && a <= (endDate + 86400000)) {
                        return ChartsSemFiltro                       
                    }                
            })

            const totalConcluidas = Charts.filter((Charts) => {
                return (Charts.completo === true)
            })

            const totalPendentes = Charts.filter((Charts) => {
                return (Charts.completo == false)
            })

            const totalMangasCompletos = Charts.filter((Charts) => {
                return (Charts.tipo === "manga" && Charts.completo == true)
            })

            const totalMangasPendente = Charts.filter((Charts) => {
                return (Charts.tipo === "serie" && Charts.completo === false)
            })

            const totalJogosCompletos = Charts.filter((Charts) => {
                return (Charts.tipo === "jogos" && Charts.completo === true)
            })

            const totalJogosPendentes = Charts.filter((Charts) => {
                return (Charts.tipo === "jogos" && Charts.completo === false)
            })
            
            // Dados que serão passados para o Grafico

            const labels = ['Geral Concluído', 'Geral Pendente', 'Total Mangas Concluídos', 'Total Mangas Pendentes', 'Total Jogos Concluídos', 'Total Jogos Pendentes']
            
            const dados = [totalConcluidas.length , totalPendentes.length, totalMangasCompletos.length, totalMangasPendente.length, totalJogosCompletos.length, totalJogosPendentes.length]
                        
            // Chamada para o Grafico            

            this.setup({dados, startDateText, endDateText, labels })
          
        },

        /**
         * Utilizado para montar o grafico e exibi-lo na tela.
         * Obs: este metodo só poderá ser chamado quando a fonte
         * de dados estiver pronta
         */

        setup(obj){
            

            const {  dados, startDateText, endDateText, labels } = obj
           
           // Iniciando serviço para impressão
           exportingInit(Highcharts)

            // Aplicando o Tema

            
            padrao(Highcharts)
            
            Highcharts.chart('pieTarefas', {

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
                    type: 'pie',                     
                    plotShadow: false,                  
                },
                title: {
                    text: 'Tarefas'
                },
                 
                subtitle: {
                    text: `Relação Tarefas Pendentes / Concluídas - (${moment(startDateText).format('DD/MM/YYYY')} a ${moment(endDateText).format('DD/MM/YYYY')})`
                }, 
                tooltip: {
                    headerFormat: '<span style="font-size:16px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: false,
                    useHTML: true
                 },              
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                 series: [{
                    name: 'Qtd',
                    colorByPoint: true,
                    data: [{
                        name: labels[0],
                        y: dados[0],
                        sliced: false,
                        selected: false
                    }, {
                        name: labels[1],
                        y: dados[1]
                    }, {
                        name: labels[2],
                        y: dados[2]
                    }, {
                        name: labels[3],
                        y: dados[3]
                    }, {
                        name: labels[4],
                        y: dados[4]
                    }, {
                        name: labels[5],
                        y: dados[5]
                    }]
                }]
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