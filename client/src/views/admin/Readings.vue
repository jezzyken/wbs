<template>
  <v-container class="px-2">
    <div class="mb-4">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider="/"
        class="pa-0"
        v-if="userRole !== 'meter_reader'"
      >
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :href="item.href"
            :disabled="item.disabled"
            class="subtitle-2"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <div class="d-flex flex-wrap align-center justify-space-between mb-2">
        <h1 class="text-h5 primary--text font-weight-bold"></h1>
        <v-chip color="primary" small class="ml-2">
          <v-icon left x-small>mdi-clock-outline</v-icon>
          {{ getPendingReadingsCount }} Pending
        </v-chip>
      </div>
    </div>

    <v-card outlined class="mb-3">
      <v-card-text class="py-2">
        <v-row align="center" no-gutters>
          <v-col cols="12" sm="4" class="pr-sm-3">
            <v-select
              v-model="selectedBillingPeriod"
              :items="billingPeriods"
              dense
              outlined
              hide-details
              label="Billing Period"
              class="billing-period-select"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="8" class="mt-3 mt-sm-0">
            <v-row no-gutters>
              <v-col cols="4">
                <div class="text-center stat-box">
                  <div class="overline">Total</div>
                  <div class="text-h6">{{ getTotalConsumers }}</div>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center stat-box">
                  <div class="overline">Completed</div>
                  <div class="text-h6 success--text">
                    {{ getCompletedReadings }}
                  </div>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center stat-box">
                  <div class="overline">Pending</div>
                  <div class="text-h6 error--text">
                    {{ getPendingReadingsCount }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card outlined class="mb-3">
      <v-card-text class="py-2">
        <v-text-field
          v-model="search"
          label="Search Account Number"
          dense
          outlined
          hide-details
          clearable
          @keyup.enter="searchConsumer"
          prepend-inner-icon="mdi-magnify"
        >
          <template v-slot:append>
            <v-btn
              color="primary"
              @click="searchConsumer"
              :loading="loading"
              small
              class="mb-2"
            >
              Search
            </v-btn>
          </template>
        </v-text-field>
      </v-card-text>
    </v-card>

    <template v-if="selectedConsumer">
      <v-card outlined class="mb-3">
        <v-card-text class="pt-3">
          <div class="d-flex align-center mb-3">
            <div class="d-flex align-center flex-grow-1">
              <v-avatar color="primary lighten-4" size="40" class="mr-3">
                <v-icon color="primary">mdi-account</v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-medium">
                  {{ selectedConsumer.firstName }}
                  {{ selectedConsumer.lastName }}
                </div>
                <div class="caption grey--text">
                  Account: {{ selectedConsumer.accountNo }}
                </div>
              </div>
            </div>
            <div class="d-flex align-center">
              <v-chip
                :color="getStatusColor(selectedConsumer.status)"
                x-small
                label
                class="mr-2"
              >
                {{ selectedConsumer.status }}
              </v-chip>
              <div class="caption grey--text">
                {{ isEditing ? "Editing Reading" : "New Reading" }}
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="caption grey--text">Address</div>
            <div class="body-2">{{ selectedConsumer.address }}</div>
          </div>

          <v-card outlined class="mb-4 grey lighten-5">
            <v-card-text>
              <div class="d-flex justify-space-between">
                <div>
                  <div class="caption grey--text">Previous Reading</div>
                  <div class="text-h6">{{ getPreviousReading }} m³</div>
                </div>
                <div class="text-right">
                  <div class="caption grey--text">Date</div>
                  <div class="body-2">{{ formatDate(getLastReadingDate) }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model.number="newReading.currentReading"
              label="Current Reading"
              type="number"
              outlined
              dense
              :rules="currentReadingRules"
              @input="calculateConsumption"
              suffix="m³"
              class="mb-3"
              :readonly="isReadOnly"
            ></v-text-field>

            <v-card outlined class="text-center mb-3 py-2">
              <div class="caption grey--text">Consumption</div>
              <div class="text-h5 primary--text font-weight-medium">
                {{ newReading.consumption }} m³
              </div>
            </v-card>

            <v-textarea
              v-model="newReading.remarks"
              label="Remarks"
              outlined
              dense
              rows="2"
              placeholder="Add notes here..."
              class="mb-3"
              :readonly="isReadOnly"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-3">
          <v-btn text @click="clearSelectedConsumer">
            <v-icon left>mdi-arrow-left</v-icon>
            Back
          </v-btn>
          <v-spacer></v-spacer>

          <template v-if="isEditing && !isReadOnly">
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="saveReading"
              :loading="saving"
            >
              <v-icon left>mdi-content-save</v-icon>
              Update Reading
            </v-btn>
          </template>

          <template v-else-if="isReadOnly">
            <v-btn text @click="clearSelectedConsumer">
              <v-icon left>mdi-close</v-icon>
              Close
            </v-btn>
          </template>

          <template v-else>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="saveReading"
              :loading="saving"
            >
              <v-icon left>mdi-content-save</v-icon>
              Save Reading
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </template>

    <v-card v-else outlined>
      <v-list-item
        v-for="consumer in getPendingReadings"
        :key="consumer._id"
        class="reading-list-item"
      >
        <v-list-item-avatar>
          <v-avatar color="primary lighten-4">
            <v-icon color="primary">mdi-account</v-icon>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <div class="d-flex align-center">
            <v-list-item-title class="font-weight-medium">
              {{ consumer.firstName }} {{ consumer.lastName }}
            </v-list-item-title>
            <v-chip
              :color="
                consumer.readingStatus === 'completed' ? 'success' : 'warning'
              "
              x-small
              label
              class="ml-2"
            >
              {{ consumer.readingStatus }}
            </v-chip>
          </div>
          <v-list-item-subtitle class="caption">
            {{ consumer.accountNo }} · {{ consumer.fullAddress }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="d-flex align-center">
          <v-btn
            icon
            small
            class="mr-2"
            @click.stop="viewReading(consumer)"
            v-if="
              consumer.readingStatus === 'completed' && consumer.hasNewerReading
            "
            color="grey"
          >
            <v-icon x-small>mdi-eye</v-icon>
          </v-btn>

          <v-btn
            icon
            small
            class="mr-2"
            @click.stop="editReading(consumer)"
            v-if="
              consumer.readingStatus === 'completed' &&
              !consumer.hasNewerReading
            "
            color="primary"
          >
            <v-icon x-small>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            icon
            small
            @click.stop="selectConsumer(consumer)"
            v-if="consumer.readingStatus === 'pending'"
          >
            <v-icon color="grey">mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
      bottom
    >
      {{ snackbarText }}content>
      <template v-slot:action="{ attrs }">
        <v-btn text small v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MeterReading",

  data: () => ({
    breadcrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Billing",
        disabled: false,
        href: "/billing",
      },
      {
        text: "Meter Reading",
        disabled: true,
      },
    ],
    billingPeriods: [],
    selectedBillingPeriod: "February 2025",
    search: "",
    selectedConsumer: null,
    valid: false,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    saving: false,
    isEditing: false,
    originalReading: null,

    newReading: {
      _id: null,
      consumerId: null,
      currentReading: null,
      consumption: 0,
      remarks: "",
      readingDate: new Date().toISOString().substr(0, 10),
    },
  }),

  computed: {
    ...mapState("consumers", ["consumers"]),
    ...mapState("readings", ["readings", "loading"]),

    userRole() {
      return this.$store.state.auth.user?.role;
    },

    isReadOnly() {
      if (!this.selectedConsumer) return true;

      const selectedPeriod = new Date(this.selectedBillingPeriod);

      // Get all consumer readings sorted by date (newest first)
      const consumerReadings = this.readings
        .filter((r) => r.consumerId._id === this.selectedConsumer._id)
        .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));

      // If no readings, then it's not read-only
      if (consumerReadings.length === 0) return false;

      // Get the reading for the selected period
      const selectedPeriodReading = consumerReadings.find((reading) => {
        const readingDate = new Date(reading.readingDate);
        return (
          readingDate.getFullYear() === selectedPeriod.getFullYear() &&
          readingDate.getMonth() === selectedPeriod.getMonth()
        );
      });

      // If no reading exists for selected period, it's editable
      if (!selectedPeriodReading) return false;

      // Check if there are any readings from future periods
      const hasNewerReading = consumerReadings.some((reading) => {
        const readingDate = new Date(reading.readingDate);
        return (
          readingDate.getFullYear() > selectedPeriod.getFullYear() ||
          (readingDate.getFullYear() === selectedPeriod.getFullYear() &&
            readingDate.getMonth() > selectedPeriod.getMonth())
        );
      });

      // Return true (read-only) only if viewing an old reading that has newer readings
      return hasNewerReading;
    },
    currentReadingRules() {
      return [
        (v) => !!v || "Reading is required",
        (v) => v > 0 || "Reading must be greater than 0",
        (v) => {
          if (!this.selectedConsumer) return true;
          const prevReading = this.getPreviousReading;
          return (
            v > prevReading ||
            `Must be higher than previous reading (${prevReading})`
          );
        },
      ];
    },

    getTotalConsumers() {
      return this.consumers.length;
    },

    getPendingReadings() {
      const currentMonth = new Date(this.selectedBillingPeriod).getMonth();
      const currentYear = new Date(this.selectedBillingPeriod).getFullYear();
      const selectedPeriod = new Date(this.selectedBillingPeriod);
      // Get end of selected month
      const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

      return this.consumers.map((consumer) => {
        const reading = this.readings.find((r) => {
          const readingDate = new Date(r.readingDate);
          return (
            r.consumerId._id === consumer._id &&
            readingDate.getMonth() === currentMonth &&
            readingDate.getFullYear() === currentYear
          );
        });

        const hasNewerReading = this.readings.some((r) => {
          const readingDate = new Date(r.readingDate);
          return (
            r.consumerId._id === consumer._id &&
            readingDate.getTime() > endOfMonth.getTime()
          );
        });

        return {
          ...consumer,
          readingStatus: reading ? "completed" : "pending",
          hasNewerReading,
        };
      });
    },
    getPendingConsumers() {
      const currentMonth = new Date(this.selectedBillingPeriod).getMonth();
      const currentYear = new Date(this.selectedBillingPeriod).getFullYear();

      return this.consumers.filter((consumer) => {
        const hasReadingThisMonth = this.readings.some((reading) => {
          const readingDate = new Date(reading.readingDate);
          return (
            reading.consumerId === consumer._id &&
            readingDate.getMonth() === currentMonth &&
            readingDate.getFullYear() === currentYear
          );
        });

        return !hasReadingThisMonth;
      });
    },

    getPendingReadingsCount() {
      return this.getPendingReadings.filter(
        (c) => c.readingStatus === "pending"
      ).length;
    },

    getCompletedReadings() {
      return this.getPendingReadings.filter(
        (c) => c.readingStatus === "completed"
      ).length;
    },

    getPreviousReading() {
      if (!this.selectedConsumer) return 0;

      const billingDate = new Date(this.selectedBillingPeriod);

      const consumerReadings = this.readings
        .filter((r) => {
          const readingDate = new Date(r.readingDate);
          return (
            r.consumerId._id === this.selectedConsumer._id &&
            readingDate <
              new Date(billingDate.getFullYear(), billingDate.getMonth(), 1)
          );
        })
        .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));

      return this.isEditing
        ? this.originalReading?.previousReading || 0
        : consumerReadings[0]?.currentReading || 0;
    },

    getLastReadingDate() {
      if (!this.selectedConsumer) return null;

      const billingDate = new Date(this.selectedBillingPeriod);

      const consumerReadings = this.readings
        .filter((r) => {
          const readingDate = new Date(r.readingDate);
          return (
            r.consumerId._id === this.selectedConsumer._id &&
            readingDate <
              new Date(billingDate.getFullYear(), billingDate.getMonth(), 1)
          );
        })
        .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));

      return consumerReadings[0]?.readingDate || null;
    },
  },

  methods: {
    ...mapActions("consumers", ["fetchConsumers"]),
    ...mapActions("readings", [
      "fetchReadings",
      "createReading",
      "updateReading",
    ]),

    generateBillingPeriods() {
      const periods = [];
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      months.forEach((month, index) => {
        if (index >= currentMonth) {
          periods.push(`${month} ${currentYear}`);
        }
      });

      this.billingPeriods = periods;

      if (!this.selectedBillingPeriod) {
        this.selectedBillingPeriod = `${months[currentMonth]} ${currentYear}`;
      }
    },

    getReadingStatusColor(status) {
      return (
        {
          completed: "success",
          pending: "warning",
        }[status] || "grey"
      );
    },

    async searchConsumer() {
      const found = this.consumers.find((c) => c.accountNo === this.search);
      if (found) {
        this.selectConsumer(found);
      } else {
        this.showSnackbar("Consumer not found", "error");
      }
    },

    hasExistingReading(consumer) {
      const currentMonth = new Date(this.selectedBillingPeriod).getMonth();
      return this.readings.some(
        (reading) =>
          reading.consumerId === consumer._id &&
          new Date(reading.readingDate).getMonth() === currentMonth
      );
    },

    async editReading(consumer) {
      this.isEditing = true; 
      this.selectedConsumer = consumer;

      const currentMonth = new Date(this.selectedBillingPeriod).getMonth();
      const currentYear = new Date(this.selectedBillingPeriod).getFullYear();

      const reading = this.readings.find((r) => {
        const readingDate = new Date(r.readingDate);
        return (
          r.consumerId._id === consumer._id &&
          readingDate.getMonth() === currentMonth &&
          readingDate.getFullYear() === currentYear
        );
      });

      if (reading) {
        console.log("Found reading:", reading); 
        this.originalReading = { ...reading };
        this.newReading = {
          _id: reading._id,
          consumerId: reading.consumerId._id,
          currentReading: reading.currentReading,
          consumption: reading.consumption,
          remarks: reading.remarks || "",
          readingDate: reading.readingDate,
        };
      }

      // Add debug logs
      console.log("isEditing:", this.isEditing);
      console.log("isReadOnly:", this.isReadOnly);

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
        }
      });
    },

    selectConsumer(consumer) {
      const currentMonth = new Date(this.selectedBillingPeriod).getMonth();
      const hasReadingThisMonth = this.readings.some(
        (reading) =>
          reading.consumerId === consumer._id &&
          new Date(reading.readingDate).getMonth() === currentMonth
      );

      this.selectedConsumer = {
        ...consumer,
        readingStatus: hasReadingThisMonth ? "completed" : "pending",
      };
      this.isEditing = false;
      this.originalReading = null;
      this.newReading = {
        consumerId: consumer._id,
        currentReading: null,
        consumption: 0,
        remarks: "",
        readingDate: new Date().toISOString().substr(0, 10),
      };
    },

    viewReading(consumer) {
      this.isEditing = false;
      this.selectedConsumer = consumer;

      const currentMonth = new Date(this.selectedBillingPeriod).getMonth();
      const currentYear = new Date(this.selectedBillingPeriod).getFullYear();

      const reading = this.readings.find((r) => {
        const readingDate = new Date(r.readingDate);
        return (
          r.consumerId._id === consumer._id &&
          readingDate.getMonth() === currentMonth &&
          readingDate.getFullYear() === currentYear
        );
      });

      if (reading) {
        this.newReading = {
          _id: reading._id,
          consumerId: reading.consumerId._id,
          currentReading: reading.currentReading,
          consumption: reading.consumption,
          remarks: reading.remarks || "",
          readingDate: reading.readingDate,
        };
      }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
        }
      });
    },

    clearSelectedConsumer() {
      this.selectedConsumer = null;
      this.newReading = {
        currentReading: null,
        consumption: 0,
        remarks: "",
      };
      this.search = "";
      this.isEditing = false;
      this.originalReading = null;
    },

    calculateConsumption() {
      if (this.newReading.currentReading && this.selectedConsumer) {
        this.newReading.consumption =
          this.newReading.currentReading - this.getPreviousReading;
      }
    },

    getStatusColor(status) {
      return (
        {
          active: "success",
          inactive: "grey",
          delinquent: "error",
        }[status] || "grey"
      );
    },

    async saveReading() {
      if (!this.$refs.form.validate()) return;

      this.saving = true;
      try {
        const currentDay = new Date().getDate();

        const billingDate = new Date(this.selectedBillingPeriod);
        const readingDate = new Date(
          billingDate.getFullYear(),
          billingDate.getMonth(),
          currentDay
        );

        const readingData = {
          ...this.newReading,
          previousReading: this.getPreviousReading,
          readingDate: readingDate.toISOString(),
          status: "completed",
          consumerId: this.selectedConsumer._id,
        };

        if (this.isEditing) {
          await this.updateReading({
            id: this.newReading._id,
            readingData,
          });
          this.showSnackbar("Reading updated successfully", "success");
        } else {
          await this.createReading(readingData);
          this.showSnackbar("Reading saved successfully", "success");
        }

        this.clearSelectedConsumer();
        await this.fetchReadings();
      } catch (error) {
        this.showSnackbar(
          error.message ||
            `Error ${this.isEditing ? "updating" : "saving"} reading`,
          "error"
        );
      } finally {
        this.saving = false;
      }
    },

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    formatDate(date) {
      if (!date) return "No previous reading";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },

  async created() {
    this.generateBillingPeriods();
    try {
      await Promise.all([this.fetchConsumers(), this.fetchReadings()]);
    } catch (error) {
      this.showSnackbar("Error loading data", "error");
    }
  },

  watch: {
    selectedBillingPeriod: {
      handler() {
        this.fetchReadings();
      },
    },
  },
};
</script>

<style scoped>
.stat-box {
  padding: 8px;
}

.reading-list-item {
  border-bottom: 1px solid #f5f5f5;
}

.reading-list-item:last-child {
  border-bottom: none;
}

.billing-period-select {
  max-width: 200px;
}

@media (max-width: 600px) {
  .container {
    padding: 12px !important;
  }

  .v-card {
    border-radius: 8px;
  }

  .stat-box {
    padding: 12px 4px;
  }

  .text-h5 {
    font-size: 1.25rem !important;
  }

  .text-h6 {
    font-size: 1.15rem !important;
  }
}

@media (min-width: 601px) {
  .container {
    max-width: 1200px;
  }
}

.reading-form-section {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 16px;
}

.consumption-display {
  transition: all 0.3s ease;
}

.consumption-display:hover {
  transform: scale(1.02);
}
</style>
