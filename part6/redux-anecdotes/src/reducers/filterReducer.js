import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        updateFilter(state, action) {
            return action.payload
        }
    }

})


export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer


// const filterReducer = (state = '', action) => {
//     // console.log(action.payload)
//     switch (action.type) {
//         case 'UPDATE_FILTER':
//             return action.payload
    
//         default:
//             return state
//     }
// }


// export const updateFilter = (filterString) => {
//     return {
//         type: 'UPDATE_FILTER',
//         payload: filterString
//     }
// }


// export default filterReducer