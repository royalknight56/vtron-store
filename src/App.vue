<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppItem from './components/AppItem.vue';
import defaulticon from "./assets/default.png"
import moonappicon from "./assets/moonappicon.webp"


const isready = ref(false)
const installedList = ref([]);
onMounted(() => {
  window.parent.postMessage({ type: 'ready', data: 'ready' }, "*")
  window.addEventListener("message", function (event) {
    if (event.source === window.parent) {
      let rec: any = event.data;
      if (rec.type === 'init') {
        installedList.value = rec.data;
        isready.value = true;
      }
    }
  });
})
function install(item: any) {
  window.parent.postMessage({
    type: 'install', data: {
      path: `/C/System/plugs/${item.name}.js`,
      file: {
        content: item.content?.replaceAll('\n',' '),
        uninstallContent: item.uninstallContent?.replaceAll('\n',' ')
      },
      type:item.type
    }
  }, "*")
}

function uninstall(item: any) {
  window.parent.postMessage({
    type: 'uninstall', data: {
      path: `/C/System/plugs/${item.name}.js`,
      file: {
        content: item.content?.replaceAll('\n',' '),
        uninstallContent: item.uninstallContent?.replaceAll('\n',' ')

      },
      type:item.type
    }
  }, "*")
}


const temp = [
  {
    name: 'systemTest',
    desc:'可以在启动的时候输出一些信息',
    icon: defaulticon,
    type:'all',
    content: `function main(system){
        console.log(system);
      }`
  },
  {
    name: 'kanmoon',
    desc:'添加看月亮app',
    icon: moonappicon,
    type:'once',
    content: `function main(system){
      system.fs.writeFile('/C/Users/Desktop/看月亮.url',
        {
          content: "link::https://static.myim.online/moon/::icon::${moonappicon}",
        }
      )
    }`,
    uninstallContent: `function main(system){
      system.fs.unlink('/C/Users/Desktop/看月亮.url')
    }`
  },
  {
    name: 'tool.lu',
    desc:'添加在线工具集合app',
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPuW3peWFtzwvdGl0bGU+CiAgICA8ZyBpZD0i5bel5YW3IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5bel5YW3566xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS4wMDAwMDAsIDE5LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjMjAyNDI1IiBvcGFjaXR5PSIwLjAxIiBwb2ludHM9IjAgMCA0NzMgMCA0NzMgNDczIDAgNDczIj48L3BvbHlnb24+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTcuNjY2NjY3LDMxLjUzMzMzMzUgQzE0MC4yNTEyODgsMzEuNTMzMzMzNSAxMjYuMTMzMzMzLDQ1LjY1MTI4NzcgMTI2LjEzMzMzMyw2My4wNjY2NjY1IEwxMjYuMTMzMzMzLDE1Ny42NjY2NjcgQzEyNi4xMzMzMzMsMTc1LjA4MjA0NiAxNDAuMjUxMjg3LDE4OS4yIDE1Ny42NjY2NjcsMTg5LjIgTDMxNS4zMzMzMzMsMTg5LjIgQzMzMi43NDg3MTMsMTg5LjIgMzQ2Ljg2NjY2NywxNzUuMDgyMDQ2IDM0Ni44NjY2NjcsMTU3LjY2NjY2NyBMMzQ2Ljg2NjY2Nyw2My4wNjY2NjY1IEMzNDYuODY2NjY3LDQ1LjY1MTI4NzcgMzMyLjc0ODcxMiwzMS41MzMzMzM1IDMxNS4zMzMzMzMsMzEuNTMzMzMzNSBMMTU3LjY2NjY2NywzMS41MzMzMzM1IFogTTE1Ny42NjY2NjcsNjMuMDY2NjY2NSBMMzE1LjMzMzMzMyw2My4wNjY2NjY1IEwzMTUuMzMzMzMzLDE1Ny42NjY2NjcgTDE1Ny42NjY2NjcsMTU3LjY2NjY2NyBMMTU3LjY2NjY2Nyw2My4wNjY2NjY1IFogTTMxLjUzMzMzMzUsMjgzLjggTDMxLjUzMzMzMzUsNDI1LjcgQzMxLjUzMzMzMzUsNDM0LjQwNzY4OSAzOC41OTIzMTA1LDQ0MS40NjY2NjcgNDcuMyw0NDEuNDY2NjY3IEw0MjUuNyw0NDEuNDY2NjY3IEM0MzQuNDA3Njg5LDQ0MS40NjY2NjcgNDQxLjQ2NjY2Nyw0MzQuNDA3Njg5IDQ0MS40NjY2NjcsNDI1LjcgTDQ0MS40NjY2NjcsMjgzLjggQzQ0MS40NjY2NjcsMjc1LjA5MjMxMSA0MzQuNDA3Njg5LDI2OC4wMzMzMzMgNDI1LjcsMjY4LjAzMzMzMyBMNDcuMywyNjguMDMzMzMzIEMzOC41OTIzMTA1LDI2OC4wMzMzMzMgMzEuNTMzMzMzNSwyNzUuMDkyMzExIDMxLjUzMzMzMzUsMjgzLjggWiIgaWQ9IlNoYXBlIiBmaWxsPSIjMDA5QTYxIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMS41MzMzMzM1LDEyNi4xMzMzMzMgQzMxLjUzMzMzMzUsMTIxLjk1MTc1MyAzMy4xOTQ0NTk1LDExNy45NDE0NCAzNi4xNTEyODMsMTE0Ljk4NDYxNiBDMzkuMTA4MTA2NiwxMTIuMDI3NzkzIDQzLjExODQyLDExMC4zNjY2NjcgNDcuMywxMTAuMzY2NjY3IEw0MjUuNywxMTAuMzY2NjY3IEM0MjkuODgxNTgsMTEwLjM2NjY2NyA0MzMuODkxODkzLDExMi4wMjc3OTMgNDM2Ljg0ODcxNywxMTQuOTg0NjE2IEM0MzkuODA1NTQxLDExNy45NDE0NCA0NDEuNDY2NjY3LDEyMS45NTE3NTMgNDQxLjQ2NjY2NywxMjYuMTMzMzMzIEw0NDEuNDY2NjY3LDIzNi41IEM0NDEuNDY2NjY3LDI0NS4yMDc2ODkgNDM0LjQwNzY4OSwyNTIuMjY2NjY3IDQyNS43LDI1Mi4yNjY2NjcgTDQ3LjMsMjUyLjI2NjY2NyBDMzguNTkyMzEwNSwyNTIuMjY2NjY3IDMxLjUzMzMzMzUsMjQ1LjIwNzY4OSAzMS41MzMzMzM1LDIzNi41IEwzMS41MzMzMzM1LDEyNi4xMzMzMzMgWiIgaWQ9IlBhdGgiIGZpbGw9IiNGRkFBNDQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE3My40MzMzMzMsMjM2LjUgQzE3My40MzMzMzMsMjI3Ljc5MjMxMSAxODAuNDkyMzExLDIyMC43MzMzMzMgMTg5LjIsMjIwLjczMzMzMyBMMjgzLjgsMjIwLjczMzMzMyBDMjkyLjUwNzY4OSwyMjAuNzMzMzMzIDI5OS41NjY2NjcsMjI3Ljc5MjMxMSAyOTkuNTY2NjY3LDIzNi41IEwyOTkuNTY2NjY3LDI4My44IEMyOTkuNTY2NjY3LDI5Mi41MDc2ODkgMjkyLjUwNzY4OSwyOTkuNTY2NjY3IDI4My44LDI5OS41NjY2NjcgTDE4OS4yLDI5OS41NjY2NjcgQzE4MC40OTIzMTEsMjk5LjU2NjY2NyAxNzMuNDMzMzMzLDI5Mi41MDc2ODkgMTczLjQzMzMzMywyODMuOCBMMTczLjQzMzMzMywyMzYuNSBMMTczLjQzMzMzMywyMzYuNSBaIiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+',
    type:'once',
    content: `function main(system){
      system.fs.writeFile('/C/Users/Desktop/在线工具.url',
        {
          content: "link::https://tool.lu/::icon::data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPuW3peWFtzwvdGl0bGU+CiAgICA8ZyBpZD0i5bel5YW3IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5bel5YW3566xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS4wMDAwMDAsIDE5LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjMjAyNDI1IiBvcGFjaXR5PSIwLjAxIiBwb2ludHM9IjAgMCA0NzMgMCA0NzMgNDczIDAgNDczIj48L3BvbHlnb24+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTcuNjY2NjY3LDMxLjUzMzMzMzUgQzE0MC4yNTEyODgsMzEuNTMzMzMzNSAxMjYuMTMzMzMzLDQ1LjY1MTI4NzcgMTI2LjEzMzMzMyw2My4wNjY2NjY1IEwxMjYuMTMzMzMzLDE1Ny42NjY2NjcgQzEyNi4xMzMzMzMsMTc1LjA4MjA0NiAxNDAuMjUxMjg3LDE4OS4yIDE1Ny42NjY2NjcsMTg5LjIgTDMxNS4zMzMzMzMsMTg5LjIgQzMzMi43NDg3MTMsMTg5LjIgMzQ2Ljg2NjY2NywxNzUuMDgyMDQ2IDM0Ni44NjY2NjcsMTU3LjY2NjY2NyBMMzQ2Ljg2NjY2Nyw2My4wNjY2NjY1IEMzNDYuODY2NjY3LDQ1LjY1MTI4NzcgMzMyLjc0ODcxMiwzMS41MzMzMzM1IDMxNS4zMzMzMzMsMzEuNTMzMzMzNSBMMTU3LjY2NjY2NywzMS41MzMzMzM1IFogTTE1Ny42NjY2NjcsNjMuMDY2NjY2NSBMMzE1LjMzMzMzMyw2My4wNjY2NjY1IEwzMTUuMzMzMzMzLDE1Ny42NjY2NjcgTDE1Ny42NjY2NjcsMTU3LjY2NjY2NyBMMTU3LjY2NjY2Nyw2My4wNjY2NjY1IFogTTMxLjUzMzMzMzUsMjgzLjggTDMxLjUzMzMzMzUsNDI1LjcgQzMxLjUzMzMzMzUsNDM0LjQwNzY4OSAzOC41OTIzMTA1LDQ0MS40NjY2NjcgNDcuMyw0NDEuNDY2NjY3IEw0MjUuNyw0NDEuNDY2NjY3IEM0MzQuNDA3Njg5LDQ0MS40NjY2NjcgNDQxLjQ2NjY2Nyw0MzQuNDA3Njg5IDQ0MS40NjY2NjcsNDI1LjcgTDQ0MS40NjY2NjcsMjgzLjggQzQ0MS40NjY2NjcsMjc1LjA5MjMxMSA0MzQuNDA3Njg5LDI2OC4wMzMzMzMgNDI1LjcsMjY4LjAzMzMzMyBMNDcuMywyNjguMDMzMzMzIEMzOC41OTIzMTA1LDI2OC4wMzMzMzMgMzEuNTMzMzMzNSwyNzUuMDkyMzExIDMxLjUzMzMzMzUsMjgzLjggWiIgaWQ9IlNoYXBlIiBmaWxsPSIjMDA5QTYxIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMS41MzMzMzM1LDEyNi4xMzMzMzMgQzMxLjUzMzMzMzUsMTIxLjk1MTc1MyAzMy4xOTQ0NTk1LDExNy45NDE0NCAzNi4xNTEyODMsMTE0Ljk4NDYxNiBDMzkuMTA4MTA2NiwxMTIuMDI3NzkzIDQzLjExODQyLDExMC4zNjY2NjcgNDcuMywxMTAuMzY2NjY3IEw0MjUuNywxMTAuMzY2NjY3IEM0MjkuODgxNTgsMTEwLjM2NjY2NyA0MzMuODkxODkzLDExMi4wMjc3OTMgNDM2Ljg0ODcxNywxMTQuOTg0NjE2IEM0MzkuODA1NTQxLDExNy45NDE0NCA0NDEuNDY2NjY3LDEyMS45NTE3NTMgNDQxLjQ2NjY2NywxMjYuMTMzMzMzIEw0NDEuNDY2NjY3LDIzNi41IEM0NDEuNDY2NjY3LDI0NS4yMDc2ODkgNDM0LjQwNzY4OSwyNTIuMjY2NjY3IDQyNS43LDI1Mi4yNjY2NjcgTDQ3LjMsMjUyLjI2NjY2NyBDMzguNTkyMzEwNSwyNTIuMjY2NjY3IDMxLjUzMzMzMzUsMjQ1LjIwNzY4OSAzMS41MzMzMzM1LDIzNi41IEwzMS41MzMzMzM1LDEyNi4xMzMzMzMgWiIgaWQ9IlBhdGgiIGZpbGw9IiNGRkFBNDQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE3My40MzMzMzMsMjM2LjUgQzE3My40MzMzMzMsMjI3Ljc5MjMxMSAxODAuNDkyMzExLDIyMC43MzMzMzMgMTg5LjIsMjIwLjczMzMzMyBMMjgzLjgsMjIwLjczMzMzMyBDMjkyLjUwNzY4OSwyMjAuNzMzMzMzIDI5OS41NjY2NjcsMjI3Ljc5MjMxMSAyOTkuNTY2NjY3LDIzNi41IEwyOTkuNTY2NjY3LDI4My44IEMyOTkuNTY2NjY3LDI5Mi41MDc2ODkgMjkyLjUwNzY4OSwyOTkuNTY2NjY3IDI4My44LDI5OS41NjY2NjcgTDE4OS4yLDI5OS41NjY2NjcgQzE4MC40OTIzMTEsMjk5LjU2NjY2NyAxNzMuNDMzMzMzLDI5Mi41MDc2ODkgMTczLjQzMzMzMywyODMuOCBMMTczLjQzMzMzMywyMzYuNSBMMTczLjQzMzMzMywyMzYuNSBaIiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
        }
      )
    }`,
    uninstallContent: `function main(system){
      system.fs.unlink('/C/Users/Desktop/在线工具.url')
    }`
  }
]
</script>

