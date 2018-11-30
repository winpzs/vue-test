<template>
  <Modal v-model="show" :width="width" :mask-closable="maskClosable">
    <slot></slot>
  </Modal>
</template>
<script lang="ts" src="./sip-modal.component.ts"></script>
