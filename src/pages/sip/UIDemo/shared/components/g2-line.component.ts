import G2 from "@antv/g2";
import { SipComponent, SipInit, SipReady, SipVueComponent, SipVueRef } from "@libs/sip";


@SipVueComponent({})
export default class G2LineComponent extends SipComponent {

    data1 = [
        { year: "Sports", value: 275 },
        { year: "Strategy", value: 115 },
        { year: "Action", value: 120 },
        { year: "Shooter", value: 350 },
        { year: "Other", value: 150 }
    ];

    data2 = [
        { month: 0, tem: 7, city: "tokyo" },
        { month: 1, tem: 6.9, city: "tokyo" },
        { month: 2, tem: 9.5, city: "tokyo" },
        { month: 3, tem: 14.5, city: "tokyo" },
        { month: 4, tem: 18.2, city: "tokyo" },
        { month: 5, tem: 21.5, city: "tokyo" },
        { month: 6, tem: 25.2, city: "tokyo" }
    ];

    @SipInit()
    private _init1(){}

    @SipReady()
    private _ready() {
        this.renderLine();
        this.renderInterval();
    }

    @SipVueRef('c1')
    c1:HTMLDivElement;

    renderLine() {
        // Step 1: 创建 Chart 对象
        const chart = new G2.Chart({
            container: this.c1, // 指定图表容器 ID
            forceFit: true,
            height: 300,
            padding: [50, 20, 50, 50]
        });
        chart.tooltip(true);
        // Step 2: 载入数据源
        chart.source(this.data1);
        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
        chart.scale("value", {
            min: 0
        });
        chart.scale("year", {
            range: [0, 1]
        });
        chart.tooltip({
            crosshairs: {
                type: "x"
            }
        });
        chart.line().position("year*value");
        chart
            .point()
            .position("year*value")
            .size(4)
            .shape("circle")
            .style({
                stroke: "#fff",
                lineWidth: 1
            });

        // Step 4: 渲染图表
        chart.render();
    }

    @SipVueRef('c2')
    c2:HTMLDivElement;

    renderInterval() {
        const defs = {
            month: {
                type: "cat",
                values: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"] // 这时候 month 的原始值是索引值
            }
        };
        // Step 1: 创建 Chart 对象
        const chart = new G2.Chart({
            container: this.c2, // 指定图表容器 ID
            forceFit: true,
            height: 300
        });

        chart.source(this.data2, defs);
        chart
            .interval()
            .position("month*tem")
            .color("month");
        chart.render();
    }
}