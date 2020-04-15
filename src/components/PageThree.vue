<template>
  <div>
    <h1>这是页面3,展示走马灯效果</h1>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in pic" :key="item">
        <el-image :src="item"></el-image>
<!--        <h3 class="medium">{{ item }}</h3>-->
      </el-carousel-item>
    </el-carousel>


  </div>
</template>

<script>
    export default {
        name: "PageThree",
      data(){
        return{
          pic:["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],
        }
      },

    }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
