import { SipAccessItem, SipInit, SipInject, SipPage, SipReady, SipTableManager, SipVueComponent } from '@libs/sip';
import { DemoSharedModule } from './shared/demo-shared.module';
import { VoumeModel } from './shared/models/voume.model';
import { VolumeService } from './shared/services/volume.service';

@SipVueComponent({
    modules: [DemoSharedModule]
})
export default class List extends SipPage {
    name = "DemoList";
    desc = "List Desc"

    @SipInit()
    private init() {
        // this.$logger.debug('init', this);
    }

    @SipReady()
    private ready() {
        this.$accessManager.datas = [];
        this.tableManager.onSelectChanged((datas) => {
            this.$accessManager.datas = this.tableManager.getSelects();
        })

        this.tableManager.onFilterChange((filters, col) => {
            this.$logger.debug('onFilterChange', filters, col)
        });
    }

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
    startupDisabled = false;
    disabled = true;
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

    changeTagsMenu(name) {
        this.tagsList.push(name);
    }
    handleClose(index) {
        this.tagsList.splice(index, 1);
    }
    searchEvent(value) {
        this.tableManager.search({ content: value });
    }
    clickStatus() {
        // this.startupDisabled = false;
    }
    modalSave() {
        // setTimeout(() => {
        //     this.modal9 = false;
        // }, 2000);
    }

    destroy() {
        // this.$Notice.warning({
        //   title: "销毁",
        //   desc: "销毁前请关机 "
        // });
    }


    @SipAccessItem('shutdown', {
        hasData: true
    })
    shutdown() {
        this.$logger.debug('shutdown', this.tableManager.getSelectFirst())
    }

    show(index) {
        index = 2;

    }

    @SipAccessItem('create', {
        hasData: false
    })
    create() {
        this.$logger.debug('create');
        this.$open('/pages/sip/UIDemo/form').receive((r) => {
            if (!r) return;
        });
    }

    @SipAccessItem('startup', {
        hasData: true, multi: false
    })
    startup() {
        this.$logger.debug('startup', this.tableManager.getSelectFirst());
    }

    handleSelectAll(status) {
        // this.table1.selectAll(status);
    }
    exportData(type) {
        if (type === 1) {
            this.tableManager.exportCsv({
                filename: "The original data"
            });
        } else if (type === 2) {
            this.tableManager.exportCsv({
                filename: "Sorting and filtering data",
                original: false
            });
        } else if (type === 3) {
            // this.tableManager.exportCsv({
            //     filename: "Custom data",
            //     columns: this.columns8.filter((col, index) => index < 4),
            //     data: this.data7.filter((data, index) => index < 4)
            // });
        }
    }
    changePage() {
    }

    @SipInject(VolumeService)
    volumeSrv: VolumeService;

    tableManager = new SipTableManager<VoumeModel>({
        columns: [
            {
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
            },
            {
                title: "存储",
                key: "Title",
                // width: 150,
                sortable: true,
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
            },
            {
                title: "状态",
                key: "Volumn_Status",
                width: 150,
                sortable: true,
                sortType: 'desc',
                // filteredValue: ['deleted'],
                onFilter: (values) => {
                    return {
                        Volumn_Status: values.join(',')
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

    info() {
        let data = this.tableManager.getSelectFirst();
        if (!data) return;
        this.$open('/pages/sip/UIDemo/detail', { id: data.Volumn_Code, name: data.Title }).receive((r) => {
            console.log('detail return ', r);
        });
    }
}