<template>
  <div class="store">
    <div v-if="isready" class="store-top">
      <div v-for="item in temp" class="store-item">
        <AppItem :item="item" 
        :installedList="installedList" 
        :install="install" 
          :uninstall="uninstall"></AppItem>
      </div>
    </div>
    <div v-else class="store-noready">
      <div id="wait">
        <div class="waitd" id="wait1"></div>
        <div class="waitd" id="wait2"></div>
        <div class="waitd" id="wait3"></div>
        <div class="waitd" id="wait4"></div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.store {
  width: 100%;
  height: 100%;
  height: 100vh;
}
.store-top{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items:  flex-start;
}
.store-noready{
  width: 100%;
  height: 100%;
  background-color: #0076d733;
}


#wait {
    position: absolute;
    left: 50%;
    top: calc(50% + 150px);
}

.waitd {
    position: absolute;
    width: 10px;
    height: 10px;
    left: 30px;
    background-color: azure;
    border-radius: 50%;
    transform-origin: -15px 0;
}

#wait1 {
    animation: dotAni1 2s linear infinite;
}

#wait2 {
    animation: dotAni2 2s linear infinite;
}

#wait3 {
    animation: dotAni3 2s linear infinite;
}

#wait4 {
    animation: dotAni4 2s linear infinite;
}

@keyframes dotAni1 {
    0% {
        transform: rotateZ(0deg);
    }

    20% {
        transform: rotateZ(240deg);
    }

    85% {
        transform: rotateZ(290deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

@keyframes dotAni2 {
    0% {
        transform: rotateZ(0deg);
    }

    35% {
        transform: rotateZ(240deg);
    }

    85% {
        transform: rotateZ(290deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

@keyframes dotAni3 {
    0% {
        transform: rotateZ(0deg);
    }

    50% {
        transform: rotateZ(240deg);
    }

    85% {
        transform: rotateZ(290deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

@keyframes dotAni4 {
    0% {
        transform: rotateZ(0deg);
    }

    65% {
        transform: rotateZ(240deg);
    }

    85% {
        transform: rotateZ(290deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}
</style>
