/** Libraries */
import { Dimensions, StyleSheet } from 'react-native';
/** Utilities */
import { scale } from '../helpers/ratioCalculator';

const { width, height } = Dimensions.get('window');

export const fonts = {
  spoqa_neo_regular: 'SpoqaHanSansNeo-Regular',
  spoqa_neo_medium: 'SpoqaHanSansNeo-Medium',
  spoqa_neo_bold: 'SpoqaHanSansNeo-Bold',
  noto_ui_regular: 'NotoSansUI',
  noto_ui_bold: 'NotoSansUI-Bold',
};

export const colors = {
  /** Background Color */
  background_759AFD: '#759AFD',
  background_6A92FE: '#6A92FE',
  background_769B9B: '#769B9B',
  background_FD8D67: '#FD8D67',
  background_FFF2ED: '#FFF2ED',
  background_F8F8F8: '#F8F8F8',
  background_E0E0E0: '#E0E0E0',
  background_FFFFFF: '#FFFFFF',
  background_333333: '#333333',

  /** Border color */
  border_FFFFFF: '#FFFFFF',
  border_EBEBEB: '#EBEBEB',
  border_E0E0E0: '#E0E0E0',
  border_759AFD: '#759AFD',
  border_6A92FE: '#6A92FE',
  border_769B9B: '#769B9B',
  border_FD8D67: '#FD8D67',
  border_DD5555: '#DD5555',

  /** Text color */
  text_333333: '#333333',
  text_555555: '#555555',
  text_777777: '#777777',
  text_999999: '#999999',
  text_999DA7: '#999DA7',
  text_E0E0E0: '#E0E0E0',
  text_FFFFFF: '#FFFFFF',
  text_CDCDCD: '#CDCDCD',
  text_BCBCBC: '#BCBCBC',
  text_A0A0A0: '#A0A0A0',
  text_DD5555: '#DD5555',
  text_BE5353: '#BE5353',
  text_FD8D67: '#FD8D67',
  text_759AFD: '#759AFD',
  text_6A92FE: '#6A92FE',
  text_769B9B: '#769B9B',
};

