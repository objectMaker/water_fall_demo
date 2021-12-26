<template>
  <div class="x_image_container" v-to-bottom="{bottomHeight:40}">
    <div class="image_container" v-for="(item,index) in imageList" :key="index"
         :style="{flexGrow:100*item.width/item.height,width:100*item.width/item.height+'px'}">
      <div :style="{paddingBottom:item.height/item.width*100+'%'}"></div>
      <img :data-src="item.imageUrl">
<!--      <img :src="item.imageUrl">-->
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
        this.$nextTick(()=>{
          let el = document.getElementsByClassName('x_image_container')[0]
          let ch = el.clientHeight;
          let st = el.scrollTop;
          this.lazyLoad([...document.getElementsByClassName('x_image_container')[0].childNodes],st,ch)
        })
        this.loadingImages = false;
      },
    lazyLoad(childrenNode,st,ch){
        if(childrenNode.length>this.count*2){
          childrenNode = childrenNode.slice(-this.count-10)
        }
      childrenNode.forEach(item=>{
        if(item.offsetTop - st < ch -100){
          console.log('图片进来了')
          console.log(item)
          console.log(JSON.stringify(item))
          let item2 = [...item.childNodes][1]
          !(item2.src) && (item2.src = item2.dataset.src);
        }
      })
    },
  },
  mounted() {
      this.getImages()
  },
  directives:{
      toBottom:{
        bind(el,binding,vnode){
          // vnode.context 就是当前组件实例
          el.onscroll = function (){
            let ch = el.clientHeight;
            let st = el.scrollTop;
            let sh = el.scrollHeight;
            let childrenNode = [...el.childNodes];
            vnode.context.lazyLoad(childrenNode,st,ch)
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
    width: 99%;
    box-sizing: content-box;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    &::after{
      content:'';
      flex-grow: 999;
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
        vertical-align: top;
      }
    }
  }
</style>