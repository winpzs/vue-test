<template>
  <sip-page>
    <sip-page-header>
      {{header.title}}
      <template slot="desc">{{header.description}}</template>
    </sip-page-header>
    <sip-page-body>
      <sip-page-toolbar>
        <Button @click="tableManager.refresh()">
          <Icon type="ios-refresh" size="24" />
        </Button>

        <Button type="primary" @click="createNewPage">
          <Icon type="md-create"/>创建
        </Button>
        <Button type="info" ghost>
          <Icon type="ios-play-outline"/>开机
        </Button>
        <Button disabled>
          <Icon type="md-power"/>关机
        </Button>
        <Dropdown trigger="click" @on-click="changeMenu">
          <Button>更多操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="startup" :disabled="startupDisabled">开机</DropdownItem>
            <DropdownItem name="shutdown">关机</DropdownItem>
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
          <DropdownMenu v-for="item in tags" slot="list">
            <Dropdown placement="right-start">
              <DropdownItem :name="item.key">
                {{ item.name }}
                <Icon v-if="item.children" type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem v-for="eItem in item.children" :name="eItem.key">{{ eItem.name }}</DropdownItem>
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
          v-for="(item, index) in tagsList"
          closable
          @on-close="handleClose(index)"
        >{{ item }}</Tag>
      </div>

      <sip-table :manager="tableManager">
        <sip-table-formatter column="Title">
          <template slot-scope="{row, column, cellValue, cellText, index}">
            <a @click="info(row, column)">{{cellValue}}</a>
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
