<template>
  <div class="bvue-page">
    <div> Name: {{name}}</div>
    <div> Regions: <span v-for="item in regionList">{{item.regionName}}({{item.regionId}}),</span> </div>
  </div>
</template>
<script lang="ts" src="./test-http.ts"></script>
