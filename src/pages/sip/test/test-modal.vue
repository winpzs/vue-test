<template>
  <sip-page>
    <sip-page-header>
      {{name}}
      <template slot="desc">{{desc}}</template>
    </sip-page-header>
    <sip-page-body>
      <!-- <sip-modal width="500">
        <sip-modal-header>title</sip-modal-header>
        <sip-modal-body height="300">
          <p>After you click ok, the dialog box will close in 2 seconds.</p>
        </sip-modal-body>
        <sip-modal-footer>
          <Button type="error" size="large" @click="$logger.debug('ok')">Delete</Button>
        </sip-modal-footer>
      </sip-modal> -->
      <Modal v-if="has" v-model="modal1" width="360" @on-cancel="onClose()"  @on-ok="onClose()">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>Delete confirmation</span>
        </p>
        <div style="text-align:center">
            <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
            <p>Will you delete it?</p>
        </div>
        <div slot="footer">
          ok
        </div>
      </Modal>
      <div>Name: {{name}}</div>
      <div>
        <a @click="open()">open</a>
      </div>
    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./test-modal.ts"></script>
