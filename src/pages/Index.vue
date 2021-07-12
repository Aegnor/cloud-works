<template>
  <q-page class="flex flex-center">
    <div class="wrapper">
      <form class="q-pb-md" @submit.prevent="submit()">
        <div class="hidden">
          <q-input
            type="hidden"
            name="userToUpdate"
            v-model="userToEditId"
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
        color="amber"
        dark
        hide-bottom
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="white" @click="setUserFormDataByUserId(props.row.id)" icon="edit"></q-btn>
            <q-btn dense round flat color="white" @click="deleteUser(props.row.id)" icon="delete"></q-btn>
          </q-td>
        </template>
      </q-table>
      <p v-else>No users right now</p>
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
      userToEditId: null,
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
      usersData: this.$store.getters["userModule/user"]
    }
  },
  methods: {
    submit() {
      const {name, email, surname} = this
      if (!name.trim() || !email.trim() || !surname.trim()) {
        return
      }

      if (this.userToEditId) {
        this.$store.dispatch('userModule/updateUser', {
          name: this.name,
          surname: this.surname,
          email: this.email,
          id: this.userToEditId
        })

        this.resetUserForm()
        return
      }

      const newUser = {
        name, surname, email,
        id: Date.now()
      }

      this.resetUserForm()

      this.$store.dispatch('userModule/addUser', newUser)
    },
    setUserFormDataByUserId(id) {
      const user = this.$store.getters['userModule/findUserByID'](id)

      this.name = user.name
      this.email = user.email
      this.surname = user.surname
      this.userToEditId = user.id
    },
    deleteUser(id) {
      this.$store.dispatch('userModule/deleteUser', id)
    },
    resetUserForm() {
      this.name = ''
      this.email = ''
      this.surname = ''
      this.userToEditId = null
    }
  }
}
</script>
