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
    </Row>
    <tree-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="data"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      select-type="checkbox"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      expand-key="sex"
      style="width: 800px"
      @radio-click="handleRadioClick"
      :selection-type="props.selectable">
      <!-- <tree-table
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        :data="data"> -->
      <template slot="$expand" slot-scope="scope">
        {{ `My name is ${scope.row.name},
           this rowIndex is ${scope.rowIndex}.`
         }}
      </template>
      <template slot="likes" slot-scope="scope">
          <Dropdown trigger="click">
              <Button type="primary">
                  <Icon type="md-arrow-dropdown" />
              </Button>
              <DropdownMenu slot="list">
                  <DropdownItem name="1">新增</DropdownItem>
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
          border: false,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectable: false,
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
            width: '400px',
          },
          {
            title: 'total',
            width: '200px',
            headerAlign: 'center',
            align: 'center',
            children: [
              {
                title: 'sex',
                key: 'sex',
                headerAlign: 'center',
                align: 'center',
                width: '100px',
              },
              {
                title: 'score',
                key: 'score',
                headerAlign: 'center',
                align: 'center',
                width: '100px',
              }
            ]
          },
          {
            title: 'likes',
            key: 'likes',
            width: '300px',
            headerAlign: 'center',
            align: 'center',
            type: 'template',
            template: 'likes',
          },
        ],
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
      addData() {
        this.data[0].children.push(
          {
            id: '0001',
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
        console.log(option); // eslint-disable-line
      },
      expandedIds() {
        console.log(this.$refs.table.getExpandedIds());
      },
      foldAll() {
        this.$refs.table.foldAll(true);
      },
      expandAll() {
        this.$refs.table.foldAll(false);
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
