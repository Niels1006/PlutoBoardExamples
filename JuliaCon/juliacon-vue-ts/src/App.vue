<script setup>
import MovableCells from './components/movable_cells/MovableCells.vue';
import {ref} from "vue";
import CallJulia from "./components/call_julia/CallJulia.vue";
import AppSidebar from '@/components/AppSidebar.vue'
import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar'
import {onMounted} from 'vue'


const index = ref(-1)

onMounted(() => {
  // Force dark mode by adding the 'dark' class to the html element
  document.documentElement.classList.add('dark')
})


</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <div class="flex w-screen h-screen p-3 bg-black">
<!--      <SidebarTrigger/>-->
      <RouterView/>
    </div>
  </SidebarProvider>

<!--  <div class="flex w-screen h-screen p-3 bg-gray-900">-->


<!--    <div class="h-full w-40 bg-gray-800 rounded-xl px-2 py-3 text-gray-100 text-xl font-medium">-->
<!--      <div @click="index=0" class="rounded-md h-14 w-full content-center p-1 my-1 sidenav">Movable cells</div>-->
<!--      <div @click="index=1" class="rounded-md h-14 w-full content-center p-1 my-1 sidenav">Julia calls</div>-->
<!--      <div @click="index=2" class="rounded-md h-14 w-full content-center p-1 my-1 sidenav">Simulation</div>-->
<!--      &lt;!&ndash; <div class="rounded-md h-14 w-full content-center p-1 my-1">Placeholder</div> &ndash;&gt;-->
<!--      &lt;!&ndash; <div class="rounded-md h-14 w-full content-center p-1 my-1">Placeholder</div> &ndash;&gt;-->
<!--    </div>-->
<!--    <div class="flex w-full h-full bg-gray-800 p-4 ml-2 rounded-xl">-->
<!--      <MovableCells v-if="index===0"/>-->
<!--      <CallJulia v-if="index===1"/>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>
.sidenav {
  cursor: pointer;
}
</style>
