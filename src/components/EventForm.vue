<template>
  <section>
      <v-form>
          <v-container grid-list-xl fluid>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field 
                  label="Title" 
                  v-model="title" 
                  :error-messages="titleErrors"
                  @input="detectUpdate($v.title)"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field 
                    label="Description" 
                    v-model="description" 
                    :error-messages="descriptionErrors"
                    @input="detectUpdate($v.description)"
                    multi-line
                    required>
                  </v-text-field>
                </v-flex>
            </v-layout>
          </v-container>      
        </v-form>
  </section>
</template>
<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'EventForm',
    data: function(){
      return {
        title:'',
        description:''
      }
    },
    props:{
      value: Object
    },
    validations: {
      title:{
        required
      },
      description: {
        required
      },
    },
    computed: {
      titleErrors(){
        const field = this.$v.title;
        return field.$dirty && !field.required ? ['Title is required'] : [];
      },
      descriptionErrors(){
        const field = this.$v.title;
        return field.$dirty && !field.required ? ['Description is required'] : [];
      },
    },
    methods:{

detectUpdate(formProp){
  const { title, description } = this;
  const updates = { 
    title, description
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
      this.title = val.title || "";
      this.description = val.description || "";

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