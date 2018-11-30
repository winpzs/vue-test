<template>
  <div class="bvue-page">
    <slot></slot>
    <async-load-comp v-for="item in components" :is="item.cp"></async-load-comp>
    <!-- <async-load-comp v-if="dynamicContent.component" :content="dynamicContent"></async-load-comp> -->
  </div>
</template>
<script lang="ts" src="./sip-page.component.ts"></script>
