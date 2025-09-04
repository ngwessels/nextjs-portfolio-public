//constants
import c from '../../constants';

const pageLoading = (state = false, action) => {
    switch (action.type) {
        case c.PAGE_LOADING:
            state = action.results
            return state;
        default:
            return state;
    }
}

export default pageLoading;