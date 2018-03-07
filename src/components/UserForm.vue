<template>
  <section>
    <v-form>
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs6>
            <v-text-field 
              label="Name" 
              v-model="name" 
              :error-messages="nameErrors"
              @input="detectUpdate($v.name)"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field 
              label="Email" 
              v-model="email" 
              :error-messages="emailErrors"
              @input="detectUpdate($v.email)"
              @blur="$v.email.$touch()"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="membershipOptions"
              v-model="membershipType"
              :error-messages="membershipTypeErrors"
              :clearable="true"
              label="Membership Type"
              @input="detectUpdate($v.membershipType)"
              @blur="$v.membershipType.$touch()"
              required
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-radio-group v-model="gender" row label="Gender" style="padding-top:0" @change="detectUpdate()">
              <v-radio label="Male" value="male" ></v-radio>
              <v-radio label="Female" value="female"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-container>      
    </v-form>
  </section>
</template>


<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    name: 'UserForm',
    data: function(){
      return {
        name:'',
        email:'',
        membershipType: '',
        gender: '',
        membershipOptions: [
          { text: 'Bronze', value: 'bronze' },
          { text: 'Silver', value: 'silver' },
          { text: 'Gold', value: 'gold' }
        ]
      }
    },
    props:{
      value: Object
    },
    validations: {
      name:{
        required
      },
      email: {
        required,
        email
      },
      membershipType: {
        required,
      },
    },
    computed: {
      nameErrors(){
        const field = this.$v.name;
        return field.$dirty && !field.required ? ['Name is required'] : [];
      },

      emailErrors(){
        if(!this.$v.email.$dirty)
          return [];

        const errors = [];
        if(!this.$v.email.required)
          errors.push("Name is required");
        if(!this.$v.email.email)
          errors.push("Must be a valid email");
        return errors;
      },

      membershipTypeErrors(){
        const field = this.$v.membershipType;
        return field.$dirty && !field.required ? ['Membership type is required'] : [];
      },
    },
    methods:{

      detectUpdate(formProp){
        const { name, membershipType, email, gender } = this;
        const updates = { 
            name, membershipType, email, gender
        }
        if(this.value && !!this.value.id){
            updates.id = this.value.id;
        }
        if(formProp) 
          formProp.$touch();
        this.$emit('input', updates);
      },

    },
    watch: {
      value(val, oldVal){
            this.name = val.name || "";
            this.email = val.email || "";
            this.gender = val.gender || "";
            this.membershipType = val.membershipType || "";

            // reset form validation when creating (i.e. when we get an empty object)
            if(Object.keys(val).length === 0 || !val){
              this.$v.$reset();
            }
        },
        $v:{
            handler: function (v) { 
                this.$emit('valid', !v.$invalid);
            },
            deep: true
        },
    }
  }
</script>