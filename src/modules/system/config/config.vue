<template>
    <div class="bvue-page">
        <b-childheader :title="childheader.title" :subtitle="childheader.subtitle" :showBack="childheader.showBack" ></b-childheader>
        <b-list ref="listInst"
            :columns="columns" 
            :query="query" 
            :toolbar="toolbar"
            :filters="filters"
            :default-sort="defaultSort">
        </b-list>
    </div>
</template>
<script>
import {configService,leapQueryConvertor,dateRender} from "mvue-components";
export default {
    data(){
        var _this=this;
        return {
            childheader:{
                title:"应用配置管理",
                subtitle:"应用运行相关的配置",
                showBack:false,
            },
            columns:[
                {
                    type:'index',
                    width:50,
                    align:'center'
                },
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '名称',
                    sortable: 'custom',//支持排序，需要reload实现
                    key: 'title',
                    width:200,
                    render:(h, params) => {
                        var recordId=params.row.id;
                        //标题列可以用render函数实现
                        return h('div',{
                                    on: {
                                        click: () => {
                                            // _this.$slidePanelService.show({
                                            //     component : 'config-edit-form',
                                            //     props: {
                                            //         recordId:recordId
                                            //     }
                                            // }).then(result => {
                                            //     if(result){
                                            //         _this.$refs.listInst.doReload();
                                            //     }
                                            // });
                                            _this.$router.push({
                                                name:"system.admin.config.edit",
                                                params:{id:recordId}
                                            });
                                        }
                                    }
                                },[
                                    h('a', {
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }, params.row[params.column.key])
                                ]);
                    }
                },
                {
                    title: 'Key',
                    key: 'code',
                    width:150,
                },
                {
                    title: '值',
                    key: 'value'
                },
                {
                    title: '状态',
                    key: 'status',
                    width:80,
                    render:(h, params)=>{
                        var fieldVal=params.row[params.column.key];
                        var desc=fieldVal!==0?'启用':'禁用';
                        return h("span",desc);
                    },
                    filters: [
                        {
                            label: '启用',
                            value: 1
                        },
                        {
                            label: '禁用',
                            value: 0
                        }
                    ],
                    filterMultiple: false,//单选过滤
                    filterRemote:(selectedValues)=>{//远程过滤，如果定义了远程过滤，本地过滤会失效
                        //修改过滤条件
                        _this.filters.rules.status.value=selectedValues[0];
                        //重新加载数据
                        _this.$refs.listInst.doReload();
                    }
                },
                {
                    title: '创建时间',
                    key: 'createdAt',
                    width:150,
                    render:dateRender('YYYY-MM-DD HH:mm:ss')
                }
            ],
            toolbar:{
                btnSizeBeforeMore:2,
                quicksearch:{
                    fields:["title","code"],
                    placeholder:"输入关键字搜索"
                },
                btns:[
                    {
                        title:"添加",
                        icon:"plus",
                        onclick(ctx){
                            // _this.$slidePanelService.show({
                            //     component : 'config-create-form',
                            //     props: {
                            //     }
                            // }).then(result => {
                            //     if(result){
                            //         _this.$refs.listInst.doReload();
                            //     }
                            // });
                            _this.$router.push({
                                name:"system.admin.config.create"
                            });
                        }
                    },
                    {
                        title:"删除",
                        icon:"ios-trash",
                        disabled(ctx){
                            return !(ctx.selectedItems&&ctx.selectedItems.length===1);
                        },
                        onclick(ctx){
                            var row=ctx.selectedItems[0];
                            _this.$Modal.confirm({
                                title: '提示',
                                content:'如果删除系统配置将影响系统运行，确定删除吗?',
                                onOk: () => {
                                    let id = row.id;
                                    configService().delete({ id: id }).then(function (re) {
                                        _this.$refs.listInst.doReload();
                                    });
                                },
                                onCancel:()=>{
                                }
                            });
                        }
                    }
                ]
            },
            //查询过滤条件
            filters:{
                op:"and",
                rules:{
                    status:{
                        op:"eq",
                        value:""
                    }
                }
            },
            defaultSort:{key:'createdAt',order:'desc'}
        };
    },
    methods:{
        query(ctx){
            //调用leap查询转换器，获取兼容的数据格式
            return leapQueryConvertor.exec(configService(),ctx);
        }
    }
}
</script>

