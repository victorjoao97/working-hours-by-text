<template>
    <div>
      <label v-bind:for="idInput">{{$t(label)}}</label>
      <div>
        <the-mask
          v-bind:mask="maskHour"
          v-bind:id="idInput"
          type="text"
          :masked="true"
          v-bind:placeholder="placeholderHour"
          v-model="hour"
        ></the-mask>
        <button @click.prevent="clearValue" :disabled="!hour.length" tabindex="-1">X</button>
      </div>
    </div>
</template>

<script>
export default {
    props: ["label", "clearAllInputs"],
    computed: {
        maskHour: () => "##:##",
        placeholderHour: () => "hh:mm",
        idInput: function() {
            return this.label.replace(/ /g, "").toLowerCase();
        }
    },
    data: function() {
        return {
            hour: ""
        };
    },
    mounted() {
        if (localStorage[this.label]) {
            this.hour = localStorage[this.label];
        }
    },
    methods: {
        clearValue() {
            this.hour = "";
            delete localStorage[this.label];
        }
    },
    watch: {
        hour: function() {
            this.$emit("change-hour", { type: this.label, hour: this.hour });
        },
        clearAllInputs: function() {
            if (this.clearAllInputs) {
                this.clearValue()
            }
        }
    }
};
</script>

<style scoped>
</style>