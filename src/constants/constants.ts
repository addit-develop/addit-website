const LIGHTCOLORS = {
  lightgray: '#f2f2f2',
  gray: '#c4c4c4',
  darkgray: '#8a8a8a',
  white: '#ffffff',
  blue: '#3981BF',
  lightblack: '#666666',
  black: '#000000',
  drakblack: '#333333',
  red: '#E55E5A',
}

const DARKCOLORS = {
  lightgray: '#363636',
  gray: '#8a8a8a',
  darkgray: '#bfbfbf',
  white: '#000',
  blue: '#3981BF',
  lightblack: '#c4c4c4',
  black: '#fff',
  drakblack: '#f2f2f2',
  red: '#E55E5A',
}

export let COLORS = LIGHTCOLORS

export const changeColorMode = () => {
  if (COLORS === LIGHTCOLORS) COLORS = DARKCOLORS
  else COLORS = LIGHTCOLORS
}

export const SHADOWS = {
  default:
    '0px 0.8px 2.4px -0.63px rgba(15, 41, 107, 0.1), 0px 2.4px 7.24px -1.3px rgba(15, 41, 107, 0.1), 0px 6.4px 19.1px -1.9px rgba(15, 41, 107, 0.1), 0px 20px 60px -2.5px rgba(15, 41, 107, 0.1)',
}
