<template>
  <Modal v-model="show" :width="width" :mask-closable="maskClosable" @on-cancel="onClose()"  @on-ok="onClose()">
    <slot></slot>
  </Modal>
</template>
<script lang="ts" src="./sip-modal.component.ts"></script>
