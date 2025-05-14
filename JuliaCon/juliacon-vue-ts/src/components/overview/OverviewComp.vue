<script setup lang="ts">

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
</script>

<template>
  <div class="container mx-auto p-4 flex flex-col h-full">
    <div class="flex-grow flex items-center justify-center">
      <div class="grid grid-cols-4 grid-rows-1 gap-x-6 gap-y-6">
        <Card class="col-span-4 row-span-1 px-6">
          <CardHeader>
            <CardTitle class="text-center text-xl">PlutoBoard.jl Example</CardTitle>
          </CardHeader>
          <CardContent class="flex-1">
            <p class="text-center">This example shows some things you can do with Plutoboard.<br>
              The whole website is built using <b>Vite.js</b> and <b>Vue.js</b> with several npm packages, like <b>shadcn</b>
              for components, <b>tailwindcss</b> for styling and <b>Vue Router</b> for routing. <br>
              Just play around, it's fun!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>