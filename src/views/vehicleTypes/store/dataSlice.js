import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  apiGetSalesProducts,
  apiDeleteSalesProducts,
} from "services/SalesService";

export const getData = createAsyncThunk(
  "dataList/data/getData",
  async (dataMethod, data) => {
    console.log("dddddddddd", dataMethod);
    const response = await dataMethod.dataMethod({
      limit: dataMethod.pagination.pageSize,
      page: dataMethod.pagination.pageIndex,
      sortBy:
        dataMethod.pagination.sort.key + ":" + dataMethod.pagination.sort.order,
      query: dataMethod.pagination.query,
      populate: dataMethod.pagination.populate,
    });

    return response?.data || response;
  }
);

export const deleteProduct = async (data) => {
  const response = await apiDeleteSalesProducts(data);
  return response.data;
};

export const fetchItems = async (dataMethod) => {
  const response = await dataMethod();
  return response.data.results;
};

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: "",
  },
};

export const initialFilterData = {
  name: "",
  category: ["bags", "cloths", "devices", "shoes", "watches"],
  status: [0, 1, 2],
  productStatus: 0,
};

const dataSlice = createSlice({
  name: "dataList/data",
  initialState: {
    loading: false,
    productList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateProductList: (state, action) => {
      state.productList = action.payload;
    },
    setTableData: (state, action) => {
      console.log("jjjjjjjjjjjjjjjjjjjjjjjj");
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.tableData.pageSize = action.payload.limit;
      state.tableData.total = action.payload.totalResults;
      state.tableData.pageIndex = action.payload.page;
      state.productList = action.payload.results;
      state.loading = false;
    },
    [getData.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const {
  updateProductList,
  setTableData,
  setFilterData,
  setSortedColumn,
} = dataSlice.actions;

export default dataSlice.reducer;
