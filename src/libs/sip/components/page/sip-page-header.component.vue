<template>
  <div class="b-childheader bvue-page-header">
        <div class="title"><slot></slot></div>
        <div class="subtitle" v-if="!!$slots.desc"><slot name="desc"></slot></div>
        <Button v-if="canBack" class="back-btn" @click="back" shape="circle" icon="arrow-left-c"></Button>
    </div>
</template>
<script lang="ts" src="./sip-page-header.component.ts"></script>
