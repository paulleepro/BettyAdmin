import InfraRegular from './Infra-Regular.otf';
import InfraSemiBold from './Infra-SemiBold.otf';
import InfraBold from './Infra-Bold.otf';
import ShentoxRegular from './Shentox-Regular.woff2';
import ShentoxSemiBold from './Shentox-SemiBold.woff2';
import ShentoxBold from './Shentox-Bold.woff2';

export const Infra = [
  {
    fontFamily: 'Infra',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('Infra'),
      local('Infra-Regular'),
      url(${InfraRegular}) format('opentype')
    `,
  },
  {
    fontFamily: 'Infra',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 600,
    src: `
      local('Infra'),
      local('Infra-SemiBold'),
      url(${InfraSemiBold}) format('opentype')
    `,
  },
  {
    fontFamily: 'Infra',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 700,
    src: `
      local('Infra'),
      local('Infra-Bold'),
      url(${InfraBold}) format('opentype')
    `,
  },
];

export const Shentox = [
  {
    fontFamily: 'Shentox',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('Shentox'),
      local('Shentox-Regular'),
      url(${ShentoxRegular}) format('opentype')
    `,
  },
  {
    fontFamily: 'Shentox',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 600,
    src: `
      local('Shentox'),
      local('Shentox-SemiBold'),
      url(${ShentoxSemiBold}) format('opentype')
    `,
  },
  {
    fontFamily: 'Shentox',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 800,
    src: `
      local('Shentox'),
      local('Shentox-Bold'),
      url(${ShentoxBold}) format('opentype')
    `,
  },
];
