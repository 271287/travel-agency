/* SELECTORS */

export const getAllFilters = ({ filters }) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types TODO - add other action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');
export const ADD_TAG_TO_FILTER = createActionName('ADD_TAG_TO_FILTER');
export const REMOVE_TAG_TO_FILTER = createActionName('REMOVE_TAG_TO_FILTER');

// action creators TODO - add other action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDuration = payload => ({ payload, type: CHANGE_DURATION });
export const AddTagToFilter = payload => ({ payload, type: ADD_TAG_TO_FILTER });
export const RemoveTagToFilter = payload => ({ payload, type: REMOVE_TAG_TO_FILTER });

// reducer handle other action types
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case CHANGE_DURATION:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          [action.payload.type]: action.payload.value,
        },
      };
    case ADD_TAG_TO_FILTER:
      return {
        ...statePart,
        tags: [
          ...statePart.tags,
          action.payload.tag,
        ],
      };
    case REMOVE_TAG_TO_FILTER:
      return {
        ...statePart,
        tags: [
          ...statePart.tags.filter(tag => tag != action.payload.tag),
        ],
      };
    default:
      return statePart;
  }
}
