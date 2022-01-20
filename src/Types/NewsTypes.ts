export interface INewsINIT_STATE {
  news: INews[];
  readAlsoNews: INews[];
  currentNews: null | INews;
  newsToEdit: null | INews;
  comments: null | IComment[];
  loading: boolean;
  error: null | any;
  modal: boolean;
  snackbar: boolean;
  snackbarStatus: ISnackbarStatus;
  tags: {id: string; title: string}[] | any[];
  drawerOpen: boolean;
}

export enum InputEnum {
  post = "post",
  reply = "reply",
  edit = "edit"
}


export interface IUsersINIT_STATE {
  currentUser: IUser | null;
  newsAuthor: IUser | null;
  loading: boolean;
  error: null;
  modal: boolean;
}

export interface IRootINIT_STATE {
  news: INewsINIT_STATE;
  user: IUsersINIT_STATE;
}

export interface INewsAuthor {
  firstName: string;
  lastName: string;
  account: string;
  numOfNews: number | null;
  rating: number | null;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface ICommentAuthor {
  authorId: string;
  firstName: string;
  avatar?: string | undefined;
}

export interface IImages {
  headerImage: string;
  otherImages: string[];
}

export interface INews {
  title: string;
  subTitle: string;
  images: IImages;
  id: string;
  author: string;
  tags: string[];
  mainText: string;
  date: number;
}

export interface IComment {
  id: string;
  postId: string;
  status: string;
  author: ICommentAuthor;
  parentId: string | null;
  rootCommentId: string | null,
  text: string;
  date: string | number;
  children: IComment[];
}



export interface ISnackbarStatus {
  text: string;
  severity: "success" | "error" | "warning" | "info";
}

export enum SnackBarSeverity {
  error = "error",
  warning= "warning",
  info = "info",
  success = "success"
}