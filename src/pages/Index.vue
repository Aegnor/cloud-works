<template>
  <q-page class="flex flex-center">
    <div class="wrapper">

      <form novalidate class="q-pb-md" @submit.prevent="submit()">
        <div class="hidden">
          <q-input
            type="hidden"
            name="userToUpdate"
            v-model="userEditId"
          ></q-input>
        </div>
        <div class="field">
          <label for="name">Name</label>
          <q-input
            filled
            color="amber"
            id="name"
            v-model="name"
          ></q-input>
        </div>
        <div class="field">
          <label for="surname">Surname</label>
          <q-input
            filled
            color="amber"
            id="surname"
            v-model="surname"
          ></q-input>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <q-input
            filled
            color="amber"
            id="email"
            type="email"
            v-model="email"
          ></q-input>
        </div>
        <q-btn
          type="submit"
          label="Submit"
          class="q-mt-md"
          color="teal"
        ></q-btn>
      </form>
      <q-table
        v-if="usersData.length"
        :data="usersData"
        :columns="usersTableColumns"
        row-key="id"
        dark
        color="amber"
        hide-bottom
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="white" @click="editUser(props.row.id)" icon="edit"></q-btn>
            <q-btn dense round flat color="white" @click="deleteUser(props.row.id)" icon="delete"></q-btn>
          </q-td>
        </template>
      </q-table>
      <p v-else>No users rigth now</p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      userEditId: null,
      usersTableColumns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name'
        },
        {
          name: 'surname',
          label: 'Surname',
          align: 'left',
          field: 'surname'
        },
        {
          name: 'email',
          label: 'Email',
          align: 'left',
          field: 'email'
        },
        {
          name: 'actions',
          label: 'Actions',
          field: '',
          align:'center'
        },
      ],
      usersData: [{
        name: 'name',
        surname: 'surname',
        email: 'email',
        id: 1,
      }]
    }
  },
  methods: {
    submit() {
      const {name, email, surname} = this
      if (!name.trim() && !email.trim() && !surname.trim()) {
        return
      }

      if (this.userEditId) {
        const updateUser = this.findUserByID(this.userEditId)

        updateUser.name = this.name
        updateUser.email = this.email
        updateUser.surname = this.surname
        updateUser.id = this.userEditId

        this.resetUserForm()
        return
      }

      const newUser = {
        name, surname, email,
        id: Date.now()
      }

      this.resetUserForm()

      this.usersData.push(newUser)
    },
    editUser(id) {
      const user = this.findUserByID(id)

      this.name = user.name
      this.email = user.email
      this.surname = user.surname
      this.userEditId = user.id
    },
    deleteUser(id) {
      const indexOfUser = this.usersData.findIndex(user => user.id === id)

      this.usersData.splice(indexOfUser, 1)
    },
    findUserByID(id) {
      return this.usersData.find(user => user.id === id)
    },
    resetUserForm() {
      this.name = ''
      this.email = ''
      this.surname = ''
      this.userEditId = null
    }
  }
}
</script>
