<template>
  <Table
    :loading="loading"
    ref="table1"
    stripe
    highlight-row
    border
    :columns="columns"
    :data="datas"
  ></Table>
  <!-- <div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
      <Page :total="100" :current="1" @on-change="changePage"></Page>
    </div>
  </div> -->
</template>
<script lang="ts" src="./sip-table.component.ts"></script>
