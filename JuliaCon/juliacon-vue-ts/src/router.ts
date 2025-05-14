import {createRouter, createMemoryHistory} from 'vue-router'

import MovableCells from "@/components/movable_cells/MovableCells.vue";
import CallJulia from "@/components/call_julia/CallJulia.vue";
import OverviewComp from "@/components/overview/OverviewComp.vue";

const routes = [
    {path: '/', component: OverviewComp},
    {path: '/movablecells', component: MovableCells},
    {path: '/calljulia', component: CallJulia},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router