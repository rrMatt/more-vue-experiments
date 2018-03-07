
<script>
import Vue from 'vue'

export default {
  name:'AboutPage',
  data:function(){
      return {
          count: 0
      }
  },
  methods:{
      increment(){
          this.count = this.count + 1
      },
      decrement(){
          if(this.count){
              this.count = this.count - 1
          }
      }
  },
  render:function(createEl){

    // can access slot elements via this.$slots.myName which can be passed to createEl
    // also works with scoped slots via calling method this.$scopedSlots.myScopedName(contextData) which can be passed to createEl. the context data passed in is the data for the scoped slot

    
    // param pattern is: Component or html element name, options, children
    const card = createEl(Vue.component('v-card'), {
        class: 'pa-3'
    }, [
        createEl('p','This is has been generated via the render function'),
        createEl('p', 'The current count is ' + this.count),
        createEl(Vue.component('v-btn'), {
            props: { //pass props
                color: 'success'
            },
            on: { // bind events
                click: this.increment
            }
        }, [
            createEl(Vue.component('v-icon'), 'add')
        ]),
        createEl(Vue.component('v-btn'), {
            props:{
                color: 'error'
            },
            on: {
                click: this.decrement
            }
        }, [
            createEl(Vue.component('v-icon'), 'remove')
        ]),
    ]);

    // use Vue.component to load in pre-registered components or import for local components

    return createEl('section', [ card ])
  }
}
</script>
