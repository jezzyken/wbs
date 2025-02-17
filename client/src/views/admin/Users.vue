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
              placeholder="Username / Name / Email"
              dense
              outlined
              hide-details
              prepend-inner-icon="mdi-magnify"
              @keyup.enter="fetchUsers"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Users List -->
    <v-card>
      <v-card-title class="d-flex justify-space-between py-4">
        <span class="text-h6">User List</span>
        <v-btn color="primary" @click="openAddDialog">
          <v-icon left>mdi-plus</v-icon>
          Add User
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :loading="loading"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [10, 20, 50],
          'show-first-last-page': true,
        }"
      >
        <template v-slot:item.role="{ item }">
          <v-chip :color="getRoleColor(item.role)" small label dark>
            {{ formatRole(item.role) }}
          </v-chip>
        </template>

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
          <v-btn
            x-small
            text
            color="primary"
            class="mr-2"
            @click="editUser(item)"
          >
            <v-icon x-small left>mdi-pencil</v-icon>
            Edit
          </v-btn>
          <v-btn
            x-small
            text
            :color="item.isArchived ? 'success' : 'error'"
            @click="confirmArchive(item)"
            v-if="item.email !== 'admin@app.dev'"
          >
            <v-icon x-small left>mdi-archive</v-icon>
            Archive
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit User Dialog -->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEdit ? "Edit User" : "Add User" }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.username"
                  label="Username"
                  required
                  :disabled="isEdit"
                  :rules="usernameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.role"
                  :items="roles"
                  label="Role"
                  required
                  :rules="[(v) => !!v || 'Role is required']"
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
                  v-model="editedItem.lastName"
                  label="Last Name"
                  required
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  required
                  :rules="emailRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.contactNumber"
                  label="Contact Number"
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.status"
                  :items="statusItems"
                  label="Status"
                  required
                  :rules="[(v) => !!v || 'Status is required']"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="!isEdit">
                <v-text-field
                  v-model="editedItem.password"
                  label="Password"
                  type="password"
                  required
                  :rules="passwordRules"
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
            @click="saveUser"
            v-if="editedItem.email !== 'admin@app.dev'"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Archive Confirmation Dialog -->
    <v-dialog v-model="archiveDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Archive User</v-card-title>
        <v-card-text>
          Are you sure you want to archive this user?
          <v-text-field
            v-model="archiveReason"
            label="Reason for archiving"
            required
            class="mt-4"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="archiveDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            :disabled="!archiveReason"
            @click="handleArchive"
          >
            Archive
          </v-btn>
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

export default {
  name: "UsersPage",

  data: () => ({
    breadcrumbs: [
      { text: "Home", disabled: false, href: "/" },
      { text: "Users", disabled: true },
    ],
    search: "",
    dialog: false,
    archiveDialog: false,
    archiveReason: "",
    userToArchive: null,
    valid: false,
    isEdit: false,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    isSaving: false,

    headers: [
      { text: "Username", value: "username", sortable: true },
      { text: "Name", value: "fullName", sortable: true },
      { text: "Role", value: "role", sortable: true },
      { text: "Email", value: "email", sortable: true },
      { text: "Contact", value: "contactNumber", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],

    roles: ["admin", "meter_reader", "collection_officer"],

    statusItems: ["active", "inactive"],

    editedItem: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      contactNumber: "",
      status: "active",
    },

    defaultItem: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      contactNumber: "",
      status: "active",
    },

    usernameRules: [
      (v) =>
        (v !== null && v !== undefined && v.length > 0) ||
        "Username is required",
      (v) =>
        (v !== null && v !== undefined && v.length >= 3) ||
        "Username must be at least 3 characters",
    ],

    nameRules: [
      (v) =>
        (v !== null && v !== undefined && v.length > 0) || "Name is required",
      (v) =>
        (v !== null && v !== undefined && v.length >= 2) ||
        "Name must be at least 2 characters",
    ],

    emailRules: [
      (v) =>
        (v !== null && v !== undefined && v.length > 0) || "Email is required",
      (v) =>
        v === null ||
        v === undefined ||
        /.+@.+\..+/.test(v) ||
        "Invalid email format",
    ],

    phoneRules: [
      (v) => !v || /^\+?[\d\s-]{10,}$/.test(v) || "Invalid phone number format",
    ],
  }),

  computed: {
    ...mapState("users", ["users", "loading", "error"]),

    passwordRules() {
      return [
        (v) => !this.isEdit || !!v || "Password is required",
        (v) =>
          !this.isEdit ||
          v.length >= 8 ||
          "Password must be at least 8 characters",
      ];
    },

    filteredUsers() {
      return this.users
        .filter((user) => {
          const searchLower = this.search.toLowerCase();
          return (
            !this.search ||
            user.username.toLowerCase().includes(searchLower) ||
            user.firstName.toLowerCase().includes(searchLower) ||
            user.lastName.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
          );
        })
        .map((user) => ({
          ...user,
          fullName: `${user.firstName} ${user.lastName}`,
        }));
    },
  },

  async created() {
    await this.fetchUsers();
  },

  methods: {
    ...mapActions("users", [
      "fetchUsers",
      "createUser",
      "updateUser",
      "archiveUser",
    ]),

    formatRole(role) {
      return role
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

    getRoleColor(role) {
      return (
        {
          admin: "red",
          meter_reader: "blue",
          collection_officer: "green",
        }[role] || "grey"
      );
    },

    getStatusColor(status) {
      return (
        {
          active: "success",
          inactive: "error",
        }[status] || "grey"
      );
    },

    openAddDialog() {
      this.isEdit = false;
      this.editedItem = { ...this.defaultItem };

      console.log(this.editedItem);
      this.dialog = true;
    },
    editUser(item) {
      this.isEdit = true;
      this.editedItem = { ...item };
      delete this.editedItem.password;
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.reset();
          if (!this.isEdit) {
            this.editedItem = { ...this.defaultItem };
          }
        }
      });
    },

    confirmArchive(item) {
      this.userToArchive = item;
      this.archiveReason = "";
      this.archiveDialog = true;
    },

    async handleArchive() {
      if (!this.archiveReason) return;

      try {
        await this.archiveUser({
          id: this.userToArchive._id,
          reason: this.archiveReason,
        });
        this.snackbarText = "User archived successfully";
        this.snackbarColor = "success";
        this.archiveDialog = false;
        await this.fetchUsers();
      } catch (error) {
        this.snackbarText = error.message || "Error archiving user";
        this.snackbarColor = "error";
      } finally {
        this.snackbar = true;
      }
    },

    async saveUser() {
      if (this.$refs.form.validate()) {
        this.isSaving = true;
        try {
          const userData = { ...this.editedItem };

          if (this.isEdit) {
            // Remove unnecessary fields for update
            delete userData._id;
            delete userData.fullName;
            delete userData.createdAt;
            delete userData.updatedAt;

            await this.updateUser({
              id: this.editedItem._id,
              userData,
            });
            this.snackbarText = "User updated successfully";
          } else {
            await this.createUser(userData);
            this.snackbarText = "User created successfully";
          }

          this.snackbarColor = "success";
          this.closeDialog();
          await this.fetchUsers();
        } catch (error) {
          this.snackbarText = error.message || "Error saving user";
          this.snackbarColor = "error";
        } finally {
          this.isSaving = false;
          this.snackbar = true;
        }
      }
    },
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.closeDialog();
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
