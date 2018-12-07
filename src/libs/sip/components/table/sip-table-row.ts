

export type SipTableRow<T=any> = T & {
    _isChecked: boolean;
    _isDisabled: boolean;
    _isExpanded: boolean;
    _isHighlight: boolean;
    _isHover: boolean;
    [key:string]:any;
};
