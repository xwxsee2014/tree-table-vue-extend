<template lang="html">
  <div
    v-if="columns.length > 0"
    ref="table"
    :class="[prefixCls, tableClass]">
    <div
      v-show="showHeader"
      ref="header-wrapper"
      :class="`${prefixCls}__header-wrapper`"
      @mousewheel="handleEvent('header', $event)">
      <table-header
        ref="table-header">
      </table-header>
    </div>
    <div
      ref="body-wrapper"
      :style="bodyWrapperStyle"
      :class="`${prefixCls}__body-wrapper`"
      @scroll="handleEvent('body', $event)">
      <table-body
        ref="table-body"
        :class="bodyClass">
      </table-body>
    </div>
    <div
      v-show="showSummary && data.length > 0"
      ref="footer-wrapper"
      :class="`${prefixCls}__footer-wrapper`"
      @mousewheel="handleEvent('footer', $event)">
      <table-footer
        ref="table-footer">
      </table-footer>
    </div>
    <Spin fix size="large" v-if="loading">
        <slot name="loading"></slot>
    </Spin>
  </div>
</template>

<script>
  import TableHeader from './TableHeader';
  import TableBody from './TableBody';
  import TableFooter from './TableFooter';
  import Spin from './spin/spin.vue';
  import { mixins, scrollBarWidth as getSbw } from './utils';
  import { oneOf, getStyle, deepCopy, getScrollBarSize } from './utils/assist';
  import { getAllColumns, convertToRows, convertColumnOrder, getRandomStr } from './utils/rowutil';

  /* eslint-disable no-underscore-dangle */
  /* eslint-disable no-param-reassign */

