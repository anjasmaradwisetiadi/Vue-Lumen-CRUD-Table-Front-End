import {mapGetters} from 'vuex'
import { lumenRequest } from '../Axios Instances/lumenRequest'

import DeleteDialog from '../components/DeleteDialog.vue'


export default {
  /* The properties*/
  data () {
    return {
      editing:false,
      dialogState: {},
      data:[],
      dataCopy:[],
      newData: {
        name: '', lname: '', email: '', age: ''
      },
      search:'',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      items:['7-17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60+'],
      errorSelected:[]
    }
  },
  /* Computed*/
  computed: {
    ...mapGetters([
      'getFetchedData'
    ]),
    validEmail() {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(this.newData.email) || false
    }
  },
  /* Watch*/
  watch: {
    'newData.age'(value) {
      if(this.newData.age) {
        this.errorSelected = []
      }
    },
    getFetchedData(value) {
      this.data = value
      this.dataCopy = value
    }
  },
  /* Methods*/
  methods: {
    addNewRow() {
      if(this.newData.name.trim() === '') { //check the Name field
        this.$refs.inputName.focus();
        setTimeout(() => {
          this.$refs.inputName.blur();
        }, 1)
        return
      }

      if(this.newData.lname.trim() === '') { //check the Last Name field
        this.$refs.inputLname.focus();
        setTimeout(() => {
          this.$refs.inputLname.blur();
        }, 1)
        return
      }

      if(this.newData.email.trim() === '' || !this.validEmail){
        this.$refs.inputEmail.focus();
        setTimeout(() => {
          this.$refs.inputEmail.blur();
        }, 1)
        return
      }

      if(this.newData.age.trim() === '') {
        this.errorSelected.push('Select an Option')
        return
      }


      this.$store.dispatch('addNewRow',this.newData)
      this.newData = {
        name: '',lname: '',email: '',age: ''
      }

      this.rules = {} //we clear the rules cuz otherwise the input fields will show required error

      setTimeout(() => { // we set again the rules
        this.rules = {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      },1)

      setTimeout(() => { //clearing the console cuz when we clear the rules then there are throwing some errors
        console.clear()
      },1)

      this.$refs.dataRows.children[1].className = 'first-row'
      setTimeout(() => {
        this.$refs.dataRows.children[1].classList.remove("first-row")
      },1200)


    },
    editRow(index) {
      this.editing = true;
      let oldData = this.data[index]

      this.newData.name = oldData.name
      this.newData.lname = oldData.lname
      this.newData.email = oldData.email
      this.newData.age = oldData.age
      this.newData.index = index
    },
    saveRow() {
      let index = this.newData.index
      let id = this.data[index].id

      if(!this.validEmail){
        return
      }

      if( //If nothing edited
         this.data[index].name === this.newData.name &&
         this.data[index].lname === this.newData.lname &&
         this.data[index].email === this.newData.email &&
         this.data[index].age === this.newData.age
      ) {
        this.cancelEditing()
        return
      }




      if( //If at least one field is empty
        this.newData.name.trim() === '' ||
        this.newData.lname.trim() === '' ||
        this.newData.email.trim() === '' ||
        this.newData.age.trim() === ''
      ) {
        return
      }

      let newData = {id:id}

      /* The 4 if statements below are checking what is changed to effect that change to Database*/

      if(this.data[index].name !== this.newData.name) { //if name was edited
        newData.name = this.newData.name
      }

      if(this.data[index].lname !== this.newData.lname) { //if lname was edited
        newData.lname = this.newData.lname
      }

      if(this.data[index].email !== this.newData.email) { //if email was editet
        newData.email = this.newData.email
      }

      if(this.data[index].age !== this.newData.age) { //if age was editet
        newData.age = this.newData.age
      }


      this.newData = { name: '', lname: '', email: '', age: '' }

      this.$store.dispatch('storeEditableFields', {newData: newData})

      this.rules = {} //we clear the rules cuz otherwise the input fields will show required error

      setTimeout(() => { // we set again the rules
        this.rules = {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      },1)

      this.editing = false

      setTimeout(() => { //clearing the console cuz when we clear the rules then there are throwing some errors
        console.clear()
      },1)

      index++; //cuz the first index corresponding to first row which is blank inputs

      setTimeout(() => {
        this.$refs.dataRows.children[index].className = 'first-row'
      },50)

      setTimeout(() => {
        this.$refs.dataRows.children[index].classList.remove("first-row")
      },1200)

    },
    cancelEditing() {
      this.newData.email = '1@gmail.com';
      this.newData.name = 'a';
      this.newData.lname = 'a';
      this.newData.age = '18';

      this.rules = [] //we clear the rules cuz otherwise the input fields will show required error

      setTimeout(() => {
        this.editing = false

        this.newData = { name: '', lname: '', email: '', age: '' }
      },0.0001)


      setTimeout(() => { // we set again the rules
        this.rules = {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      },0.0002)

      setTimeout(() => { //clearing the console cuz when we clear the rules then there are throwing some errors
        console.clear()
      },1)

    },
    deleteRow(row) {
      let index = row.deleteIndex

      const idOfDeleted = this.data[index].id

      index++

      this.dialogState.state = false;
      setTimeout(() => {
        this.$refs.dataRows.children[index].className = 'first-row'
      },50)

      setTimeout(() => {
        this.$refs.dataRows.children[index].classList.remove("first-row")
      },1200)
      setTimeout(() => {
        this.$store.dispatch('deleteRow',idOfDeleted)
      },1300)


    },
    deletePressed(index) {
      this.dialogState = { state :true, index: index};
    },
    searching(value) {
      const search = value.target.value

      this.data = this.dataCopy

      let data = this.data.filter((element) => {
        if(
          element.name.toUpperCase().includes(search.toUpperCase()) ||
          element.lname.toUpperCase().includes(search.toUpperCase()) ||
          element.email.toUpperCase().includes(search.toUpperCase()) ||
          element.age.toUpperCase().includes(search.toUpperCase())
        ) {
          return element
        }
      })
      this.data = data
    }
  },
  components: {
    'app-delete-dialog': DeleteDialog
  }
}
