<template>
  <v-container :grid-list-md="true">

    <v-card flat>
      <v-card-title>
        
          <v-layout>
            <v-flex xs6 md3>
              <v-layout>
                <v-flex xs4>
                  <v-btn color="info" @click="startEdit({})" :block="true">Create</v-btn>
                </v-flex>
                <v-flex xs8>
                  <v-text-field 
                    placeholder="Search" 
                    :solo="true" 
                    clearable 
                    v-model="search" 
                    @input="resetList()"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <slot name="filters"></slot>
            </v-flex>
            <v-flex xs6 md1>
              <v-select
                :items="pageSizeOptions"
                v-model="pageSize"
                single-line
                :solo="true"
                @input="resetList()"
                bottom>
                <template slot="selection" slot-scope="data">
                  View {{data.item.value}}
                </template>
              </v-select>
            </v-flex>
          </v-layout>
        
          <slot name="other"></slot>

      </v-card-title>

      <v-data-table
          :items="items"
          :disable-initial-sort="true"
          :hide-actions="true"
          class="text-xs-left my-2 mx-4">
          <template slot="headers" slot-scope="props">
            <slot name="header"></slot>
            <th>Actions</th>
          </template>
          <template slot="items" slot-scope="props">
            <slot name="row" :item="props.item"></slot>
            <td>
              <v-btn color="info" small @click="startEdit(props.item)">Edit</v-btn>
              <v-btn color="error" small @click="startDelete(props.item)">Delete</v-btn>
              <slot name="extraActions" :item="props.item"></slot>
            </td>
          </template>
        </v-data-table>

      <div class="text-xs-right pr-2 pb-2">
          <v-pagination :length="paginatorPages" :value="pageNum" @input="movePage"></v-pagination>
      </div>

    </v-card>

    <ConfirmDialog 
      :active="displayDeleteModal"
      :title="deleteTitle"
      @cancel="cancel()" 
      @confirm="confirmDelete()">
      <slot name="deleteMessage" :item="editItem"></slot>
    </ConfirmDialog>

    <ConfirmDialog 
      :active="displayEditModal"
      :title="editTitle"
      :enableConfirm="formValid && !isSaving" 
      confirmText="Save"
      widthStyle="960px"
      @cancel="cancel()" 
      @confirm="confirmEdit()">
      <ModalForm v-model="editItem" @valid="updateValidation">
        <template>
          <slot name="modalForm"></slot>
        </template>
      </ModalForm>
    </ConfirmDialog>

  </v-container>
</template>

<script>
  import Vue from 'vue'
  import ConfirmDialog from './ConfirmDialog.vue'
  import CrudModule, { actions, mutations } from '../store/crudModule'
  import { crudNamespace } from '../store/namespaces'
  import ModalForm from './ModalForm.vue'

  export default {
    name: 'CrudControl',
    props:{
      idKey: { // which prop name to treat as unique identifier on each item
        type: String,
        default: 'id'
      },
      extraFilters: Object,
      form: Object, // form component to use in dialog
      itemName: {  // name to describe the entity item
        type: String,
        default: 'Item'
      },
      storeName: String,
      url: String,
    },
    data: function(){
      return {
        editItem: {},
        displayDeleteModal: false,
        displayEditModal: false,
        formValid: false,
        search: "",
        pageNum: 1,
        pageSize: 10,
        pageSizeOptions: [ 
          {text: "2", value:2},
          {text: "5", value:5},
          {text: "10", value:10},
          {text: "25", value:25},
        ]
      }
    },
    computed:{
      isCreate(){
        return !this.editItem[this.idKey];
      },
      deleteTitle(){
        return 'Delete ' + this.itemName;
      },
      // normally would use vuex mapping helper but cant as using a dynamic module
      editTitle(){
        return `${ this.isCreate ? 'Create' : 'Edit' } ${this.itemName}`
      },
      items(){
        return this.$store.state['crud'][this.storeName].items;
      },
      totalItems(){
        return this.$store.state['crud'][this.storeName].totalItems;
      },
      isLoading(){
        return this.$store.state['crud'][this.storeName].loading;
      },
      isSaving(){
        return this.$store.state['crud'][this.storeName].saving;
      },
      paginatorPages(){
        return Math.ceil(this.totalItems / this.pageSize);
      }
    },
    methods: {
      startEdit(item) {
        this.editItem = {...item}; // might need a deep clone?
        this.displayEditModal = true;
      },
      startDelete(item){
        this.editItem = item;
        this.displayDeleteModal = true;
      },
      confirmDelete(){
        const target = `crud/${this.storeName}/${actions.deleteItem.name}`
        this.runUpdate(target)
      },
      confirmEdit(){
        const isCreate = !this.editItem.id;
        const target = `crud/${this.storeName}/` + (isCreate ? actions.createItem.name : actions.editItem.name)
        this.runUpdate(target)
      },
      runUpdate(target){
        this.$store.dispatch(target, this.editItem, { root: true })
            .then(() => {
              this.cancel();
              this.loadList();
            })
      },
      cancel(){
        this.displayDeleteModal = false;
        this.displayEditModal = false;
      },
      updateValidation(isValid){
        this.formValid = isValid;
      },
      loadList(){
        const { search, pageSize, pageNum, extraFilters } = this;
        const filterData = {
          filter: search || "",
          pageNum,
          pageSize,
          ...extraFilters,
        }
        const target = `crud/${this.storeName}/${actions.listItems.name}`;
        this.$store.dispatch(target, filterData, { root: true })
      },
      resetList(){
        this.pageNum = 1;
        this.loadList();
      },
      movePage(nextPage){
        this.pageNum = nextPage;
        this.loadList();
      }
    },
    created(){
      this.$store.registerModule(['crud', this.storeName], CrudModule)
      const intialValues = {
        target: this.url,
        key: 'id'
      }
      this.$store.dispatch(`${crudNamespace}${this.storeName}/${actions.setDefaults.name}`, intialValues)
    },
    beforeMount(){
      this.loadList()
    },
    watch:{
      extraFilters:function(next,prev){
        this.resetList();
      }
    },
    components:{
      ConfirmDialog,
      ModalForm,
    }
  }
</script>