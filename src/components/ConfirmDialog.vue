<template>
  <v-dialog :value="active" :max-width="widthStyle">
      <v-card>
        <v-card-title>
          <h2>{{title}}</h2>
        </v-card-title>
        <v-card-text>
            <template>
                <slot></slot>
            </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click.native="confirm()" :disabled="!enableConfirm">{{confirmText}}</v-btn>
          <v-btn @click.native="cancel()">{{cancelText}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
    export default {
        name: 'ConfirmDialog',
        props:{
            title: String,
            active: {
                type: Boolean,
                default: false
            },
            enableConfirm: {
                type: Boolean,
                default: true
            },
            confirmText: {
                type: String,
                default: 'Confirm'
            },
            cancelText: {
                type: String,
                default: 'Cancel'
            },
            widthStyle: {
                type:String,
                default: '480px'
            }
        },
        data: function(){
            return {}
        },
        methods: {
            confirm(){
                this.$emit('confirm');
            },
            cancel(){
                this.$emit('cancel');
            }
        }
    }
</script>
