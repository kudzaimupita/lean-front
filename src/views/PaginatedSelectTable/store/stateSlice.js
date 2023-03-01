import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "paginatedSelect/state",
  initialState: {
    deleteConfirmation: false,
    selectedProduct: "",
    sortedColumn: () => {},
    selectedRows: [],
    selectedRow: [],
    deleteMode: "",
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
    addRowItem: (state, { payload }) => {
      const currentState = current(state);
      if (!currentState.selectedRows.includes(payload)) {
        return {
          selectedRows: [ ...payload],
        };
      }
    },
    removeRowItem: (state, { payload }) => {
      const currentState = current(state);
      if (currentState.selectedRows.includes(payload)) {
        return {
          selectedRows: currentState.selectedRows.filter(
            (id) => id !== payload
          ),
        };
      }
    },
    setDeleteMode: (state, action) => {
      state.deleteMode = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,
  setSortedColumn,
  setSelectedProduct,
  setSelectedRows,
  setSelectedRow,
  addRowItem,
  removeRowItem,
  setDeleteMode,
} = stateSlice.actions;

export default stateSlice.reducer;
