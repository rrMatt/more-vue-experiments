<script>

    // higher order component which wraps a generic form component to allow be compatible with v-model and a "valid" event
    export default {
        name: 'ModalForm',
        props:{
            value: Object,
            valid: Function,
        },
        methods:{
            updateData: function(updates){
                this.$emit('input', updates);
            },
            updateValid: function(result){
                this.$emit('valid', result)
            }
        },
        render: function(createEl){

            const formNode = this.$slots.default[0];

            // add extra prop and event bindings in new instance of the component passed in
            const formComp = createEl(formNode.componentOptions.Ctor, {
                props:{
                    value: this.value
                },
                on:{
                    input: this.updateData,
                    valid: this.updateValid
                }
            });
           
            return formComp
        }
    }
</script>
