<template>
  <sip-page>
    <sip-page-header>
      {{header.title}}
      <template slot="desc">{{header.description}}</template>
    </sip-page-header>
    <sip-page-body>
      <Row>
        <Col span="24">
          <Button>
            <Icon type="ios-refresh" size="24"/>
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
              <DropdownItem :disabled="aaa">资源移交</DropdownItem>
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
        </Col>
      </Row>

      <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
        <Checkbox label="name">Name</Checkbox>
        <Checkbox label="show">Show</Checkbox>
        <Checkbox label="day30">30, retained</Checkbox>
        <Checkbox label="tomorrow">The next day left</Checkbox>
        <Checkbox label="day">Day Active</Checkbox>
        <Checkbox label="week">Week Active</Checkbox>
        <Checkbox label="month">Month Active</Checkbox>
      </Checkbox-group>

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
          <template slot-scope="{row, column, cellValue, index}">
            <a @click="info(row)">{{cellValue}}</a>
          </template>
        </sip-table-formatter>
      </sip-table>

      <Table
        @on-select="clickStatus"
        @on-selection-change="getSelectData"
        :loading="loading"
        ref="table1"
        stripe
        highlight-row
        border
        :columns="tableColumns2"
        :data="tableData2">

      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"
          show-sizer
          ></Page>
        </div>
      </div>
      <!-- <template ref="test" params="{row}">
        <a @click="console.log(row.index)"> test </a>
      </template> -->

    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./list.ts"></script>
