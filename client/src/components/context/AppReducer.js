export const AppReducer =  (state, action) => {

    switch (action.type) {
        case 'INITIAL_DATA':
            const data = []
            action.payload.forEach((app) => {
                data.unshift(app);
            })
            return {
                positions: data
            }

        case 'REMOVE_POSITION':
            return {
                positions: state.positions.filter(position => {
                    return(
                        position._id !== action.payload
                    )
                })
            }
        case 'ADD_POSITION':
            return{
                positions: [action.payload, ...state.positions]
            }

        case 'EDIT_POSITION':
            const updatePosition = action.payload;
            const updatePositions = state.positions.map(position => {
                if(position._id === updatePosition._id){
                    return updatePosition; 
                }

                return position
            })
            return{
                positions: updatePositions
            }
        default:
            return state
    }
}; 