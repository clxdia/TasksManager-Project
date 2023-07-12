import Image from "next/image";
import React, { useEffect, useState } from "react";
import interfacePic from "../assets/introduction/interface.png";
import completionPic from "../assets/introduction/completion.png";
import registrationPic from "../assets/introduction/register.png";
import { useInView } from "react-intersection-observer";
import FadeIn from "@/tools/FadeIn";

const Intro = () => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="intro-wrapper">
      <div className="intro">
        <FadeIn>
          <section className="introduction" id="intro">
            <h1>Manage Your Tasks with TaskFlow</h1>
            <h2>
              Stay organized and in control of your daily activities with this
              powerful task manager.
            </h2>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="interface intro__section">
            <div className="intro__section__image">
              <Image
                src={interfacePic}
                alt="illustration"
                width="500"
                height="500"
              />
            </div>
            <div className="intro__section__text">
              <h1>User-Friendly Interface</h1>
              <h2>
                Our intuitive and easy-to-use interface ensures that you can
                quickly navigate through your tasks, making it a breeze to add,
                view, edit, and delete them as needed.
              </h2>
            </div>
          </section>
        </FadeIn>

        <section className="completion-background">
          <FadeIn>
            <div className="completion intro__section">
              <div className="intro__section__text">
                <h1>Task Completion Tracking</h1>
                <h2>
                  Stay motivated and celebrate your progress! Pin tasks as
                  "completed" and keep a visual record of your achievements.
                </h2>
              </div>
              <div className="intro__section__image">
                <Image
                  src={completionPic}
                  alt="completion"
                  width="500"
                  height="500"
                />
              </div>
            </div>
          </FadeIn>
        </section>

        <FadeIn>
          <section className="registration intro__section">
            <div className="intro__section__image">
              <Image
                src={registrationPic}
                alt="registration"
                width="500"
                height="500"
              />
            </div>
            <div className="intro__section__text">
              <h1>Sign Up Today and Supercharge Your Productivity</h1>
              <h2>
                Start managing your tasks effectively and bring order to your
                daily life. Join now by signing up now and unlock the full
                potential of the task manager website. Together, let's make each
                day more productive and fulfilling!
              </h2>
              <button
                className="intro__button rainbow__button"
                onClick={scrollToTop}
              >
                Sign up now
              </button>
            </div>
          </section>
        </FadeIn>
      </div>
      <footer>
        <div>
          <h1>TaskFlow</h1>
          <hr></hr>
          <p>© 2023 clxdia</p>
          <i>Illustrations by @macrovector on FreePik</i>
        </div>
      </footer>
    </div>
  );
};

export default Intro;
