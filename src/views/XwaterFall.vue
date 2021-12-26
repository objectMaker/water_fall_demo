<template>
  <div class="x_image_container" v-to-bottom="{bottomHeight:40}">
    <div class="image_container" v-for="(item,index) in imageList" :key="index"
         :style="{flexGrow:item.width/item.height,width:100*item.width/item.height+'px'}">
      <div :style="{paddingBottom:item.height/item.width*100+'%'}"></div>
<!--      <img :data-src="item.imageUrl">-->
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
          count:40,
          imageList:[],
          loadingImages:false,
        }
    },
  methods:{
      async getImages(){
        if(this.loadingImages) return ;

        this.loadingImages = true;
        const res = await getImages({
          count:this.count,
          start:this.start,
        })
        console.log(res,'获取到数据了')
      this.imageList =  [...this.imageList,...res];
        this.loadingImages = false;
      }
  },
  mounted() {
      this.getImages()
  },
  directives:{
      toBottom:{
        bind(el,binding,vnode){
          console.log(el);
          el.onscroll = function (){
            let ch = el.clientHeight;
            let st = el.scrollTop;
            let sh = el.scrollHeight;
            if(sh-st-ch <= binding.value.bottomHeight){
              console.log('触底了')
              vnode.context.getImages()
            }
          }
        }
      }
  }
}
</script>

<style lang="less" scoped>
  .x_image_container{
    height: 100%;
    overflow: scroll;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    &::after{
      content:'';
      flex-grow: 9999;
      background: white;
    }
    .image_container{
      margin: 5px;
      flex-shrink: 0;
      position: relative;
      background: antiquewhite;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  }
</style>