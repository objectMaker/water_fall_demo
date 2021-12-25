<template>
    <div>
      我是等高瀑布流
    </div>
</template>

<script>
import {getImages} from "../api/images";

export default {
    data(){
        return {
          start:0,
          count:20,
        }
    },
  methods:{
      async getImages(){
        const res = await getImages({
          count:this.count,
          start:this.start,
        })
        console.log(res,'获取到数据了')
      }
  },
  mounted() {
      this.getImages()
  }
}
</script>

<style lang="less" scoped>

</style>