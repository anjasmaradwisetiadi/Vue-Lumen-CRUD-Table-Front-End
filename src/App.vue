<template>
  <v-app>

    <!-- STARTS THE DELETE DIALOG-->
    <app-delete-dialog :passedDialogState="dialogState" @onDeleteDialog="deleteRow($event)" @onCancelDialog="dialogState = $event"></app-delete-dialog>
    <!-- ENDS THE DELETE DIALOG-->

    <v-toolbar class="purple darken-1 white--text" height="50">
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>



    <v-container>

      <v-layout row wrap>
        <v-flex xs6>
          <!--<h1>Hello</h1>-->
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs3>
          <v-text-field label="Search" :append-icon="'search'" @keyup="searching" v-model="search" color="warning"></v-text-field> <!-- search -->
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 id="table-container">

          <table id="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody ref="dataRows" id="tbody">

              <!-- BEGIN BLANK INPUTS ROW-->
              <tr id="blank" ref="blank">
                <td>
                  <v-text-field color="secondary" label="Enter Name" :rules="[rules.required]" ref="inputName" v-model="newData.name"></v-text-field>
                </td>
                <td>
                  <v-text-field color="secondary" label="Enter Last Name" :rules="[rules.required]" ref="inputLname" v-model="newData.lname"></v-text-field>
                </td>
                <td>
                  <v-text-field color="secondary" label="Enter Email" :rules="[rules.required, rules.email]" ref="inputEmail" v-model="newData.email"></v-text-field>
                </td>
                <td>
                  <v-select
                    label="Select"
                    :items="items"
                    color="secondary"
                    :error-messages="errorSelected"
                    v-model="newData.age"
                    item-value="text"
                  ></v-select>
                </td>

                <!-- SAVE AND CANCEL BUTTONS-->
                <td v-if="editing">
                  <v-layout row>
                    <v-flex xs6>
                      <v-btn outline small fab color="indigo" @click="saveRow">
                        <v-icon>save</v-icon> <!-- SAVE BUTTON -->
                      </v-btn>
                    </v-flex>
                    <v-flex xs6>
                      <v-btn outline small fab color="success" @click="cancelEditing">
                        <v-icon>cancel</v-icon> <!-- CANCEL BUTTON -->
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </td>
                <!-- ENDS SAVE AND CANCEL BUTTONS-->

                <!-- ADD NEW ROW BUTTON-->
                <td v-else>
                  <v-btn fab dark color="indigo" @click="addNewRow">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </td>
                <!--END ADD NEW ROW BUTTON-->

              </tr>

              <!-- ENDS BLANK INPUTS ROW-->

              <template v-if="!editing">

                <tr v-for="(item,index) in data" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.lname }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.age }}</td>


                  <!-- EDIT AND DELETE BUTTONS-->
                  <td>
                    <v-layout row>
                      <v-flex xs6>
                        <v-btn color="info" fab small dark @click="editRow(index)">
                          <v-icon>{{ item.actions[0] }}</v-icon> <!-- EDIT BUTTON -->
                        </v-btn>
                      </v-flex>
                      <v-flex xs6>
                        <v-btn color="error" fab small dark @click="deletePressed(index)">
                          <v-icon>{{ item.actions[1] }}</v-icon> <!-- DELETE BUTTON -->
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </td>
                  <!--ENDS EDIT AND DELETE BUTTONS-->
                </tr>
              </template>
            </tbody>
          </table>
          </table>



        </v-flex>
      </v-layout>
    </v-container>



  </v-app>
</template>

<script src="./AppComponent/js.js"></script>

<style src="./AppComponent/css.css"></style>
