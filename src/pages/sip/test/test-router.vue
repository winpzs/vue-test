<template>
  <sip-page>
    <sip-page-header>
      test
      <template slot="desc">testaafadf</template>
    </sip-page-header>
    <sip-page-body>
      <div> Name: {{name}}</div>
      <div> <a @click="testOpen()">testOpen</a> </div>
    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./test-router.ts"></script>
