# tree-table-vue-exend

> AA table (with tree-grid) component which based on tree-table-vue v1.1.0 for Vue.js 2.0 and add some features based on team's own need. [@MisterTaki](https://github.com/MisterTaki/vue-table-with-tree-grid)) and [@lison16](https://github.com/lison16/tree-table-vue)

> **优化点：提供表头单元格合并功能，详细用法请参考`example/Example.vue`**

> **优化点：数据更新后已展开节点不会收折，需要通过`idProp`属性指定数据中唯一key(如默认的`id`字段: `idProp="id"`)**

> **优化点：修复使用dropdown组件会被下滚动条遮挡的问题**

> **优化点：解决树形单元格无法使用template**

> **优化点：添加`getExpandedRows`方法获取已展开的行数据**

> **优化点：添加`loading`属性，提供默认数据加载动画，也可通过slot方式自定义载入样式`<tree-table><div slot="loading">数据载入中...</div></tree-table>`**

> **优化点：快速添加子项，自定义`template`，用法如下（按钮及表单为[iView](https://www.iviewui.com/)组件）**

> **优化点：优化getCheckedProp为getCheckedProps方法，入参为行数据的属性key的数组，如['id', 'name']就可以获取id和name的值**

> **优化点：优化tree-icon-click时间回调参数isExpanded，用于异步拉去数据，如果为`true`说明是展开事件**

> **优化点：添加`treeLoading`属性，通过`this.$refs.table.treeLoading[row['id']] = true`将图标变换为loading图标，其中`id`需要与`id-prop`属性一致**

> **优化点：添加`checkedRows`属性，通过`id-prop`属性初始化已选行**

> **优化点：添加`disabledRows`属性，通过`id-prop`属性初始化禁选行**

```html
<!-- 调用tree-table，并指定属性create-data-obj -->
<tree-table :create-data-obj="createDataObj">
  <template slot="$createdata" slot-scope="createdata">
    <!-- 自定义部分开始 -->
    <!-- 创建父级数据按钮 -->
    <div style="margin-left: 50px;padding: 5px;" v-show="!createdata.tmpData.status && createdata.rowIndex == -1">
      <Button type="info" style="margin-left: 10px" @click="showCreateDataForm(createdata)">Add</Button>
    </div>
    <!-- 创建数据表单 -->
    <div style="margin-left: 50px;padding: 5px;" v-show="createdata.tmpData.status">
      <Form :model="createdata.tmpData.data" inline>
        <FormItem prop="name">
            <Input type="text" v-model="createdata.tmpData.data.name" placeholder="name">
            </Input>
        </FormItem>
        <FormItem prop="sex">
            <Input type="text" v-model="createdata.tmpData.data.sex" placeholder="sex">
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="addDataAndHideForm(createdata)">Add</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 自定义部分结束 -->
  </template>
</tree-table>
```

其中`scope`对象`createdata`包含三个对象`row`-当前操作列，`rowIndex`-当前操作列索引号(从-1开始)，`tmpData`-当前操作列状态信息(包含表单对象属性`data`和表单显示状态属性`status`)，同时需要通过`props`指定表单对象模板属性`create-data-obj`，该属性为需要新增的表单对像;

## Example

![Example](./example/example.gif)

## Installation

Use npm:

```shell
npm i tree-table-vue -S
```

Or use yarn:

```shell
yarn add tree-table-vue
```

## Usage

```javascript
import Vue from 'vue'
import TreeTable from 'tree-table-vue-extend'

Vue.use(TreeTable)
```

Or

```javascript
import Vue from 'vue'
import TreeTable from 'tree-table-vue-extend'

Vue.component(TreeTable.name, TreeTable)
```

more information please see [example...](https://github.com/MisterTaki/vue-table-with-tree-gird/blob/master/example/Example.vue), or git clone this repository and open dev mode (I will give it a homepage later...).

## API

### Table Attributes

| 属性 | 说明 | 类型 | 参数 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| data | 表格各行的数据 | Array | - | [] |
| empty-text | 表格数据为空时显示的文字 | String | - | '暂无数据' |
| columns | 表格各列的配置（具体见下文：Columns Configs） | Array | - | [] |
| expand-key | 需要显示展开按钮的列的key（columns列对象里的prop） | String | - | 默认是第一列的prop |
| show-header | 是否显示表头 | Boolean | - | true |
| show-index | 是否显示数据索引 | Boolean | - | false |
| index-text | 数据索引名称 | String | - | '序号' |
| show-summary | 是否显示表尾合计行 | Boolean | - | false |
| sum-text | 表尾合计行首列名称 | String | - | '合计' |
| summary-method | 表尾合计行计算方法 | Function | data, column, columnIndex | - |
| max-height | 最大高度 | [String, Number] | - | 'auto' |
| stripe | 是否显示间隔斑马纹 | Boolean | - | false |
| border | 是否显示纵向边框 | Boolean | - | false |
| show-row-hover | 鼠标悬停时，是否高亮当前行 | Boolean | - | true |
| tree-type | 是否为树形表格 | Boolean | - | false |
| children-prop | 树形表格中遍历的属性名称 | String | - | 'children' |
| is-fold | 树形表格中父级是否默认折叠 | Boolean | - | true |
| expand-type | 是否为展开行类型表格（为 True 时，需要添加名称为 '$expand' 的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽), 它可以获取到 row, rowIndex) | Boolean | - | false |
| selectable | 是否为多选类型表格 | Boolean | - | false |
| select-type | 选择列渲染的形式, radio或checkbox | String | - | checkbox |
| loading | 是否显示载入中状态 | Boolean | - | false |
| id-prop | 指定行数据唯一标识的列key | String | - | 'id' |
| checkedRows | 初始化已选行，数组的值需要为`id-prop`指定列的值 | Array | - | [] |
| disabledRows | 初始化禁选行，数组的值需要为`id-prop`指定列的值 | Array | - | [] |
| row-key | 行数据的 Key，用来优化 Table 的渲染 | Function | row, rowIndex | rowIndex |
| row-class-name | 额外的表格行的类名 | String, Function | row, rowIndex | - |
| cell-class-name | 额外的表格行的类名 | String, Function | row, rowIndex, column, columnIndex | - |
| row-style | 额外的表格行的样式 | Object, Function | row, rowIndex | - |
| cell-style | 额外的表格单元格的样式 | Object, Function | row, rowIndex, column, columnIndex | - |

