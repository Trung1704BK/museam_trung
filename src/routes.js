import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CollectionsIcon from '@material-ui/icons/Collections';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import UserProfile from 'views/UserProfile/UserProfile.js';
import UploadItem from './views/UploadItem/UploadItem.js';
import PostItems from 'views/PostItems/PostItems.js';
import CreateAlbum from 'views/CreateAlbum/CreateAlbum';

import ChangePass from 'views/ChangePass/ChangePass.js';
import RouteCollection from './views/UploadCollection/RouteCollection.js';
const dashboardRoutes = [
  {
    path: '/user',
    name: 'Thông tin cá nhân',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/upload',
    name: 'Quản lý hiện vật',
    icon: 'content_paste',
    component: UploadItem,
    layout: '/admin',
  },
  {
    path: '/postItem',
    name: 'Tạo hiện vật',
    icon: LibraryBooks,
    component: PostItems,
    layout: '/admin',
  },
  {
    path: '/album',
    name: 'Tạo Album',
    icon: CollectionsIcon,
    component: CreateAlbum,
    layout: '/admin',
  },
  {
    path: '/collection',
    name: 'Quản lý Album',
    icon: PermMediaIcon,
    component: RouteCollection,
    layout: '/admin',
  },

  {
    path: '/changePass',
    name: 'Thay đổi mật khẩu',
    icon: VpnKeyIcon,
    component: ChangePass,
    layout: '/admin',
  },
];

export default dashboardRoutes;
