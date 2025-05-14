<script setup>
import {onMounted, ref} from 'vue'
import {GridLayout, GridItem} from 'vue3-grid-layout-next'
import {placeAlliFrames} from "../../../../lib/interface.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const layout = ref([
  {x: 0, y: 0, w: 3, h: 4, i: '0', id: "2eac3d05-ae01-40c8-abfa-d55349f043f3"},
  {x: 3, y: 0, w: 3, h: 5, i: '1', id: "2e287869-a591-45ba-ac12-28c24fd9059a"},
  {x: 6, y: 0, w: 6, h: 9, i: '2', id: "699e09e3-9769-44fd-ba6e-b73bbeb16b49"},
  {x: 0, y: 4, w: 3, h: 4, i: '3', id: "db4feea7-a90d-4517-9bc1-0cd6f68fce1d"},
  {x: 0, y: 4, w: 3, h: 6, i: '4', id: "2fada8d4-e905-4640-88ab-e5bd3af3daa5"},
  {x: 3, y: 4, w: 3, h: 9, i: '5', id: "3a83e9bf-2c18-4d27-92e8-a3f4b1e815da"},
  {x: 6, y: 8, w: 3, h: 5, i: '6', id: "a1a87780-bd1b-4609-a56a-186cee70ca7f"},
  {x: 9, y: 8, w: 3, h: 5, i: '7', id: "496c438b-e228-476b-95a3-8cf9b0608186"},
])

const gridConfig = {
  colNum: 12,
  rowHeight: 30,
  isDraggable: true,
  isResizable: true,
  margin: [10, 10],
}

onMounted(() => {
  placeAlliFrames();
})

</script>

<template>
  <div class="container mx-auto p-4 flex flex-col h-full">
    <!--    <h1 class="text-4xl text-white font-bold text-center w-full mb-8">Movable cells</h1>-->
    <div class="flex-grow flex items-center justify-center">
      <div class="grid grid-cols-1 grid-rows-5 gap-x-6 gap-y-6 w-full h-fit">
        <Card class="row-span-1">
          <CardHeader>
            <CardTitle class="text-center text-xl">What is happening?</CardTitle>
          </CardHeader>
          <CardContent class="flex-1">
            <p class="text-center">
              It's simple - just move and resize cells as you wish :).
            </p>
          </CardContent>
        </Card>
        <Card class="row-span-4">
          <CardHeader>
            <CardTitle class="text-center text-3xl">Movable Cells</CardTitle>
          </CardHeader>
          <CardContent class="flex-grow flex items-center justify-center">

            <grid-layout
                v-model:layout="layout"
                :col-num="gridConfig.colNum"
                :row-height="gridConfig.rowHeight"
                :is-draggable="gridConfig.isDraggable"
                :is-resizable="gridConfig.isResizable"
                :margin="gridConfig.margin"
                class="h-full w-full"
            >
              <grid-item
                  v-for="item in layout"
                  :key="item.i"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  class="bg-gray-900 rounded-lg p-4"
              >
                <div class="cell-div h-full flex items-center justify-center text-white" :cellid="item.id">
                </div>
              </grid-item>
            </grid-layout>

          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vue-grid-item.vue-grid-placeholder {
  background: #41b883;
  opacity: 0.4;
}
</style>