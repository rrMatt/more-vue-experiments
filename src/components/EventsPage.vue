<template>
  <section>
    <v-card>
        <v-card-title>
          <h1 class="display-1">Events</h1>
        </v-card-title>

        <CrudControl storeName="events" url="http://localhost:3088/events/">
          <template slot="header">
            <th>Title</th>
            <th>Description</th>
          </template>
          <template slot="row" slot-scope="x">
            <td>{{x.item.title}}</td>
            <td>{{x.item.description}}</td>
          </template>
          <EventForm slot="modalForm"></EventForm>
        </CrudControl>

    </v-card>
  </section>
</template>
<script>
  import CrudControl from './CrudControl'
  import EventForm from './EventForm'

  export default {
    name: 'EventsPage',
    data: function(){
      return {};
    },
    components: {
      CrudControl,
      EventForm,
    }
  }
</script>