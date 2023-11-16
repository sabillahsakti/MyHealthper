import { Dimensions } from "react-native";
import { widthMobileUI,heightMobileUI } from "../constant";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const responsiveWidth = (width) => {
    return windowWidth*width/widthMobileUI;
}

export const responsiveHeight = (height) => {
    return windowHeight*height/heightMobileUI;
}

export const removeCommas = (x) => {
    if (x === undefined || x === null) {
        return null; // or handle the case appropriately
    }

    const withoutCommas = x.toString().replace(/,/g, "");
    return Math.floor(parseFloat(withoutCommas));
  }