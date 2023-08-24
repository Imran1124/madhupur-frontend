import React from 'react';
import './css/landing.css';
import CountUp from 'react-countup';
import firstImage from '../../../../public/e-scuola-logo-1.1.png';
import secondImage from './img/21.jpeg';
import thirdImage from './img/8.jpg';
import ForthImage from './img/12.png';
import FifthImage from './img/13.png';
import SixthImage from './img/14.png';
import SeventhImage from './img/15.png';
import EightImage from './img/c1.jpg';
import NinethImage from './img/s5.png';
import TenthImage from './img/s4.jpg';
import ElevenImage from './img/s3.jpg';
import TweleveImage from './img/s2.jpeg';
import ThirteenImage from './img/s1.jpg';
import ForteenImage from './img/22.jpg';
import FifteenImage from './img/o1.jpeg';
import sixteenImage from './img/12.png';
import seventeenImage from './img/13.png';
import eighteenImage from './img/14.png';
import ninteenImage from './img/15.png';
import twetyImage from './img/cu1.jpg';
import twetyoneImage from './img/cu2.jpg';
import twetyThree from './img/cu3.jpg';

export default function landing() {
  return (
    <>
      <header>
        <div className="container">
          <nav className="flex items-center justify-between">
            <div className="left flex items-center">
              <div className="branding">
                <a href="/csms/landing-page">
                  <img src={firstImage} className="w-[80px] h-[80px] rounded-full" />
                </a>
              </div>
              <div>
                <a href="/csms/landing-page" target="_blank">Home</a>
                <a href="/csms/emp-admin-auth" target="_blank">Employee Login</a>
                <a href="/csms/login" target="_blank">Student Login</a>
                {/* <a href="/csms/school-registration">School Registration</a> */}
              </div>
            </div>
            <div className="right">
            <a href="/csms/login-school" target="_blank"> <button className="btn btn--primary">
                Admin Login
              </button></a>
            </div>
          </nav>
          <div className="hero flex items-center justify-between w-full">
            <div className="left flex-1 justify-center w-[60vh] flex-wrap">
              <img
                src="https://images.unsplash.com/photo-1680084521631-e4e6d77704d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className='w-[60vh]'
              />
            </div>
            <div className="right flex-1 w-[60vh] flex-wrap">
              <h6>E-SCUOLA</h6>
              <h1>
                Management System <br />
                <span className="text-[turquoise]">School Application</span>
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab,
                vitae nam exercitationem sit quidem doloremque vero veniam
                mollitia. Perspiciatis maiores consequatur eos fugit tempore
                deleniti dolorem, ad animi perferendis laudantium!
              </p>
              <div>
                <button className="btn btn-secondary">
                  <a href="/csms/public-student-registration">REGISTER NOW</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="reviews" id="education-us">
        <div className="container">
          <h1 className="section-heading">Annoucement</h1>
          <div className="container">
            <div className="card-wrapper">
              <div className="card">
                <div className="img-wrapper">
                  <img
                    src="https://www.scottishigh.com/wp-content/uploads/2018/11/Annual-Day-Celebration-2018-6.jpg"
                    alt=""
                    className="h-[300px] w-full flex items-center justify-center"
                  />
                </div>
                <div className="card-content">
                  <a href="#">
                    <h1>Annual Fest</h1>
                  </a>

                  <p>
                    We will face some unique challenges this year, but I trust
                    that with our collective dedication and enthusiasm, we will
                    be able to provide an education that meets the needs of all
                    our students on this campus. From virtual classes to
                    in-person instruction, there will be plenty of opportunities
                    for learning and growth. With continued collaboration among
                    all stakeholders in the school community - students,
                    faculty, staff and families alike - I'm sure that success is
                    possible for each one of us.{' '}
                  </p>
                  <a href="#">...Read More</a>
                </div>
              </div>
              <div className="card">
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1611725450473-d18c7b751c59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
                </div>
                <div className="card-content">
                  <a href="#">
                    <h1>Republic Day</h1>
                  </a>
                  <p>
                    We will face some unique challenges this year, but I trust
                    that with our collective dedication and enthusiasm, we will
                    be able to provide an education that meets the needs of all
                    our students on this campus. From virtual classes to
                    in-person instruction, there will be plenty of opportunities
                    for learning and growth. With continued collaboration among
                    all stakeholders in the school community - students,
                    faculty, staff and families alike - I'm sure that success is
                    possible for each one of us.{' '}
                  </p>
                  <a href="#">...Read More</a>
                </div>
              </div>
              <div className="card">
                <div className="img-wrapper">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQXqmTtuLW7c87_g5HN7d_2FO05uEupUzJA&usqp=CAU"
                    alt=""
                    className="h-[300px] w-full flex items-center justify-center"
                  />
                </div>
                <div className="card-content">
                  <a href="#">
                    <h1>Annual Drama</h1>
                  </a>
                  <p>
                    We will face some unique challenges this year, but I trust
                    that with our collective dedication and enthusiasm, we will
                    be able to provide an education that meets the needs of all
                    our students on this campus. From virtual classes to
                    in-person instruction, there will be plenty of opportunities
                    for learning and growth. With continued collaboration among
                    all stakeholders in the school community - students,
                    faculty, staff and families alike - I'm sure that success is
                    possible for each one of us.{' '}
                  </p>
                  <a href="#">...Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about" id="about-us">
        <div className="container flex items-center">
          <div className="flex-1">
            <img
              src="https://littlegardenschools.com/assets/about-school.jpg"
              alt=""
              className="about-me-img"
            />
          </div>
          <div className="flex-1 ml-[20px]">
            <h1>
              About <span>Us</span>
            </h1>
            <h3>Our Productivity</h3>
            <p className="text-left">
              “ It has been providing educational opportunities to students of
              all ages and backgrounds for many decades. Our school culture is
              focused on promoting academic excellence, developing strong
              relationships between the staff and students, and fostering a
              safe, respectful and compassionate learning environment. We offer
              a wide range of courses – from core subjects like Maths, English,
              Science and Technology to electives in Arts, Music, Health &
              Physical Education and more – ensuring that all students can
              develop their skills to their full potential. Our dedicated
              teaching staff are committed to helping our students reach their
              goals, while programming such as our student-led clubs provide the
              opportunity for our student body to come together for fun
              activities outside the classroom. ”
            </p>
{/* 
            <div className="social">
              <a href="https://www.facebook.com/">
                <img src={ForthImage} alt="" />
              </a>
              <a href="https://twitter.com/">
                <img src={FifthImage} alt="" />
              </a>
              <a href="https://www.instagram.com/">
                <img src={SixthImage} alt="" />
              </a>
              <a href="https://www.google.com/">
                <img src={SeventhImage} alt="" />
              </a>
            </div> */}
          </div>
        </div>
      </section>
      <section className="freelancer" id="service-us">
        {/* <h1><b>WORKING EXPERIENCE</b></h1> */}
        {/* <p>I was Working in <a href="#">LectureNotes Technology Pvt. Ltd.</a> As  a '<a href="#">Content Manager</a>''.Our Comapany provides online Educational tutorial to students I have more than 2.5 year of Experience in LectureNotes Technology Pvt. Ltd. as a Content manager.
           My job responsibility is to handle interns who are working with out company and collect the product.
           Check the quality of the product and upload is in online,keep  a data maintain a record and share with
           our key person.Add Pyq,MCQ,Answers,Question Bank,Notes as well as lectures.  
        
           I had joined that company in April 2019 and acheive too many milestone.Our company provides a healthy 
           working environment to employees for working.  
            </p>
            <button className="btn btn--primary">DOWNLOAD CV</button> */}
        <div className="flex items-center justify-between px-[10vh]">
          <div className="block">
            <h1>
              {' '}
              <CountUp start={0} end={800} />+
            </h1>
            <h2 className="text-[4vh]">Student</h2>
          </div>
          <div className="block">
            <h1>
              <CountUp start={0} end={50} />+
            </h1>
            <h2 className="text-[4vh]">Staff</h2>
          </div>
          <div className="block">
            <h1>
              <CountUp start={0} end={20} />+
            </h1>
            <h2 className="text-[4vh]">Award</h2>
          </div>
          <div className="block">
            <h1>
              <CountUp start={0} end={100} />+
            </h1>
            <h2 className="text-[4vh]">Event</h2>
          </div>
        </div>
      </section>
      <section className="services" id="skill-us">
        <div className="container">
          <h1 className="section-heading">
            <span>Subject</span> we provide
          </h1>
          <p>
            We Provide high standard clean website for your business solution
          </p>
          <div className="card-wrapper">
            <div className="card">
              <img
                src="https://www.indiansinkuwait.com/NewsFile/15201751054946math1.jpg"
                className="h-[100px] w-[100px]"
              />
              <h2>Math</h2>
              <p>
                Math is a general-purpose, procedural computer programming
                language supporting structured programming, lexical variable
                scope, and recursion, with a static type system.It has found
                lasting use in applications previously coded in assembly
                language.
                <a href="https://en.wikipedia.org/wiki/C_(programming_language)#:~:text=C%20(%2F%CB%88si%CB%90%2F,with%20a%20static%20type%20system.&text=It%20has%20found%20lasting%20use%20in%20applications%20previously%20coded%20in%20assembly%20language.">
                  More
                </a>
              </p>
            </div>
            <div className="card">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGBxUUExYTFBQXFxYYGSEYGRkZGSAgIBohIB8dGSIgIR8fHyoiIh8nHx8fJDQjJysuMTExHyE2OzYwOiowMS4BCwsLDw4PHBERHTAnISgwMjAwLi4wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgQHAAMIAQL/xABMEAABAgMFBQIKBQkHAwUAAAABAgMABBEFBhIhMQcTQVFhInEUMkJSgZGSscHRFiNTcqEVFzM0NVRic/AIQ3SistLhJYKzJFWDk8L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAgMBBAX/xAAvEQADAAICAQMDAQYHAAAAAAAAAQIDERIhMRMiQQQyUWEjM1JxkbEFFEJigaHB/9oADAMBAAIRAxEAPwCyLu2Wtlb4NN2te8RT+LUGDhELkzevdvKaMs+Qk5rSgqT3ikEkW0yUoUXEgL8XEaVI1GfHpE5lJaHpV5JQbQjOiU1PdUn4wKmLASZhMyhZQsZKHBQ+cb7dSXWTu6KUkhaRXUpNaenSBcreNb8w000haUgFT+NBGHKgTU8a8oGpMXJDKsgCp4RVc9OTL82ublmg6hhWBIPEAZ0FRWHDaJa5ZlihH6R76tHecj74BWxjs2z2WWsnXVYVL5FVST38Iy++i+D2rfyyEm9qZmbl0vp3TaKlaFaFfCteHfDReO67cykOsqS28nNt1PxpqIXb33ZbSmVHjKU6EOK8peLU1/GN/wBFp6UUFSb2Nsn9Gs6evL1UhFy+UVyKOnL0PNlsuIaQl1QWsCilAUBPOkTYgWSt0tpL6Upc4hJqPXGq1LxS0ucL77baiKhKlAEjoNTF0+jia7CkYYTZ3alZzf8Af4jyQkn4QNd2vy5/Qy8y6f4UGDaG4UOVsSLC0Yn20KSjtVWAcNM6wHsu3JW1WH2miSmhaWCkilQQCKih5iFdO06ZmSpuWsxThGSwtXi1yooAZemGW7Km5WXbLkumWdfdoWWxWqySMgOFM+mcAOXPk2bO7AdkmFSzqgtKHCW1DilWeY4EGsHn51tK0tqcSla/FSSAVa6DjoYG3nvbKyKUqmXMOI0SBmo9aDOnWEraypOGStZkhQacT2hxQs1+frgF8vbJ8ns+P5SXNOFO5Cy4hI1KjnnyAOcadok2uafas1k6nE8RqBy9Fa+qHOetOkqqYQMX1W8SBx7NRCxsxsdZSuefzemKkV4Ir8flCtJHRGRv3P48DNRuUl6ZJbaTkO74xEudOPPIW67QIUatppoP6p+MCbacVPTHg7Zoy3m4oc+UaQ7M2caKq9L1oDxSPhHP6jV7+A4bn/cxwtaRD7S2iSAoUqNRFey9hNszRRMJVuRmlStFZcSIfbHttqYTibUDzHEd4iNe5KjKu4NacOVc/wAI3LE2lSFx3WPcv5IdnWnZ6VhtstBRyHZ+NIFvjdWsFDxXE09YA94gnIScrKsh04PFBKzQkmlcoUbZtFx15E1gUltKwEV6ZxGq0lsrjlNvX4LVhD2lSqUKamG1rTM1wthArjpmajkPjDywvEkEaEVgLeaWdCmn2Ww4prECgmmJKqVoeByEdj90nPD40LkhbTU6gSk+3uniMsQKcXVJOis9KwOkLxrs59UspwvsJzKqEqbHWmUar6XgL4SyqRWh0n6sqPaB07NBX+ukNtzbqJYZO9AcdczcKhXXyangImttnW+Mzul0/g+vp9J/bD1GMjf9B5P93R6oyKcX+Tn5YvwQryW9NMGrculxogEOYqBNfOHIc4hTskgWc4ubCHFHG92dApWYCT6hWPiatKdZbMsZZTyqYEOimFQ0BVyNPdC5b10ww1LNlxwuvLSgt4uyCSKkDoTCU/wViV1slydjOsWemcTMutLw4igGqTU5Ch6Uzg/d160qsqcDTja6FSvFUkU5AUMa9oLdWpWSR/euJSR/CkZw7MtBKQBoBT4Q0z2Jkr2/z2fD0qhdMaQqhqKitDzHWItt2K1Mt7t1NU1qKGhB4EEQSEexRrZzptAGVu2AtDjrq3i3+jx0onhXICppxNYh20qe8MZDNDL5FYyHfU6+qGkmBl4lvhhwy4SXQOyFf1rCtdGqu+wikZQDt+7cm+sTEy0hRbThClnJIrXnTUxFuZewTKS252H0ZLQculRBW8lliZlnmDlvEFNY1NNdGuXNdiFdSUlW520qttlloIcTkCEpwmtPVE2yb4TEwcUpZtZcHJalBGIc0ikDNmV0ShueYmOytY3BTxw0UAodDX8IKzs9ajCESkvJpJSAhL+IbugyCsNQQaZkRpSn35Bezh4ptedQUKRvBjwKpUGorplxhnsuZEzaUySaiUSllCeSljEtXKpASkcqHnCJdNPg9uobL4dU4hQcXzWUqUUjuKRE+8TE5ZdpOTsu0p+XmCC6gCuY1GWh4g0jF4FyLsm2E8m0XLTlplpKZgEpTizwt+KinLOhy1rWAV1LTZesOZkptxLa2lKQnGQMxRaacclAj0Q52DMpLz1qzDfgyFtoZTvMiQFVxK5Z0A/5j6Z2byDj65tSS8XFYwCQUCufZAHONJmrY3aomLNQ2vMs1aUNchp+EFL5WyJZndt5LUMKQOA5+iFG5CPAbam5HxWnxvWhw4nL0Ej0RYloSrWTriR2ATiPAcfwhMkup0hpaVLYnWBbLUvJlTZxOmpUNTXmekFZQrXIOOPKxKWhS89AKGgEb7IVJTDawxgosUUEih9I1j7asBzdbhT1WRlSnaKR5JMc8468Fqtb3rsWrGuy6pht9lZQ7macCKmG6wHH1IKZhsJUOINQfRwglLMhKQlIoAKARtSmKxi4k7yugY5dyWUrEWUnOvGle7SId8LFL0uUNpAUkgpHdwhijxQh6xy1oSaaewXdhajLtYwQoJoQemXwidNGiSRqATHi30JUlJUApXignM0zyjcYZLS0Y33sRrl2G466qfmR9Yv9Gg+QnhlzoIdyaQvXjvjLyh3aiVOnRtAJUfVoIXnGbRtH9IfBJc8B46h8IxaldFnNZO66Q++Go89PrHzjIr782En+8Pf/AGj5R5ByZvpR+Sx8ML9t3dL05LP4uwziJSeeRSR1qI23UvWzON4kGixktB1Sfl1g7G6TRL3SxTnbLcctRlxSfqm2VFJpoqtM+ucNojykLF97Zm5ZKFyssJgE0UM6jkcuEYloxt1pDSDHyTCnce+fhhW060piYbzW2rkeIrnSGyHRjWjTNTAQlSzoBWFCavHONuY1ywDBOSgamnXlDVasrvWlt1IxJKa8oUl2/MSzakzLGNKaIStJHbGgJHOEtlcU78I0XxspJQLQl3A06BiJ0ChyPWDFyb3om0YTRLyfGTXXqOkIU/OCYmG5d1wtSwNQOFTnSvPP0Q0Xiubu8MzJdh1oDsjywPeaeuIzT3tHTcypU0+/gabVsZLxCwpTbqfFcR4w6HmnoYWbZsW0nSGfyi02lXJvC4ocadr3QVuZelM2gpUMDyMnEfhUdIj3luV4TNMTO+WjdHNAORHTl1i6e0cenL0wEzsw8GmJSYl1lRacq9j1WDkSDwoOEWQEx6lMeKUBrlG+EZVNgC+92ET8vuFrU2MWIFPEioFRoRnWhiZdexkyks1LoNQhIFeZ4n0mBm0CScdlypl0oU2d4KHJVOEbLjXkE2wCcnEdlY6017jC8ly0N6bc8kSp+67Ls01OKB3rQIQQaa8+cFHkgiiqEHKh0Mb4Q9ry1oZZcQpSSl3VJpTsmC64rZmOOdKQRfOxW2JhlMmVNzDhySg0AFTnQaQSkL0zMrVE80VAUAdSNRpU8DELZtJuzLyp2YJUUDAgqHTUDTIGJO0C0VPvtyDPjLPbPIH/AIqYjvrkjspe7hXevLHOybXZmE42nEqHQ5jvHCCMILuz5TSkOSrymlZYhU0I4w9tCgGdYtLfycmSZT9rNhMLt9L4MSDO8dNVnxGwc1H5dYjX9vszZ7VVdt5QO7bBzPU8kxTtiWPN23NKccWcIP1jnBscEpHOkOKkbbHdtC17QS+2tSFINcYrgZSK9kcKkcONY6CYSQkAmpAFTzNNYgXdsBmTZSyygJQPWo8yecFQIDGC5qy2Q4ZkspU6E0xUBVQcBA+0pdE+xhamFtg6ls0V3KGo7oY1CF22bvNOOY23VMPHymzQnvTofVGMaX2KP5pVfvi/Uf8AdGQwfRec/wDcXPYT8o9jNHR6j/IOvBdHGtM9Zywh7WgIwOAw23fdeUynwhsNu6KCVAjvFOcCbqXTck1rCZhS2SapaUPF7jWBtpSNrvTK0Ifbl5YHsrSmqlDuPH8M4F0Sp7630PRMIVv2da/hS1y0w2ljIpDlKdRQCtO88YlTDjss4zLPzCn0TJU2FGiHEKCSqoKTmDz4ZRGlbksSQXNTMy++luq/rVkpTyyJ7R740RaRMk7MnHFtPzCGEPsqpvG1HC42fGBBzHMZ6wwTVty7WTj7aaa1UIom+O02anXNzLFbTROFCWyca+ArTMV5CPbM2RWjMALdIbxfaKJV6RGit7LpTfGSJoJponlihfn7PdnphBU8z4Og1CW14ieRMJH5hZj95a9k/OIczsjtNiqmXAqmhbcUkxjnfkaac9oux+wWVNbktpKKUof616xtsWWU2w22s1UlIBNdaCmsUhZt/bVsxQbm23HEDKj1a+hZ1yi2Lm36lp9P1SsLg8ZtR7Q+YgUpGOm/IZlrLaQ4t1CEha6YiBmaRNj0RkaY22fJhA2mTsw4Uy0uhassTuAZ0OSRXhXMw/qMA7FWC9Nnyg6AedAhNIW1taHxvi96E6zLuTDzbTU49uWECiWgoBS/vGMtuzjZcw3NMA+DmiXU60/rWvOJln2IxaKXHnFq328WnJR+rCVFKQE6AUAPfH1Y5LbczJTywptsApWs6oVprrQiI8dHTybf/g62bPIebS4g4kqAIMQLyWW1NNmXcVhxZ9kjFlyhC2e3lSw8qWUsqZWshpRyoa5DPnDeLrHw3woPEJrXBSvChFa6GmlIdVyWiV4/Tr+xJfU1Z8oaeK0nKupPzJhd2Z2WpxTs+6CVuqOCvKuZH4D0RJ2iWe9MPS0uiu7WolZHCmefogbtSvh+TJduVlsnVpoCP7tIFK98CndfoDtTH6sep+25dj9M8hH3lCB05eZt1pXgTzDr1OwlTlBXqYoa7NzJ21VKdCiU17TrpJBPTn6IY5jYhONpxNTDalDgMST66xU5zTJXBtCfnVmdC2xWrjhoRQnIN0JH9CNKFTdgztE1Wyo8fFdTln0UIJXTv5N2a+JO0gst1whS61QNKhR8ZMM21i6b0/4M7LKKwThIr2EpUK4/wzgGTHK6942J1kPMrqNFJ0KTxBEAdpG0L8muMoDO93qVK8alMNB8YKXGug1Z7G7R2lqzcXxUflA6/wBs8RaTjbi31tFtJSAlINakHiekYZ1skbO75/lJp1zdbvdrwUxVrkDAG8k423bbK3VYUNtVJPMhdNO+GK4FzU2a040l0u4146lITTIDhC5MWW3NWw8h5OJCWxl3Af7oS2+tF8GttvxoaPplJfvDfrPyj2If5uZH7H/MYyM5Ub+z/UYbLtJD6StupSFFIJFK0yqOY6wKvLOzBac8ALS3m1YVpXwORyOgNDXPKFi5d6TLKEjNDAUnChZ0pwB6HgYO3gQ/LveGy7ZeSpIS+0DmoJzStH8QBIpxENNckTuHNC3d6782mebmbSC3lklLRbKS20SK1UMiOQoD1gjt3fUmzFYcgpaQruqI3WZtFbmZlqXaZdSVGrhcSU4AAT64OXyspuclHpcrTVaeyajJQzB9cMhKbb7Kt/s72M244/MLSFKbwpRXya1JI6xeAEUlsPnDKTcxJPEIWqlKkUKk1GR6xc/hSPPT7QjRTdSMpGrwpHnp9oRnhSPPT7QgA02jZrT6Ch5tLiTwUKxVl7tky2FeFWWtSFp7W6r/AKSfcYtnwpHnp9oR4ZlHnp9oQAI+zS//AIUDLTILc23kpJFMdMiR15iH4Qg7QLmomCJuUWluca7SSFABymdFQWuJexM4xVyiH2yUPIJAooZc9DrAAzmBLNiBEy5MJWobxIC0ZYSRoedaQS8JR56faEZ4Ujz0+0IzRqbQr2pcwBwvyjqpd4mqqZpXx7ST74X27jzcy/vJ1wYQAk4D44FSBlpmddYsczCPPT7QjwTCPPT7QhXCbKTmqULN4rlNOywaZSG1ozbOmfU6584PWHLONstodXjWlIClUpUxJ8IR56faEe+Eo89PtCNUpeBKumtM+imOdtujijaSgdAgBPdHQ5mEecn1iKV/tB2R9YzNoIIUC2uhGR1EMKWjcKRSzIS6EgU3YJpxJzJg9SFjZ1a6HbPl1401DYSakDMZfCGLwlHnp9oQAAr7XSatBhTbiQF0O7XxSeHohR2P2u6y49ZMyTvWKqbrxTqQOYzrFlmaR56faEV5tOlAw7L2qyRjZWA9QjtNnLhrSACRe2atVc63KywSywsVMxhCqAVJrXQ8AOsCr5Tdp2W22+JzwlsrCFpdbSNdM0itDFlS862tIWlaaKFRmOMLG1CxDOyamm3kJKDvSDniwAmmRjDUTriXpTaEsHkpwqBKHE+aocuh1hMYZmXrRm1yziW1JNCVCtRpTQ8ok/2f5IokXXSCA66SnqEgJ94PqiZcJoqdn1aFThA/GkTtb0XwviqYC/L9o/vKPZH+2Mj6+gc75o9ofOMhODK+rP4Qx3galrQklTCSkLQkqCssSCMylXyg9cta1SbBcrj3aa110yr6Iq6XZe+tmmGSJbGCpuuSgDWhHLSvKLUuvbjc0yHG8hkCnzTyhsb2xc8OVpPr+xst2TxS7wbSN4W1AEChrQ8dY57FxLY+wmPaPzjpmkeGKnIciLl3g9uzjD2LBSpxYq0pWsMYuHa5/uX/AGz84jWj+2Vf4sf6xHUDWg7hGgc0/QG2PsX/AGz848+gVsfYTHtH5x0zSPCYAOZ/oFbH2Ex7R+ce/QK2PsH/AGj846U3yfOHrEZv0+cPWIAOVrdsmdlCkTAebx1w1Uc6emJ8lca1FpDrbD1FgKxBVMQPHWHL+0csFcrQg5L09EWZs7f3lnSq+bQ+IgAof6BWv9i/7Z+ce/QK2PsX/bPzjpekZABzR9ArY+xf9s/OM+gVsfYv+2fnHS8ZABzR9ArY+xf9s/OM+gVsfYv+2fnHS8aJqbQ2MS1pSOajSADm/wCgdsfYv+2fnGuYuBaxSccu8QM81V09MXzM39kEeNNN+g190Q5naRZxQoCaRXCefKADnmxLPmX3NxLhxTgqcCVEUprlXnBz6BWv9i/7Z+cTtjT4/LAIzCg4AehIMdFUgA5n+gVr/Yv+2fnAG25aZl1lmY3iVAZpUo8fTHWxEc2bcf2q79xHugAjS1ybVWhKkMvlBFUkKOnrhl2d3NtFucQZlp5LJSpKipRyxCnOLkur+qS/8tPugkYAIlmWe2w0hlpIShCcKQOAEb0MpGgArrQR8zEylAqpQSOZNI3AwG96PKRkexkGjAVMOy8s1RZS20kUodKd0bLFYZS2ksJCW19sUFK4s6wr3ZsFUyROzvbUrNpo+K2NQaHKsb9oV51SjaG2h9Ys1B5JSRX00ypE09LZZy6fFPsb3FZQu3SvCuYU+26jduNLph/hOnxgpYNpJmGUOpOShXuPEegx8myUiYEwnJRSULp5Q1B7wYbe+0T0p2mc42iP+sK/xY/1iOoGtB3COX7RP/WD/ix/rEdQNaDuEMKeqOUc4XmvBaM7OustKdJS4pKWmzSgCiP6JjpAxXFo2eLNtTw4J/8ATzPYdNP0SyclHkCeMAFWG5ds67iY9sf7owXLtn7CY9sf7o6TVNICQsrSEnMKJFPXAWYv5Z6DhVOMA/fEAFBP3BtZfjyzyu9QPvVF9bNZNxmzpdp5BQ4hBCkmlR2jygtZlsMTCcTDzbg/gUDE4CAD4dWEgqOgFTFMXi24uofWiWZbLaSUhS61VTKuR0i5ZloLQpJ0UCPXlHKV7rIVLTbzCwRhWqmWqSSQR0gAd/z8Tn2DH+b5xn5+Jz7Bj/N84NbEboysxJrefZQ4suFNVCtAOUP/ANAbP/dGvZEAC3cHaM5Ny03MPoQgS4qMFc8ic690VFaFoz1rTBAxuqUapbT4qRp3Ad8X7a102ESUyxLNJa3ragcIpU4TSFnYHZKG5NbtPrVOKSo0zGE0p+EACdI7DZxQBcdabPLWJP5hZj95b9kxelID25eqVlSA/MIbJ0SSK+rWACv7i7Jn5KbbmVPoUlNQQAa5xbAgZYt4JeaTil3kOU1wkEjvEFIAPDHNu3H9qu/cR7o6SMc2bcP2q791HugAv+636pL/AMtPuglWAtjLUJBooFVhkYRzNMo23YknWmQHnC46o4lk8CcykdBpAbroQdtllufVzAUot+IpNcknUKp+ENOza8PhUqnEfrG+wv0DI+kQZvDZaJhhxlei00ryPA+uKeuTaS7PtDcu5JUotOVyA81Xrp6DE2+NHbErLhc/KLxxxkaPCU8xGQ3I4/So+5dICQBpQQn7VpMOS7YAGPepSjvV2aQv3b2lFloNvoK8IoFp1NMswYiWhe1U7OSwpgaQ8g4eJOIZnhEauXOjsj6bJF8vwfN0b0uSDimH0q3de0kDNBOdR0MWPY96JeYXgaXiOEqORyHWPq1rsy0xRTrQURx0PrEb7JsJiXrumwiupGp9MPE1PRPNkx33rTOcbS/bKv8AFj/yCOn2tB3D3Ry/aX7ZP+LH/kEdQNaDuEVOU2QsbRLdl5aUcMwkLSsFKW/PPKGYxQn9oWaWZxpo1wJbqkcydTAAmPWxNzWGXS46tAJDbQNcIrkMszQc4cLD2JTboCn1oZB4aq9OUWDsfug1Kyrb5SC+6nEpRpkCagDlwh8pABUUnshmpQ76UnaOpzAIoFdDD5cm8SpppSXU4JhlW7eRyUOI6EZiDk3NIbQpa1BKUipJ0EVbsxtjwq2bQebH1K0j1pKUg+mhgAtiK52x3DM414Qyn69oHLz0607xwix48MAFebB5dbcgpDiFIIdVkoEe+LEj5AjKwAekQgzjpsiYceIUZKYViXhFdw5xNPMV+Bh9xRrfZStJSoBSSKEHQiAAbL3plFpC0zDVD/GI5t2hzZcn5hW8Dg3hwqGmHgB3RaV6tiDTqi5KObknyFCqfRxEKzmxGdSlR3jRoCQBqqnCABb2bWk8zPsFkmqlhKgNFA6x1IIovYSJduacafbwzSahBVwpkQOsXoIAMMc27cf2q79xHujpIxzbtw/arv3Ee6AC/rrj/wBJL/y0+6J7qwkEnQCpiBdb9Ul/5afdAjaZaSmZF1SQaqGCo8nFlU9BzjGNE8qUk26d40TrRcRlhWpJHHImh9IoYRNs138KkTiBkaNud/kn15QC2YW54LNhteTb1EKByofJPwi5Las5MwytlYqlaSITfNHY5f02VfhlBfSaa/eVRkM35r5j+jHsS4s7v8xi/QsN64smpePcJryGQ9WkIO0axBLPtuNJCGyOzhyAUnP5eoxItTam+qoaQlsc1do/KALj89PHPePDUUACfwoIXJUte1EMOLJL3krofrB2kS6mhvyW3AO0KEgnoQOPKGWwbdbmkFxoHCDhBIpipyisrN2aTTmbhQ0nqSo+oCn4w5WFcFDFMT7yqcAspHqTD46v5RD6nHgW+FdiZf3ZytueZnJZKloW+hTqAKlBxAlXdFwtaDuhWvtbTskhp1sBTYVhWk5mlMsznBO694G5treoBGdFA6gxbkt6OR4648vgMGK1233OVMspmWk4nGgcSQM1J/4hxtu9DEspKHSqqtKCvr5QSZdC0hQ0UK0I4HnGppiuWltizsrt5EzINUIC207taeIKctIbTCFbFznpZ8z1mYUuK/TMKNEOjpkcKoPXZvYzNVQKtvp/SMryWk91cx1EaYU/tbvHPPTBk1tqabxUQ2mv1vAGvEdIsrZHdAyMqC4Prne0sebyT6BDW/Zza1odW2lS0VwqIqU15RLpAB7GR4Y0zEwlCSpagEgVJOggA9eWQCQKngBxhTtyYtIoWtAaZQlJVqVqNM+QAMabQ2nyrailIcdpxQkU9BUoRMs6+UtNoW2hRSspIwLABOXDMg+iJVcvpM6IxXOqc9CRdi15ycf3Xha2zhxVpXSnD0xYtk2bMtn6ya3o5FsA+sGKv2dqw2i2Pvp9/wAote15h5BSppKVJB+sBNDT+GExV7W2W+rnVJJfAUSY+iIE2ZbjTxKUK7Q1SdR/xBRKotNKvBxNNeSq9q1wXVPIn5BJ34UMaUZEngofGLAurNTDkuhU01untFJrXTj6YJOLAFTkOcCJK9Us88WG3UqcArQdOsbs1S34DZiq9smzpUzWclgVPAUW2BUrA5dRFpgxkaKDbstlMqwlQIIbSCDqMolT0ol1Cm1gKSoUIPWN9YDXgvRLyicTzgB4JGaj3CM2hpmqftK52uXaDTiJlsUQqiVgDRQHZPTIfgIYbB2jS4k0OTDgDqewpAzUojiBrmOMKF9doi5tBaQ2ENK86hUfgPfEO7VwJmZwqw7pvipda0/hTTOI7ar2nreknjXrPTQ6fnaY+xd/CMiP+Z9H26vZEZDe8nr6X8jdZdyZRmhS0FEeUvtH8YNoaSkUAAHQQl2vtOl2ypLSFukGlRknLqeEK1o7S5pzJvC0DwHaV6z8ox5Inwc6wZsndf8AZbjr6UiqiAOppAK1L8ybNQp5KlDyUVUfwirhIT84quF9wHislKfxoPVBuzNljyqb11DY81IxH15CF9S6+1Dr6fFH30eXxv6iZaUwhk4T5ajSlDqAIj3AtZ6XLjTbKnVODGhNQKkZZ10FIcbP2byjY7QU6aeWaj1aQlSM4ZW0g2RQIc3ZP8KtOnKJ0rVKqLxeKsdRC/UapC6jz7/hM4QKUIbB5ZgK4UBhsNrsJODetgjKmIRrtyzlTDRbS6puupTxHKBE6iVkmFIISVEGlaFSicqxWqcnA3z8/wBD6tC8EwhxVJY7pOal4gajmKe6NtoWJK2g2l2hCtUOoOFxB6H4GPmw5tKZNO/WnxTqoVpnT00gVs2tEBTrFTSuNAPLj8/TCTk1S78mvHuW9eCYHLRkxQpE6yOIol4DrUhKvwifZN85Z44CstO8W3gUKHtZHvESpu3m230S6goKX4ppkelY1XolZdTKlvy6X0pFSMAUrvFc8o6FSZDiwwhwEVBBHMGK62szDq3WJRsEhzOnnGoAHcMyYNbPZ+WUhbcql0ISaneEnM8AST6o2X2shxZammE4nmFYgnzxxT38oyvdPRXE3F9g67+zZlCAZirqyMxWiR0AGvpghaVypEIKy0G8IxYkkpIpxrA07UWEpoWXQ4MimgyPKtYWrQt+btNzcNJKWz4yU1pT+NXwiTqUtLydKnNVcqekCrquBM+yQSRvqAniCSAe8w+Wta8wZtcqihSspAyzSKCufdFfeDGWnUN1qW3kAnn2hFzzjTLWKaUkBQRmrjTlEYTaZX6xpVL87QHt+TAU02wkb7IYuKU8SfxgrY/hCVFDwSUAdlwHM8MxA+6Eqtwrm3R23T2R5qBpBO9CnUyzplwC6EHADzpw6xfHO/ccNdtSTlUWCDQg5H4xSN8rEcs2bS4zUIxY2jwBzqk/1pBjZXe5TbplX1khZJSpRzCyc0mvPMxYN7bAROMKaVkaVSrilQzBij9y6LxvBeq8M+ro26ibl0Op1pRafNVxHrgq84EgknICpikLm225Zs4pp6oQVbtwHQGtAsdPhFwWvKmYllttuYd4igWM6A/8QTW0Tz4eF/oysLz7UH3SpuWAab0CzUrVnw4CsCbCuVOTqt4oKQkmpdc1V1ArU/hFmXb2eyssUqKQ64NFrGmVOyNBDWEgQvFvyW/zU41rGv8AkVLs7PpaVAVQuuDy10NO4UoIPMWo0p0spWC4kVKeUCr43jEujAjN1eSRy6n4DjAzZ0hmil4sT6icVdR3dOsI8iVqUQpXc86Y6Vj2PMcZF+Rz6QgWZsraFN86pfRPZHzhos260qx+jZQDzpU+swajW6mopzhOEr4LVnu/LF6xL5ysw8uXbVhcbUU4VUGLCaEp5iGQRTl6tkzrai/KOKcocWEkBaTrVKuOcNmzG9y5ptTEwCmYZyUDkVDQEjnzhkLcpraHZQhLvJcATMyX95gBAxADMkaGsO0aZgKwnDTFTKuleFYKSfkyLqHuSJJT7alLZQsKcaACxxFRlWBiJaXfeJeaSHkZEK4jmOCh1ilU2rNWfaCnXKh4KJdB0cSTn3imndF3S7cvaDDb1MQUKpUMlJ5iuuRhKWylTx7/ACL95pJjwphtKAcRo4lOQpw04xvt+VErMy76AEo8RQH9cjB2ybrsMLxpBK+ajU/jBG0ZBDyC24mqT/WXWIrC3tvya8qWkvAAvlZq3UNvMirjagoU1IyOUHLNd3rSVkEYkioIz6gxulJYIQlArRIAFekbwmLxGnsk72tCfNSKrPdVMS6MUuvN5pOqT56PiIYrLtNp9sONLCknPL4jgYmqTCtbVy0OLLrDi5d05ktnsqP8SfjG6c+DeSrz/Un2rdeVfOJ1lJVzzBPpEA7bvHK2c2WmEJ3h0QjhwqowOnbo2moFPhWJPIqI+EfNkbLDixTDtRrhRx7yc4k3T8I6YUJe+tr8CLNzilvF1ZxLUvGT6QeEXr4Ml9gIWKpWkVH4xXe0C5SkfXMIq2EgKQkZpp5XXrFhXadxSzKubafdGYoctpj/AFeSbmXJOZaCQABQDSPibfShJUsgJGZJ0AjeYRdoqHJl1iQbVhDuJbiv4U0+cX1pdHFC3RXd/HZdUyXZRdQo4lUFAFcx7++LQ2c3pE4xRR+tb7K+uQoruMBZjZAwUdh50L5kgj1UhKld/ZM6CvydQNHEHl+Jia3L2/B6lennxcZfuQ77V7pB1HhTSe2gfWAeUn5iPjZHezeI8FdPaSKtnmnl6Kw9WdOomGUuIIUhaQR3ERTV+rGVITYeZVRJVjb/AITxFOUbXT5EcX7WXivyvBeYgXeC2kS7ZWrXRI5mI107xJmpcPJ8YCi08QocIDWdZzk5MGYfSUNtqIQg8aHiOXvjLt69pxrGpp8vg9u1ZKlqM7NZqOaQfJHP1QAm8S3nZmUSUNtCpUOJ40HUcIJ32txTuJhiqm0CrhT7u75QVbfZas7skUU3TLUqVlSnOscdSq6Xx8nUqcrk/n4/QXPpxM+cj1RkCfyNMfZn1RkJxoblj/CLAuE7MuS5fmVVLyy4hFP0aCBhT15+mF2zNqCUz0xLTFEtJeKG3eAp2aK9PGLCYaCUhI0AoOkVdtfuU3RM2zRslYS7yONQAX6Cc++PTZxRxb0y0GH0rSFJUFJOhBqDCXOMIRbkupqgW4w5vgniB4pVTjXLOEWVudbMscMutQSdC252aHjQ6eqLB2f3Oclsb8y5vZlwUUomuEeaDx741PYzhSn2NCLSbLqmAsbxKQoprmAqtD3ZGJYzikdo85MydreFp7OIDAeCkpyKT/XGLTufeRqdl0vN5E5LSdUq0IMGxaxtJMA7VbniaYLzaRv2hVJA8ZIzKYDbA7RUpqYYVWjagpNeFa1HrEWg4KiK92SyAS5aDiRQGYUgegq91YzXY03uHLN19HH2XkvS0ypS3XA1uDRSCaV/7aUqYltXzdYOGel1tj7VFVt95IGXpgLIWA4wqanFuguJWsNg1IQVEdsjnSnoiZaL70o0XlziJlrDm2sJBJOQwU60yMY2VUy0pHSzbWZfSFNOJWP4SDE6sV3dC4yFMNTClONPrVvSUKIyUcQSU6UpDja9rIl2ytZ6AcSeQg5pLbIVC5cZMty2kSzZcWeGSeJPSI92bxImkEgYVJ8ZPL0wgFT1oPj8BwQn5xY9g2O3LthCBn5SuKjzjnx5Lu+vBXJjmJ0/IrX0v94O6GWQFqSauV0p5vfDDYt5Gn5czCScKa4gdUkCpEC73XEamyHEHdu17SgPGHGo58jBmTlGZdnctgUQiuHiQOJ76ReeXJ78GU8bha8nli28xNIxNLB5pOo7xBRCQBQUA5RWMuhibdLkktUtNDtFByC/QMiIN2XfNxlYl59G7XoHR4i+teEZNL5FrF/COxivdpS3ZZ+Xn20lSW6oWByJGp5ZGH1l4KAKSCDoQdY+JyWQ4koWkKSRQg6UijW0JFca20AbBvxKzCQQ6lCjqhZAI9esDdo9iNTbBW2tG+b7SDUGo4p14ivphX2g3Hl5cF5t4NV0aVnXonjCE0paiEpKiTkACc+4AxGrfg9PB9LNftJrQw3Zvu/JsuMoGIHxCT4hzrlx7o1WVY83aTpX2l1NVOLrhHQfIQz3N2YKXR2a7KdQ0NT948O6LRkZJDSAhtISkZAAUgmG/IZvqseOn6a7/JSd1LXcsycU09UIKsLqeHRY6dYuoYXW8j2VjVJ4EagwobR7jmbwushIeFEmuQUk8+7WC93pbwGUQ2+7iDYzUrIDjQd3rhpWtpnNnqcqVT9xMsiwWZdKkIFcRqoqzJ7+kaWpWTQ6Gkhre+MEZVFONISr2bSFLq3K9kabw6n7o+MaLl3RmXHkTTilNBJxVOa1evgesJueWpRnoUp5W9FrZf1SMj53cZFNfoc2kKly7/S80ynG6lDwAC0KNM6aiuogBtgvgwZZUqy4lbjhGLDnhAIOulaiANtbGZhKyZdxDjfALqlQ7+B74L3S2QBBK5xSV5US0mtB1J4mG70W1jT5bGHZZehM1KoQpQ37QwLHE0yCutRSGq0rRbYbU66sIQkVJJihL4XVmLLe3jbhDZV9U4hWFXPCaf0aQLXPzk+4hlTrz6jklJJI51oBT0mF38DPCq9yfQb2hX3XaLgYZR9SFdgAVWtWgPTuiJYM/M2RNArbUnEBjbOi0nOoplURaGz7Z23JgPO0cmCK1pkjjRPziZtIuwzNS5K1JbW2KocPDoehjew9SfsXgLt2605Kqmm1gt7srr3CvrgVsvlSmRbcI7TxU8f+8lXuMUpYd43WGXpYK+qfGBWeSM6FQ6UjoixEoDDQbIKAhISRmCAI1PZLJj4Ae3W3EOlTBbWtwUWws0xgCmIHgaZcoRF2Sp6cYlTJNy9TvVFJBVhSTx0AJFIs56wGVTCZpSfrUpKQroY+LZmGZf69wJxJThB8ogmtB6YW9JbY2PI11K7Pu1LSblWsSyAAKJHOgyAiunXXrQfp6hwQnSsZMvv2g/QDLgPJQOZjU429IvVzChoeChHnZcztr+E7cOKZT/jLKsGxkSzYQgdSeJMEsQhXbvm2ZdTui05FFc8Xy6xBu9LPTtXn3VhupCUIUQDzzHDhHXOWVqYOGsd91Y7hUALQnkMzreMhKXWsAUdMSVFVPSDAi3bJflhvpZ5wpHjIUSrLnnqI2SM2xajRZeSA4nPI5j+JJh/U93F+TFj65fBuvVMy7W6c7Ad3qMBTrmoA+ihOsDtoE54QtqRZAU4shSjSuBPONdr3WlZKXdedUtw4SlONVSCRQBPWJOzO75bb8JeqXXBQYsylPDM9AIHtviVXGVy34NlhXbmpR5CWnscsfHSvVOXk+mPraHfMySUIbTidcBpXRIFBXrrpDK9ajSXAyXEhxQqEkipHQQtW9cRM3Nh95wlpKQkNgcdTU8jFOOlpCTcu1WRdFZWfY03aT+PNdfGdV4o6D5CLWulcaXkwCkY3OK1Ur6OQhgkZFDSAhtCUJAoABSJMEwl2Nm+qq/bPSMSIxSoH2xbLUugrdWEgdcz0A4mKzvFfx+ZJalwptBNARmtfQU07oKyKRMX095O/gcbz37Zl6pSQ46PJGg7z8Irxxc5ajuQKhWtNEIHp4wbuxs6W4Q5M1SnXd+UrqoxY0lItMNhDaAhKRwFIjxq+34On1MeHqVuiobqqTKz+7mGxrgJIrhJphI6Hn1i6EUplFLXmmTPz+FlIBKt2k86eUad3uh5bsadlmwtuZL5TmWnBkockq1B76xmJ62g+qXLjTfb+BqwL84eqMhF/OQv90c9qPYvyRy+kywoWb730YkG6rOJ0jsNjU8KnkmDdpTeBlxweSgq9QrFBXdu7NWtMF1RVhJq48rhXgnmaaAaRuxYlPtnxWctia85f+RpPy/Exc1yblsyDdEDE6fHcIzPQch0ifdm7rMmyGWU0A1UdVHmTGm9d6WJJouPKz8lA8ZR6D4wJfI1W69s+CbbVrtSzanXlhCEitTx6AcTFF33vs/aLm6bCgziohoarNMirmekR7cteateYSkJKqn6tpPioz1J071Ra2z7Z63JJDrnbmCO0rgnon5xm9+B5U41t+RITslf8EU8pQ8I8ZLXDDxST50ZsqvsZZzwOZJDRVhQVf3aq0wnodIuspyhUtK40mZnw51NCkYlA5IJGeIjnBrQvq8k1QdtW1W2Gy4s0HDr0EVvNTL9oPgAU81PBI5mGq9lgqm0tuMrB0oK9kg8RBe71gNyyMKc1HNSuJPyjmuLyVp+B8dxjnf8AqPmw7HblWqClaVUo8T8BAa81tSTyS0tWJQORQK4T0IiDtHtdeMS6TRNMSqeVyEEblXYS0gPODE4oVFfJGop1hN8q9OV0Nx4z6lPv4ECclVNmigoVGRIpUc6RY9w7RbXLpbSaKQKKB1rzhc2i9qZbQNcAHrUYFzEu9JPBVSCM0q4KHXp0jlhvFkbXg7L1nxJPyW04gEUOhisXLPdlZzE02spSuooCQUnhX0/hDrdi8aJlHJY8ZPLqOYg3hj0HM5UqTPOVVibloB29YCZzcFRoltYcI87LQiJ9pTqJdpTizhQhNT6ImnKKl2v3m3ixKNnsoIU5TieCfRxir9qGwY6y2p+AHZjT1q2iFklIriJqewgaAHgTp6YvRhvCAOQA9UU1syvaxKYm3klO8VXe68KAGmgEXBJTqHUhaFBSSKgiDGV+tmlWtdIkws37vC5Js40N4qnDiOia8TDNEadkkOoLbiQpJ1B0PH3w9LaOOGlW2inLPsWbtJ3eKUSmv6RXij7o59PxixbFu3LSLZWaVA7Tiz7uUMDTKUJASAAOA0EU7f68bkzMKZSTukKwpSPKUMq+uOekoW/k7oq/qHxXUoe2do8mVFJWpNPKKcj1ryg45NJeYUtpQUFIOFQ41BpCfc3Z4lOF6ZGJeob8lPfzMOs3PNMJG8WhtOgqaDlSKQ617jnyzM3qOyl7ivBqeZLmVFFBrwUaj35ReAzEJVsXHlZtReadwLVmSgggnnTn3RKlbMtJlGFMyy6BpvG1V9YMLC47KZ7nI015Df5Kb8xPqjIWPynaPnynqX84yDkJwr8hNX7Nd/kK/wBJiFse/ZjUZGQ8ifD/AJjpwij9uP663/L+JjIyHfgzB9xJ2DfrD/8ALR71Rc6NIyMhYH+o+4+oW9pH7Pmf5SoyMja8EJ8n3s9/UJb+WPfDBGRkC8BfkrHaB+uDuT8YseQ8RPcPdGRkcWD96zsz/upK8vj+0U//AB/6oKbSP0KfvR7GRzX4ovj+6AHs9/Wx9wxaKYyMjt+l/do5fq/3h47oY56t79cd/mr/ANUZGRbJ4Oj/AA37wMvxj3xbuxL9UV96PYyExeTo/wAQ+0sIR8cY9jI6DxTx3Q90UPIfr6f8T/8Aox7GRzZ/KPR+h8V/IvVvQRXG2vRj7x+EZGRV/acuL7wbsl/Wf+0/CLYe8U90ZGQseBcn3lYxkZGQpQ//2Q=="
                className="h-[100px] w-[100px]"
              />
              <h2>Hindi</h2>
              <p>
                Hindi is an language which gives a clear structure to programs
                and allows code to be reused, lowering development costs. C++ is
                portable and can be used to develop applications that can be
                adapted to multiple platforms. C++ is fun and easy to learn.
                <a href="https://www.w3schools.com/cpp/cpp_intro.asp#:~:text=C%2B%2B%20is%20an%20object%2Doriented,fun%20and%20easy%20to%20learn!">
                  More
                </a>
              </p>
            </div>
            <div className="card">
              <img
                src="https://cdn5.vectorstock.com/i/1000x1000/02/84/blue-round-english-subject-concept-vector-18370284.jpg"
                className="h-[100px] w-[100px]"
              />
              <h2>English</h2>
              <p>
                English is a high-level, className-based, object-oriented
                programming language that is designed to have as few
                implementation dependencies as possible. ... Java applications
                are typically compiled to bytecode that can run on any Java
                virtual machine (JVM) regardless of the underlying computer
                architecture.
                <a href="https://en.wikipedia.org/wiki/Java_(programming_language)#:~:text=Java%20is%20a%20high%2Dlevel,few%20implementation%20dependencies%20as%20possible.&text=Java%20applications%20are%20typically%20compiled,of%20the%20underlying%20computer%20architecture.">
                  More
                </a>
              </p>
            </div>
            <div className="card">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFhUVGBUXFxcYGBcZFxgYFRcWFxcWFxUYHSggGBolHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKcBLQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAQIEBQYAB//EAD0QAAIBAgQEBAQDCAIBBAMAAAECEQADBBIhMQVBUWEGEyJxMoGRoRRCsSNSYpLB0eHwcoIVB1Nj8SQzQ//EABoBAAMBAQEBAAAAAAAAAAAAAAMEBQIBAAb/xAA1EQABAwIEBAQGAgIBBQAAAAABAAIRAyEEEjFBIlFhgXGRofAFE7HB0eEy8SNCojNSYoLS/9oADAMBAAIRAxEAPwDD2sKTufpVngcGJ0FMs252q8wdjKB1r5qtWICOxpcbolm3AipCCuVaKFqY50p5jF1MZqeTUe69ZaJTbWwEj3Kjs1IxpruFBYkAASSeQo7W8kUBI1IRWW4h4sJlbKx/G0fUKf8Ae1Uj8dxR085tDyjn7CqVP4bVcJMDx/SA/GUm6SfBehEUhFZDhfiq4GAvQU2LRBBjtvWvRgQCDIIkHqDQK+GqUTDk3QrMrCWpsUhFPily0CUyGyhEUxtKTHX8g0Esdhy9yapMZjrmUi8bSLOkTLRyymZpmnRc+I/fYLjuG5/SmtxixMZ9fY6+xiKqsXj7xPpbL0AA+5O9VuI4mP8A+a6TAZt/kKjXrbEyzZiNYnT9I+lVKWEa25HndIPxLTIbfqJH7PSFLxWPLx5rKWGnp/sNqhNfQNIBzH5feku2gqljoJIA6tAJ+QmmIrllDqW0kJrqDz02FNtYALe+yUqVnkhsCbbT0udfDWUr3zOVliOrUxr56D60b8OHIHMQDG2vIH/d6i4i2qvt6Z9jWm5TZBquqtGabTG342T/ADo5fSu8wTOvvRbttGX0Zh2ZgR8oUa1Fdth00MV0AFYe9zdSEZ2zCARTSqgUNmAIyyB9TXNiDPavAHZZ+a3V2unMeqLhcTdUeliB05VYYLjJDRcJj/elVqNzU/KmLbzHX6VlzGOmR+Vpj30wMhP2Wqt4622zfY/1opWsh5hUxV3huMSBKff/ABSlTDFt23TlLFBxyusVYEU0ii2nDAEUhFLTFkygZaQiikU0itArKFFJlp5FdFalZKCRXRT4rstdlZWt4fZ51bWxUeykVIWoNV2YykqbIRlFEmhK1Od6XIT1NqZeeoTNTrr0OjtbARxdcT1071gvEPGfPYhSfKXYc2P70c/7VpvFWL8vDsOb+gfOSfsDXnzEQCBsde9W/htAR8w67JPG1Yhg7++mqW2rGVkDTYwNtaXzPTIAHI8yTvOu3LalW7qI9R13G07nuacBAgPI3ggwJGp16bVW1SA6Hn+t48YSMpK/FKyunMsRvHsK9C4Dcz4e02WPSBHZfTPzifnWAFgXWRbcs7mCIgDXSO0CSa9RW2qKBoqqAOgAFS/ijwGtbvM+/eyqfC2Evc7aAPv78UgWq7ElnZlDlFXQsIGoEklulM4j5ZDPeb9kpgDXUg8gNyf61nr2MN1SchTDpotq3EliJBaRBjc+/wA6Vw+HJ4vtp4cz6c1WqVGU4abkjT7nkPqi4jiBErYJc879w+n/AKA7/wC71RXM1xpJLhRBaBv2jfr8qbbuXLrRMKpkzsBPPrVlir4tCyCISS8DRyIKho5D+1V2s+WYAknz9+EKQ54xDc7yQwdhry0AnUkknmol/h51JlFVRlkfH7Rp1O9MPoGYE7FdeZIMgDsDvUjD2XvS9x8tpdRO2nbp3ol+zKtcV1JA5GAB0T/FezxZx/C4KAdL6YI3BOsXuBa3K19yVEwjB4zBtDLDk0iJ9/1pmKw7gypkHmBETyJouFstbUOyZkYwokSzRIBEzlqRh7yaee5nUkATHRdNK6SQSRdcp0mvYG1OE6zptz6jz16oXCeE3boJtskroUJgnvtSvwe6Ay+UGKk5ipDMOxhv6VHxTgsSjERlIjlJ2kc6NbOUs0+s6dSo7naTXiX6yPCPqZWGMpfxjTebEX0BBvbT8KvKFZMgdjQIFSbbKD6lnuT/AGpGj4gNCSAP60YFIuaCJBjpeR1+1uy67Zj1AyNpFR4Ec5o6knQCI1b5ULPJ7Hf/ABXRO6zUy6t39mPBJbbpRVuBtNjSGydlmD1rvwjc4FcOVaaKgsB+EqWQTB3phcqYFSLiad+tAt2ZB11rgO5W30yIa0X5/ZW+A4mQAIEVbWbgYSKyNnEFdK0GAxy5QpBHek8RRi4Caw2IzWcVOIprCjEUhFJgp0qORSRRSKDiMSifEY7f4ogkmAhkgXKWKQrVJjOKsxhTlHbc/Oofmud2Y/Omm4VxFzCSdjGAwBK9iQUYUxafXyxKJTalBoV16c5qNdautCcaICaTTa6uoqMwKp8VYdnw7BfykMR1CyT/AL2rz/kYPSR1jrXqxrPcR8J2rhm23lzuIlT7a6VVwOMZTbkf5pXGYR1Q5maxp+FkLrJkAn1DXYAanbTVqXCWXdwlu2HYg6b8tzy0+larD+CbYaWusy/ugBZ9zJ+1aHh/C7NgRaQLO53Y+5OtM1fiNJo4LnyCHS+HVqjhnho8zA6X8/RVvhXgP4ZS9yPMbfaFA5T+vLai32Ql71yGRSVQaMD2QcyeZ/tRuI63SHMW0QOSR6dZknuI/Wshf40t69sRbUFbSjSJEZiNp+1KUmVK7jUJ1F42HIdftKrZqODY1gi5gA89yfesQjYm6L10ea2XKxtpbX4UIGo/i5AnSnXER3CLcJXNLqhkN6QJDD22qNbwLk3eaK5JdyDqZliy77HY60bhdt3M5gqgenZVAX4m2hQObQTyqgQ1o4Tp799b3SlJxJhzf5GSbyYMXvptMQdIhMutawrFltljACSGAXSCXM/YfWo1rh73sQxuyQILlATodlUcu1ai0yNb1d2ttsWLLP8AxHqZ/aI9qFicKHyMfWFuq7qJBdAsaiBLL7UIV41F9JTL8A14tdoIcGQAL84mbHyBACquKcTw4/ZLnKRBWMgB5Dnm9zUHCXpHlDSyzZio+L+ar3BeHELNn9YGqRKhpJknmD8PtBqLxLDG2i21yvcAZcqBrjkHYNHpSO2tdbUpfwafP6odSniB/lrwBewF45HQweiruMYfMYtWyBZRcx9gAdu86nnQF4fAOuY5M5I2UkEgGef9jV7wbguJa2Q+HIBGvmMUBgkgkAzz51a3OBsyhC6Wl5rZUkn3c1l2LZTOSdO/5XGYIViaxBl22kbRoALQJ78lkLFk+Wvl+o/G5jRei+/OfaouIdyIERtAGvyr0Ozw5bSRLZR+8wVfooAqsvY7D2xo9tR/8Yk/zc6y3GhzjkbK2/4aBTGepltz6Rz85KyVvhl10jIZndgR8takf+LeRmdBl2C61Y4jjNsn0ozj9520/lqvxPE21gi2OUJqfmdBTIfWdtCTdRwlJsyXemnkO8wuPDE3Oc9Swy0xmtJ+6PaTULEOPzOzHudJ/tQhBgLud9oorabiJcSl34qmwkUmNB8z/fcqRdxy8gT9qCb7NsAB1puKYSF6b96ANTrRGsEJOriajnEF3lZSERidDMcv8U2+pBkc6U3QrApOnWivbYCHEHcT0OoNdvquANc0t35zbz63Ua7YK71Y8OvISAdAPnVbcuFh7UbALrvXHiWXWGOaKnALdVr0dWEqZriKgcLtmZ5VZEVIqANMSrNN2dskKHj8WttdTqdhWWctcJOpO551K4xfl2G8GAe3Sq/bnVPD0gxs7lSsXWzvy7BMp7PNOQcyDFMIo6UuF7UhohNBU0rGviYVukE241RyadcNCmigJgJ01wpKUVpHYup60wU9a4jtCeoqLxi8yWxlMFmCzrpMnltMAfOpiistxDi1wh310JCoJ+LYSBuedMYakXvmNPYRSQ0XKg8VuZz+HT0ostdcbsRrA6xUTD3Fyg2VW2ombp1eFO+o0J6Cj8H4TiHBDK6ZgQxlRmDGTvJ+1X9rwgrIELZVmWyiWY93PLtFVX1qNEZXO+/ibankkW061b/NliQdbHo0ToNZNibnVV91rq2ci2c6FbjuTBj1RBnciB9aJwfCretgI3TOgE5kCgG3HXMJ7zWsscMw9pIuEZRzusIMdRoDRrfHsJaSUYFZygWlAEgTvoIjnMCpzsaXAikwkzr7n2E6SGuEmbRGkacrxz5ysZhvCmLuXHc28lv8nmNA0PpGXeNzEVuLPBIUCRI3IXNPzIge21MHiUsoa3hyQ3ws4HqkwMqkgka/EYHeqfxDf4oULWrwVeYRYPyaSfvQalTFViGvLWDQSf79boTA+mC5gmTO09ufSCVdHglhJLjTmXeF/lELQL3FMNZUhWAA/LbX+wrz61hb2IFsftGuAuzNcYkQuUiQTvJNXeEuX7aXbuIK5TlJHWNBljSeUb0V+Cj+dQuPKY36yjU3ufd0gc+Vpv77qzTxErlstr0oJL3CIUbSYn6DWs1iOPY26LjpItJPrtpoeks0xUy9gBiLSA3FtA5HK6AGBty1Ggr0Lw5fsPZ/DpbVVRYKLqpB0Jkj1E869VqUcK3M2nmM77Dcyfsh4plYaE5RuLG4+g16rxWyty8ZuOzbn1EkDqY/pzqNiL4IhVIBMZjuf6D2q2xGDvW8bdw9lSwzsMvLKCTBbkIq/wAR4Uv3TrCpHOSV6wNvvVh2Jp04LiACJG3opNPCmtTcGkyDBkTPg47c99NpWSwdy5BzagARNPxJCOYZfSR3HWtfZ8GrbUh8QQpiRIA09/70BrPCsPvcVj/D6j9RP60uMbTc45AXeATYwr2UgKjgI3JmNdOfmm4XxLZxMWr1nRhDMBInrESKoLHDrlnFi35edQ41ykjKToekRV4vibDZgljCs5JgTAEnbUzROIcbxlq7bS5at2w5A0OYxMETsKGzPTJaxmUOBs53qNwu1DSqhrnVMxaRxNba+xNxr1UTxB4cZnX8PbUCDm1AEz0qqx3AzYQNcZCeYB2+WlW3j3EOgthXZQS0wSJ23isphsOHEkkmaYwhqOpNc51vC57ylsX8tuJexjJdrcw0aaD3qtb/AOPtLbw0KCLj2ye8iqTxqP8A8ieqr/WtHf0w+GPRrP6xVH47T9qh6r/Wg4N5NcT/AOSN8SYBhnQN2rP2LgAINDQ6iKNhLGeewoatlbrFVpuRuvnyHZGk6bK/wWJZY106VcYkEo0bwYqo4bdSQWnt0+dXcyNKk17OBhV8NdpusTjbuZpy5YAEDtQ0ssVLR6RoT71P4th7itkOqycp99d6rG6VVYQWiFKrtio4un6XShyARyNDo1mJkx7Hn2obnWtoB01XsoNIWppNMZq+NhXaaRzTJrmNNmthHCfS0MGnTXoTDU4GiLTFp61xHYovFeI+UAB8bTE7CIkn61mk4siOQQWcmTA5nXlFS/EGNV2ygfASM06/xAdtKoMKfRdvhwrmcs/LRO+v2qvhqDRT4hr7HZDqV3MPBG5nWwF7WvsFqWx2Iyg2rKrPO5P/ANfU0y7iLma75uJcJbUGF/Z6kfD6RJJ9xAjeszg7F4kM11pPItv2MmK2HCsLcYNbNh7ocLmKgZfSIGp0OnvXKtNlEE28uo3PRHo1XYhuZwI8TbS1hbqQqkcZtFgLeGzsYguJYmNRJk786sbOBe7fVLoJyq11rY1QBSALQjkW1PtFX+C8C3oPkouHnd3IzD2Xl7zVxa8OYXDgnEY1BoFgMogDkB8VJVMfh7ikZPdx9LD6oZqsAy1HAnk0SPC2vdeY2c1+8XukwSA2w1Oi2wP9gCtXhcKqRbtB/VPw52UaGCcvKdOU/etFhcVwW3As2XvkGFIt5vUeQYjU1oLvGGtgAJg8MzfAl+6VuHpKINPrQcTjjYZCOQNvCyyMS5g4Wm+7iB6XKyfD/Dd65JFm6v8AE6LDd9GkfOn4v/05uXiGxGJhFMhZ0+ZiKfxHHcYe75ZxNrDzsEEkg6AgkajvNScXcwuCCjFXbmJvtBh2z6/w229Kj31pZ1esCCxwzEWDRmPmbDxlDq167wGui/ITPnH0SWfD/D/NA88XbupChxpG/pBI+1Fw2Ow64l8NbVhcRZYxpGmgMydxyolni15wHXh4VeWY27bfyHUVnOG+Y3ELl5rRQMhBBKkj4YnKT0NBDH1A81HEw2QMwN5GwPL+11oqPzZiTzuD9FI4hjMQHuZEs2bSnW9cJ9XUhRE69TVFeTEYpGNjH5su4t28n0aauMdcw+Lv3MPdafLiLclZMSW0Izbx2qv8S8T/AAFkJYsEA6BgBkUnrzJ96fw4MtYxozmNQIjmS6SZ6RrutOytaXPPCNYJt5f3Oqh8J8OYe/YLObly4SwzOzSp/wCMxpUEYbLd8nAYa22Qhbl64A3q5iTt8qtPBzuMEzNIYm4wn2kGsJ4axNxb+ZXZSZLQd/frvVCmypUdWl0hpsDpvyjtt0S9R7GupBrYL94EgQDvPO/SVr/FTJZayVyi4biSFAAIBEmOWtRPH/x2W/iP6g1VY7AZ7vmtccmQTOux/KaneNcfbu27ZQkkHXQiNK3TpZalKDP8pPKUfEOqfKrF4gCIvMxclE/9QU/Z22H7x+4qBwfgWewLmcCcxII2A5zOu1HfjuHvWQL9tiV5KRqQNxrVVxfxC11fKtr5doCMo3IHInpRaFOuKQpARBuTpH3SWIr4cVziS6ZaIAmZ68u6v8dfX8HZ9Q+K3HeG5VU+OMQjXEVTJUHN2mIFUDXnfKpJOUQo6c6dZs5icxNMUsI2k4PJ0n1SdfHOxLTTa3WBPhdBtORtXWkzGKNYdVDfQVHUSab5qaRAbeenJXuHs7Aa1eYW2VUA71TYG8yair9WkA9alYgnRV8IG3O6i47CrcXK3yPQ1m8XwW4kkQwHTf6VqzTDXKOIfTEDRbr4dlXXVYWDSVuGAnYVHu4S2TJVZ9qcGMH/AGpE4AjR3otixoZNOY0JjXzYCfauY1wppqq4/wAXFhIU/tGHpHTlJ+9Gp0nVHBrdURzwwFxU7HcRt2RLtE7Dcn5VVt4rtTojkddAfpOtYp7mYkuSSZ1317mmBdJB16QfrVlnw6kBxXKnu+Iv/wBR+V6Zw/ilu9IQ6jdSII+VT1avLMNimWCghlObMJmOntXpVgi9ZGulxNx3EGPnU/GYQUYINj6KpgsX84Eb+/us8mAS/eulGYWwrOx76/D2J696l4fg+EsXbdq6lx2ZAwCyczkn05eWg022ofh+0UXFKSCVVVlTI1zbGtJ5o8+75eT8QEQIHMAKZJIjXnrHat16z2uLATAGxjYXnummUWOpioQJnfx0Cm4CyQP2WCRehuFQfouY0zxhx7E2GsWrDi35sAnLMEtGk1AuWxb9eMxzlv3LbG2PkF1PvpSYzhtu9dwx8y7DEOFdpYBPV+bXX3qcynT+aH1ACL7OIJjmdY1RHM+Z/ILYLiUe3atXRdxV1FGcWycrMRrnIIHyNN4lwqxcwz3GwKWLlvUAouoHUpowPQ1lcVj+IXrnk4Oy1i2DGdlKz/EzRv2Fam6/l4K7bfEG86qc7FgxnQkRyHakn0nUiwtcJJFgTIBN5AhoHTsgQA9rWTZw58/L6+KsL/FkwvDku5FBVFFtYEB2XSOka15Z4d4W2PutisQS4ZvShJ9bdT27Vd+NuLWrnC7Qt3FJVlDAHUEKZkUXwfxG3YsWSQP/ANYiSBEiSdedOYZtTD4Z9RgOdziOsDbvv4rlKgMzgBMS6OfFDew15Eq98aubNnDC3HnIwFv7ae0gCrC7buKBe/B2GxBAzEFQZj98rtXkXjfxG+KxY9WS1bIClSGyiZLSp3/sK02J8WYhrCnD3Hlp8ssFJYKNSQZPI1x3wus2jSBiTMzO94kHTeEOk75rTTGrJmd5N4A2Bt1OivcZ+OuEviLtrDWl1IQ+qB1bb/dqzlvxdZfiAgMUyeWCASWMzJG9TLfjfD3LM4m2c6D1AKCpnT0knSa8zbGkX3bDhkzkhRPqAPKacwWALw9tZmWBAiA2/W5PiVivizRDL6mCALxvA8bXV34hcrxPzYYKXQhjIB0AMGtFxnjc2XtrctEkES2unsNzWPs4Uk5r91o/ezZjPQSfT7mrLiVq2lmUW2mb8xGdo/5tv9qeqUGE02m5bA6WR8Pmayq7LAJLrniHlA72Ci8I4/ft2zbYlkMgGOexhiNqqsOjWnzKUO+/Kfauwi3lI1bJOoBka7wDpR79pyTltgCfiJ1jvTmVjXGIvqp7C+pTaXB2ZptYz5jUci7zTr1y+86kJ+9AE/XlVXiAdBnzHnBJAqx/CXD8RWOmpH02ovkjsP8AioFda9rNI7L1TC1K0zI8T9BIj1PNQb1oi2ub/ooGpnmaiMpPKKs/wi75Sfc0vlgchWhVAQ34F7jew7n7KrFrTYzNSfMhdtaO1xZjMKj43kAK7mzEAoRpCi1zmu2jZBu2IQNOp5U7h8ZtRQbjk6dKnYDCkamtuMNuk+Ev4BZXWCwgfUnTpzq0IjSq7hYObtFWTVHrE5lYwwGSQEM0w0RqERWQilNakpTSVoLC0pNMJpCaYTU4BDCfXnXG8Wb192Gw0Hsuk/1r0JieW9eYYjNmbNoZMjbWddOVVvhjBLneCUx7iGtHimKdZP350bMfUUkCNY00O405UFgNNZ/pXPpttyqsVOBjVKh7/wCe1egcHtlsCqpIYowHuS3OsJg7BuOqKJLED5c69RtWwihVAAUQBy02FTviLwGtG8z5Kp8LacznbRCzvBbos27i3PQzXLagNodwTvyidakYbj+GOLulrWcEKqvAbRRB0PImsljmZmbP8cmZ3mhYey2UuAT11jQfrWzhGOlzjc8jHL8Jg4+o0tY0SG35m09hqvTeCW8FezXLFq2HUx61MqeuUzA6RWT435341mv3STbPp8uZj8uUDYa1VWOJPMZeUSHYNHvP2o6YK0xzpedWG4YHfqtz+9Cp4b5NQuLjcRe5Hf8ASP8AOGIa0UwCQQT/AK+hiY5TsFc43jWMvqRbuX0Cg5hnUH+X4/vVPhcDlcLPnXm/JByqObOzb/SrFsRdiEfOSdbjjl2A59yKk4TDtluDPHmwGYCWIHKTXA4UWZWwB0H1snDhBVqB8Enrp/6j+M9SCLqDgLlpf2IuXXBb1AKPLM/uAgmNtYnpWhuYbCKq22toBrEnMRAmCrLP9ah4fglpYIDSv8Ue9TSloat5YjmY09p2parWa48Jd9JPaE9h8K5jeMNEW1JtyuVW4LhNkutxIyE5ihYRscvpBMb86lHglpGFwEs65iqgArryOYxpUk420BPmJHL1AD6moeN42iELkuMTtlgg/wDYGKznrvPDP69Fs0sNTbxZRebDf3+k+7w8uw8xgyLrkEIhPdVGsdzXX+GoWzQIGwjT36n51GxfFcQih/w6op1BuOJjrAqNb4tdeM1y3bB2kEsR1FvkO5NabTrESIA0t+vfND+dhgcsGTGoPgLui3op9/h6NGdc8bA6KPkIFDu5FEehANlkfpWcxOIa46hblzKWCSScuvP/ABQExCi4wulmykgZIGx3pluGfHE7t7skn/EaTXQGRJjMSINp11+xV3e4hZG9xflUdcWh2DEfvNoPvUay4Ynykg6s11vUUUdOU1WedLGJIJGp3I6HoKOzDt6pWv8AEXtjSDpE/U+piOuqs72OM6II6zy60O9dub6KpEqW0n2FDsWhd9TEKuYzrrAFQb+ILAbwNI5RRG026AJSti3huZxMHTQT5XAS3WedX0PTagoDPM/rRvMEGFAGnfWnYQ+8nfkPmaNoCp5aHvAnrv8AdGyCcxUL7ULD3Vlrh5aAU68SSEXn0qJirYUwOW9ZaJsfYRq1QsOZosD/AMo+2qGTJq/wRiJE9jULhtpTrGtX+H4cTBJAFBxFRosULD0nG4uVZIBAgaGmNRIgRQmNSVa2TDTDRDQzWwsEpCKZTjTa2EMlX1NJrpphNIwhtKdNY7xNwhldryiUYyeqk7z271r5rppjD13UXSO65VpCq2CvLzUjB4V7rBEEk/7JPIVvbvDbLQTaTTtH6VJRFXQAD2EVRd8RbHC26Ub8PM8TrKB4e4R+HBLEF23jYDoKukaouai2zUuq91R2Z2qr0WtptDW6LMeLLpN4AiAFEabzuZ59PlVKhA0mtj4oy+QSUDGQASJKzuQeX+axgAkGBp12+Y5iquFdmpDpbySteW1DupOZV30nbTf2o9jGoSB120Yt8gNaiq0SDB3IIGk9BQ7eW1Di7+0nVQp0/wC1GNMHxXRi30yMsAb6W/5Ceg3WjdXR1XIuV9n5z0KsAQexpuOuupCi9AOkwsz01P8AWqfB3nZlYsxuZyxB2gL8VQ8c0nckgzEHnQm0OK/vzTdT4j/hLxNza8cuXe1z1V7i7SoPXjXMxPpbTsFGn1iqu9cfEOtpGd1GwYKNtzA2qXirLOc2IbJ5mT8pGUDb086j28SuHVgvqLhgG2IG0kCt07C13en0CWxXEePhp7yTmIGxBJ18N7o/E8c9nLYUoWBUsQASp5ICelTuK8Re2oFweow2XNLDkVLVScK4a7nNEAa5qnthiQbzC22UaL5gKjuQNWNce1kgG8a8yUWg/EOY6oJbms3cNaNSbSfue8E4hxFr4S0DbhvV6T8I5WmPyqvx+FOQXHb1nlyAmIHen4HjTICBbsqOZKa+3ejri8+nlFi2w0UE+35RXmtfTMBsAdRf8LL30cWwlzyXEcjA5WFzfTxQ+HPcvLasCYtsXACyftqaHdwuUl2OQjdXBkk9uVS7ea04cKqMu2Vw31q5xXifDXkC4iwS20qBp3BJBHtWH1Hh3A2QdYievQrraLBSiq640JkaCByIhZZMI7WpDAD1FpMSZ0050lrDoJUvMiSViB2p+KvWsxW3mNsbEjX+XahXrq5dD9VAP2pgFx7+7pEijrqQIN5mOVxY/lNYG76baHKPv7mnYgeWmUkSdx0pLd0lZk6bgEj9KG7KRlUDuTM1reOSGXAMLp4nD05ADy1sohYnSpjPlAA+nehLCiedLYvgHMRJ5DlWjfRAp8B4jBPoPeyYXZD0JpbGGZzP3odxy5nmauMBYKrrXKjsondDEOJAnKiYfD5RFX+DUhADTsHaUqGyiaOak1qmeysYehk4pQmoZopFMIoITBTDQzTyKYwrYQ000w0402tBDKuJpCabmrs1KQhAp9dNDmlmtAIgSzSUhNITXYWgU8GiqaADTwa5EorSpBUMCGAIO4OoPyrGcdtIl5lVAgEbbbb1sFamY7BW7qnMisYMSNR7GjYer8p15hdqM+Y20T19yvPWaAd4Gq9jRMKqvAg5tZgE95gV14AekiCNI/xSYe81ps6EhhtHKrRMjqpJ4X3gjfeN/wClOveXM+eFOxAR5jmNtu1EtcWtgQA8cyvpZgOsyKpr2Ie40sSxp6IZhpGuxH61j5QjiRRj6mcmkAAd4P8A9EDsp3EB503VuM3UXCJ07g1DtWdQugJO7EQO5nSrHDXYlW81iNsqjKPfSai4uMwMaAEnvG1eYS3g22RK1JjgK3+x1He53jt2R8W5sSoS2zER5uYufdYMCpHCcTcFtgy50CnLABy8ySQJquwlx3LaqojUkbCNh0p+ExbG2bWbLb1LkDU9Ae1ccyWwY2ldpV4qh7CQOLKLeR0tvLhbqu4f6ictsXHMBRroTz33oWEwrXLhVtCJmSB+tP4U5UswLCNso3PvyoNgkXQXEmZhufv1rdwXQl+FzKRfOpkaDXWQJnx2sFOsPD+WPLQD+GS3zqFiBBMmTOlOx5DOGAiY02H+KJYvqrFgq3G6v8I+XOsiQJj+/FFe4OJpuMAGxvoRsPCNupTbWIVRo7T9FHYDnQHw8meupo2Lum60syD2EAewFBWzB30rQtfdAfxHIRLRpt3iSlZRsknqaTIEGuprvO1yr9a7EZQI+JuZrQnRZOWC4RI8h0HMolpkAzMQW5DpUImT70/DWszRV7guGD8qyay57WaoXFVAAGnqeZScPw4gDTlVynCjzYR2oGHwLkiRA71M4nxJbSxu0aAfqanVHuc7KzVUKFFuUl4Tr+KtWhBYCOW5+gqhx3Hn/JAHtJjrrVJfxTNuZ1mgNPOm6eDY27roFbHEgtpiyscTxe441cg9jA+goVniV1Zi436/rUW0ATBMDrTW30pkU2gRCUdWqHiJ9Va4fj10H1Qw77/WrrC8St3NjB6HQ1jqUdqFUw1N2lvBap4yo3W4W4NMIqBwjiAcZSfUBz51YGpzmFroKpteHtkKxrprpps0ohAp01002aWa8iArppZpJrhWoWgUoogqDxLHrZTMdTyHMn+1ZjGcfvPoDlHRdPvvTFLCvqXGixUxLKdjqtwpoitXm3/kLv8A7j/zGrPA+I7qQGOcc53js1EfgHgcJn0XKfxCmTeQtbxTALeQiBn3UxrI5TWLxtl0IDW2E8yIH151ucLiVdQymQdf970mPwq3kKN8jzHehUK5p8Lhb6JupT+YJab9rrBZIMx86H5Lkzm+c1a8W4BdtgEMHWeQgiq25cUDfXp/u1U2PDhLDKnPYJIeIi+sT+VIweMay3oxBE75V/XNReJ44XIzEFhuYAJ94MGoKnMJyj9a61eUch9K8aYzZoutiu5rMgIynY5vuSi+WSNDNLna0pGU689aFcvKTI9J7GmXLpbQ3GI6E10NJ1WfmtAlv8tAQR90TBFiQRtynaafdtkMXcgdBIJ+1Cu3wwCk6DkKHKj8p+n967lOqyXta3LMgXubT4Dl4od24WOnyp1qyesVJRWInRR13qN5gDa+oVoGbBAfTDSHP35278/ROlV1Anv/AJp1vKdXb5Cm38QSICwPalweCLHUaV42Emy8XgOhsEeECfv3QL7gnQQKmYPh+YSZq0w3BwZKrMf7tUpMI+2U/pQX1xEBeFFzjmI16KJZwITZT96uOFWCDmIjlVighQOgppNTn1y8QqlPCtpkOlOdo1NYfjeLD3CyzB0+lbDFrmRlBiQf0rz7LrG+tM4FgJLkHH1CGho3XKYnTelRcxgmO5o+JCgQF13mZ06VDqgL3Up7cjspvHiiBRrrXWis+oEj6UjNMT9q5AJ1MCurO4hOVxz25Cgmn6T2pprq4TKNg2IdY61rLTSAax6bitXgjK+1J4sWBTmCdBIVwTSE11dUhMhLmrq6uroWwurpjXpXV1dAkwtBYPGXy7lmM6/btQSJJjblPSurq+gFlFKHT1aK6urqzK0fhC+Q72ydCMwHfb+taoNXV1RsaAKx8Ar+D/6QHUpxIIgiRUPE8JsupGRQTzjWfekrqWa4tNim8rXC4VBe8P3Scq6fMR+tV44bcRiDBI03rq6qVOu42KlVaLWAOEyDzUTEhyYI/SilmC/APfSurqdgGEj8xzS4g3hBwpadI1ouIs3Sdf1pK6sOdDl0Fxp5ZMIuH4cWGpijLwiCCToa6uoJqulEFNqtMFhVLBanXeEsp9JBFdXUpVqOa6yfw9Fj6cnmp2Cw/liJ1O9GLUldSn8iSU+AGiAmE00tS11eXCmXBII6gj61gMXYNtip3FdXVQwBuQpvxBoLQUNUkE9KRyDsIpa6qKlGwCdbVY1J9qEa6urq8dEldXV1eWVM4cJf2FaOwsCurqSxWqfwgC//2Q=="
                className="h-[100px] w-[100px]"
              />
              <h2>Sanskrit</h2>
              <p>
                Sanskrit is a general-purpose scripting language geared towards
                web development. It was originally created by Danish-Canadian
                programmer Rasmus Lerdorf in 1994. ... PHP originally stood for
                Personal Home Page, but it now stands for the recursive
                initialism PHP: Hypertext Preprocessor.
                <a href="https://en.wikipedia.org/wiki/PHP#:~:text=PHP%20is%20a%20general%2Dpurpose,programmer%20Rasmus%20Lerdorf%20in%201994.&text=PHP%20originally%20stood%20for%20Personal,recursive%20initialism%20PHP%3A%20Hypertext%20Preprocessor.">
                  More
                </a>
              </p>
            </div>
            <div className="card">
              <img
                src="https://www.shutterstock.com/image-vector/physics-subject-conceptlettering-card-vector-600w-1110756503.jpg"
                className="h-[100px] w-[100px]"
              />
              <h2>Physics</h2>
              <p>
                Physics is component-based javascript frontend library which is
                used to build the user interface especially for Single Page
                Application(SPA). ReactJs is not only used for web development,
                but you can also develop Mobile Apps, Desktop Apps Virtual
                reality Apps and many more.
                <a href="https://www.greycampus.com/blog/programming/introduction-to-react-programming-language">
                  More
                </a>
              </p>
            </div>
            <div className="card">
              <img
                src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/03/23211546/chem-300x225.jpg"
                className="h-[100px] w-[100px]"
              />
              <h2>Chemistry</h2>
              <p>
                Chemistry js brings event-driven programming to web servers,
                enabling development of fast web servers in JavaScript.
                Developers can create scalable servers without using threading,
                by using a simplified model of event-driven programming that
                uses callbacks to signal the completion of a task.
                <a href="https://en.wikipedia.org/wiki/Node.js#:~:text=Platform%20architecture-,Node.,the%20completion%20of%20a%20task.">
                  More
                </a>
              </p>
            </div>
            <div className="card">
              <img
                src="https://www.eklavyaoverseas.com/assets/images/candidates-barring-with-bio-as-additional-subject-eklavya-overseas.jpg"
                className="h-[100px] w-[100px]"
              />
              <h2>Biology</h2>
              <p>
                Biology (Hypertext Markup Language) is the code that is used to
                structure a web page and its content. For example, content could
                be structured within a set of paragraphs, a list of bulleted
                points, or using images and data tables.
                <a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics">
                  More
                </a>
              </p>
            </div>
            <div className="card">
              <img
                src="data:image/jpeg;base64,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"
                className="h-[100px] w-[100px]"
              />
              <h2>SST</h2>
              <p>
                SST is a style sheet language used for describing the
                presentation of a document written in a markup language such as
                HTML.<a href="https://en.wikipedia.org/wiki/CSS">More</a>
              </p>
            </div>
            <div className="card">
              <img
                src="https://assets.thehansindia.com/h-upload/2021/03/27/1064483-tree.webp"
                className="h-[100px] w-[100px]"
              />
              <h2>Enviromental Science</h2>
              <p>
                Enviromental Science is a lightweight, interpreted,
                object-oriented language with first-className functions, and is
                best known as the scripting language for Web pages, but it's
                used in many non-browser environments as well.JavaScript can
                function as both a procedural and an object oriented language.
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript#:~:text=JavaScript%20(often%20shortened%20to%20JS,non%2Dbrowser%20environments%20as%20well.&text=JavaScript%20can%20function%20as%20both%20a%20procedural%20and%20an%20object%20oriented%20language.">
                  More
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="work">
        <div className="container">
          <h1 className="section-heading flex w-full items-center justify-center">
            <div className='text-white mr-1'>Our</div> <span>Faculty</span>
          </h1>
          <p><h1 className='text-white'>Faculty is very highly educated and experienced</h1></p>
          <div className="card-wrapper">
            <div className="card">
              <div className="overlay">
                <span>Hindi</span>
                <a href="#">Mr. Manish Tawade</a>
              </div>
              <img
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                alt=""
                className="h-[250px] w-[300px]"
              />
            </div>
            <div className="card">
              <div className="overlay">
                <span>English</span>
                <a href="#">Mr. sushil Pandey</a>
              </div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFLcOQgjTUQ4OikmeYQ47kScckNTym_fxUg&usqp=CAU"
                alt=""
                className="h-[250px] w-[300px]"
              />
            </div>
            <div className="card">
              <div className="overlay">
                <span>Math</span>
                <a href="#">mr. Arun Shukla</a>
              </div>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="h-[250px] w-[300px]"
              />
            </div>
            <div className="card">
              <div className="overlay">
                <span>Biology</span>
                <a href="#">Mr. Mohan Bhandari</a>
              </div>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="h-[250px] w-[300px]"
              />
            </div>
            <div className="card">
              <div className="overlay">
                <span>Chemistry</span>
                <a href="#">Mrs. Lugun</a>
              </div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTjvnvFdvEeYstCzqakEqBZbhtuf2qgTGQtw&usqp=CAU"
                alt=""
                className="h-[250px] w-[300px]"
              />
            </div>
            <div className="card">
              <div className="overlay">
                <span>Physics</span>
                <a href="#">Mrs. Bibha Pandey</a>
              </div>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="h-[250px] w-[300px]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="blog" id="blog-us">
        <div className="container">
          <h1 className="section-heading">
            <span>Our</span> Management
          </h1>
          {/* <p>I will make standard clean websitefor our enhancing the skill.</p> */}

          <div className="card-wrapper">
            <div className="card">
              <div className="img-wrapper">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445__340.jpg"
                  alt=""
                  className="h-[300px] w-full flex items-center justify-center"
                />
              </div>
              <div className="card-content">
                <a href="#">
                  <h1>John</h1>
                </a>
                <span>Director</span>
                <p>
                  We will face some unique challenges this year, but I trust
                  that with our collective dedication and enthusiasm, we will be
                  able to provide an education that meets the needs of all our
                  students on this campus. From virtual classes to in-person
                  instruction, there will be plenty of opportunities for
                  learning and growth. With continued collaboration among all
                  stakeholders in the school community - students, faculty,
                  staff and families alike - I'm sure that success is possible
                  for each one of us.{' '}
                </p>
                <a href="#">...Read More</a>
              </div>
            </div>
            <div className="card">
              <div className="img-wrapper">
                <img
                  src={thirdImage}
                  className="h-[300px] w-full flex items-center justify-center"
                />
              </div>
              <div className="card-content">
                <a href="#">
                  <h1>Vishawanath</h1>
                </a>
                <span>Manager</span>
                <p>
                  We will all need to work together as a team—students, staff
                  and parents—in order to create a safe and successful learning
                  environment for our students. We have an exciting few months
                  ahead of us as we tackle some of the most pressing challenges
                  in education today. Through these trying times, let us remain
                  tight knit as a faculty, united by the common goal of
                  providing our children with an excellent education.{' '}
                </p>

                <a href="#">...Read More</a>
              </div>
            </div>
            <div className="card">
              <div className="img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwdGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="h-[300px] w-full flex items-center justify-center"
                />
              </div>
              <div className="card-content">
                <a href="#">
                  <h1>Maria</h1>
                </a>
                <span>Principal</span>
                <p>
                  We will all need to work together as a team—students, staff
                  and parents—in order to create a safe and successful learning
                  environment for our students. We have an exciting few months
                  ahead of us as we tackle some of the most pressing challenges
                  in education today.
                </p>
                <a href="#">...Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact" id="contact-us">
        <div className="container">
          <h1 className="section-heading">
            Contact<span> Us</span>
          </h1>
          <p>We will design standard clean website for business solution</p>
          <div className="card-wrapper">
            <div className="card">
              <img src={twetyImage} alt="" className="h-[150px] w-[150px]  " />
              <h2>Call Us On</h2>
              <h6>+91 9348009256</h6>
            </div>
            <div className="card">
              <img
                src={twetyoneImage}
                alt=""
                className="h-[150px] w-[150px] "
              />
              <h2>Email Us At</h2>
              <h6>aadrikaenterprises@gmail.com</h6>
            </div>
            <div className="card">
              <img src={twetyThree} alt="" className="h-[150px] w-[150px] " />
              <h2>Visit Office</h2>
              <h6>
                IIFC Complex, Software Technology Parks of India, GL-3, Namkum
                Industrial Area, Namkum, Ranchi, Jharkhand 834010•088629 41658{' '}
              </h6>
            </div>
          </div>
          <div>
            <div className="input-wrap">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="input-wrap-2">
              <input type="text" placeholder="Your Subject.." />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Your Message.."
              ></textarea>
            </div>
            <div className="btn-wrapper">
              <button className="btn btn--primary">Send Message</button>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex items-center justify-center w-full">
        <div className="w-full block">
          <a href="/landing-page" className="flex justify-center items-center">
            <img className="footer-logo" src={firstImage} alt="" />
          </a>
          {/* <div className="footer-socials flex w-full justify-center items-center">
            <a href="https://www.facebook.com/">
              <img src={sixteenImage} alt="" />
            </a>
            <a href="https://twitter.com/">
              <img src={seventeenImage} alt="" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={eighteenImage} alt="" />
            </a>
            <a href="https://www.google.com/">
              <img src={ninteenImage} alt="" />
            </a>
          </div> */}
          <div className="copyright ">
            Copyright 2021@ Aadrika Enterprises  Template.All Right.
          </div>
        </div>
      </footer>
    </>
  );
}
