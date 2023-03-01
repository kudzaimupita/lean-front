import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  apiGetSalesProducts,
  apiDeleteSalesProducts,
} from "services/SalesService";

export const getData = createAsyncThunk(
  "dataList/data/getData",
  async (dataMethod, data) => {
    console.log(dataMethod);
    const obj = {
      [dataMethod?.pagination?.filter?.split("=")[0]]:
        dataMethod?.pagination?.filter?.split("=")[1],
    };

    const response = await dataMethod?.dataMethod({
      ...{ ...(dataMethod.pagination.filter && obj) },
      limit: dataMethod.pagination.pageSize,
      page: dataMethod.pagination.pageIndex,
      sortBy:
        dataMethod.pagination.sort.key + ":" + dataMethod.pagination.sort.order,
      search: dataMethod.pagination.query,
    });

    return response?.data;
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
    key: "createdAt",
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
    resetPagination: (state, action) => {
      // console.log((state.tableData.pageIndex = 1));
      state.tableData.pageIndex = 1;
      state.tableData.pageSize = 10;
    },
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
    clearData: (state, action) => {
      state.tableData.pageIndex = 1;
      state.tableData.pageSize = 10;
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
    [getData.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  updateProductList,
  setTableData,
  setFilterData,
  resetPagination,
  setSortedColumn,
  clearData,
} = dataSlice.actions;

export default dataSlice.reducer;
