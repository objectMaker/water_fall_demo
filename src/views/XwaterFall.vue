<template>
  <div class="x_image_container">
    <div class="image_container" v-for="(item,index) in imageList" :key="index">
      <img :src="item.imageUrl">
    </div>
  </div>
</template>

<script>
import {getImages} from "../api/images";

export default {
    data(){
        return {
          start:0,
          count:15,
          imageList:[],
        }
    },
  methods:{
      async getImages(){
        const res = await getImages({
          count:this.count,
          start:this.start,
        })
        console.log(res,'获取到数据了')
      this.imageList =  [...this.imageList,...res];
      }
  },
  mounted() {
      this.getImages()
  }
}
</script>

<style lang="less" scoped>

</style>