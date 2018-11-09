<template>
  <div class="bvue-page">
    <b-childheader :title="childheader.title" :showBack="false" ></b-childheader>
    <Menu class="header-menu" mode="horizontal" :theme="'light'" :active-name="activeMenu" @on-select="onMenuSelected">
      <MenuItem name="system.admin.role.perms.menu">
        <span>导航权限</span>
      </MenuItem>
      <MenuItem name="system.admin.role.perms.func">
        <span>系统权限</span>
      </MenuItem>
    </Menu>

    <div class="bvue-page-body">
      <Card>
        <div>
          <keep-alive>
          <router-view></router-view>
          </keep-alive>
        </div>
      </Card>
    </div>
  </div>
</template>

<style>
  .header-menu{
    margin: -32px -16px 16px -16px;
    padding-left: 8px;
  }
</style>

<script>
    export default {
      data:function () {
          return {
            childheader:{
              "title":"权限配置"
            },
          activeMenu:""
          }
        },
      beforeRouteEnter:function(to, from, next) {
        next(vm => vm.setActiveMenu(to));
        },
      mounted:function () {

      },
      methods: {
        setActiveMenu(router) {//设置导航菜单选中
          if(router.matched.length>0){
            this.activeMenu=router.matched[router.matched.length-1].name;
          }
        },
        onMenuSelected: function (name) {
          if (name) {
            this.$router.push({ name: name});
          }
        }
      }
    }
</script>

