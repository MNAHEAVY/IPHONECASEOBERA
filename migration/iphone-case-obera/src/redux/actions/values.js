import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { getValues, putVal } from "../reducers/valuesSlice";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
// const API_BASE_URL = "http://localhost:3001";

// Values Actions

export const getValuesAction = () => {
  return async function (dispatch) {
    const values = await axios(`${API_BASE_URL}/values`);
    console.log(values);

    dispatch(getValues(values.data));
  };
};

export const putValAction = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/values/${id}`, input);
      if (res.status === 200) {
        const newedVal = res.data;
        toast.success("¡Valores actualizados!");
        dispatch(putVal(newedVal));
      } else {
        toast.error("¡No se ha actualizado!");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
