<template lang="html">
  <div id="example">
    <ul class="switch-list">
      <li class="switch-item" v-for="item in propList">
        <span>{{ item.name }}: </span>
        <zk-switch v-model="props[item.name]"></zk-switch>
      </li>
    </ul>
    <Row style="margin: 10px">
        <Button type="info" style="margin-right: 10px" @click="addData()">Add</Button>
        <Button type="error" style="margin-right: 10px" @click="removeData()">Remove</Button>
        <Button type="success" style="margin-right: 10px" @click="recoveryData()">Recovery</Button>
        <Button type="info" style="margin-right: 10px" @click="foldAll()">Fold All</Button>
        <Button type="info" style="margin-right: 10px" @click="expandAll()">Expand All</Button>
        <Button type="info" style="margin-right: 10px" @click="expandRows()">Show Expanded Rows</Button>
    </Row>
    <tree-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="data"
      :editable="props.editable"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      select-type="checkbox"
      :radio-status-reset="props.radioStatuReset"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :loading="props.loading"
      force-expand-icon-prop="isBase"
      id-prop="id"
      expand-key="sex"
      maxHeight="200px"
      :disabledRows="disabledRows"
      :checkedRows="checkedRows"
      :create-data-obj="createDataObj"
      @radio-click="handleRadioClick"
      @input-blur="inputOnBlur"
      @tree-icon-click="expandEvent"
      :selection-type="props.selectable">
      <!-- <tree-table
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        :data="data"> -->
      <template slot="$createdata" slot-scope="createdata">
        <div style="margin-left: 50px;padding: 5px;" v-show="!createdata.tmpData.status && createdata.rowIndex == -1">
          <Button type="info" style="margin-left: 10px" @click="showCreateDataForm(createdata)">Add</Button>
        </div>
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
      </template>
      <!-- <template slot="$expand" slot-scope="scope">
        {{ `My name is ${scope.row.name},
           this rowIndex is ${scope.rowIndex}.`
         }}
      </template> -->
      <template slot="sex" slot-scope="scope">
        <span :style="{'color': scope.row.sex === 'male' ? 'green' : 'red' }">{{ scope.row.sex }}</span>
      </template>
      <template slot="likes" slot-scope="scope">
          <Dropdown trigger="click" @on-click="createChild(scope.row)">
              <Button type="primary">
                  <Icon type="md-arrow-dropdown" />
              </Button>
              <DropdownMenu slot="list">
                  <DropdownItem name="1">新增子项</DropdownItem>
                  <DropdownItem name="2">修改</DropdownItem>
                  <DropdownItem name="3">删除</DropdownItem>
              </DropdownMenu>
          </Dropdown>
      </template>
    </tree-table>
  </div>
</template>

