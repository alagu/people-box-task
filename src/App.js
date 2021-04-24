import './App.css';
import { Card, Divider } from 'antd';
import { Row, Col, Breadcrumb, Input, Dropdown, Menu, List } from 'antd';
import { ArrowUpOutlined, FolderFilled, SearchOutlined, FolderAddFilled, DownOutlined, UnorderedListOutlined, TableOutlined, FileFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFolder, listFolder } from './store/foldersActions';
import fetchFolders from './store/foldersService';
import React, { useEffect } from 'react';

function App() {  
  const folders = useSelector(state => state.folders);
  const dispatch = useDispatch();
  var folderLists;
  const [folderLoad, setFolderLoad] = React.useState(true);
  const [folderList, setFolderList] = React.useState([]);
  const [navigatedFolder, setNavigatedFolder] = React.useState([]);
  const [currentFolder, setCurrentFolder] = React.useState([]);
 
  useEffect(() => {
    folderLists = fetchFolders();   
    folderLists.then(function(result) {      
      folderLists = result;
      dispatch(listFolder(folderLists));      
      setFolderList(folderLists);
      setCurrentFolder(folderLists);             
      setFolderLoad(false);    
    });     
  }, []); 
  
  const menu = (
    <Menu>
      <Menu.Item>
        <span>Menu 1</span>
      </Menu.Item>
      <Menu.Item>
        <span>Menu 2</span>
      </Menu.Item>
      <Menu.Item>
        <span>Menu 3</span>
      </Menu.Item>
    </Menu>
  );  

  const navigateChild = (childElement) => {     
    if(childElement.type == 'folder') {
      dispatch(listFolder(childElement.children));              
      setNavigatedFolder([...navigatedFolder, childElement]);
      setCurrentFolder(childElement.children);   
    }          
  };

  const navigateBreadcrumb = (childElement, naviToindex) => {      
    let navigateTo = [];   
    navigatedFolder.map((folder, index)=>{                  
      if(index < naviToindex) {          
        navigateTo.push(folder);       
      }
    });          
    dispatch(listFolder([childElement]));   
    setNavigatedFolder(navigateTo);        
    setCurrentFolder(childElement);                                     
  };
 
  const createNewFolder = () => {      
    dispatch(addFolder(currentFolder));
  };
  
  return (
    <div>      
      <Row>
        <Col span={12} offset={4}>
        <Card style={{ width: 900, marginTop: 100 }}>
        <Row justify="start">          
          <ArrowUpOutlined />
          { !folderLoad &&<Breadcrumb style={{ marginLeft: 20 }}>
            <Breadcrumb.Item href="">
              <FolderFilled />
              <span>Folder Demo</span>
            </Breadcrumb.Item>              
            {navigatedFolder.map((folder, index) => (                                                                                                    
              <Breadcrumb.Item href="" key={index} onClick={(e)=>{navigateBreadcrumb(folder,index);e.preventDefault();}}>              
                <span>{folder.name}</span>
              </Breadcrumb.Item>                                   
            ))}
          </Breadcrumb> 
          }                             
        </Row>                 
        <Row style={{ marginTop: 5, marginBottom: 5 }}>                
          <Col span={12}>
            <Row justify="start">
              <div>
                <Input size="small" placeholder="Search" prefix={<SearchOutlined />} />         
              </div>
              <div style={{ marginLeft: 10}}>
              { !folderLoad && folders.folderList.length} item         
              </div>
            </Row>  
          </Col>   
          <Col span={12}>
            <Row justify="end">
              <div style={{ marginRight: 20, cursor: 'pointer'}}>
                <span onClick={()=>createNewFolder()}><FolderAddFilled /> Create folder</span>             
              </div>
              <div style={{ marginRight: 20 }}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Actions <DownOutlined />
                  </span>
                </Dropdown>
              </div>
              <div>
                <span style={{ marginRight: 20, color: 'blue' }}><UnorderedListOutlined /></span>
                <span style={{ marginRight: 20 }}><TableOutlined /></span>
              </div>              
              <div>
                <Dropdown overlay={menu} trigger={['click']}>
                  <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Options <DownOutlined />
                  </span>
                </Dropdown>
              </div>
            </Row>  
          </Col>                        
        </Row>   
        <Divider/>           
        { !folderLoad &&                                
          <List
            size="small"   
            bordered
            itemLayout="horizontal"
            dataSource={folders.folderList}
            renderItem={item => (
              <List.Item style={{cursor: 'default'}}>
                <List.Item.Meta                  
                  avatar={item.type == 'folder' ? <FolderFilled /> : <FileFilled />}
                  title={<span>{item.name}</span>}     
                  onClick={()=>navigateChild(item)}           
                />
                <div>Apr 21, 2021, 05:24PM</div>
              </List.Item>
            )}
          />          
        }                        
        </Card>
        </Col>
      </Row>                
    </div>
  );
}

export default App;
