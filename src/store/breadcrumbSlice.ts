import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { BreadcrumbItem } from '@/types'

interface BreadcrumbState {
  breadcrumbs: BreadcrumbItem[]
}

const initialState: BreadcrumbState = {
  breadcrumbs: [],
}

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumbs: (state, { payload }: PayloadAction<BreadcrumbItem[]>) => {
      state.breadcrumbs = payload
    },
  },
})

export const { setBreadcrumbs } = breadcrumbSlice.actions
export default breadcrumbSlice.reducer
