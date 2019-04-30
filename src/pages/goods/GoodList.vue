<template>
  <div>
    <!-- <div>这个是商品列表，渲染在main中</div> -->
    <!-- 这个是子页面的顶部 -->
    <el-row
      type="flex"
      justify="space-between"
      style="margin-top: 15px;"
    >
      <el-col>
        <el-button type="primary">增加</el-button>
        <el-button
          type="primary"
          @click="handleMoreDelete"
        >删除</el-button>
      </el-col>
      <el-col>
        <div>
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <!-- 这里是商品列表数据，一个表单数据 -->
    <!-- tableList是整个表格的样式 -->
    <!-- selection-change当选择项发生变化时会触发该事件,elementui中的事件 -->
    <el-table
      class="tableList"
      :data="tableData"
      style="width: 100%"
      type="flex"
      justify="between"
      @selection-change="handleSelectionChange"
    >
      <!-- 允许多选 -->
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>

      <!-- 这个是商品的信息 -->
      <el-table-column
        label="标题"
        width="300"
      >
        <template v-slot="scope">
          <el-row
            type="flex"
            algin="middle"
          >
            <img
              :src="scope.row.imgurl"
              alt=""
              class="goods-img"
            >
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>

      <!-- 这个是商品的类型 -->
      <el-table-column
        label="类型"
        width="180"
      >
      </el-table-column>
      <!-- 这个是商品的价格 -->
      <el-table-column
        label="价格"
        width="180"
      >
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 使用插槽的方式获取整行的数据，然后将数据作为事件的参数进行传递，找到对应的id -->
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // table组件的内容，数据的渲染
  // ids用来存放多个id，一次删除多个数据
  data() {
    return {
      tableData: [],
      ids: []
    }
  },

  //先要获取数据，封装获取数据的初始化，因为要多次调用
  methods: {
    getList() {
      //  /admin/goods/getlist?pageIndex=页码&pageSize=每页显示条数&searchvalue=模糊匹配标题条件
      this.$axios({
        method: 'get',
        url: '/admin/goods/getlist?pageIndex=1&pageSize=4&searchvalue='
      }).then(res => {
        //成功获取数据之后，要进行对数据的渲染
        console.log(res);
        const { message } = res.data
        this.tableData = message;
      })
    },

    // table组件中的方法
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除单个数据
    handleDelete(index, row) {
      // 先拿到商品的di
      console.log(index, row);
      const id = row.id;
      //利用element中的确定框进行循环是否要删除
      this.$confirm("是否要删除该商品").then(() => {
        //点击确定删除
        this.$axios({
          url: `/admin/goods/del/${id}`,
          // 处理跨域请求的参数
          withCredentials: true
        }).then(res => {
          //获取到后台返回的状态码和消息
          const { message } = res.data
          // 删除成功之后，进行消息的提示
          this.$message({
            message,
            type: 'success'
          });
          //删除之后进行页面的刷新
          this.getList();

        })
      })
    },
    //删除多个数据，多选的时候触发
    handleSelectionChange(val) {
      var ids = val.map(v => {
        return v.id
      })
      //把id给到data里面
      this.ids = ids;
    },
    //前面获取到要删除的id之后
    handleMoreDelete() {
      //因为接口文档说明多个id，使用,分割
      var id = this.ids.join(",");
      this.$axios({
        url: `/admin/goods/del/${id}`,
        // 处理跨域请求的参数
        withCredentials: true
      }).then(res => {
        const { message } = res.data;
        this.$message({
          message,
          type: 'success'
        });
        //删除成功之后重新获取数据列表
        this.getList();
      })

    }

  },

  mounted() {
    //页面加载的时候就先获取数据
    this.getList()
  }

}
</script>

<style lang="less" scoped>
.tableList {
  margin-top: 50px;
}
.goods-img {
  height: 64px;
  // width:64px;
  margin-right: 10px;
}
</style>
