<template>
  <sip-page>
    <sip-page-header>
      {{name}}
      <template slot="desc">{{desc}}</template>
    </sip-page-header>
    <sip-page-body>
      <sip-page-toolbar>
        <Button @click="tableManager.refresh()">
          <Icon type="ios-refresh" size="24" />
        </Button>

        <Button type="primary" @click="create()" v-sip-access:create>
          <Icon type="md-create"/>创建
        </Button>
        <Button type="info" ghost @click="startup()" v-sip-access:startup>
          <Icon type="ios-play-outline"/>开机
        </Button>
        <Button  @click="shutdown()" v-sip-access:shutdown>
          <Icon type="md-power"/>关机
        </Button>
        <Dropdown trigger="click">
          <Button>更多操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem v-sip-click="{fn: startup, params: []}" v-sip-access:startup>开机</DropdownItem>
            <DropdownItem v-sip-click="shutdown" v-sip-access:shutdown>关机</DropdownItem>
            <DropdownItem :disabled="disabled">资源移交</DropdownItem>
            <DropdownItem name="destroy">销毁</DropdownItem>
            <DropdownItem>销毁保护</DropdownItem>
            <DropdownItem name="tags">资源标签</DropdownItem>
            <DropdownItem divided>制作镜像</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <Button @click="exportData(1)">
          <Icon type="ios-download-outline"></Icon>导出
        </Button>

        <Dropdown @on-click="changeTagsMenu">
          <Button>
            <Icon type="ios-pricetags-outline"/>标签
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu v-for="(item,index) in tags" :key="index" slot="list">
            <Dropdown placement="right-start">
              <DropdownItem :name="item.key">
                {{ item.name }}
                <Icon v-if="item.children" type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem v-for="(eItem, index) in item.children" :key="index" :name="eItem.key">{{ eItem.name }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </DropdownMenu>
        </Dropdown>

        <Input
          style="display: inline-block;width:250px"
          @on-search="searchEvent"
          search
          placeholder="搜索"
        />
      </sip-page-toolbar>

      <div ref="tagBlock">
        <Tag
          type="border"
          v-for="(item, index) in tagsList" :key="index"
          closable
          @on-close="handleClose(index)"
        >{{ item }}</Tag>
      </div>

      <sip-table :manager="tableManager">
        <sip-table-formatter column="Title">
          <template slot-scope="{row, column, cellValue, cellText, index}">
            <a v-sip-click="info">{{cellValue}}</a>
          </template>
        </sip-table-formatter>
        <sip-table-formatter column="Volumn_Status">
          <template slot-scope="{row, column, cellValue, cellText, index}">
            {{cellValue}}({{cellText}})
          </template>
        </sip-table-formatter>
      </sip-table>

    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./list.ts"></script>
