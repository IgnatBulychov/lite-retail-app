<template>
    <v-card>
      <v-card-title>
        <span class="text-lg-h6">
            Изменение клиента
        </span>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-form @submit.prevent="updateCustomer()" ref="formUpdateCustomer" v-model="valid" lazy-validation>
        <v-card-text>
        <v-text-field
          placeholder="Название"
          v-model="customerForUpdate.name"
          :rules="nameRules"
        ></v-text-field> 
        <v-text-field
          placeholder="ИНН"
          v-model="customerForUpdate.vatin"
          :rules="vatinRules"
        ></v-text-field>    
        <v-text-field
          placeholder="ИНН"
          v-model="customerForUpdate.email"
          :rules="emailRules"
        ></v-text-field>   
        <v-text-field
          placeholder="ИНН"
          v-model="customerForUpdate.phone"
          :rules="phoneRules"
        ></v-text-field>              
      </v-card-text>
      <v-card-actions>                    
        <v-btn type="submit" width="40%" height="50px" dark color="green lighten-2">
            Изменить       
        </v-btn>
        <v-spacer></v-spacer>          
      </v-card-actions>
    </v-form>   
  </v-card>
</template>

<script>
export default {
  name: 'update-customer',
  props: ['customerForUpdate'],
  data() {
    return {
      valid:true,
      statuses:[
        {
          text: "Физическое лицо",
          value: "individual"
        },
          {
          text: "Юридическое лицо",
          value: "entity"
        }
      ],
      nameRules: [
        v => !!v || 'Название - обязательное поле'
      ]
    }
  },
  computed: {
    emailRules() {
      if (!this.customerForUpdate.phone) {
        return [
          v => !!v || 'Заполните телефон или E-mail',
        ]
      } else {
        return []
      }      
    },
    phoneRules () {
      if (!this.customerForUpdate.email) {
        return [
          v => !!v || 'Заполните телефон или E-mail',
        ]
      } else {
        return []
      }      
    },
    vatinRules() {
      if (this.customerForUpdate.vatin) {
        return [
          v => (v.length == 0 || v.length == 12) || 'Некорректный ИНН',
          v =>  /^\d+$/.test(v) || 'Некорректный ИНН'       
        ]
      } else {
        return []
      }
    } 
  },
  methods: {
    updateCustomer() {
      if (this.$refs.formUpdateCustomer.validate()) {
        this.$store.dispatch('customers/updateCustomer', this.customerForUpdate)
        this.$refs.formUpdateCustomer.resetValidation()
        this.$emit('close-dialog')       
      }      
    }
  }
}
</script>