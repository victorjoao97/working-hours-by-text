<template>
    <div id="box">
        <div id="application" :key="unique">
            <div class="langSelect">
                <label for="lang">{{$t('lang')}}</label>
                <select v-model="langSelected" id="lang">
                    <option
                        v-for="(lang, i) in langs"
                        :key="`Lang${i}`"
                        :value="lang"
                        :selected="lang === langSelected"
                    >{{ $t(lang) }}</option>
                </select>
            </div>
            <h1>{{$t('appName')}}</h1>
            <div id="inputsTextarea">
                <div id="inputsHours">
                    <input type="checkbox" v-if="false" v-model="checkDefaultValues" />
                    <input-hour
                        class="inputHour"
                        v-for="(label, index) in typeHours"
                        :key="index"
                        v-bind:label="label"
                        v-on:change-hour="changeHour($event)"
                        v-bind:clearAllInputs="enableClearAllInputs"
                    ></input-hour>
                    <button @click.prevent="clearAllInputs">{{$t('clearAllInputs')}}</button>
                </div>
                <div id="textareaHours">
                    <p>{{$t('clipboard')}}</p>
                    <textarea
                        v-tooltip="{content: $t('copied'), placement: 'bottom'}"
                        cols="30"
                        rows="5"
                        :value="stringTextHour"
                        @mouseenter="handleCopyToClipboard"
                        @mouseover="handleCopyToClipboard"
                        readonly
                    ></textarea>
                    <button @click.prevent="markPoint">{{$t('markPoint')}}</button>
                </div>
            </div>
            <h2>
                {{$t('develop_by')}}
                <a href="//github.com/victorjoao97" target="_blank">João</a>
            </h2>
            <div v-if="false">{{hours}} - {{entrada}}</div>
        </div>
        <notifications />
    </div>
</template>

<script>
import InputHour from "./components/InputHour";
import { setHours } from "./utils/hours";

export default {
    components: {
        InputHour
    },
    data: () => {
        return {
            typeHours: ["Inicio", "Intervalo", "Retorno", "Saída"],
            hours: {},
            defaultHours: {},
            checkDefaultValues: false,
            stringTextHour: "",
            langs: ["en", "pt_br"],
            langSelected: localStorage["langSelected"] || "pt_br",
            enableClearAllInputs: false,
            unique: 1
        };
    },
    computed: {},
    methods: {
        clearAllInputs() {
            this.hours = {};
            this.enableClearAllInputs = !this.enableClearAllInputs;
        },
        handleCopyToClipboard() {
            this.copyToClipboard();
            event.target.select();
        },
        changeHour(value) {
            if (!value.hour) {
                localStorage[value.type] = "";
                delete this.hours[value.type];
            } else {
                this.hours[value.type] = localStorage[value.type] = value.hour;
            }
            this.formateHours();
        },
        formateHours: function() {
            var stringTextHour = "";
            let now = this.$moment().format("DD/MM/YYYY");

            this.typeHours.map(typeHour => {
                stringTextHour += `${now} - ${this.hours[typeHour] ||
                    "00:00"} ${this.$t(typeHour)}\n`;
            });

            this.stringTextHour = stringTextHour.trim();
        },
        copyToClipboard: function() {
            this.$clipboard(this.stringTextHour);
        },
        currentHourToLocalStorageAndData(typeHour) {
            if (!typeHour) throw Error("No type hour passing");
            this.hours[typeHour] = localStorage[
                typeHour
            ] = this.$moment().format("HH:mm");
        },
        markPoint: function() {
            let onlyOne = true;
            const MINORHOUR = 2;

            this.typeHours.forEach((typeHour, index, array) => {
                if (!localStorage[typeHour] || localStorage[typeHour] == "00:00") {
                    if (index === 0) {
                        this.currentHourToLocalStorageAndData(typeHour);
                        onlyOne = false;
                        window.location.reload();
                        return;
                    }
                    if (onlyOne) {
                        let now = this.$moment(new Date());
                        let hour = setHours(localStorage[array[index - 1]]);
                        let diference = this.$moment.duration(now.diff(hour));

                        let diferenceHours = diference.asHours();
                        if (diferenceHours > MINORHOUR) {
                            this.currentHourToLocalStorageAndData(typeHour);
                        } else {
                            let currentHourToLocalStorageAndData = this
                                .currentHourToLocalStorageAndData;
                            let formateHours = this.formateHours;
                            this.$dialog
                                .confirm(
                                    this.$tc("confirmMinorHour", MINORHOUR, {
                                        hour: MINORHOUR
                                    })
                                )
                                .then(function() {
                                    currentHourToLocalStorageAndData(typeHour);
                                    formateHours();
                                    window.location.reload();
                                })
                                .catch(function() {});
                        }
                        onlyOne = false;
                    }
                }
            });
            this.formateHours();
            this.$forceUpdate();
        }
    },
    created() {
        this.stringTextHour = "";
        this.formateHours();
        this.$i18n.locale = this.langSelected;
    },
    watch: {
        checkDefaultValues: function(checked) {
            this.hours = checked ? this.defaultHours : {};
        },
        hours: function() {
            this.formateHours();
        },
        "$i18n.locale": function() {
            this.formateHours();
        },
        langSelected: function(lang) {
            localStorage["langSelected"] = this.$i18n.locale = lang;
        }
    }
};

function mouseMove() {
    let { clientX, clientY } = event;

    const later = () => {
        if (!document.querySelector("#application")) return;
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
@mixin hover {
    &:hover {
        box-shadow: 2px 2px 3px #000000b6;
        @content;
    }
}
@mixin button {
    margin-top: 15px;
    display: block;
    width: 100%;
    appearance: none;
    background: #645e9d;
    border: 0;
    outline: none;
    border-radius: 10px 5px;
    padding: 10px;
    font-weight: bold;
    color: #ddf0ff;
    box-shadow: 2px 2px 3px #0000007a;
    cursor: pointer;

    @include hover {
        opacity: 0.9;
    }
}
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
#box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
#inputsHours {
    padding-right: 10px;
    & > button {
        @include button;
    }
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
            &:not([disabled]) {
                cursor: pointer;
            }
            font-weight: bold;
            &:hover:not([disabled]) {
                color: #9c0d38;
            }
        }
    }
}

#textareaHours {
    padding-left: 10px;
    textarea {
        resize: none;
    }
    button {
        @include button;
    }
}
#textareaHours p {
    margin-top: 0;
    margin-bottom: 7px;
}
#application {
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

    .langSelect {
        text-align: right;
        label {
            margin-right: 10px;
        }
        select {
            border: 0;
            width: 38%;
        }
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

    @include hover;
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