<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline white--text fill-height justify-center" style="background-color: #4A148C;">Are you sure?</v-card-title>
        <v-card-text class="text-xs-center">You are going to delete this row.<br>This action cannot be undone.</v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" outline @click.native="cancelDialog">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" outline @click.native="deleteDialog">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    props: ['passedDialogState'],
    data () {
      return {
        dialog: false
      }
    },
    watch: {
      passedDialogState(newValue) {
        this.dialog = newValue
      }
    },
    methods: {
      cancelDialog() {
        this.dialog = false
        this.$emit('onCancelDialog',false)
      },
      deleteDialog() {
        this.dialog = false
        this.$emit('onDeleteDialog',{false: false,deleteIndex: this.passedDialogState.index})
      }
    }
  }
</script>

