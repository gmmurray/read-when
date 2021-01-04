import { Router, Route, Private } from '@redwoodjs/router';

const Routes = () => {
  return (
    <Router>
      {/* <Private unauthenticated="home"> */}
      <Route path="/admin/user-list-items/new" page={NewUserListItemPage} name="newUserListItem" />
      <Route path="/admin/user-list-items/{id:Int}/edit" page={EditUserListItemPage} name="editUserListItem" />
      <Route path="/admin/user-list-items/{id:Int}" page={UserListItemPage} name="userListItem" />
      <Route path="/admin/user-list-items" page={UserListItemsPage} name="userListItems" />
      <Route path="/admin/list-items/new" page={NewListItemPage} name="newListItem" />
      <Route path="/admin/list-items/{id:Int}/edit" page={EditListItemPage} name="editListItem" />
      <Route path="/admin/list-items/{id:Int}" page={ListItemPage} name="listItem" />
      <Route path="/admin/list-items" page={ListItemsPage} name="listItems" />
      <Route path="/admin/user-lists/new" page={NewUserListPage} name="newUserList" />
      <Route path="/admin/user-lists/{id:Int}/edit" page={EditUserListPage} name="editUserList" />
      <Route path="/admin/user-lists/{id:Int}" page={UserListPage} name="userList" />
      <Route path="/admin/user-lists" page={UserListsPage} name="userLists" />
      <Route path="/admin/lists/new" page={NewListPage} name="newList" />
      <Route path="/admin/lists/{id:Int}/edit" page={EditListPage} name="editList" />
      <Route path="/admin/lists/{id:Int}" page={ListPage} name="list" />
      <Route path="/admin/lists" page={ListsPage} name="lists" />
      {/* </Private> */}
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
