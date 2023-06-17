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
        content: item.content,
        uninstallContent: item.uninstallContent
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
        content: item.content,
        uninstallContent: item.uninstallContent

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
          content: "link::http://static.myim.online/moon/::icon::${moonappicon}",
        }
      )
    }`,
    uninstallContent: `function main(system){
      system.fs.unlink('/C/Users/Desktop/看月亮.url')
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