function getBodyData(data, isTreeType, childrenProp, idProp, isFold, isHide = true, foldStatus = {}, version, level = 1, disabledRows, checkedRows) {
    // initial data fold status
    let bodyData = [];
    data.forEach((row, index) => {
      if (foldStatus[row[idProp]] == undefined) {
        foldStatus[row[idProp]] = {status: isFold, _version: version, row: row};
      } else {
        foldStatus[row[idProp]]._version = version;
      }
      // 单元格hover状态对象
      // let hoverCell = {};
      // let inputCell = {};
      // Object.keys(row).forEach((key, index) => {
      //   hoverCell[key] = 'none';
      //   inputCell[key] = false;
      // })
      const children = row[childrenProp];
      const childrenLen = Object.prototype.toString.call(children).slice(8, -1) === 'Array' ? children.length : 0;
      bodyData.push({
        _isHover: false,
        _isExpanded: false,
        _isChecked: checkedRows.indexOf(row[idProp]) > 0 ? true : false,
        _isDisabled: disabledRows.indexOf(row[idProp]) > 0 ? true : false,
        _level: level,
        _isHide: isHide ? level !== 1 : false,
        _isFold: foldStatus[row[idProp]].status,
        _childrenLen: childrenLen,
        _normalIndex: index + 1,
        ...row,
      });
      if (isTreeType) {
        if (childrenLen > 0) {
          bodyData = bodyData.concat(getBodyData(children, true, childrenProp, idProp, isFold, foldStatus[row[idProp]].status, foldStatus, version, level + 1, disabledRows, checkedRows).bodyData,);
        }
      }
    });
    return {
      bodyData: bodyData,
      foldStatus: foldStatus, //true：折叠，false: 展开
    };
  }

  function initialState(table, expandKey) {
    // 初始化展开状态
    if (table.manualFoldStatus == undefined) table.manualFoldStatus = table.isFold ? true : false;
    if (table.version == undefined) table.version = 1;
    let {bodyData, foldStatus} = getBodyData(table.data, table.treeType, table.childrenProp, table.idProp, table.manualFoldStatus, table.manualFoldStatus, table.foldStatus, table.version, 1, table.disabledRows, table.checkedRows);
    let tmpData = table.tmpData == undefined ? {'$firstdata': {status: false, data: Object.assign({}, table.createDataObj)}} : table.tmpData;
    if (tmpData['$firstdata'].status == false){
      // 重置数据
      tmpData['$firstdata'].data = Object.assign({}, table.createDataObj);
    }
    Object.keys(foldStatus).forEach(function(key, index) {
      table.treeLoading[key] = false;
      if (tmpData[key] == undefined) {
        // 创建新数据
        tmpData[key] = {status: false, data: Object.assign({}, table.createDataObj)};
      } else if (tmpData[key].status = false) {
        // 重置数据
        tmpData[key].data = Object.assign({}, table.createDataObj);
      }
    });
    return {
      bodyHeight: 'auto',
      firstProp: expandKey || (table.columns[0] && table.columns[0].key),
      bodyData: bodyData,
      foldStatus: foldStatus,
      tmpData: tmpData
    };
  }

  function initialColumns(table, clientWidth) {
    let columnsWidth = 0;
    const minWidthColumns = [];
    const otherColumns = [];
    const groupColumns = deepCopy(table.columns);
    const columns = getAllColumns(groupColumns).concat();
    if (table.expandType) {
      groupColumns.unshift({
        width: '50',
      });
      columns.unshift({
        width: '50',
      });
    }
    if (table.selectable) {
      groupColumns.unshift({
        width: '50',
      });
      columns.unshift({
        width: '50',
      });
    }
    if (table.showIndex) {
      groupColumns.unshift({
        width: '50px',
        key: '_normalIndex',
        title: table.indexText,
      });
      columns.unshift({
        width: '50px',
        key: '_normalIndex',
        title: table.indexText,
      });
    }
    columns.forEach((column, index) => {
      let width = '';
      let minWidth = '';
      if (!column.width) {
        if (column.minWidth) {
          minWidth = typeof column.minWidth === 'number' ? column.minWidth : parseInt(column.minWidth, 10);
        } else {
          minWidth = 80;
        }
        minWidthColumns.push({
          ...column,
          minWidth,
          _index: index,
        });
      } else {
        width = typeof column.width === 'number' ? column.width : parseInt(column.width, 10);
        otherColumns.push({
          ...column,
          width,
          _index: index,
        });
      }
      columnsWidth += minWidth || width;
    });
    const scrollBarWidth = 0;
    const totalWidth = columnsWidth + scrollBarWidth;
    const isScrollX = totalWidth > clientWidth;
    if (!isScrollX) {
      const extraWidth = clientWidth - totalWidth;
      const averageExtraWidth = Math.floor(extraWidth / minWidthColumns.length);
      minWidthColumns.forEach((column) => {
        column.computedWidth = column.minWidth + averageExtraWidth;
      });
    }
    const tableColumns = otherColumns.concat(minWidthColumns);
    tableColumns.sort((a, b) => a._index - b._index);
    return {groupColumns: groupColumns, tableColumns: tableColumns};
  }

  export default {
    name: 'TreeTable',
    mixins: [mixins],
    components: {
      TableHeader,
      TableBody,
      TableFooter,
      Spin,
    },
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      columns: {
        type: Array,
        default: () => [],
      },
      maxHeight: {
        type: [String, Number],
        default: 'auto',
      },
      stripe: {
        type: Boolean,
        default: false,
      },
      border: {
        type: Boolean,
        default: false,
      },
      treeType: {
        type: Boolean,
        default: true,
      },
      childrenProp: {
        type: String,
        default: 'children',
      },
      idProp: {
        type: String,
        default: 'id',
      },
      isFold: {
        type: Boolean,
        default: true,
      },
      expandType: {
        type: Boolean,
        default: true,
      },
      selectable: {
        type: Boolean,
        default: true,
      },
      selectType: {
        type: String,
        default: 'checkbox',
      },
      forceExpandIconProp: {
        type: String,
        default: 'isBase'
      },
      emptyText: {
        type: String,
        default: '暂无数据',
      },
      showHeader: {
        type: Boolean,
        default: true,
      },
      showIndex: {
        type: Boolean,
        default: false,
      },
      indexText: {
        type: String,
        default: '序号',
      },
      showSummary: {
        type: Boolean,
        default: false,
      },
      sumText: {
        type: String,
        default: '合计',
      },
      summaryMethod: Function,
      showRowHover: {
        type: Boolean,
        default: true,
      },
      editable: {
        type: Boolean,
        default: false
      },
      radioStatusReset: {
        type: Boolean,
        default: false
      },
      laodingText: {
        type: String,
        default: '',
      },
      rowKey: Function,
      rowClassName: [String, Function],
      cellClassName: [String, Function],
      rowStyle: [Object, Function],
      cellStyle: [Object, Function],
      expandKey: String,
      loading: {
        type: Boolean,
        default: false
      },
      treeLoading: {
        type: Object,
        default: function(){
          return {};
        }
      },
      disabledRows: {
        type: Array,
        default: () => [],
      },
      checkedRows: {
        type: Array,
        default: () => [],
      }
    },
    data() {
      return {
        computedWidth: '',
        computedHeight: '',
        tableColumns: [],
        tableColumnRows: [],
        manualFoldStatus: true,
        version: 1,
        ...initialState(this, this.expandKey),
      };
    },
    computed: {
      bodyWrapperStyle() {
        return {
          height: this.bodyHeight,
        };
      },
      tableClass() {
        return {
          [`${this.prefixCls}--border`]: this.border,
        };
      },
      bodyClass() {
        return {
          [`${this.prefixCls}--stripe`]: this.stripe,
        };
      }
    },
    methods: {
      handleEvent(type, $event) {
        this.validateType(type, ['header', 'body', 'footer'], 'handleEvent');
        const eventType = $event.type;
        if (eventType === 'scroll') {
          this.$refs['header-wrapper'].scrollLeft = $event.target.scrollLeft;
          this.$refs['footer-wrapper'].scrollLeft = $event.target.scrollLeft;
        }
        if (eventType === 'mousewheel') {
          const deltaX = $event.deltaX;
          const $body = this.$refs['body-wrapper'];
          if (deltaX > 0) {
            $body.scrollLeft += 10;
          } else {
            $body.scrollLeft -= 10;
          }
        }
        return this.$emit(`${type}-${eventType}`, $event);
      },
      // computedWidth, computedHeight, tableColumns
      measure() {
        this.$nextTick(() => {
          console.log(this.$el.clientHeight);
          const { clientWidth, clientHeight } = this.$el;
          this.computedWidth = clientWidth + 2;
          this.computedHeight = clientHeight + 2;

          const maxHeight = parseInt(this.maxHeight, 10);
          if (this.maxHeight !== 'auto' && this.computedHeight > maxHeight) {
            this.bodyHeight = `${maxHeight - 83}px`;
          }
          const columnObj = initialColumns(this, clientWidth);
          this.tableColumns = columnObj.tableColumns;
          this.tableColumnRows = convertToRows(columnObj.groupColumns, false);
        });
      },
      getCheckedProps(key = ['index']) {
        if (!this.selectable) {
          return [];
        }
        const checkedIndexs = [];
        this.bodyData.forEach((item, index) => {
          if (item._isChecked) {
            var props = {};
            for (var i in key) {
              if (key[i] === 'index') {
                props[key[i]] = index;
              } else {
                props[key[i]] = item[key[i]];
              }
            }
            checkedIndexs.push(props);
          }
        });
        return checkedIndexs;
      },
      // 获取展开的列信息
      getExpandedRows() {
        let expandRowIndexs = Object.keys(this.foldStatus).filter(item => this.foldStatus[item] !== undefined &&
          this.foldStatus[item].status == false && this.version === this.foldStatus[item]._version);
        let expandRows = [];
        for (var i in expandRowIndexs) {
          expandRows.push(this.foldStatus[expandRowIndexs[i]]);
        }
        return expandRows;
      },
      // 展开/折叠全部
      foldAll(status) {
        this.manualFoldStatus = status;
        this.foldStatus = {};
        // 数据版本变化
        this.version++;
        Object.assign(this.$data, initialState(this, this.expandKey));
      },
    },
    watch: {
      $props: {
        deep: true,
        handler(val, oldVal) {
          // 数据版本变化
          this.version++;
          Object.assign(this.$data, initialState(this, this.expandKey));
        },
      },
    },
    updated() {
      this.measure();
    },
    mounted() {
      this.measure();
      window.addEventListener('resize', this.measure);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.measure);
    },
  };
</script>

<style lang="less" src="./Table.less"></style>
