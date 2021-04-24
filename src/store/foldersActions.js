import { combineReducers } from 'redux';
const ADD_FOLDER = 'ADD_FOLDER';
const LIST_FOLDER = 'LIST_FOLDER';

export function addFolder(currentFolder) {
  return {
    type: ADD_FOLDER,
    currentFolder
  }
}

export function listFolder(folderList) {    
  return {
    type: LIST_FOLDER,
    folderList
  }
}

function folders(state = [], action) {    
  switch (action.type) {
    case ADD_FOLDER:                       
        let newFolderElement = action.currentFolder;     
        if(action.currentFolder.length > 0) {
          newFolderElement.push({
            "type": "folder",
            "name": "dog",              
          });
        }      
        else{          
          newFolderElement = [action.currentFolder];
          newFolderElement.push({
            "type": "folder",
            "name": "dog",              
          });
        }                 
        return {
          ...state, 
          folderList: newFolderElement
        };
    case LIST_FOLDER:        
        return {
          ...state, 
          folderList: action.folderList
        }   
    default:
      return state;
  }
}

const folderApp = combineReducers({
  folders
});

export default folderApp;