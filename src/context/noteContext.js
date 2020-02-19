import mockApi from '../api/mockApi';
import providerContext from './providerContext';

const noteReducer = (state, action) => {
    switch(action.type){
        case 'get_notes': 
            return action.payload;
        
        case 'create_note':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 99999),
                    title: action.payload.title,
                    content: action.payload.content,
                    isLocal: false
                }
            ];
        
        case 'edit_note':
            return state.map((note) => {
                return note.id === action.payload.id ? action.payload : note;
            });

        case 'delete_note': 
            return state.filter(note => note.id !== action.payload);

        default: 
            return state;
    }
};

const getNotes = dispatch => {
    return async () => {
        const response = await mockApi.get('/notes');
        dispatch({ type: 'get_notes', payload: response.data});
    };
};

const createNote = dispatch => {
    return async (title, content, callback) => {
        await mockApi.post('/notes', { title, content })
        dispatch({ type: 'create_note', payload: { title, content }});

        if(callback) {
            callback();
        }
    };
};

const editNote = dispatch => {
    return async (id, title, content, callback) => {
        await mockApi.put(`/notes/${id}`, { title, content });
        dispatch({ type: 'edit_note', payload: { id, title, content}});

        if(callback) {
            callback();
        }
    };
};

const deleteNote = dispatch => {
    return async id => {
        await mockApi.delete(`/notes/${id}`);
        dispatch({ type: 'delete_note', payload: id });
    }
}

export const { Context, Provider } = providerContext (
    noteReducer,
    {
        getNotes,
        createNote,
        editNote,
        deleteNote
    },
    {}
);