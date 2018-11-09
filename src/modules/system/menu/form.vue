<template>
    <Form :ref="formRef" :model="model" :rules="ruleValidate" label-position="right"  :label-width="200">
        <FormItem label="名称" prop="title">
            <Input v-model="model.title" placeholder="Enter your name" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="Key" prop="name">
            <Input v-model="model.name" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="访问地址" prop="url">
            <Input v-model="model.url" :maxlength="350"></Input>
        </FormItem>
        <FormItem label="父级菜单" prop="parentId">
             <Select
                v-model="model.parentId"
                filterable
                remote
                :remote-method="loadAll"
                :loading="loadingParent">
                <Option v-for="(option, index) in allMenus" :value="option.id" :key="index"></Option>
            </Select>
        </FormItem>
        <FormItem label="图标(iview icon type)" prop="icon">
            <Input v-model="model.icon" :maxlength="50"></Input>
        </FormItem>
      <FormItem label="iFrame参数" prop="iframeParam">
        <Input v-model="model.iframeParam" :maxlength="100"></Input>
      </FormItem>

      <FormItem label="打开方式" prop="openMode">
        <RadioGroup v-model="model.openMode">
          <Radio :label="0">当前窗口</Radio>
          <Radio :label="1">新窗口</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="状态" prop="status">
        <RadioGroup v-model="model.status">
          <Radio :label="1">启用</Radio>
          <Radio :label="0">禁用</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="排序" prop="displayOrder">
        <InputNumber :max="1000" :min="1" v-model="model.displayOrder"></InputNumber>
      </FormItem>
        <FormItem label="描述" prop="description">
            <Input v-model="model.description" :maxlength="500" type="textarea" :rows="4"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit()">保存</Button>
            <Button @click="closePanel()">返回</Button>
        </FormItem>
    </Form>
</template>
<script>
import {menuService} from "mvue-components";
import context from 'libs/context';
export default {
    props:{
        action:{
            type:String,
            default:'create'
        },
        recordId:{
            type:String
        }
    },
    computed:{
        isCreate(){
            return this.action==='create';
        },
        isEdit(){
            return this.action==='edit';
        }
    },
    data(){
        const keyValidator=(rule, value, callback, source, options) =>{
            var errors = [];
            if (value === '') {
                errors.push(new Error('必填'));
                callback(errors);
            }else if(!/^[a-zA-Z]+[a-zA-Z0-9\._\-]*$/.test(value)) {
                errors.push(new Error(`字母开头，允许字母、数字、.-_`));
                callback(errors);
            }else{
                menuService().query({filters:`name eq '${value}'`}).then(({data})=>{
                    if(this.isCreate){
                        if(data&&data.length){
                            errors.push('key必须唯一');
                        }
                    }else{
                        if(data&&data.length&&(data.length>1||data[0].id!==this.recordId)){
                            errors.push('key必须唯一');
                        }
                    }
                    callback(errors);
                },()=>{
                    errors.push('校验key唯一性失败');
                    callback(errors);
                });
            }
        };
        return {
            formRef:'formRef',
            mustStopRepeatedClick:false,//阻止点击操作重复触发
            model:{
                title:'',
                name:'',
                url:'',
                status:1,
                description:'',
                parentId:null,
                cssName:'test',
                icon:'',
                iframeParam:"",
                openMode:0,
              displayOrder:10,
            },
            ruleValidate: {
                title: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                name: [
                    { required: true,validator:keyValidator, trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            },
            loadingParent:false,
            allMenus:[]
        };
    },
    mounted(){
        this.loadAll(null,()=>{
            //编辑模式根据recordId获取配置数据
            if(this.isEdit&&this.recordId){
                menuService().get({id:this.recordId}).then(({data})=>{
                    this.model=data;
                })
            }
        });
    },
    methods:{
        handleSubmit(){
            if(this.mustStopRepeatedClick){
                return;
            }
            this.mustStopRepeatedClick=true;
            this.$refs[this.formRef].validate((valid) => {
                if (valid) {
                    if(this.isCreate){
                        menuService().save(this.model).then(({data})=>{
                            this.mustStopRepeatedClick=false;
                            this.$Message.success('保存成功');
                            this.closePanel(data);
                        },()=>{
                            this.mustStopRepeatedClick=false;
                        });
                    }else{
                        var _model=context.getMvueToolkit().utils.reduceModelForUpdate(this.model);
                        menuService().update({id:this.recordId},_model).then(({data})=>{
                            this.mustStopRepeatedClick=false;
                            this.$Message.success('编辑成功');
                            this.closePanel(this.model);
                        },()=>{
                            this.mustStopRepeatedClick=false;
                        });
                    }
                }else{
                    this.mustStopRepeatedClick=false;
                }
            },()=>{
                this.mustStopRepeatedClick=false;
            });
        },
        closePanel(data){
            this.$router.go(-1);
        },
        loadAll(query,callback){
            //智能搜索包装器，在用户快速输入时先不查询，直到用户输入完毕再查询
            context.getMvueToolkit().utils.smartSearch(this, () =>{
                this.loadingParent=true;
                var queryParams={orderby:'createdAt desc'};
                if(query){
                    queryParams.filters=`title like '%${query}%' or name like '%${query}%' `;
                }
                menuService().query(queryParams).then(({data})=>{
                    this.allMenus=data;
                    this.loadingParent=false;
                    callback&&callback();
                },()=>{
                    this.loadingParent=false;
                });
            });
        }
    }
}
</script>
