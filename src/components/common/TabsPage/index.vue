<template>
  <el-tabs v-model="tabsValue" type="card" closable  @tab-remove="removeTab" @tab-click='handleClick'>
    <el-tab-pane
      v-for="(item, index) in tableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'index',
  data(){
    return{
      tabsValue: this.$store.getters.getEditableTabsValue,
      tableTabs: this.$store.getters.getEditableTabs
    }
  },
  computed:{
    ...mapGetters(['getEditableTabs','getEditableTabsValue'])
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.tableTabs;
      let activeName = this.tabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            if (tab.name !== '/index'){
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          }
        });
      }
      if (targetName === '/index'){
        return this.$message.warning('首页不能关闭')
      }
      this.tabsValue = activeName;
      this.tableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({path:this.tabsValue})
      this.$store.commit("SET_TABS",this.tableTabs)
    },
    handleClick(target) {
      this.$router.push({path:target._props.name})
    }
  },
  watch:{
    getEditableTabsValue: {
      deep: true,
      immediate: true,
      handler: function (val,oldValue) {
        this.tabsValue = val
        //this.$router.push({path:val})
      }
    },
    getEditableTabs(newVal,oldVal){
      this.tableTabs = newVal
    }
  }
}
</script>

<style scoped>

</style>
