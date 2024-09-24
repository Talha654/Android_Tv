import { Dimensions } from "react-native";


const { width, height } = Dimensions.get('window');


export const HP = (val) => (height * val) / 100;
export const WP = (val) => (width * val) / 100;