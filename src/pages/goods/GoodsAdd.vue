<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
  >

    <!-- 分类 -->
    <el-form-item label="所属类别">
      <el-select
        v-model="form.category_id"
        placeholder="请选择活动区域"
      >
        <el-option
          :label="item.title"
          :value="item.category_id"
          v-for="(item, index) in categorys"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 推荐类型 -->
    <el-form-item label="推荐类型">
      <el-checkbox
        label="置顶"
        v-model="form.is_top"
      ></el-checkbox>
      <el-checkbox
        label="热门"
        v-model="form.is_hot"
      ></el-checkbox>
    </el-form-item>

    <!--文章标题 内容标题，需要传给后台 -->
    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <!-- 文章副标题 -->
    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <!-- 封面图片，这个组件不支持v-model，因为不是表单组件
        需要组件的事件里面赋值，赋给form.imgList -->
    <!-- 这个封面只能上传一张图片 -->
    <el-form-item label="封面图片">

      <!-- action：上传图片的地址
                show-file-list: 是否展示文件列表
                on-success：上传成功之后的函数，有3个参数
                before-upload：上传之前的判断
             -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- 预览图片 -->
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
    </el-form-item>

    <!-- 商品货号 -->
    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>
    <!-- 库存数量 -->
    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>
    <!-- 市场价格 -->
    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>
    <!-- 销售价格 -->
    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <!-- 这个是上传图片。可以穿多张图片 -->
    <el-form-item label="图片相册">
      <div>

        <!-- list-type 声明为列表类型 -->
        <!-- on-preview: 预览图片 -->
        <!-- on-remove：删除图片 -->
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handePicSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </div>
    </el-form-item>
    <!-- 内容摘要 -->
    <el-form-item label="内容摘要">
      <el-input
        type="textarea"
        v-model="form.zhaiyao"
      ></el-input>
    </el-form-item>

    <!-- 这个是富文本框的实现，需要使用插件实现 -->
    <el-form-item label="内容描述">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

    <!-- 确定添加按钮事件 -->
    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit"
      >立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入组件，引入之后，还需要在后面注册组件
import { quillEditor } from 'vue-quill-editor'
export default {

  data() {
    return {
      //需要收集的信息传给后台
      form: {
        category_id: "",
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],    //封面图片
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        fileList: [],  //图片相册
        zhaiyao: "",
        content: "",
        // 表单中没有的，只需要给一个默认值
        is_slide: false,
      },

      //分类数据
      categorys: [],
      // 封面图片
      imageUrl: '',
      // 封面图片
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    //   上传封面部分
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    //   上传图片部分
    //   移出预览的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功之后的回调函数
    handePicSuccess(res, file, fileList) {
      // 只要fileList每一条数据的response
      this.form.fileList = fileList.map(v => {
        return v.response
      });
    },
    //   点击添加之后的事件
    onSubmit() {
      // console.log(this.form);
      this.$axios({
        url: "/admin/goods/add/goods",
        method: "POST",
        data: this.form,
        // 处理跨域请求的参数
        withCredentials: true
      }).then(res => {
        console.log(res);
        const { status, message } = res.data
        if (status === 0) {
          // 成功的提示    
          this.$message({
            message,
            type: "success"
          })
          // 返回上一页，插入成功之后返回上一页
          this.$router.back();
        }
      })
    }
  },
  // 注册组件
  components: {
    quillEditor
  },
  mounted() {
    //页面一加载的时候，就要获取到分类数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      //   console.log(res),解构赋值
      const { message } = res.data;
      //将值给data中的categorys
      this.categorys = message;

    })
  },




}
</script>
