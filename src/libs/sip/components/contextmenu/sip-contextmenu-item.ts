
export interface SipContextmenuItem<T=any> {
    id?:string;
    name: string;
    disabled?: boolean;
    divided?: boolean;
    selected?: boolean;
    datas?: T;
    click?: (item: SipContextmenuItem) => void;
    children?: SipContextmenuItem<T>[];
}