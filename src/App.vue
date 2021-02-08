<template>
	<div id="app">
		<Header title="template - limpo" />
		<Conteudo />
		<Footer />		
	</div>
</template>
<script>

import Header from './components/template/Header'
import Conteudo from './components/template/Conteudo'
import Footer from './components/template/Footer.vue'

export default {
	name: "App",
	components: { Footer, Header, Conteudo },
}

</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "conteudo conteudo"
    "footer footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "conteudo conteudo"
    "footer footer";
}
</style>