export default {
  '@keyframes border': {
    '0%, 100%': {
      clipPath: 'path("M0,0 H200 V5 H0")',
      boxShadow: 'inset 0 0 0 3px #007adf',
    },
    '25%': {
      clipPath: 'path("M0,0 H5 V200 H0")',
      boxShadow: 'inset 0 0 0 3px #00ecbc',
    },
    '50%': {
      clipPath: 'path("M0,195 H200 V200 H0")',
      boxShadow: 'inset 0 0 0 3px #007adf',
    },
    '75%': {
      clipPath: 'path("M195,0 H200 V200 H195")',
      boxShadow: 'inset 0 0 0 3px #00ecbc',
    },
  },
}
