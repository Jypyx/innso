<template>
  <div class="main">
    <vue-good-table
      class="main__table"
      style-class="vgt-table"
      v-if="rows && rows.length"
      :columns="columns"
      :rows="rows"
      :pagination-options="paginationOptions"
    >
      <template slot="table-row" slot-scope="props" class="main__table__row">
        <div v-if="props.column.field == 'customer.last_name'" class="main__table__row__customer">
          <div class="main__table__row__customer__full-name">
            {{ props.row.customer.last_name }} {{ props.row.customer.first_name }}
          </div>
          <div class="main__table__row__customer__email">
            {{ props.row.customer.email }}
          </div>
        </div>
        <div v-else-if="props.column.field == 'interaction_creation_date'" class="main__table__row__creation-date">
          <div>{{ formatDate(props.formattedRow[props.column.field]) }}</div>
          <div>{{ formatTime(props.formattedRow[props.column.field]) }}</div>
        </div>
        <div v-else-if="props.column.field == 'due_date'" class="main__table__row__due-date">
          <div
            class="main__table__row__due-date__dot"
            :class="[`main__table__row__due-date__dot--${dateDiff(props.formattedRow[props.column.field])}`]"
          ></div>
          <div class="main__table__row__due-date__label">
            <div>{{ formatDate(props.formattedRow[props.column.field]) }}</div>
            <div>{{ formatTime(props.formattedRow[props.column.field]) }}</div>
          </div>
        </div>
        <div v-else-if="props.column.field == 'status'" class="main__table__row__status">
          <Status :status="props.formattedRow[props.column.field]" />
        </div>
        <div v-else-if="props.column.field == 'last_comment'" class="main__table__row__last-comment">
          {{ props.formattedRow[props.column.field] }}
        </div>
        <div v-else-if="props.column.field == 'assignedTO'" class="main__table__row__assigned-to">
          <img
            class="main__table__row__assigned-to__avatar"
            :src="`https://eu.ui-avatars.com/api/?name=${
              props.formattedRow[props.column.field]
            }&rounded=true&size=24&background=random`"
          />
          <div class="main__table__row__assigned-to__label">
            {{ props.formattedRow[props.column.field] }}
          </div>
        </div>
        <div v-else-if="props.column.field == 'contact_channel'" class="main__table__row__contact-channel">
          <span class="main__table__row__contact-channel__icon backoffice-icons">
            {{ props.formattedRow[props.column.field] }}
          </span>
          <div class="main__table__row__contact-channel__label">
            {{ $t(`table.channel.${props.formattedRow[props.column.field]}`) }}
          </div>
        </div>
        <div v-else-if="props.column.field == 'attachments'" class="main__table__row__attachment">
          <span
            class="main__table__row__attachment__icon backoffice-icons"
            v-if="props.formattedRow[props.column.field]"
            v-tooltip="{
              placement: 'top',
              trigger: 'hover',
              content: $t('table.tooltip.attachment', {
                file: props.formattedRow[props.column.field],
              }),
              offset: 3,
            }"
          >
            attachment
          </span>
        </div>
        <div v-else-if="props.column.field == 'actions'" class="main__table__row__actions">
          <span
            class="main__table__row__actions__icon backoffice-icons"
            v-tooltip="{
              placement: 'top',
              trigger: 'hover',
              content: $t('table.tooltip.contact', {
                customer: `${props.row.customer.last_name} ${props.row.customer.first_name}`,
              }),
              offset: 3,
            }"
          >
            mail
          </span>
        </div>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import Status from '@/components/Status.vue'

export default {
  name: 'Main',
  components: {
    Status,
  },
  data() {
    return {
      columns: [
        {
          label: this.$t('table.column.customer'),
          field: 'customer.last_name',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: this.$t('table.column.status'),
          field: 'status',
        },
        {
          label: this.$t('table.column.lastInteraction'),
          field: 'interaction_creation_date',
        },
        {
          label: this.$t('table.column.dueDate'),
          field: 'due_date',
        },
        {
          label: this.$t('table.column.assignedTo'),
          field: 'assignedTO',
        },
        {
          label: this.$t('table.column.contactChannel'),
          field: 'contact_channel',
        },
        {
          label: this.$t('table.column.lastComment'),
          field: 'last_comment',
          width: '350px',
          sortable: false,
        },
        {
          label: this.$t('table.column.attachment'),
          field: 'attachments',
          thClass: 'text-center',
          sortable: false,
        },
        {
          label: this.$t('table.column.actions'),
          field: 'actions',
          thClass: 'text-center',
          sortable: false,
        },
      ],
      paginationOptions: {
        enabled: true,
        mode: 'records',
        perPage: 50,
        position: 'bottom',
        perPageDropdown: [25, 50, 100],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: this.$t('table.pagination.next'),
        prevLabel: this.$t('table.pagination.prev'),
        rowsPerPageLabel: this.$t('table.pagination.rows'),
        ofLabel: this.$t('table.pagination.of'),
      },
    }
  },
  computed: {
    ...mapState({
      rows: state => state.data,
    }),
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    formatTime(date) {
      return dayjs(date).format('HH[h]mm')
    },
    dateDiff(date) {
      const daysRemaining = dayjs(date).diff(dayjs(), 'days')
      if (daysRemaining >= 7) {
        return 'futur'
      } else if (daysRemaining >= 0) {
        return 'present'
      }
      return 'passed'
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  &__table {
    &__row {
      &__customer {
        &__full-name {
          font-weight: 500;
        }

        &__email {
          margin-top: 2px;
          color: $generic-color-text-alt;
        }
      }

      &__due-date {
        display: flex;
        align-items: center;

        &__dot {
          border-radius: 50%;
          background-color: red;
          width: 14px;
          height: 14px;

          &--passed {
            background-color: red;
          }

          &--present {
            background-color: orange;
          }

          &--futur {
            background-color: green;
          }
        }

        &__label {
          flex: 1;
          margin-left: 8px;
        }
      }

      &__last-comment {
        max-width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &__assigned-to {
        display: inline-flex;
        align-items: center;
        border-radius: 16px;
        background: $grey-alto;
        padding: 0 12px;
        min-width: 150px;
        max-width: 150px;
        height: 24px;

        &__avatar {
          margin-left: -12px;
        }

        &__label {
          margin-left: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: $font-size-default;
        }
      }

      &__contact-channel {
        display: inline-flex;
        align-items: center;

        &__label {
          margin-left: 8px;
        }
      }

      &__attachment,
      &__actions {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
