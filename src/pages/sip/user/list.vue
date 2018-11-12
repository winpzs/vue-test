<template>
  <div class="bvue-page">
    Test Demo: {{getName()}}{{aaa}}{{count}}
    b:{{obj.b}}
    userService:{{this.useSrv.name}}
    <UserSelect title="title ok" ref="userselect"></UserSelect>
  </div>
</template>
<script lang="ts" src="./list.ts"></script>
