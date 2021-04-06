import i18n from '@/i18n'

export const statusConf = {
  waiting: {
    color: '255,0,0',
    label: i18n.t('table.status.waiting'),
  },
  reserved: {
    color: '255,165,0',
    label: i18n.t('table.status.reserved'),
  },
  inProgress: {
    color: '100,149,237',
    label: i18n.t('table.status.inProgress'),
  },
  toTreat: {
    color: '128,0,128',
    label: i18n.t('table.status.toTreat'),
  },
  finished: {
    color: '34,139,34',
    label: i18n.t('table.status.finished'),
  },
}
