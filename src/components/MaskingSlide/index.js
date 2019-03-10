import React, { Component } from "react";
import "./MaskingSlide.scss";
import { TweenMax, Power2, Linear } from "gsap";

export default class MaskingSlide extends Component {
  constructor(props) {
    super();

    this.state = {
      currentSlide: 1,
      currentTranslate: 0
    };

    this.config = {
      animation: {
        duration: 1.2,
        ease: Expo.easeInOut
      }
    };
  }

  componentDidMount() {
    const { directionTo, movies } = this.props;
    if (directionTo === "bottom") {
      this.setState({
        currentTranslate: -(this.slideHeight(0) * (movies.length - 1))
      });
    }
    // window.addEventListener("resize", this.onResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSlide !== this.state.currentSlide) {
      this.onAnimate();
    }
  }

  onAnimate = () => {
    const { directionTo } = this.props;
    const { currentSlide, currentTranslate } = this.state;
    console.log("currentTranslate: ", currentTranslate);
    TweenMax.to(this.slideWrapperRef, 0.4, {
      ease: "Back.easeIn",
      // y:
      //   directionTo === "top"
      //     ? `${-currentTranslate}` + "px"
      //     : `${currentTranslate}` + "px",
      y: directionTo === "top" ? "-100%" : "100%",
      opacity: 0,
      onComplete: () => {
        // this.DOM.pagination.current.innerHTML = val;
        TweenMax.to(this.slideWrapperRef, 0.8, {
          ease: "Expo.easeOut",
          startAt: {
            // y:
            //   directionTo === "top"
            //     ? `${-currentTranslate / 4}` + "px"
            //     : `${currentTranslate / 4}` + "px",
            y: directionTo === "top" ? "-100%" : "100%",
            opacity: 0
          },
          y:
            directionTo === "top"
              ? `${-currentTranslate}` + "px"
              : `${currentTranslate}` + "px",
          opacity: 1
        });
      }
    });

    TweenMax.to(this.slideRef, this.config.animation.duration, {
      ease: this.config.animation.ease,
      startAt: {
        //     y: directionTo === "top" ? "-100%" : "100%",
        scale: 1.1
      },
      onStart: () => {},
      onComplete: () => {}
    });
    //   y:
    //     directionTo === "top"
    //       ? `${-currentTranslate}` + "px"
    //       : `${currentTranslate}` + "px",
    //   scale: 1
    // });
  };

  nextSlide = () => {
    const { movies } = this.props;

    let translation = this.slideRef.offsetHeight;
    console.log("translation:", translation);
    if (this.state.currentSlide === movies.length - 1) {
      return;
    }

    this.setState(prevState => ({
      currentTranslate: prevState.currentTranslate + translation,
      currentSlide: prevState.currentSlide + 1
    }));
    console.log("this.state.currentSlide: ", this.state.currentSlide);
  };

  slideHeight(id) {
    let slideEl = this.slideWrapperRef.querySelector(
      ".c-masking-slider__slide:nth-child(" + id + ")"
    );

    return slideEl ? slideEl.offsetHeight : 0;
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { movies } = this.props;
    const { currentSlide, currentTranslate } = this.state;

    return (
      <div
        className="c-masking-slider"
        onClick={this.nextSlide}
        ref={el => {
          this.slideWrapperRef = el;
        }}
        style={{
          transform: "translateY(" + currentTranslate + "px)"
        }}
      >
        {movies.map((movie, index) => {
          // let incrementedIndex = (index += 1);
          return (
            <div
              className={`c-masking-slider__slide`}
              ref={el => {
                this.slideRef = el;
              }}
              key={index}
              style={{
                backgroundImage: `url(${movies[index].posterImg})`
              }}
            />
          );
        })}
      </div>
    );
  }
}
