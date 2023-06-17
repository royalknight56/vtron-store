<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppItem from './components/AppItem.vue';
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
      path: `/C/System/plugs/${item.name}.ts`,
      file: {
        content: item.content
      }
    }
  }, "*")
}

function uninstall(item: any) {
  window.parent.postMessage({
    type: 'uninstall', data: {
      path: `/C/System/plugs/${item.name}.ts`,
      file: {
        content: item.content
      }
    }
  }, "*")
}


const temp = [
  {
    name: 'apptest',
    icon: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    content: `function main(system){
        console.log('testapp');
        console.log(system);
      }`
  },
  {
    name: 'apptest',
    icon: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    content: `function main(system){
        console.log('testapp');
        console.log(system);
      }`
  },
    {
    name: 'apptest',
    icon: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    content: `function main(system){
        console.log('testapp');
        console.log(system);
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
    <div class="store-middle">

    </div>
    <div class="store-bottom">

    </div>
  </div>
</template>

<style scoped>
.store {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.store-top{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items:  flex-start;
}
</style>
