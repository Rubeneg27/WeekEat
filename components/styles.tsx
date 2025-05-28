import { StyleSheet } from "react-native";

const colors = {
  primary: '#ff8a65',
  primaryLight: '#fadfc9',
  secondary: '#4ca89c',
  secondaryLight: '#rgb(190 217 215)',
  secondaryDark:'rgb(57 107 103)',
  neutralDark: '#687881',
  neutralDarkest: 'rgb(57 73 71)'
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
  bg_ntr_dark_color: {
    backgroundColor: colors.neutralDark
  },
  bg_ntr_darkest_color: {
    backgroundColor: colors.neutralDarkest
  },
})

export default styles;