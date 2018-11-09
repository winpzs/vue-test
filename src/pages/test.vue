<template>
  <div class="bvue-page">
    Test Demo: {{getName()}}{{aaa}} --- {{srv1.getName()}}
    state: {{$store.state.foo}}
    <Test2></Test2>
    <Test3></Test3>
  </div>
</template>
<script lang="ts" src="./test.ts"></script>
