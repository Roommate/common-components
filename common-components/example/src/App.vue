<template>
    <div id="app" >
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
*{ padding: 0; margin: 0; box-sizing: border-box; font-size: 14px; }
.demo-page{
  width: 1200px;
  margin: 0 auto;
}
.demo-box{
  margin-bottom: 30px;
}
.demo-title{
  font-size: 18px;
  font-weight: bold;
}
.demo-main{
  
}
</style>
