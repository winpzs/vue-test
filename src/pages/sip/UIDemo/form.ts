import { SipForm, SipInit, SipPage, SipReady, SipValidator, SipVueComponent, SipVueRef } from '@libs/sip';
import { DemoSharedMixin } from './shared/demo-shared.mixin';

@SipVueComponent({
    mixins: [DemoSharedMixin]
})
export default class FormTest extends SipPage {
    name = "DemoForm";
    desc = "Form Desc"

    params = { id: '', name: '' };

    @SipInit()
    private _init1() {
        // this.params = this.$params(this.params);
        this.$logger.debug('init', this.params);
    }

    @SipReady()
    private _ready() {
        this.$accessManager.datas = [];
    }
    model1 = "";
    model2 = "";
    model3 = "";
    value1 = "";
    data1 = [
        {
            value: "beijing",
            label: "北京",
            children: [
                {
                    value: "gugong",
                    label: "故宫"
                },
                {
                    value: "tiantan",
                    label: "天坛"
                },
                {
                    value: "wangfujing",
                    label: "王府井"
                }
            ]
        },
        {
            value: "jiangsu",
            label: "江苏",
            children: [
                {
                    value: "nanjing",
                    label: "南京",
                    children: [
                        {
                            value: "fuzimiao",
                            label: "夫子庙"
                        }
                    ]
                },
                {
                    value: "suzhou",
                    label: "苏州",
                    children: [
                        {
                            value: "zhuozhengyuan",
                            label: "拙政园"
                        },
                        {
                            value: "shizilin",
                            label: "狮子林"
                        }
                    ]
                }
            ]
        }
    ];
    data2 = [];
    cityList = [
        {
            value: "New York",
            label: "New York"
        },
        {
            value: "London",
            label: "London"
        },
        {
            value: "Sydney",
            label: "Sydney"
        },
        {
            value: "Ottawa",
            label: "Ottawa"
        },
        {
            value: "Paris",
            label: "Paris"
        },
        {
            value: "Canberra",
            label: "Canberra"
        }
    ];
    cityList1 = [
        {
            parentName: "AA",
            cityList: [
                {
                    value: "New York",
                    label: "New York"
                },
                {
                    value: "London",
                    label: "London"
                },
                {
                    value: "Sydney",
                    label: "Sydney"
                },
                {
                    value: "Ottawa",
                    label: "Ottawa"
                },
                {
                    value: "Paris",
                    label: "Paris"
                },
                {
                    value: "Canberra",
                    label: "Canberra"
                }
            ]
        },
        {
            parentName: "BB",
            cityList: [
                {
                    value: "Paris",
                    label: "Paris"
                },
                {
                    value: "Canberra",
                    label: "Canberra"
                }
            ]
        }
    ];

    model = {
        age: "",
        name: "",
        money: 42,
        mail: "",
        time: "",
        city: "",
        date: "2018-12-20",
        interest: [],
        desc: "",
        gender: ""
    };

    validateAge = (rule, value, callback, source, options) => {
        if (!value) {
            return callback("Age cannot be empty");
        }
        if (!Number.isInteger(value)) {
            callback("Please enter a numeric value");
        } else {
            if (value < 18) {
                callback("Must be over 18 years of age");
            } else {
                callback();
            }
        }
    };

    @SipVueRef('form1')
    form1: SipForm;

    formRule1 = SipValidator.createDescriptor({
        age: [SipValidator.required(), this.validateAge, SipValidator.message('asdfasfasf')],
        name: [SipValidator.required(), SipValidator.cancel((value) => { return true; }), SipValidator.len(1, 10)]
    });

    handleSearch2(value) {
        this.data2 =
            !value || value.indexOf("@") >= 0
                ? []
                : [value + "@qq.com", value + "@sina.com", value + "@163.com"];
    }
    handleSubmit() {
        this.form1.validate(valid => {
            if (valid) {
                console.log(this.model);
                this.$Message.success("Success!");
            } else {
                this.$Message.error("Fail!");
            }
        });
    }
    handleReset() {
        this.form1.resetFields();
    }
}