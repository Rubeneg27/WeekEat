import { StyleSheet } from "react-native";

const colors = {
  primary: '#ff8a65',
  primaryLight: '#fadfc9',
  secondary: '#4ca89c',
  secondaryLight: 'rgb(160 255 219)',
  secondaryDark:'rgb(57 107 103)',
  neutral: 'rgb(71 104 109)',
  neutralDark: '#687881',
  neutralDarkest: 'rgb(57 73 71)',
  red: 'rgb(249 69 90);'
};

const styles = StyleSheet.create({
  dashed_border: {
    borderColor: colors.primaryLight,
    borderStyle: 'dashed',
    borderWidth: 4
  },
  shadow_thin: {
    shadowColor: '#272b2e80',   // Color (puede incluir opacidad)
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,         // Valor entre 0 y 1
    shadowRadius: 0,            // Difuminado de la sombra
    color: '#505b64',           // Esto es para el texto, no tiene que ver con la sombra
  },
  float_button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  filtersContainer: {
    bottom: 0,
    position: 'absolute'
  },

  vContainer: { flex:1, flexDirection:'column', backgroundColor: 'lightgrey' },
  marginR100: { marginRight: 100},
  marginR10: {marginRight: 10},
  marginB10: {marginBottom: 10},
  marginB20: {marginBottom: '20%'},
  width0: {width: '0%'},
  width100: {width: '100%'},
  width85: {width: '85%'},
  padding2: {padding: '2%'},
  padding0: {padding: '0%'},
  padding5: {padding: '5%'},
  paddingB20: {paddingBottom: '20%'},
  paddingB10: {paddingBottom: '10%'},

  prmy_color:{
    color: colors.primary,
  },
  prmy_light_color:{
    color: colors.primaryLight,
  },
  bg_prmy_light_color:{
    backgroundColor: colors.primaryLight,
  },
  bg_scd_color:{
    backgroundColor: colors.secondary
  },
  bg_scd_light_color: {
    backgroundColor: colors.secondaryLight
  },
  bg_scd_dark_color: {
    backgroundColor: colors.secondaryDark
  },
  bg_ntr_color: {
    backgroundColor: colors.neutral
  },
  bg_ntr_dark_color: {
    backgroundColor: colors.neutralDark
  },
  bg_ntr_darkest_color: {
    backgroundColor: colors.neutralDarkest
  },
  bgRed: {
    backgroundColor: colors.red
  }
})

export default styles;