<template>
  <sip-page>
    <sip-page-header>
      test
      <template slot="desc">testaafadf</template>
    </sip-page-header>
    <sip-page-body>
      <div v-sip-access:access> Name: {{name}}</div>
      <div> <a @click="testOpen()">testOpen</a> </div>
      <Button v-sip-access:ok type="error" size="large" @click="ok()">OK</Button>

    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./test-router.ts"></script>
