<template>
  <div>
    <Table
      :loading="loading"
      ref="table1"
      stripe
      highlight-row
      border
      :columns="columns"
      :data="datas"
    ></Table>
    <div v-if="showPageBar" style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="total"
          :current="pageIndex"
          :page-size="pageSize"
          :page-size-opts="pageSizeOpts"
          @on-change="pageChangePage"
          @on-page-size-change="pageChangeSize"
          show-sizer
          show-total
        ></Page>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" src="./sip-table.component.ts"></script>
