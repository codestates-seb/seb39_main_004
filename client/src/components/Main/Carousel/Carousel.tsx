import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../../assets/images/main/banner1.png";
import banner2 from "../../../assets/images/main/banner2.png";
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

// 캐러셀 화살표 커스텀을 위한 코드로 추후 수정을 위해 남겨두었습니다.
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

const CarouselImg1 = styled.img.attrs({
  src: banner1,
})`
  width: 100%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
`;

const CarouselImg2 = styled.img.attrs({
  src: banner2,
})`
  width: 100%;
  height: auto;
  object-fit: contain;
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
          <CarouselImg1 />
        </div>
        <div>
          <CarouselImg2 />
        </div>
      </SSlider>
    </section>
  );
};

export default Carousel;
