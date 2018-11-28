<template>
    <Sider ref="siderMenu" collapsible :collapsed-width="60" :width="220" v-model="isCollapsed" hide-trigger style="height: 100%;" class="aside">
        <vue-scroll :ops="scrollOps">
            <Menu ref="leftMenus" width="auto" :theme="'dark'" :class="menuitemClasses" :accordion="accordion" :open-names="openNames"
                :active-name="activeName" @on-select="onMenuSelected" @on-open-change="onSubMenuOpened">
                <MenuGroup v-for="level0 in localMenus" :title="level0.title" :key="level0.id">
                    <template v-for="level1 in level0.children">
                        <MenuItem v-if="!(level1.children&& level1.children.length>0)" :key="level1.id" :name="level1.id">
                        <Icon :type="level1.icon"></Icon>
                        <span>{{level1.title}}</span>
                        </MenuItem>
                        <Submenu v-if="level1.children&& level1.children.length>0" :key="level1.id" :name="level1.id">
                            <template slot="title">
                                <Icon :type="level1.icon"></Icon>
                                <span>{{level1.title}}</span>
                            </template>
                            <MenuItem v-for="level2 in level1.children" :key="level2.id" :name="level2.id">
                            <span>{{level2.title}}</span>
                            </MenuItem>
                        </Submenu>
                    </template>
                </MenuGroup>
            </Menu>
        </vue-scroll>
    </Sider>
</template>
<script lang="ts" src="./sip-sidebar.component.ts"></script>