### Columns Configs

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | 列标题名称 | String | '' |
| key | 对应列内容的属性名 | String | '' |
| align | 对应列内容的对齐方式，可选值有 'center', 'right' | String | 'left' |
| headerAlign | 对应列标题的对齐方式，可选值有 'center', 'right' | String | 'left' |
| width | 列宽度 | [String, Number] | 'auto' |
| minWidth | 列最小宽度 | [String, Number] | '80px' |
| type | 列类型，可选值有 'template'(自定义列模板) | String | '' |
| template | 列类型为 'template'(自定义列模板) 时，对应的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽)（它可以获取到 row, rowIndex, column, columnIndex）名称 | String | '' |

### Table Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| cell-click | 单击某一单元格 | row, rowIndex, column, columnIndex, $event |
| cell-dblclick | 双击某一单元格 | row, rowIndex, column, columnIndex, $event  |
| cell-contextmenu | 在某一单元格上点击鼠标右键 | row, rowIndex, column, columnIndex, $event  |
| cell-mouseenter | 鼠标滑入某一单元格 | row, rowIndex, column, columnIndex, $event  |
| cell-mouseleave | 鼠标滑出某一单元格 | row, rowIndex, column, columnIndex, $event  |
| row-click | 单击某一行 | row, rowIndex, $event |
| row-dblclick | 双击某一行 | row, rowIndex, $event |
| row-contextmenu | 在某一行上点击鼠标右键 | row, rowIndex, $event |
| row-mouseenter | 鼠标滑入某一行 | row, rowIndex, $event |
| row-mouseleave | 鼠标滑出某一行 | row, rowIndex, $event |
| checkbox-click | 鼠标单击checkbox | row, rowIndex, $event |
| tree-icon-click | 鼠标单击树形icon | row, column, columnIndex, $event, isExpanded(表示当前是展开(true)还是收则(false)) |
| expand-cell-click | 鼠标单击展开单元格 | row, rowIndex, $event |

### Table Methods

| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| getCheckedProp | 当表格为多选类型表格时，用于获取当前所选项的属性，返回一个数组；属性默认为['index']。 | array |
| getExpandedRows | 获取当前展开的列 | 无 |
