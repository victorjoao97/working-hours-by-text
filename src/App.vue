<template>
  <div style="display: flex">
    <div id="application">
      <h1>Woking Hours by Text</h1>
      <div id="inputsTextarea">
        <div id="inputsHours">
          <input type="checkbox" v-if="false" v-model="checkDefaultValues" />
          <input-hour
            class="inputHour"
            v-for="(label, index) in typeHours"
            :key="index"
            v-bind:label="label"
            v-on:change-hour="changeHour($event)"
          ></input-hour>
          <button v-if="false" @click.prevent="clearAllInputs">Clear All Inputs</button>
        </div>
        <div id="textareaHours">
          <p>Hover to clipboard</p>
          <textarea
            v-tooltip="{content: 'Copied to clipboard', placement: 'bottom'}"
            cols="30"
            rows="10"
            :value="stringTextHour"
            @mouseenter="handleCopyToClipboard"
            @mouseover="handleCopyToClipboard"
            readonly
          ></textarea>
        </div>
      </div>
      <h2>
        Develop by
        <a href="//github.com/victorjoao97" target="_blank">João</a>
      </h2>
      <div v-if="false">{{hours}} - {{entrada}}</div>
    </div>
  </div>
</template>

<script>
import InputHour from "./components/InputHour";

export default {
  components: {
    InputHour
  },
  data: () => {
    return {
      typeHours: ["Inicio", "Intervalo", "Retorno", "Saída"],
      hours: {},
      entrada: "",
      defaultHours: {},
      checkDefaultValues: false,
      stringTextHour: ""
    };
  },
  methods: {
    clearAllInputs() {
      this.hours = {};
      this.typeHours.forEach(typeHour => {
        localStorage[typeHour] = "00:00";
      });
    },
    handleCopyToClipboard() {
      this.copyToClipboard();
      event.target.select();
    },
    changeHour(value) {
      if (!value.hour) {
        localStorage[value.type] = "00:00";
        delete this.hours[value.type];
      } else {
        this.hours[value.type] = localStorage[value.type] = value.hour;
      }
      this.formateHours();
    },
    formateHours: function() {
      var stringTextHour = "";
      this.typeHours.map(typeHour => {
        stringTextHour += `${this.$moment().format("DD/MM/YYYY")} - ${this
          .hours[typeHour] || "00:00"} ${typeHour}\n`;
      });

      this.stringTextHour = stringTextHour.trim();
    },
    copyToClipboard: function() {
      this.$clipboard(this.stringTextHour);
    }
  },
  created() {
    this.typeHours.forEach((typeHour, index, array) => {
      let hour;
      let ultimoIndex = array.length - 1;

      if (index === 0) hour = "08:00";
      else if (index - ultimoIndex === -2) hour = "12:26";
      else if (index - ultimoIndex === -1) hour = "14:26";
      else if (index === array.length - 1) hour = "18:00";

      this.defaultHours[typeHour] = hour;
    });
    this.stringTextHour = "";

    this.formateHours();
  },
  watch: {
    checkDefaultValues: function(checked) {
      this.hours = checked ? this.defaultHours : {};
    },
    hours: function() {
      this.formateHours();
    }
  }
};

function mouseMove() {
  let { clientX, clientY } = event;

  const later = () => {
    let classList = document.querySelector("#application").classList;
    classList.forEach(elm => classList.remove(elm));
    let positionMouse = "";
    let metadeAltura = window.innerHeight / 2;
    let metadeLargura = window.innerWidth / 2;
    if (clientX > metadeLargura) {
      if (clientY > metadeAltura) {
        positionMouse = "mousedownright";
      } else {
        positionMouse = "mouseupright";
      }
    } else {
      if (clientY > metadeAltura) {
        positionMouse = "mousedownleft";
      } else {
        positionMouse = "mouseupleft";
      }
    }
    document.querySelector("#application").classList.add(positionMouse);
  };

  later();
}
window.addEventListener("mousemove", mouseMove);
</script>

<style lang="scss">
body,
textarea {
  font-family: "Montserrat", sans-serif;
}
body {
  background-color: #212121;
  text-rendering: optimizeLegibility;
}
html,
body {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
#inputsHours {
  .inputHour + .inputHour {
    margin-top: 7px;
  }
  .inputHour {
    position: relative;
    button {
      position: absolute;
      border: 0;
      text-decoration: none;
      outline: none;
      padding: 7px 10px;
      margin-left: 5px;
      border-radius: 0px 4px 10px 0px;
      right: 0;
      background-color: #d2bf55;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        color: #9c0d38;
      }
    }
  }
}

#textareaHours {
  textarea {
    resize: none;
  }
}
#textareaHours p {
  margin-top: 0;
  margin-bottom: 7px;
}
#application {
  width: 500px;
  max-width: 90%;
  margin: 30px auto;
  background-color: #9c0d38;
  padding: 50px;

  border-radius: 40px 20px;
  box-shadow: 12px 12px #645e9d;
  transition: box-shadow 0.2s cubic-bezier(0.175, 0.885, 0.32, 2.275);
  h1,
  h2 {
    text-align: center;
    text-shadow: 2px 2px 20px #223127;
  }
}
#application.mouseupright {
  box-shadow: 12px -12px #645e9d;
}
#application.mousedownright {
  box-shadow: 12px 12px #645e9d;
}
#application.mouseupleft {
  box-shadow: -12px -12px #645e9d;
}
#application.mousedownleft {
  box-shadow: -12px 12px #645e9d;
}
h1,
label,
p,
h2 {
  color: #ddf0ff;
}
input,
textarea {
  background-color: #ddf0ff;
  border: 0;
  outline: none;
  border-radius: 10px 5px;
  padding: 7px;
}
#inputsTextarea {
  display: flex;
  justify-content: space-between;
}
.tooltip {
  display: block !important;
  z-index: 10000;
  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  &[x-placement^="top"] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="bottom"] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="right"] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[x-placement^="left"] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
  &.info {
    $color: rgba(#004499, 0.9);
    .tooltip-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }
    .tooltip-arrow {
      border-color: $color;
    }
  }
  &.popover {
    $color: #f9f9f9;
    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }
    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>