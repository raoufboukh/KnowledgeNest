import { axiosInstance } from "@/lib/axios";
import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";

export const getCars = createAsyncThunk(
  "cars/getCars",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/cars");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCarById = createAsyncThunk(
  "cars/getCarById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/cars/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCar = createAsyncThunk(
  "cars/addCar",
  async (carData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/cars/add", carData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCarsByInformation = createAsyncThunk(
  "cars/getCarsByInformation",
  async (info: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/cars/getCarsByInformation",
        info
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBrands = createAsyncThunk(
  "cars/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/cars/getAllBrands");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/cars/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptCar = createAsyncThunk(
  "cars/acceptCar",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/cars/accept/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectCar = createAsyncThunk(
  "cars/rejectCar",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/cars/reject/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cars: [],
  car: null as any,
  brands: [],
  loading: false,
  error: null as SerializedError | null,
};

export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(getCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCar.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.cars.push(action.payload);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(getCarsByInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarsByInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(getCarsByInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter(
          (car: any) => car._id !== action.payload._id
        );
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(acceptCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptCar.fulfilled, (state: any, action) => {
        state.loading = false;
        const index = state.cars.findIndex(
          (car: any) => car._id === action.payload._id
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      .addCase(acceptCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(rejectCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectCar.fulfilled, (state: any, action) => {
        state.loading = false;
        const index = state.cars.findIndex(
          (car: any) => car._id === action.payload._id
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      .addCase(rejectCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      });
  },
});

export default carSlice.reducer;
