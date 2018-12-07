export * from './sip-table-column';
export * from './sip-table-option';
export * from './sip-table-row';
export * from './sip-table.component';
export * from './sip-table.manager';

import sipTableFormatter from './sip-table-formatter.component.vue';
import sipTable from './sip-table.component.vue';

export const SipTableComponents = {
    'sip-table': sipTable,
    'sip-table-formatter': sipTableFormatter
};
