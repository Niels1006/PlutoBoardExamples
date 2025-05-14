<script setup lang="ts">
import {use} from 'echarts/core'
import {ScatterChart} from 'echarts/charts'
import {GridComponent} from 'echarts/components'
import {CanvasRenderer} from 'echarts/renderers'
import VChart from 'vue-echarts'
import {Button} from "@/components/ui/button";
import {onMounted, ref} from "vue";
import {callJuliaFunction, placeAlliFrames, updateCellByVariable} from "../../../../lib/interface";
import {Label} from "reka-ui";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


use([GridComponent, ScatterChart, CanvasRenderer])

const option = ref({
  grid: {
    show: false,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    containLabel: false

  },
  xAxis: {
    min: -5,
    max: 5,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    min: -5,
    max: 5,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },

  series: [
    {
      symbolSize: 2,
      itemStyle: {
        color: '#ffffff'
      },
      data: [[1, 1]],
      type: 'scatter'
    }
  ]
});

const var_x = ref(1)
const var_y = ref(1)
const mean_x = ref(0)
const mean_y = ref(0)
const samples = ref(10)

async function update() {
  option.value = {
    ...option.value,
    series: [
      {
        ...option.value.series[0],
        data: await generateRandomData(),
      }
    ]
  };
  updateCellByVariable("user_package.samples_len")
  updateCellByVariable("user_package.first_sample")
  updateCellByVariable("user_package.last_sample")
  updateCellByVariable("user_package.samples")

}

async function generateRandomData() {
  const result = await callJuliaFunction('get_2d_samples', {args: [samples.value, mean_x.value, mean_y.value, var_x.value, var_y.value]})
  return result

  // const data = [];
  // for (let i = 0; i < count; i++) {
  //   const x = Math.random();
  //   const y = Math.random();
  //   data.push([x, y]);
  // }
  // return data;
}

const iframeSelector = 'div[cellid="699e09e3-9769-44fd-ba6e-b73bbeb16b49"] iframe';

function waitForPlutoInputs(timeout = 10000): Promise<[HTMLIFrameElement, HTMLElement[], HTMLElement[]]> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const checkIframe = setInterval(() => {
      const iframe = document.querySelector<HTMLIFrameElement>(iframeSelector);
      if (iframe && iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(checkIframe);

        const checkPlutoInputs = setInterval(() => {
          const doc = iframe.contentDocument;
          const plutoInputs = doc?.querySelectorAll<HTMLElement>('pluto-input');
          const plutoOutputs = doc?.querySelectorAll<HTMLElement>('pluto-output');

          if (plutoInputs && plutoOutputs && plutoInputs.length > 0) {
            clearInterval(checkPlutoInputs);
            resolve([iframe, Array.from(plutoInputs), Array.from(plutoOutputs)]);
          } else if (Date.now() - start > timeout) {
            clearInterval(checkPlutoInputs);
            reject('Timeout: No <pluto-input> elements found inside iframe.');
          }
        }, 100);
      } else if (Date.now() - start > timeout) {
        clearInterval(checkIframe);
        reject('Timeout: Iframe not found or not loaded.');
      }
    }, 100);
  });
}

onMounted(() => {
  placeAlliFrames();
  update();

  waitForPlutoInputs().then(([iframe, plutoInputs, plutoOutputs]) => {
    plutoInputs.forEach((plutoInput: HTMLElement) => {
      plutoInput.style.display = 'none';
    });

    plutoOutputs.forEach((plutoOutput: HTMLElement) => {
      plutoOutput.style.background = 'transparent';
    });

    const notebook: any = iframe.contentDocument?.querySelector('pluto-notebook');
    notebook.style.background = 'transparent';

  });


})

</script>

