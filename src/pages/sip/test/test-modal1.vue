<template>
  <sip-modal width="500">
    <sip-modal-header>{{name}}</sip-modal-header>
    <sip-modal-body height="300">
      <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </sip-modal-body>
    <sip-modal-footer>
      <Button type="error" size="large" @click="ok()">Delete</Button>
    </sip-modal-footer>
  </sip-modal>
</template>
<script lang="ts" src="./test-modal1.ts"></script>
