import { Router, Route } from '@redwoodjs/router';

const Routes = () => {
  return (
    <Router>
      <Route path="/user-list-items/new" page={NewUserListItemPage} name="newUserListItem" />
      <Route path="/user-list-items/{id:Int}/edit" page={EditUserListItemPage} name="editUserListItem" />
      <Route path="/user-list-items/{id:Int}" page={UserListItemPage} name="userListItem" />
      <Route path="/user-list-items" page={UserListItemsPage} name="userListItems" />
      <Route path="/list-items/new" page={NewListItemPage} name="newListItem" />
      <Route path="/list-items/{id:Int}/edit" page={EditListItemPage} name="editListItem" />
      <Route path="/list-items/{id:Int}" page={ListItemPage} name="listItem" />
      <Route path="/list-items" page={ListItemsPage} name="listItems" />
      <Route path="/user-lists/new" page={NewUserListPage} name="newUserList" />
      <Route path="/user-lists/{id:Int}/edit" page={EditUserListPage} name="editUserList" />
      <Route path="/user-lists/{id:Int}" page={UserListPage} name="userList" />
      <Route path="/user-lists" page={UserListsPage} name="userLists" />
      <Route path="/lists/new" page={NewListPage} name="newList" />
      <Route path="/lists/{id:Int}/edit" page={EditListPage} name="editList" />
      <Route path="/lists/{id:Int}" page={ListPage} name="list" />
      <Route path="/lists" page={ListsPage} name="lists" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
