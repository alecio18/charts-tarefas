<template>
    <div class="conteudo">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Conteudo'

}
</script>

<style>
    .conteudo {
        grid-area: conteudo;
        background-color: #e4e5e6;
        padding: 20px;
    }
</style>


