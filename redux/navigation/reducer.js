import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
    general: {
        isOpenModal:false,
    }
};

const openInvestModal = (state, action) =>
 update(state, {
    general: {
        isOpenModal:{ $set: action.payload },
    }
 });

export default handleActions(
 {
   [constants.OPEN_INVEST_MODAL]: openInvestModal,
 },
 initialState
);