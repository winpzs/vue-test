import { Table } from '*.vue';
import { SipInit, SipInject, SipPage, SipReady, SipSharedModule, SipTableManager, SipVueComponent, SipVueRef } from '@libs/sip';
import { TableColumn } from 'iview';
import { VolumeService } from './shared/services/volume.service';

@SipVueComponent({
    modules: [SipSharedModule]
})
export default class List extends SipPage {
    name = "DemoList";

    @SipInit()
    private init() {
        // this.$logger.debug('init', this);
    }

    @SipReady()
    private ready() {
        // this.tableManager.onSelectChanged((datas) => {
        //     this.$logger.debug('select change', datas);
        // })

        this.tableManager.onFilterChange((filters, col) => {
            this.$logger.debug('onFilterChange', filters, col)
        });
        // this.$logger.debug('ready');
        this.changeTableColumns();

        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }

    tagsSet = false;
    tags = [
        {
            name: "拉面",
            key: "lamian"
        },
        {
            name: "拉面2",
            key: "lamian2",
            children: [{ name: "a", key: "1" }, { name: "b", key: "2" }]
        }
    ];
    tagsList = [];
    searchVal = "";
    tempSelectData = null;
    desc = "";
    Title = "";
    aaa = true;
    modal8 = false;
    modal9 = false;
    startupDisabled = true;
    loading2 = true;
    loading = true;
    header = {
        title: "Table表格",
        description: "显示及维护系统内的所有菜单",
        showBack: false
    };
    tableColumnsChecked = [
        "name",
        "show",
        "day30",
        "tomorrow",
        "day",
        "week",
        "month"
    ];
    tableColumns2 = [];
    tableData2 = this.mockTableData2();

    changeTagsMenu(name) {
        this.tagsList.push(name);
    }
    handleClose(index) {
        this.tagsList.splice(index, 1);
    }
    searchEvent(value) {
        console.log(value);
    }
    clickStatus() {
        this.startupDisabled = false;
    }
    getSelectData(selection) {
        this.tempSelectData = selection;
    }
    modalSave() {
        setTimeout(() => {
            this.modal9 = false;
        }, 2000);
    }
    changeMenu(name) {
        if (name == "startup" && !this.startupDisabled) {
            this.startup();
        } else if (name == "shutdown") {
            this.shutdown();
        } else if (name == "destroy") {
            this.destroy();
        }
    }
    destroy() {
        this.tagsSet = true;
        // this.$Notice.warning({
        //   title: "销毁",
        //   desc: "销毁前请关机 "
        // });
    }
    startup() {
        const selectList =
            this.tempSelectData.length > 0 ? this.tempSelectData[0] : [];
        const content = "<p>确定要对实例" + selectList.name + "进行开机操作吗?";
        this.$Modal.info({
            title: "开机",
            content: content
        });

        // this.Title = selectList.name;
        // this.modal8 = true;
    }
    shutdown() {
        this.Title = "关机";
        this.modal9 = true;
    }
    show(index) {
        index = 2;
        this.$Modal.info({
            title: "User Info",
            content: `Name：${this.tableData2[index].show}<br>Age：${
                this.tableData2[index].show
                }<br>Address：${this.tableData2[index].day30}`
        });
    }
    createNewPage() {
        // this.$router.push({ name: "sip-UIDemo-list-form" });
    }
    mockTableData2() {
        let data = [];
        function getNum() {
            return Math.floor(Math.random() * 10000 + 1);
        }
        for (let i = 0; i < 10; i++) {
            data.push({
                name: "Name " + (i + 1),
                fav: 0,
                show: getNum(),
                day30: getNum(),
                tomorrow: getNum(),
                day: getNum(),
                week: getNum(),
                month: getNum()
            });
        }
        return data;
    }
    changeTableColumns() {
        this.tableColumns2 = this.getTable2Columns();
    }

    getTable2Columns() {
        const table2ColumnList: { [key: string]: TableColumn } = {
            aa: {
                type: "selection",
                width: 60,
                align: "center"
            },
            name: {
                title: "Name",
                key: "name",
                width: 100
            },
            show: {
                title: "Show",
                key: "show",
                width: 150,
                sortable: true
            },
            day30: {
                title: "30, retained",
                key: "day30",
                width: 150,
                sortable: true
            },
            tomorrow: {
                title: "The next day left",
                key: "tomorrow",
                width: 150,
                sortable: true
            },
            day: {
                title: "Day Active",
                key: "day",
                sortable: true,
                filters: [
                    {
                        label: 'day1',
                        value: 'day1'
                    },
                    {
                        label: 'day2',
                        value: 'day2'
                    }
                ]
            },
            week: {
                title: "Week Active",
                key: "week",
                width: 150,
                sortable: true,
                filters: [
                    {
                        label: 'week2',
                        value: 'day1'
                    },
                    {
                        label: 'week2',
                        value: 'week2'
                    }
                ]
            },
            month: {
                title: "Month Active",
                key: "month",
                width: 150,
                sortable: true
            }
        };

        let data = [table2ColumnList.aa];
        this.tableColumnsChecked.forEach(col => {
            data.push(table2ColumnList[col]);
        });

        return data;
    }
    @SipVueRef('table1')
    table1: Table;

    handleSelectAll(status) {
        // this.table1.selectAll(status);
    }
    exportData(type) {
        if (type === 1) {
            this.table1.exportCsv({
                filename: "The original data"
            });
        } else if (type === 2) {
            this.table1.exportCsv({
                filename: "Sorting and filtering data",
                original: false
            });
        } else if (type === 3) {
            // this.table1.exportCsv({
            //     filename: "Custom data",
            //     columns: this.columns8.filter((col, index) => index < 4),
            //     data: this.data7.filter((data, index) => index < 4)
            // });
        }
    }
    changePage() {
        this.tableData2 = this.mockTableData2();
        // this.tableManager.datas = this.mockTableData2();
    }

    @SipInject(VolumeService)
    volumeSrv: VolumeService;

    tableManager = new SipTableManager({
        columns: [{
            title: "编号",
            key: "Volumn_Code",
            width: 150,
            sortable: true,
            filters: [
                {
                    label: 'day1',
                    value: 'day1'
                },
                {
                    label: 'day2',
                    value: 'day2'
                }
            ]
        }, {
            title: "存储",
            key: "Title",
            // width: 150,
            sortable: 'custom',
            filters: [
                {
                    label: 'day111',
                    value: 'day111'
                },
                {
                    label: 'day222',
                    value: 'day222'
                }
            ]
        }, {
            title: "状态",
            key: "Volumn_Status",
            width: 150,
            sortable: 'custom',
            filteredValue:['deleted'],
            onFilter:(values)=>{
                return {
                    Volumn_Status:values.join(',')
                };
            },
            filters: [
                {
                    label: '删除',
                    value: 'deleted'
                },
                {
                    label: '使用中',
                    value: 'in-use'
                }
            ]
        }],
        rest: (params, option) => {
            return this.volumeSrv.pageList(params, option);
        }
    });

    info(data, column) {
        this.$logger.debug('info', data, column);
    }
}