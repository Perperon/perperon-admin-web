<template>
  <el-dialog
    :title='dialogTitle'
    :visible.sync='dialogVisible'
    width='40%'
    @close='dialogClose'>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in progressInfo"
        :key="index"
        :timestamp="activity.time">
        {{activity.context}}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script>
import { getByLogisticsNo } from 'api/logistics'
export default {
  name: 'OrderTimeline',
  props: {
    isDialog: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '物流进度'
    }
  },
  data() {
    return {
      dialogVisible: false,
      progressInfo: []
    }
  },
  watch: {
    async isDialog(val) {
      this.dialogVisible = val;
      try {
        const res = await getByLogisticsNo('8854874578548754');
        if (res.code !== 200) {
          throw new Error(res.message);
        }
        this.progressInfo = res.data;
      } catch (error) {
        this.$message.error(error.message);
      }
    }
  },
  methods: {
    dialogClose() {
      this.dislogVisible = false
      this.$emit('dislogDetails', this.dislogVisible)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