<script>
  import ZkSwitch from './Switch/Switch';

  export default {
    name: 'example',
    components: {
      ZkSwitch,
    },
    data() {
      return {
        props: {
          stripe: false,
          border: true,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          loading: false,
          editable: false,
          expandType: false,
          selectable: false,
          radioStatuReset: true,
        },
        createDataObj: {
          name: '',
          sex: ''
        },
        data: [
          {
            id: '1',
            name: 'Jack',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
            children: [
              {
                id: '2',
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    id: '3',
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                    isBase: false,
                  },
                  {
                    id: '4',
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                    children: [
                      {
                        id: '5',
                        name: 'Ashley',
                        sex: 'female',
                        likes: ['football', 'basketball'],
                        score: 20,
                      },
                      {
                        id: '6',
                        name: 'Taki',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 10,
                        children: [
                          {
                            id: '7',
                            name: 'Ashley',
                            sex: 'female',
                            likes: ['football', 'basketball'],
                            score: 20,
                          },
                          {
                            id: '8',
                            name: 'Taki',
                            sex: 'male',
                            likes: ['football', 'basketball'],
                            score: 10,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: '9',
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
          {
            id: '10',
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                id: '11',
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    id: '12',
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    id: '13',
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
              {
                id: '14',
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
                children: [
                  {
                    id: '15',
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    id: '16',
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
            ],
          },
          {
            id: '17',
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
          },
          {
            id: '18',
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                id: '19',
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                id: '20',
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
        ],
        dataNormal: [
          {
            id: '1',
            name: 'Jack',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
            children: [
              {
                id: '2',
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    id: '3',
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    id: '4',
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                    children: [
                      {
                        id: '5',
                        name: 'Ashley',
                        sex: 'female',
                        likes: ['football', 'basketball'],
                        score: 20,
                      },
                      {
                        id: '6',
                        name: 'Taki',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 10,
                        children: [
                          {
                            id: '7',
                            name: 'Ashley',
                            sex: 'female',
                            likes: ['football', 'basketball'],
                            score: 20,
                          },
                          {
                            id: '8',
                            name: 'Taki',
                            sex: 'male',
                            likes: ['football', 'basketball'],
                            score: 10,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: '9',
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
          {
            id: '10',
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                id: '11',
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    id: '12',
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    id: '13',
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
              {
                id: '14',
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
                children: [
                  {
                    id: '15',
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    id: '16',
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
            ],
          },
          {
            id: '17',
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
          },
          {
            id: '18',
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                id: '19',
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                id: '20',
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
        ],
        columns: [
          {
            title: 'name',
            key: 'name',
            headerAlign: 'center',
            align: 'center',
            fixed: 'left',
//            width: '400px',
          },
          {
            title: 'total',
//            width: '200px',
            headerAlign: 'center',
            align: 'center',
            children: [
              {
                title: 'sex',
                key: 'sex',
                headerAlign: 'center',
                align: 'center',
                type: 'template',
                template: 'sex',
//                width: '100px',
              },
              {
                title: 'score',
                key: 'score',
                headerAlign: 'center',
                align: 'center',
//                width: '100px',
              }
            ]
          },
          {
            title: 'likes',
            key: 'likes',
//            width: '300px',
            headerAlign: 'center',
            align: 'center',
            type: 'template',
            template: 'likes',
          },
        ],
        formInline: {
          name: 'Erixu',
          sex: 'male',
        },
        disabledRows: ['1','2','3'],
        checkedRows: ['1','2','3']
      };
    },
    computed: {
      propList() {
        return Object.keys(this.props).map(item => ({
          name: item,
        }));
      },
    },
    methods: {
      showCreateDataForm(createData) {
        createData.tmpData.status = true;
      },
      getMatchedRow(data, id, newData) {
        for (var i in data) {
            if (data[i].id == id) {
              if (data[i].children != undefined) {
                data[i].children.push(newData);
              } else {
                data[i].children = [];
                data[i].children.push(newData);
              }
              return true;
            }
        }
        for (var i in data) {
            if (data[i].children != undefined) {
              if (this.getMatchedRow(data[i].children, id, newData) == true) {
                return true;
              }
            }
        }
        return false;
      },
      addDataAndHideForm(createData) {
        var newData = {};
        Object.assign(newData, createData.tmpData.data);
        newData.id = Math.random().toString(36).substr(2);
        if (createData.rowIndex == -1) {
          this.data.push(newData);
        } else {
          // 递归获取
          this.getMatchedRow(this.data, createData.row.id, newData);
        }
        createData.tmpData.status = false;
      },
      createChild(row) {
        this.$refs.table.tmpData[row.id].status = true;
      },
      addData() {
        this.data[0].children.push(
          {
            id: Math.random().toString(36).substr(2),
            name: 'Wenxing',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20
          }
        );
      },
      removeData() {
        this.data[0].children.splice(1,1);
      },
      recoveryData() {
        let firstChildren = this.dataNormal[0].children;
        this.data[0].children = [...firstChildren];
      },
      handleRadioClick(option) {
        // console.log(option); // eslint-disable-line
      },
      inputOnBlur(row) {
        console.log(row);
      },
      expandEvent(row, column, columnIndex, $event, isExpanded) {
        this.$refs.table.treeLoading[row['id']] = true;
        console.log(column);
      },
      // expandedIds() {
      //   this.$refs.table.getExpandedIds()
      // },
      foldAll() {
        this.$refs.table.foldAll(true);
      },
      expandAll() {
        this.$refs.table.foldAll(false);
      },
      expandRows() {
        console.log(this.$refs.table.getCheckedProps(['id', 'name', 'sex']));
      }
    },
  };
</script>

<style scoped lang="less">
  .switch-list {
    margin: 20px 0;
    list-style: none;
    overflow: hidden;
  }

  .switch-item {
    margin: 20px;
    float: left;
  }
</style>