<template>
  <div class="container mx-auto p-4 flex flex-col h-full">
    <!--    <h1 class="text-4xl text-white font-bold text-center w-full mb-8">Calling Julia</h1>-->
    <div class="flex-grow flex items-center justify-center">
      <div class="grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-6">
        <Card class="col-span-4 row-span-1">
          <CardHeader>
            <CardTitle class="text-center text-xl">What is happening?</CardTitle>
          </CardHeader>
          <CardContent class="flex-1">
            <p class="text-center">Once the update button is pressed, all user inputs are collected with JavaScript and PlutoBoard calls a Julia function to get samples
              according to the inputs, like mean and variance.<br>
              Once it gets those, it updates the Echarts plot, which uses Apache Echarts and is fully implemented in
              JavaScript and running in the frontend.<br>
              It also updates the Pluto cells on the right (Reactive Cells and Makie Plot) to display the updated variables and to plot them using Makie.

            </p>
          </CardContent>
        </Card>
        <Card class="py-8 row-span-2">
          <CardHeader>
            <CardTitle class="text-center text-xl">Arguments</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="justify-self-center grid grid-cols-2 grid-rows-3 gap-4">
              <NumberField id="var_x" v-model="var_x" :step="0.1">
                <Label class="text-center" for="var_x">Variance X</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement/>
                  <NumberFieldInput/>
                  <NumberFieldIncrement/>
                </NumberFieldContent>
              </NumberField>

              <NumberField id="var_y" v-model="var_y" :step="0.1">
                <Label class="text-center" for="var_y">Variance Y</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement/>
                  <NumberFieldInput/>
                  <NumberFieldIncrement/>
                </NumberFieldContent>
              </NumberField>

              <NumberField id="mean_x" v-model="mean_x" :step="0.1">
                <Label class="text-center" for="mean_x">Mean X</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement/>
                  <NumberFieldInput/>
                  <NumberFieldIncrement/>
                </NumberFieldContent>
              </NumberField>

              <NumberField id="mean_y" v-model="mean_y" :step="0.1">
                <Label class="text-center" for="mean_y">Mean Y</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement/>
                  <NumberFieldInput/>
                  <NumberFieldIncrement/>
                </NumberFieldContent>
              </NumberField>

              <NumberField id="samples" v-model="samples" :step="100" class="col-span-2">
                <Label class="text-center" for="samples">Samples</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement/>
                  <NumberFieldInput/>
                  <NumberFieldIncrement/>
                </NumberFieldContent>
              </NumberField>


              <Button @click="update()" class="col-span-2">Update</Button>
            </div>
          </CardContent>
        </Card>

        <Card class="col-span-1 row-span-2 px-6">
          <CardHeader>
            <CardTitle class="text-center text-xl">Echarts Plot</CardTitle>
          </CardHeader>
          <CardContent class="flex-1">
            <div class="h-full w-full">
              <v-chart :option="option" autoresize/>
            </div>
          </CardContent>
        </Card>
        <Card class="col-span-1 row-span-2 px-6">
          <CardHeader>
            <CardTitle class="text-center text-xl">Reactive Cells</CardTitle>
          </CardHeader>
          <CardContent class="flex-1">
            <div class="grid grid-cols-1 grid-rows-3 w-full h-full gap-4">
              <div class="h-20 w-full cell-div" cellid="2fada8d4-e905-4640-88ab-e5bd3af3daa5">
              </div>
              <div class="h-20 w-full cell-div" cellid="db4feea7-a90d-4517-9bc1-0cd6f68fce1d">
              </div>
              <div class="h-20 w-full cell-div" cellid="3a83e9bf-2c18-4d27-92e8-a3f4b1e815da">
              </div>
            </div>
          </CardContent>
        </Card>
        <Card class="col-span-1 row-span-2 px-6">
          <CardHeader>
            <CardTitle class="text-center text-xl">Makie Plot</CardTitle>
          </CardHeader>
          <CardContent class="flex-1">
            <div class="h-full w-full cell-div" cellid="699e09e3-9769-44fd-ba6e-b73bbeb16b49">
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>