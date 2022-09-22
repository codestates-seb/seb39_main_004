import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainImg from "../../../assets/images/main/food.jpg";
//import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

const SSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  position: relative;

  .slick-list {
    //슬라이드 스크린
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-slide div {
    // 슬라이더 컨텐츠
    /* cursor: pointer; */
  }

  .slick-dots {
    // 점 위치
    bottom: 20px;
    margin-top: 200px;
  }

  .slick-prev {
    left: 3%;
    z-index: 1;
  }

  .slick-next {
    right: 3%;
    z-index: 1;
  }

  // 기존 화살표 숨김
  /* .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  } */
`;

// const NextArrowLayout = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   right: 3%;
//   z-index: 99;
//   text-align: right;
//   line-height: 30px;
// `;

// const PreArrowLayout = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   left: 3%;
//   z-index: 99;
//   text-align: left;
//   line-height: 30px;
// `;

const CarouselImg = styled.img.attrs({
  src: MainImg,
})`
  width: 100%;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
`;

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // nextArrow: (
    //   <NextArrowLayout>
    //     <img src="/icons/right-arrow.png" alt="" />
    //   </NextArrowLayout>
    // ),
    // prevArrow: (
    //   <PreArrowLayout>
    //     <img src="/icons/right-arrow.png" alt="" />
    //   </PreArrowLayout>
    // ),
  };
  return (
    <section>
      <SSlider {...settings}>
        <div>
          <CarouselImg />
        </div>
        <div>
          <CarouselImg />
        </div>
        <div>
          <CarouselImg />
        </div>
        <div>
          <CarouselImg />
        </div>
      </SSlider>
    </section>
  );
};

export default Carousel;
