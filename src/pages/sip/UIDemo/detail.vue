<template>
  <sip-page>
    <sip-page-header>
      {{name}} - {{params.name}}
      <template slot="desc">{{desc}}</template>
    </sip-page-header>
    <sip-page-body>
      <Tabs :animated="false" value="name3" type="line" @on-click="eee">
        <TabPane label="概况" name="name1">
          <Row class="custom" :gutter="16">
            <Col span="17">
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline" size="20"></Icon>网卡
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                  <Icon type="md-add"></Icon>添加网卡
                </a>
                <Table :loading="loading" :columns="columns1" :data="data1"></Table>
              </Card>
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline" size="20"></Icon>存储卷
                </p>
                <a href="#" slot="extra">
                  <Icon type="md-refresh"/>刷新
                </a>
                <a href="#" slot="extra">
                  <Icon type="md-add"/>添加
                </a>
                <a href="#" slot="extra">
                  <Icon type="ios-browsers-outline"/>挂接
                </a>
                <Table :loading="loading" :columns="columns1" :data="data1"></Table>
              </Card>
            </Col>

            <Col span="7">
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline" size="20"></Icon>设备信息
                </p>
                <div>
                  <Row>
                    <Col span="8">CPU/内存:</Col>
                    <Col span="16">
                      2核/2G
                      <a href="#" @click="changeLimit">更改</a>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="8">实例大小:</Col>
                    <Col span="16">0G</Col>
                  </Row>
                </div>
              </Card>
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline" size="20"></Icon>扩展信息
                </p>
                <div>
                  <Row>
                    <Col span="8">审计人:</Col>
                    <Col span="16">
                      {{ name2 }}
                      <RadioGroup v-model="value2">
                        <Radio label>2</Radio>
                        <Radio label>3</Radio>
                      </RadioGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="8">系统范围</Col>
                    <Col span="16">0G</Col>
                  </Row>
                  <Row>
                    <Col span="8">资产代码</Col>
                    <Col span="16">0G</Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="设备" name="name2" style="height:300px">
          <Row :gutter="16">
            <Col span="1">
              <Icon type="md-refresh" size="24" id="“RefIcon”"/>
            </Col>
            <Col span="4">
              <Date-picker
                type="daterange"
                @on-change="getDate"
                format="yyyy/MM/dd"
                placeholder="选择日期和时间"
              ></Date-picker>
            </Col>
            <Col span="1">
              <Button type="primary">搜索</Button>
            </Col>
          </Row>

          <div class="resource-usage-base">
            <div class="user">
              <div class="img"></div>
              <h4 style="padding: 8px 0;">计费测试</h4>
              <p>创建时间：2018-11-13 17:23:02</p>
              <p bg-if="info.model.destroyTime" style="display: none;"></p>
            </div>
            <div class="user-text" style="padding-top:20px;">
              <div class="money">
                <span class="number">49.06
                  <b>元</b>
                </span>
              </div>
            </div>
          </div>

          <Table
            :loading="loading"
            :data="tableData1"
            :columns="tableColumns1"
            stripe
            @on-selection-change="bb"
          ></Table>
          <div style="margin: 10px;">
            <div style="float: right;">
              <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
          </div>

          <ButtonGroup>
            <Button type="primary" @click="getTableSelectData">确定</Button>
            <Button>Cancel</Button>
          </ButtonGroup>
        </TabPane>
        <TabPane label="消费情况" name="name3">
          <g2-line></g2-line>
        </TabPane>
      </Tabs>
    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./detail.ts"></script>
<style scoped>
.ivu-card {
  margin: 20px 0;
}
.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.resource-usage-base {
  margin-top: 20px;
  background: #fff;
  padding: 22px 26px;
  overflow: hidden;
  border-radius: 2px !important;
  margin-bottom: 30px;
}
.resource-usage-base .user {
  width: 48%;
  border-right: 1px solid #d8e4ed;
  float: left;
}
.resource-usage-base .user .img {
  height: 78px;
  width: 78px;
  background: url("/static/images/1.jpg") no-repeat;
  border-radius: 50% !important;
  background-position: center center;
  background-size: 100% 100%;
  float: left;
  margin-right: 25px;
}
.resource-usage-base .user h4 {
  line-height: 1;
  padding: 8px 0;
  font-size: 20px;
  font-weight: normal;
  color: #666666;
}
.resource-usage-base .user p {
  line-height: 18px;
  color: #888;
  margin: 0;
}
.resource-usage-base .user-text {
  float: right;
  width: 48%;
  text-align: center;
  padding-top: 12px;
}
.resource-usage-base .user-text .money .number {
  color: #ff6600;
  font-size: 30px;
  font-family: arial;
  line-height: 1;
}
.resource-usage-base .user-text .money {
  display: inline-block;
}
.resource-usage-base .user-text .money .number {
  color: #ff6600;
  font-size: 30px;
  font-family: arial;
  line-height: 1;
}
.resource-usage-base .user-text .money b {
  font-size: 12px;
  color: #666666;
}
.ivu-icon-md-refresh {
  padding-left: 17px;
  padding-top: 6px;
}
</style>