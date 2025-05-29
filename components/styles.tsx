import { StyleSheet } from "react-native";

const colors = {
  primary: '#ff8a65',
  primaryLight: '#fadfc9',
  secondary: '#rgb(151 173 145)',
  secondaryLight: 'rgb(197 207 185)',
  secondaryLightest: 'rgb(221 235 230)',
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
  shadow_hard: {
        shadowColor: '#272b2e80',   // Color (puede incluir opacidad)
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,         // Valor entre 0 y 1
    shadowRadius: 5,            // Difuminado de la sombra
    color: '#505b64',  
  },
  float_button: {
    width: 70,
    height: 70,
    borderRadius: 45,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  filtersContainer: {
    bottom: '3%',
    left: '2%',
    position: 'absolute',
    borderRadius: '15px',
  },
  dayTitle: { fontWeight:'bold', marginBottom:4, textAlign: 'center' },
  dayCard: { margin: 10, padding: 5, borderRadius:6 },
  daySlot: { height: 40, marginVertical:4, backgroundColor:'#fc9', borderRadius:4, justifyContent:'center', alignItems:'center'},
  daySlotActive: { borderWidth:2, borderColor:'blue' },
  buttonUI: { color: 'black', padding: '5%', height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 5},

  vContainer: { flex:1, flexDirection:'column', backgroundColor: 'lightgrey' },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  flexDouble: { flex: 1.5 },

  marginR100: { marginRight: 100},
  marginR10: {marginRight: 10},
  marginB10: {marginBottom: 10},
  marginB20: {marginBottom: '20%'},
  width0: {width: '0%'},
  width100: {width: '100%'},
  width100px: {width: 100},
  width90: {width: '90%'},
  height100: {height: '100%'},
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
  bg_scd_lightest_color: {
  backgroundColor: colors.secondaryLightest
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