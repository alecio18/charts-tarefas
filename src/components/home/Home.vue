<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Base de Conhecimento" />
        <div class="home">

            <!-- Exemplo BOOTSTRAP VUE -->
                <div>
                    <b-card no-body>
                        <b-tabs card>
                        <b-tab no-body title="Picture 1">
                            <b-card-img bottom src="https://picsum.photos/600/200/?image=21" alt="Image 21"></b-card-img>
                            <b-card-footer>Picture 1 footer</b-card-footer>
                        </b-tab>

                        <b-tab no-body title="Picture 2">
                            <b-card-img bottom src="https://picsum.photos/600/200/?image=25" alt="Image 25"></b-card-img>
                            <b-card-footer>Picture 2 footer</b-card-footer>
                        </b-tab>

                        <b-tab no-body title="Picture 3">
                            <b-card-img bottom src="https://picsum.photos/600/200/?image=26" alt="Image 26"></b-card-img>
                            <b-card-footer>Picture 3 footer</b-card-footer>
                        </b-tab>                        
                        </b-tabs>
                    </b-card>
                </div>
                <!-- FIM BOOTSTRAP VUE -->
        </div> 
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'

export default {
    name: 'Home',
    components: { PageTitle }   
}

</script>

<style>
    
</style>
