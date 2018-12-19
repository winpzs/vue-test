import { SipInit, SipPage, SipReady, SipVueComponent } from '@libs/sip';
import { DemoSharedMixin } from './shared/demo-shared.mixin';

@SipVueComponent({
    mixins: [DemoSharedMixin]
})
export default class Detail extends SipPage {
    name = "DemoDetail";
    desc = "Detail Desc"

    params = { id: '', name: '' };

    @SipInit()
    private init() {
        this.params = this.$params(this.params);
        this.$logger.debug('init', this.params);
    }

    @SipReady()
    private ready() {
        this.$accessManager.datas = [];
        setTimeout(() => {
            this.loading = false
        }, 1000)
    }
    loading = true;
    value2 = "name1";
    split1 = 0.5;
    counter = "aaa";
    header = {
        title: "表单",
        description: "显示及维护系统内的所有菜单",
        showBack: false
    };
    columns1 = [{
        title: "网络名称",
        key: "name"
    },
    {
        title: "Mac地址",
        key: "address"
    },
    {
        title: "IP地址",
        key: "ipAddress"
    },
    {
        title: "弹性IP",
        key: "elasticIp"
    },
    {
        title: "操作",
        key: "operate",
        render: (h, params) => {
            return h("div", [
                h(
                    "Button", {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                console.log("a");
                            }
                        }
                    },
                    "操作"
                )
            ]);
        }
    }
    ];
    data1 = [{
        name: "John Brown",
        elasticIp: "10.201.76.182",
        ipAddress: "10.201.76.183",
        address: "#####"
    }];
    tableData1 = this.mockTableData1();
    tableColumns1 = [{
        type: "selection",
        width: 60,
        align: "center"
    },
    {
        title: "扣费时间",
        width: 150,
        key: "time",
        sortable: true,
        render: (h, params) => {
            return h(
                "div",
                this.formatDate(this.tableData1[params.index].update)
            );
        }
    },
    {
        title: "状态",
        key: "Status",
        width: 150,
        filters: [{
            label: "成功",
            value: 1
        },
        {
            label: "失败",
            value: 2
        }
        ],
        filterMultiple: false,
        filterMethod(value, row) {
            if (value === 1) {
                return row.status == 1;
            } else if (value === 2) {
                return row.status != 1;
            }
        },
        render: (h, params) => {
            const row = params.row;
            const color =
                row.status === 1 ?
                    "primary" :
                    row.status === 2 ?
                        "success" :
                        "error";
            const text =
                row.status === 1 ?
                    "Working" :
                    row.status === 2 ?
                        "Success" :
                        "Fail";

            return h(
                "Tag", {
                    props: {
                        type: "dot",
                        color: color
                    }
                },
                text
            );
        }
    },
    {
        title: "扣费时间",
        key: "update",
        render: (h, params) => {
            return h(
                "div",
                this.formatDate(this.tableData1[params.index].update)
            );
        }
    },
    {
        title: "金额",
        key: "money"
    }
    ];
    listData = null;
    get name2() { return this.counter; }

    bb(selection) {
        this.listData = selection
    }
    getTableSelectData() {
        console.log(this.listData)
    }
    changeLimit() { }
    getDate(val) {
        console.log(val);
    }
    mockTableData1() {
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                time: new Date().getTime(),
                status: Math.floor(Math.random() * 3 + 1),
                portrayal: ["City", "People", "Cost", "Life", "Entertainment"],
                update: new Date(),
                money: Math.floor(Math.random() * 1000 + 1)
            });
        }
        return data;
    }
    formatDate(date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
    }
    changePage() {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        this.tableData1 = this.mockTableData1();
    }
    eee(name) {

    }
}