<template>
  <b-form>
    <b-row>
      <b-col lg="2" sm="12"></b-col>
      <b-col lg="4" sm="12">
        <b-form-group label="Data Inicial" label-for="dataini">
          <b-form-input
            id="dataini"
            v-model="dataIni"
            class="mb-2 mr-sm-2 mb-sm-0"
            type="date"
            @change="commit"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col lg="4" sm="12">
        <b-form-group label="Data Final" label-for="datafim">
          <b-form-input
            id="datafim"
            v-model="dataFin"
            class="mb-2 mr-sm-2 mb-sm-0"
            type="date"
            @change="commit"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  props: ["componente", "componente2"],

  data() {
    return {
      dataIni: "",
      dataFin: ""
    };
  },
  methods: {
    commit() {
      this.$store.commit(this.componente, this.dataIni);
      this.$store.commit(this.componente2, this.dataFin);
    }
  }
};
</script>

<style>
#dataini,
#datafim,
label {
  border-radius: 3px;
  color: darkgray;
}
</style>