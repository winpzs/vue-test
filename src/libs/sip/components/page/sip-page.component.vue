<template>
  <div class="bvue-page">
    <slot></slot>
    <async-load-comp v-for="(item, index) in components" :key="index" :is="item.cp" :params="item.params"></async-load-comp>
  </div>
</template>
<script lang="ts" src="./sip-page.component.ts"></script>