export const cs = StyleSheet.create({
  /**
   * common
   */
  flex_1: {
    flex: 1,
  },
  flexGrow_1: {
    flexGrow: 1,
  },
  fullWidth: {
    width: width,
  },
  fullHeight: {
    height: height,
  },
  lineHeight_20: {
    lineHeight: scale(20),
  },
  row: {
    flexDirection: 'row',
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSpaceBetweenCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  /**
   * background colors
   */
  background_black: {
    backgroundColor: '#000000',
  },
  background_white: {
    backgroundColor: '#ffffff',
  },
  background_BCBCBC: {
    backgroundColor: '#BCBCBC',
  },
  background_6F96FF: {
    // backgroundColor: '#759AFD',
    backgroundColor: '#6F96FF',
  },
  background_F5F8FF: {
    backgroundColor: '#F5F8FF',
  },
  background_759AFD: {
    backgroundColor: '#6A92FE',
  },
  background_EBEBEB: {
    backgroundColor: '#EBEBEB',
  },
  background_7197FF: {
    backgroundColor: '#7197FF',
  },
  background_FAFAFA: {
    backgroundColor: '#FAFAFA',
  },
  background_A0A0A0: {
    backgroundColor: '#A0A0A0',
  },
  background_FCFCFC: {
    backgroundColor: '#FCFCFC',
  },
  background_F7F7F7: {
    backgroundColor: '#F7F7F7',
  },
  background_F5F5F5: {
    backgroundColor: '#F5F5F5',
  },
  background_FFF7F7: {
    backgroundColor: '#FFF7F7',
  },
  background_777777: {
    backgroundColor: '#777777',
  },
  background_999999: {
    backgroundColor: '#999999',
  },
  background_3B5998: {
    backgroundColor: '#3b5998',
  },
  background_FFEA21: {
    backgroundColor: '#FFEA21',
  },
  background_E8E8E8: {
    backgroundColor: '#E8E8E8',
  },
  background_F8F8F8: {
    backgroundColor: '#F8F8F8',
  },
  background_google_red: {
    backgroundColor: 'rgb(193,46,38)',
  },
  background_D53535: {
    backgroundColor: '#D53535',
  },
  background_ECEEF4: {
    backgroundColor: '#ECEEF4',
  },
  background_9AB5FF: {
    backgroundColor: '#9AB5FF',
  },
  /**
   * text type
   */
  noto_ui: {
    fontFamily: 'NotoSansUI',
  },
  noto_ui_bold: {
    fontFamily: 'NotoSansUI-Bold',
  },
  noto_kr: {
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  noto_kr_medium: {
    fontFamily: 'SpoqaHanSansNeo-Medium',
  },
  noto_kr_bold: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  nanum: {
    fontFamily: 'NotoSansUI',
  },
  nanum_bold: {
    fontFamily: 'NotoSansUI-Bold',
  },
  nanum_extra_bold: {
    fontFamily: 'NotoSansUI-Bold',
  },
  /**
   * text styles
   */
  text_underline: {
    textDecorationLine: 'underline',
  },
  color_white: {
    color: '#FFFFFF',
  },
  color_black: {
    color: '#000000',
  },
  color_393C47: {
    color: '#393C47',
  },
  color_999999: {
    color: '#999999',
  },
  color_999DA7: {
    color: '#999DA7',
  },
  color_979797: {
    color: '#979797',
  },
  color_9EA4B3: {
    color: '#9EA4B3',
  },
  color_333333: {
    color: '#333333',
  },
  color_555555: {
    color: '#555555',
  },
  color_505050: {
    color: '#505050',
  },
  color_5F636C: {
    color: '#5F636C',
  },
  color_777777: {
    color: '#777777',
  },
  color_6F96FF: {
    color: '#6F96FF',
  },
  color_858995: {
    color: '#858995',
  },
  color_759AFD: {
    // color: '#759AFD',
    color: '#6A92FE',
  },
  color_7795F8: {
    color: '#7795F8',
  },
  color_7197FF: {
    color: '#7197FF',
  },
  color_6A92FE: {
    color: '#6A92FE',
  },
  color_FD8D67: {
    color: '#FD8D67',
  },
  color_BCBCBC: {
    color: '#BCBCBC',
  },
  color_D1D1D1: {
    color: '#D1D1D1',
  },
  color_DCDCDC: {
    color: '#DCDCDC',
  },
  color_A0A0A0: {
    color: '#A0A0A0',
  },
  color_ACACAC: {
    color: '#ACACAC',
  },
  color_0081F0: {
    color: '#0081F0',
  },
  color_D84F4F: {
    color: '#D84F4F',
  },
  color_CC4B4B: {
    color: '#CC4B4B',
  },
  color_AC2D2D: {
    color: '#AC2D2D',
  },
  color_D53535: {
    color: '#D53535',
  },
  color_red: {
    color: '#FF0000',
  },
  color_5E8DFF: {
    color: '#5E8DFF',
  },
  color_CDCDCD: {
    color: '#CDCDCD',
  },
  color_1E2226: {
    color: '#1E2226',
  },
  /**
   * text sizes
   */
  text_size_8: {
    fontSize: scale(8),
  },
  text_size_9: {
    fontSize: scale(9),
  },
  text_size_10: {
    fontSize: scale(10),
  },
  text_size_11: {
    fontSize: scale(11),
  },
  text_size_12: {
    fontSize: scale(12),
  },
  text_size_13: {
    fontSize: scale(13),
  },
  text_size_14: {
    fontSize: scale(14),
  },
  text_size_15: {
    fontSize: scale(15),
  },
  text_size_16: {
    fontSize: scale(16),
  },
  text_size_17: {
    fontSize: scale(17),
  },
  text_size_18: {
    fontSize: scale(18),
  },
  text_size_19: {
    fontSize: scale(19),
  },
  text_size_20: {
    fontSize: scale(20),
  },
  text_size_21: {
    fontSize: scale(21),
  },
  text_size_22: {
    fontSize: scale(22),
  },
  text_size_23: {
    fontSize: scale(23),
  },
  text_size_24: {
    fontSize: scale(24),
  },
  text_size_25: {
    fontSize: scale(25),
  },
  text_size_27: {
    fontSize: scale(27),
  },
  text_size_30: {
    fontSize: scale(30),
  },
  text_size_32: {
    fontSize: scale(32),
  },
  text_size_35: {
    fontSize: scale(35),
  },
  text_size_36: {
    fontSize: scale(36),
  },
  text_size_46: {
    fontSize: scale(46),
  },
  opacity_50: {
    opacity: 0.5,
  },
  text_left: {
    textAlign: 'left',
  },
  text_center: {
    textAlign: 'center',
  },
  text_right: {
    textAlign: 'right',
  },
  letter_spacing_10: {
    letterSpacing: -0.1,
  },
  letter_spacing_20: {
    letterSpacing: -0.2,
  },
  /**
   * buttons styles
   */
  button_container_border_round: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: scale(29),
  },
  button_container_round: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: scale(8),
  },
  button_container_round_20: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: scale(20),
  },
  /**
   * margin styles
   */
  margin_top_15: {
    marginTop: scale(15),
  },
  margin_bottom_4: {
    marginBottom: scale(4),
  },
  margin_bottom_7: {
    marginBottom: scale(7),
  },
  margin_bottom_10: {
    marginBottom: scale(10),
  },
  margin_bottom_53: {
    marginBottom: scale(53),
  },
  /**
   * border styles
   */
  border_color_6F96FF: {
    borderColor: '#6F96FF',
    borderWidth: 1,
  },
  border_color_759AFD: {
    borderColor: '#6A92FE',
    borderWidth: 1,
  },
  border_color_D9DBE2: {
    borderColor: '#D9DBE2',
  },
  border_color_E0E0E0: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  border_color_7197FF: {
    borderColor: '#7197FF',
    borderWidth: 1,
  },
  border_color_D53535: {
    borderColor: '#D53535',
    borderWidth: 1,
  },
  border_color_EBEBEB: {
    borderColor: '#EBEBEB',
    borderWidth: 1,
  },
  border_color_E8E8E8: {
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  border_top_95989A: {
    borderTopWidth: 1,
    borderColor: '#95989A',
  },
  border_top_EBEBEB: {
    borderTopWidth: 1,
    borderColor: '#EBEBEB',
  },
  border_bottom_EBEBEB: {
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
  },
  border_top_999999: {
    borderTopWidth: 1,
    borderColor: '#999999',
  },
  content_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
