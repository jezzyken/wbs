<template>
  <v-container class="px-6">
    <!-- Page Header -->
    <div class="mb-6">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider="/"
        class="pa-0"
      ></v-breadcrumbs>
    </div>

    <!-- Search Section -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="search"
              label="Search"
              placeholder="Description / Type"
              dense
              outlined
              hide-details
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Expenses List -->
    <v-card>
      <v-card-title class="d-flex justify-space-between py-4">
        <span class="text-h6">Expenses List</span>
        <div>
          <v-btn color="primary" @click="openAddDialog">
            <v-icon left>mdi-plus</v-icon>
            Add Expense
          </v-btn>
        </div>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredExpenses"
        :loading="loading"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [10, 20, 50],
          'show-first-last-page': true,
        }"
      >
        <template v-slot:item.amount="{ item }">
          ₱{{ item.amount.toFixed(2) }}
        </template>

        <template v-slot:item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            x-small
            text
            color="primary"
            class="mr-2"
            @click="editExpense(item)"
          >
            <v-icon x-small left>mdi-pencil</v-icon>
            Edit
          </v-btn>
          <v-btn v-if="userRole === 'admin'" x-small text color="error" @click="deleteExpense(item)">
            <v-icon x-small left>mdi-delete</v-icon>
            Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Expense Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            isEdit ? "Edit Expense" : "Add Expense"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form v-if="dialog" ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.date"
                  label="Date"
                  type="date"
                  required
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.amount"
                  label="Amount"
                  type="number"
                  prefix="₱"
                  required
                  :rules="amountRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  v-model="editedItem.expenseType"
                  :items="expenseTypes"
                  label="Expense Type"
                  required
                  :rules="requiredRules"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  label="Description"
                  required
                  :rules="requiredRules"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog" :disabled="isSaving">Cancel</v-btn>
          <v-btn
            color="primary"
            :disabled="!valid || isSaving"
            :loading="isSaving"
            @click="saveExpense"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this expense?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "ExpensesPage",

  data: () => ({
    breadcrumbs: [
      { text: "Home", disabled: false, href: "/" },
      { text: "Expenses", disabled: true },
    ],
    search: "",
    dialog: false,
    confirmDialog: false,
    dateMenu: false,
    valid: false,
    isEdit: false,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    isSaving: false,
    itemToDelete: null,

    headers: [
      { text: "Date", value: "date", sortable: true },
      { text: "Amount", value: "amount", sortable: true },
      { text: "Type", value: "expenseType", sortable: true },
      { text: "Description", value: "description", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    expenseTypes: ["Utilities", "Supplies", "Maintenance", "Other"],
    editedItem: {
      date: moment().format("YYYY-MM-DD"),
      amount: 0,
      expenseType: "",
      description: "",
    },
    defaultItem: {
      date: moment().format("YYYY-MM-DD"),
      amount: 0,
      expenseType: "",
      description: "",
    },

    requiredRules: [(v) => !!v || "This field is required"],
    amountRules: [
      (v) => !!v || "Amount is required",
      (v) => v > 0 || "Amount must be greater than 0",
    ],
  }),

  computed: {
    ...mapState("expenses", ["expenses", "loading", "error"]),

    userRole() {
      return this.$store.state.auth.user?.role;
    },

    filteredExpenses() {
      return this.expenses.filter((expense) => {
        const searchLower = this.search.toLowerCase();
        return (
          !this.search ||
          expense.description.toLowerCase().includes(searchLower) ||
          expense.expenseType.toLowerCase().includes(searchLower)
        );
      });
    },
  },

  async created() {
    await this.fetchExpenses();
  },

  methods: {
    ...mapActions("expenses", [
      "fetchExpenses",
      "createExpense",
      "updateExpense",
      "deleteExpense",
    ]),

    formatDate(date) {
      if (!date) return "";
      return moment(date).format("MMM DD, YYYY");
    },

    openAddDialog() {
      this.isEdit = false;
      this.editedItem = { ...this.defaultItem };
      this.dialog = true;
    },

    editExpense(item) {
      this.isEdit = true;
      this.editedItem = {
        ...item,
        date: moment(item.date).format("YYYY-MM-DD"),
      };
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
          this.$refs.form.reset();
        }
        this.editedItem = { ...this.defaultItem };
      });
    },

    async saveExpense() {
      if (this.$refs.form.validate()) {
        this.isSaving = true;
        try {
          const expenseData = {
            ...this.editedItem,
            date: moment(this.editedItem.date).format("YYYY-MM-DD"),
          };

          if (this.isEdit) {
            await this.updateExpense({
              id: this.editedItem._id,
              expense: expenseData,
            });
            this.snackbarText = "Expense updated successfully";
          } else {
            await this.createExpense(expenseData);
            this.snackbarText = "Expense created successfully";
          }
          this.snackbarColor = "success";
          this.closeDialog();
          await this.fetchExpenses();
        } catch (error) {
          this.snackbarText = error.message || "Error saving expense";
          this.snackbarColor = "error";
        } finally {
          this.isSaving = false;
          this.snackbar = true;
        }
      }
    },

    deleteExpense(item) {
      this.itemToDelete = item;
      this.confirmDialog = true;
    },

    async confirmDelete() {
      try {
        await this.deleteExpense(this.itemToDelete._id);
        this.snackbarText = "Expense deleted successfully";
        this.snackbarColor = "success";
        await this.fetchExpenses();
      } catch (error) {
        this.snackbarText = error.message || "Error deleting expense";
        this.snackbarColor = "error";
      } finally {
        this.confirmDialog = false;
        this.itemToDelete = null;
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.v-data-table ::v-deep th {
  font-weight: 600 !important;
}

.v-data-table ::v-deep td {
  font-size: 14px !important;
}
</style>
 