<template>
  <sip-page>
    <sip-page-header>
      {{name}}
      <template slot="desc">{{desc}}</template>
    </sip-page-header>
    <sip-page-body>
      <Form ref="form1" :model="model" :rules="formRule1" :label-width="80">
        <FormItem label="年龄" prop="age">
          <Input type="text" v-model="model.age" number></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="model.name" show-message="false" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="城市" prop="city">
          <Row>
            <Col span="4">
              <Select v-model="model.city" placeholder="选择你的城市" style="width:100px">
                <Option value="beijing">北京</Option>
                <Option value="guangzhou">广州</Option>
                <Option value="shenzhen">深圳</Option>
              </Select>
            </Col>
            <Col span="4"></Col>
          </Row>
        </FormItem>
        <FormItem label="Date">
          <Row>
            <Col span="11">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="选择日期" v-model="model.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <FormItem prop="time">
                <TimePicker type="time" placeholder="选择时间" v-model="model.time"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="model.gender">
            <Radio label="male">👱</Radio>
            <Radio label="female">👩</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="收入" prop="money">
          <Row>
            <Col span="20">
              <Slider v-model="model.money"></Slider>
            </Col>
            <Col span="2" offset="2">
              <Input v-model="model.money" placeholder="请输入邮箱"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="爱好" prop="interest">
          <CheckboxGroup v-model="model.interest">
            <Checkbox label="Eat">🍚</Checkbox>
            <Checkbox label="Sleep">💤</Checkbox>
            <Checkbox label="Run">🏃</Checkbox>
            <Checkbox label="Movie">🎬</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="项目" prop="project">
          <Select v-model="model3" style="width:200px">
            <OptionGroup :label="item2.parentName" v-for="(item2,index) in cityList1">
              <Option
                v-for="item in item2.cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </OptionGroup>
          </Select>
        </FormItem>
        <FormItem label="标签" prop="address">
          <Row>
            <Col span="12" style="padding-right:10px">
              <Select v-model="model1">
                <Option
                  v-for="(option, index) in cityList"
                  :value="option.value"
                  :key="index"
                >{{option.label}}</Option>
              </Select>
            </Col>
            <Col span="12">
              <Select v-model="model2">
                <Option
                  v-for="(option, index) in cityList"
                  :value="option.value"
                  :key="index"
                >{{option.label}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <Input v-model="model.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">提交</Button>
          <Button @click="handleReset" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./form.ts"></script>
