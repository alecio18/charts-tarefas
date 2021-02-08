<script>

import { mapState } from 'vuex'

export default {   

   computed: {

            ...mapState({            

                filtroInicial: state => state.filtroInicial,

                filtroFinal: state => state.filtroFinal,        

            }),

     },

    watch: {
        
        filtroInicial(){
            this.dataSource()
        },

        filtroFinal(){
            this.dataSource()
        },

    },   
}

</script>