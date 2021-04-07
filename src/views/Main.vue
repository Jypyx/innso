<template>
  <div class="main">
    <div class="main__search">
      <span class="main__search__icon backoffice-icons">search</span>
      <input class="main__search__input" type="text" v-model="searchTerm" :placeholder="$t('search.placeholder')" />
    </div>
    <vue-good-table
      class="main__table"
      style-class="vgt-table"
      v-if="rows && rows.length"
      :columns="columns"
      :rows="rows"
      :pagination-options="paginationOptions"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm,
      }"
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
          <span
            class="main__table__row__contact-channel__icon backoffice-icons"
            v-tooltip="{
              placement: 'top',
              trigger: 'hover',
              content: $t(`table.channel.${props.formattedRow[props.column.field]}`),
              offset: 3,
            }"
          >
            {{ props.formattedRow[props.column.field] }}
          </span>
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
import { uniqBy } from 'lodash'
import flatPickr from 'flatpickr'
import { French } from 'flatpickr/dist/l10n/fr.js'
French.rangeSeparator = ' - '
const isBetween = require('dayjs/plugin/isBetween')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

export default {
  name: 'Main',
  components: {
    Status,
  },
  data() {
    return {
      searchTerm: '',
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
  mounted() {
    let input = 'input[placeholder="Trier par date"]'
    flatPickr(input, {
      locale: French,
      dateFormat: 'd/m/Y',
      mode: 'range',
      allowInput: true,
    })
  },
  computed: {
    ...mapState({
      rows: state => state.data,
    }),
    uniqUsers() {
      return uniqBy(this.rows, 'assignedTO').map(user => user.assignedTO)
    },
    columns() {
      return [
        {
          label: this.$t('table.column.customer'),
          field: 'customer.last_name',
          filterOptions: {
            enabled: true,
            placeholder: this.$t('table.filter.placeholder.customer'),
          },
        },
        {
          label: this.$t('table.column.status'),
          field: 'status',
          filterOptions: {
            enabled: true,
            placeholder: this.$t('table.filter.placeholder.status'),
            filterDropdownItems: [
              { value: 'waiting', text: this.$t('table.status.waiting') },
              { value: 'reserved', text: this.$t('table.status.reserved') },
              { value: 'toTreat', text: this.$t('table.status.toTreat') },
              { value: 'inProgress', text: this.$t('table.status.inProgress') },
              { value: 'finished', text: this.$t('table.status.finished') },
            ],
          },
        },
        {
          label: this.$t('table.column.lastInteraction'),
          field: 'interaction_creation_date',
          filterOptions: {
            enabled: true,
            placeholder: this.$t('table.filter.placeholder.date'),
            filterFn: this.dateFilterFn,
          },
        },
        {
          label: this.$t('table.column.dueDate'),
          field: 'due_date',
          filterOptions: {
            enabled: true,
            placeholder: this.$t('table.filter.placeholder.date'),
            filterFn: this.dateFilterFn,
          },
        },
        {
          label: this.$t('table.column.assignedTo'),
          field: 'assignedTO',
          filterOptions: {
            enabled: true,
            placeholder: this.$t('table.filter.placeholder.assignedTo'),
            filterDropdownItems: this.uniqUsers,
          },
        },
        {
          label: this.$t('table.column.lastComment'),
          field: 'last_comment',
          width: '350px',
          sortable: false,
        },
        {
          label: this.$t('table.column.contactChannel'),
          field: 'contact_channel',
          thClass: 'text-center',
          filterOptions: {
            enabled: true,
            placeholder: this.$t('table.filter.placeholder.contactChannel'),
            filterDropdownItems: [
              { value: 'form', text: this.$t('table.channel.form') },
              { value: 'file', text: this.$t('table.channel.file') },
              { value: 'messenger', text: this.$t('table.channel.messenger') },
              { value: 'facebook', text: this.$t('table.channel.facebook') },
              { value: 'twiter', text: this.$t('table.channel.twiter') },
            ],
          },
        },
        {
          label: this.$t('table.column.attachment'),
          field: 'attachments',
          thClass: 'text-center',
          sortable: false,
          filterOptions: {
            enabled: true,
            placeholder: this.$t('table.filter.placeholder.attachment'),
            filterDropdownItems: [
              { value: 1, text: this.$t('table.attachment.yes') },
              { value: 0, text: this.$t('table.attachment.no') },
            ],
            filterFn: this.attachmentFilterFn,
          },
        },
        {
          label: this.$t('table.column.actions'),
          field: 'actions',
          thClass: 'text-center',
          sortable: false,
        },
      ]
    },
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
    attachmentFilterFn(data, filterString) {
      if (filterString === '1') {
        return data !== null
      }
      return data === null
    },
    dateFilterFn(data, filterString) {
      let dateRange = filterString.split(' - ')
      let startDate = dateRange[0]
      let endDate = dateRange[1]
      if (dateRange.length > 1) {
        return dayjs(data).isBetween(dayjs(startDate, 'DD/MM/YYYY'), dayjs(endDate, 'DD/MM/YYYY'))
      } else if (dateRange.length === 1) {
        return dayjs(data).isSame(dayjs(startDate, 'DD/MM/YYYY'), 'day')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  &__search {
    position: relative;
    margin-bottom: $gutter-tablet;

    &__icon {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      color: $generic-color-border;
    }

    &__input {
      border: 1px solid $generic-color-border;
      border-radius: $radius-default;
      padding: 0 12px 0 12px + 24px + 8px;
      width: 100%;
      min-height: 44px;

      &:focus {
        outline: 0;
        border: 1px solid rgba($black, 0.3);
      }
    }
  }

  &__table {
    overflow-y: auto;

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
        display: flex;
        justify-content: center;
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
