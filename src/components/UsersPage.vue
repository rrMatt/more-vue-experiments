<template>
  <section>

    <v-card>

      <v-card-title>
        <h1 class="display-1">Users</h1>
      </v-card-title>

      <CrudControl storeName="users" url="http://localhost:3088/users/" :extraFilters="customFilters">
        <v-layout slot="filters">
          <v-flex xs-12 lg3>
            <v-select 
              :items="membershipTypeOptions"
              clearable
              v-model="membershipType"
              single-line
              :solo="true"
              placeholder="Membership Type"
              bottom>
            </v-select>
          </v-flex>
        </v-layout>
        <template slot="headers">
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Membership Type</th>
        </template>
        <template slot="row" slot-scope="x">
          <td>{{x.item.name}}</td>
          <td>{{x.item.email}}</td>
          <td>{{genderLabel(x.item.gender)}}</td>
          <td>
            <span v-if="x.item.membershipType == 'gold'">Gold</span>
            <span v-else-if="x.item.membershipType == 'silver'">Silver</span>
            <span v-else-if="x.item.membershipType == 'bronze'">Bronze</span>
          </td>
        </template>
        <UserForm slot="modalForm"></UserForm>
        <v-btn slot="extraActions" slot-scope="x" small @click="showNotification(x.item)">Notify</v-btn>
        <p slot="deleteMessage" slot-scope="x">Are you sure that you wish to delete {{x.item.name}}</p>
      </CrudControl>

    </v-card>
    
    <v-snackbar
      bottom
      v-model="displayNote">
      <span>{{message}}</span>
      <v-btn flat color="white" @click.native="displayNote = false">Close</v-btn>
    </v-snackbar>

  </section>
</template>

<script>
  import CrudControl from './CrudControl'
  import UserForm from './UserForm'
  import ConfirmDialog from './ConfirmDialog.vue'

  export default {
    name: 'UsersPage',
    data: function(){
      return {
        toggleFlag: false,
        message: "",
        displayNote: false,
        membershipType: "",
        membershipTypeOptions: [
          { text: "Bronze", value:"bronze" },
          { text: "Silver", value:"silver" },
          { text: "Gold", value:"gold" },
        ],
      }
    },
    computed: {
      customFilters(){
        return {
          membershipType: this.membershipType
        }
      }
    },
    methods: {
      showNotification: function(item) {
        this.message = `${item.name} has a notification!`;
        this.displayNote = true;
      },
      genderLabel(gender){
        if(gender == 'male')
          return 'Male';
        if(gender == 'female')
          return 'Female';
        return '-'
      },
    },
    components: {
      CrudControl,
      UserForm,
    }
  }
</script>