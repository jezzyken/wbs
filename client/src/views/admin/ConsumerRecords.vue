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

    <!-- Filter Section -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="search"
              label="Search"
              placeholder="Account No. / Name"
              dense
              outlined
              hide-details
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="statusFilter"
              :items="statusItems"
              label="Status"
              dense
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="purokFilter"
              :items="puroks"
              label="Purok"
              dense
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="archiveFilter"
              :items="archiveItems"
              label="Archive Status"
              dense
              outlined
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-spacer></v-spacer>
          <v-btn text @click="resetFilters" class="mr-2">Reset</v-btn>
          <v-btn color="primary" @click="applyFilters">Apply Filter</v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Consumer Records -->
    <v-card>
      <v-card-title class="d-flex justify-space-between py-4">
        <span class="text-h6">Consumer List</span>
        <div>
          <v-btn text class="mr-2" @click="exportData">
            <v-icon left>mdi-download</v-icon>
            Export
          </v-btn>
          <v-btn color="primary" @click="openAddDialog">
            <v-icon left>mdi-plus</v-icon>
            Add Consumer
          </v-btn>
        </div>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredConsumers"
        :loading="loading"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [10, 20, 50],
          'show-first-last-page': true,
        }"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            small
            label
            text-color="white"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <!-- <v-btn
            small
            text
            color="primary"
            class="mr-2"
            @click="viewConsumer(item)"
          >
            <v-icon small left>mdi-eye</v-icon>
            View
          </v-btn> -->
          <v-btn
            x-small
            text
            color="primary"
            class="mr-2"
            @click="editConsumer(item)"
          >
            <v-icon x-small left>mdi-pencil</v-icon>
            Edit
          </v-btn>
          <v-btn
            x-small
            text
            :color="item.isArchived ? 'success' : 'error'"
            @click="toggleArchive(item)"
          >
            <v-icon x-small left>
              {{ item.isArchived ? "mdi-archive-restore" : "mdi-archive" }}
            </v-icon>
            {{ item.isArchived ? "Restore" : "Archive" }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Consumer Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            isEdit ? "Edit Consumer" : "Add Consumer"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="12" v-if="!isEdit">
                <v-select
                  class="mt-4"
                  v-model="editedItem.consumerType"
                  :items="consumerTypes"
                  label="Consumer Type"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.accountNo"
                  label="Account No."
                  :disabled="isEdit"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.status"
                  :items="statusItems.filter((s) => s !== 'All')"
                  label="Status"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.firstName"
                  label="First Name"
                  required
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.middleName"
                  label="Middle Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.lastName"
                  label="Last Name"
                  required
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.nameExtension"
                  label="Name Extension (e.g. Jr., Sr.)"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.fullAddress"
                  label="Full Address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.purok"
                  :items="puroks.filter((p) => p !== 'All')"
                  label="Purok/Zone"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.contactNumber"
                  label="Contact Number"
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  :rules="emailRules"
                ></v-text-field>
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
            @click="saveConsumer"
          >
            {{ getActionButtonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ConsumerRecordsPage",

  data: () => ({
    breadcrumbs: [
      { text: "Home", disabled: false, href: "/" },
      { text: "Consumer Records", disabled: true },
    ],
    search: "",
    statusFilter: "All",
    purokFilter: "All",
    archiveFilter: "Active",
    dialog: false,
    valid: false,
    isEdit: false,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",

    headers: [
      { text: "Account No.", value: "accountNo", sortable: true },
      {
        text: "Name",
        value: "fullName",
        sortable: true,
        sort: (a, b) => a.fullName.localeCompare(b.fullName),
      },
      { text: "Address", value: "fullAddress", sortable: true },
      { text: "Purok/Zone", value: "purok", sortable: true },
      { text: "Contact", value: "contactNumber", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],

    statusItems: ["All", "active", "inactive", "disconnected", "delinquent"],
    puroks: ["All", "Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5"],
    archiveItems: ["Active", "Archived", "All"],

    editedItem: {
      accountNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nameExtension: "",
      fullAddress: "",
      purok: "",
      contactNumber: "",
      email: "",
      status: "active",
      consumerType: "Existing Consumer",
    },
    defaultItem: {
      accountNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nameExtension: "",
      fullAddress: "",
      purok: "",
      contactNumber: "",
      email: "",
      status: "active",
      consumerType: "Existing Consumer",
    },

    nameRules: [
      (v) => (v || "").length > 0 || "Name is required",
      (v) => (v || "").length >= 2 || "Name must be at least 2 characters",
    ],
    phoneRules: [
      (v) => !v || /^\+?[\d\s-]{10,}$/.test(v) || "Invalid phone number format",
    ],
    emailRules: [(v) => !v || /.+@.+\..+/.test(v) || "Invalid email format"],
    isSaving: false,
    consumerTypes: ["New Consumer", "Existing Consumer"],
  }),

  computed: {
    ...mapState("consumers", ["consumers", "loading", "error"]),

    getActionButtonText() {
      if (this.isEdit) {
        return "Update";
      }
      return this.editedItem.consumerType === "New Consumer"
        ? "Process Payment"
        : "Save";
    },

    filteredConsumers() {
      return this.consumers.filter((consumer) => {
        const searchLower = this.search.toLowerCase();
        const searchMatch =
          !this.search ||
          consumer.accountNo.toLowerCase().includes(searchLower) ||
          consumer.firstName.toLowerCase().includes(searchLower) ||
          consumer.middleName?.toLowerCase().includes(searchLower) ||
          consumer.lastName.toLowerCase().includes(searchLower) ||
          consumer.nameExtension?.toLowerCase().includes(searchLower) ||
          consumer.fullName.toLowerCase().includes(searchLower);

        const statusMatch =
          this.statusFilter === "All" || consumer.status === this.statusFilter;

        const purokMatch =
          this.purokFilter === "All" || consumer.purok === this.purokFilter;

        const archiveMatch =
          this.archiveFilter === "All" ||
          (this.archiveFilter === "Archived"
            ? consumer.isArchived
            : !consumer.isArchived);

        return searchMatch && statusMatch && purokMatch && archiveMatch;
      });
    },
  },

  async created() {
    await this.fetchConsumers();
  },

  methods: {
    ...mapActions("consumers", [
      "fetchConsumers",
      "createConsumer",
      "updateConsumer",
      "archiveConsumer",
    ]),

    getStatusColor(status) {
      return (
        {
          active: "success",
          inactive: "grey",
          delinquent: "error",
        }[status] || "grey"
      );
    },

    applyFilters() {
      // Client-side filtering handled by computed property
    },

    resetFilters() {
      this.search = "";
      this.statusFilter = "All";
      this.purokFilter = "All";
      this.archiveFilter = "Active";
    },

    openAddDialog() {
      this.isEdit = false;
      this.editedItem = { ...this.defaultItem };
      this.dialog = true;
    },

    editConsumer(item) {
      this.isEdit = true;
      this.editedItem = { ...item };
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.reset();
          this.editedItem = { ...this.defaultItem };
        }
      });
    },

    async saveConsumer() {
      if (this.$refs.form.validate()) {
        this.isSaving = true;
        try {
          if (this.isEdit) {
            await this.updateConsumer({
              id: this.editedItem._id,
              consumer: this.editedItem,
            });
            this.snackbarText = "Consumer updated successfully";
            this.snackbarColor = "success";
            this.closeDialog();
          } else {
            if (this.editedItem.consumerType === "New Consumer") {
              this.closeDialog();

              this.$router.push({
                name: "Payments",
                query: { new: "true" },
                params: {
                  newConsumer: true,
                  consumerData: {
                    ...this.editedItem,
                    name: `${this.editedItem.firstName} ${this.editedItem.lastName}`,
                  },
                },
              });
            } else {
              await this.createConsumer(this.editedItem);
              this.snackbarText = "Consumer created successfully";
              this.snackbarColor = "success";
              this.closeDialog();
            }
          }
          await this.fetchConsumers();
        } catch (error) {
          this.snackbarText = error.message || "Error saving consumer";
          this.snackbarColor = "error";
          this.snackbar = true;
        } finally {
          this.isSaving = false;
        }
      }
    },

    async toggleArchive(item) {
      try {
        const reason = item.isArchived
          ? "Restored by user"
          : "Archived by user";
        await this.archiveConsumer({ id: item._id, reason });
        this.snackbarText = item.isArchived
          ? "Consumer restored"
          : "Consumer archived";
        this.snackbarColor = "success";
        this.snackbar = true;
        await this.fetchConsumers(); // Refresh the list
      } catch (error) {
        this.snackbarText = error.message || "Error updating archive status";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },

    viewConsumer(item) {
      this.$router.push(`/consumers/${item._id}`);
    },

    exportData() {
      console.log("export");
    },
  },
  watch: {
    "editedItem.consumerType"() {
      if (this.$refs.form) {
        this.$refs.form.validate();
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
