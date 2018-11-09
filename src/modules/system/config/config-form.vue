<template>
    <Form :ref="formRef" :model="model" :rules="ruleValidate" label-position="top">
        <FormItem label="名称" prop="title">
            <Input v-model="model.title" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="Key" prop="code">
            <Input v-model="model.code" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="值" prop="value">
            <Input v-model="model.value" :maxlength="200"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
            <RadioGroup v-model="model.status">
                <Radio :label="1">启用</Radio>
                <Radio :label="0">禁用</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="描述" prop="description">
            <Input v-model="model.description" :maxlength="500" type="textarea" :rows="4"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit()">保存</Button>
            <Button type="primary" @click="closePanel()">返回</Button>
        </FormItem>
    </Form>
</template>
<script>
import {configService} from "mvue-components";
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
                configService().query({filters:`code eq '${value}'`}).then(({data})=>{
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
                code:'',
                value:'',
                status:1,
                description:''
            },
            ruleValidate: {
                title: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                code: [
                    { required: true,validator:keyValidator, trigger: 'blur' }
                ],
                value: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            }
        };
    },
    mounted(){
        //编辑模式根据recordId获取配置数据
        if(this.isEdit&&this.recordId){
            configService().get({id:this.recordId}).then(({data})=>{
                this.model=data;
            })
        }
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
                        configService().save(this.model).then(({data})=>{
                            this.mustStopRepeatedClick=false;
                            this.$Message.success('保存成功');
                            this.closePanel(data);
                        },()=>{
                            this.mustStopRepeatedClick=false;
                        });
                    }else{
                        var _model=context.getMvueToolkit().utils.reduceModelForUpdate(this.model);
                        configService().update({id:this.recordId},_model).then(({data})=>{
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
            //this.$slidePanelService.hide(data);
            this.$router.go(-1);
        }
    }
}
</script>
