# PlutoBoardExamples
Example of PlutoBoard using Vite + Vue

## Setup
`git clone https://github.com/UniStuttgart-IKR/PlutoBoardExamples`

`cd JuliaCon`

`julia --project`

`using PlutoBoard; PlutoBoard.run(true)`

Make sure the ports `1234`, `8080` and `8085` are unused.

## Editing the Vite project
The vite project is located in `JuliaCon/juliacon-vue-ts`. After editing, just build it using `npm run build` and all bundled files will be copied in the right directories, or use `npm run dev` to just run the Vite project without PlutoBoard to quickly build new layouts or play around with Vite and Vue.
