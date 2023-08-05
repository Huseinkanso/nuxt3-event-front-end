type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_verified_at: string;
  type: number;
};

type Speaker = User & {
  slug: string;
  email_verified_at: string;
  image: string;
  job_title: string;
  description: string;
  company_name: string;
  twitter_url: string;
  facebook_url: string;
  events?: _Event[];
};

type Credentials = {
  email: string;
  password: string;
};

type RegisterUserInfo = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  type: number;
};

type RegisterSpeakerInfo = RegisterUserInfo & {
  image: HTMLImageElement;
  job_title: string;
  description: string;
  company_name: string;
  facebook_url: string;
  twitter_url: string;
};

type _Event = {
  id: number;
  name: string;
  speaker_name: string;
  speaker_slug: string;
  description: string;
  slug: string;
  speaker_id: number;
  address: string;
  image: string;
  longitude:number;
  latitude:number;
  ticket_price: number;
  ticket_remaining: number;
  ticket_number: number;
  date: string;
  category_id: number;
  published_at: string;
  comments?: Array<Comment>;
};

type EventPagination = {
  current_page: number;
  from: number;
  to: number;
  last_page: number;
  total: number;
  links: Array<any>;
  [key: string]: any;
};

type TheResponse = {
  [key: string]: any;
};

type _Comment = {
  id: number;
  comment: string;
  user_name: string;
  user_slug: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  replies: Array<Reply>;
};

type Reply = {
  id: string;
  reply: string;
  user_name: string;
  user_slug: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  replies: Array<Reply>;
};
