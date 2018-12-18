<template>
  <Dropdown
    ref="contextMenu"
    placement="bottom-start"
    trigger="contextMenu"
    class="sip-contextmenu"
    :style="styles"
  >
    <Button style="display:none">&nbsp;
      <Icon type="ios-arrow-down"></Icon>
    </Button>
    <DropdownMenu slot="list">
      <!-- <DropdownItem
        v-for="(item, index) in items"
        :key="index"
        :selected="item.selected"
        :disabled="item.disabled"
        :divided="item.divided"
         v-sip-click="{fn: click, params: [item]}"
      >{{item.name}}</DropdownItem>-->
      <Dropdown placement="right-start" v-for="item in items" :key="item.id">
        <DropdownItem
          :selected="item.selected"
          :disabled="item.disabled"
          :divided="item.divided"
          v-sip-click="{fn: click, params: [item]}"
        >
          {{item.name}}
          <Icon v-if="item.children" type="ios-arrow-forward"></Icon>
        </DropdownItem>
        <DropdownMenu slot="list" v-if="item.children && !item.disabled">
          <DropdownItem
            v-for="cItem in item.children"
            :key="cItem.id"
            :selected="cItem.selected"
            :disabled="cItem.disabled"
            :divided="cItem.divided"
            v-sip-click="{fn: click, params: [cItem]}"
          >{{cItem.name}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </DropdownMenu>
  </Dropdown>
</template>
<script lang="ts" src="./sip-contextmenu.component.ts"></script>
