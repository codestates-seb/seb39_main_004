import img from "../../assets/images/snsLogin/google.png";
import thumb from "../../assets/images/main/banner1.png";

export interface PostData {
  thumbNail: string;
  recipeTitle: string;
  body: string;
  recipeTags: string[];
  views: number;
  likes: number;
  postDate: string;
  videoURL: string;
  ingredients: {
    id: number;
    name: string;
    amount: string;
    isEssential: boolean;
  }[];
  directions: { direcId: number; image: string; body: string }[];
  user: {
    ninkname: string;
    email: string;
    userImage: string;
  };
  replyList: {
    replyId: number;
    replyBody: string;
    createdAt: string;
    user: {
      ninkname: string;
      email: string;
      userImage: string;
    };
  }[];
}

export const detailData: PostData = {
  thumbNail: thumb,
  recipeTitle: "전참시 유병재가 만든 찜닭! 꽈리고추닭볶음",
  body: "가지로 만드는 스테이크입니다. 덮밥으로 만들어도 맛있어요~ 단짠 소스가 아주 좋습니다. 꼭 만들어 보세요.",
  recipeTags: ["치즈", "안주"],
  views: 20,
  likes: 10,
  postDate: "2022-08-30 13시 50분",
  videoURL: "https://www.youtube.com/watch?v=ue1wlqnZ4fQ",
  ingredients: [
    {
      id: 1,
      name: "당근",
      amount: "1개",
      isEssential: true,
    },
    {
      id: 2,
      name: "어묵",
      amount: "5장",
      isEssential: false,
    },
    {
      id: 3,
      name: "어묵",
      amount: "5장",
      isEssential: false,
    },
    {
      id: 4,
      name: "청양고추",
      amount: "4개",
      isEssential: false,
    },
    {
      id: 5,
      name: "달걀",
      amount: "4개",
      isEssential: false,
    },
    {
      id: 6,
      name: "묵은지",
      amount: "200g",
      isEssential: false,
    },
  ],
  directions: [
    { direcId: 1, image: thumb, body: "Step1" },
    { direcId: 2, image: thumb, body: "Step2" },
  ],
  user: {
    ninkname: "안녕!",
    email: "test@gmail.com",
    userImage: img,
  },
  replyList: [
    {
      replyId: 1,
      replyBody: "안녕하세요!!!",
      createdAt: "2022-07-28 13:30",
      user: {
        ninkname: "닉네임1",
        email: "11@nate.com",
        userImage: img,
      },
    },
    {
      replyId: 2,
      replyBody: "맛있게 잘 해먹었어요!!",
      createdAt: "2022-07-28 13:30",
      user: {
        ninkname: "닉네임2",
        email: "33@nate.com",
        userImage: img,
      },
    },
  ],
};
