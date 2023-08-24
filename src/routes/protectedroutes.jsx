/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import CustomErrorBoundaryForRoutes from '../Components/Common/CustomErrorBoundaryForRoutes';
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineBars } from 'react-icons/ai';
import Footer from '../Components/Common/Footer';
import { FaTimes } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import Header from '../Components/Common/Header';
import { routes } from '../constant/index';
import imga from '../../public/e-scuola-logo-1.1.png';

function ProtectedLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [collapse, setCollpase] = useState('');
  const [subcollapse, setsubCollpase] = useState('');

  const secondchangecolor = (id, eachitem) => {
    if (id === subcollapse) {
      setsubCollpase('');
    } else {
      setsubCollpase(id);
      navigate(eachitem.link);
    }
  };

  const handleTrigger = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(true);
  }, [collapse]);

  const handleSubmenuTrigger = (id, eachdata) => {
    if (id === collapse) {
      setCollpase('');
    } else {
      setCollpase(id);
      navigate(eachdata.link);
    }
  };

  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem('loginInfo'));
    if (value === null) {
      navigate('/login');
    }
  }, []);
  const [titleText, settitleText] = useState('');
  const [titleBarVisibility, settitleBarVisibility] = useState(true);

  //context Data to active toast from anywhere

  return (
    <CustomErrorBoundaryForRoutes errorMsg="Something went wrong !!">
      <div className="App ">
        <div className="page">
          <div
            onClick={() => setIsOpen(false)}
            className={isOpen ? 'content2' : 'content'}
          >
            <Header isOpen={isOpen} />
            <div className="block">
              {/* <TitleBar titleBarVisibility={titleBarVisibility} titleText={titleText} /> */}
              <Outlet />
            </div>
          </div>

          <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
            <div className="trigger" onClick={handleTrigger}>
              {isOpen ? (
                <FaTimes className="text-white hover:text-black" />
              ) : (
                <AiOutlineBars className="text-white hover:text-black" />
              )}
            </div>
            {isOpen ? (
              <>
                <div className="sidebaruser">
                  <img
                    src="/assets/schoollogo.jpeg"
                    alt="user"
                    className="sidebarimg"
                    loading="lazy"
                  />
                </div>
              </>
            ) : (
              ''
            )}
            {routes?.map((eachdata) => {
              return (
                <>
                  <div
                    className={
                      collapse?.includes(eachdata.id)
                        ? 'colored2 sidebar-position'
                        : 'colored1 sidebar-position'
                    }
                    onClick={() => handleSubmenuTrigger(eachdata.id, eachdata)}
                    onKeyUp={() => {}}
                    key={eachdata.id}
                  >
                    <div>{eachdata.icon}</div>
                    <span>
                      {eachdata.label}{' '}
                      {eachdata.sub ? (
                        <>
                          {collapse?.includes(eachdata.id) ? (
                            <IoIosArrowDown
                              size={18}
                              className="sidebar-position-icon colored2"
                            />
                          ) : (
                            <IoIosArrowBack
                              size={18}
                              className="sidebar-position-icon colored1"
                            />
                          )}
                        </>
                      ) : null}
                    </span>
                  </div>
                  {isOpen && collapse?.includes(eachdata.id) ? (
                    <>
                      {eachdata?.sub?.map((eachitem) => {
                        return (
                          <>
                            <div
                              className="sidebar-positions"
                              onClick={() =>
                                secondchangecolor(eachitem.id, eachitem)
                              }
                            >
                              <div
                                className={
                                  subcollapse?.includes(eachitem.id)
                                    ? 'colored3 block w-full '
                                    : 'colored1 block '
                                }
                              >
                                <div className="flex space-x-1 w-full">
                                  <div className="dot">●</div>
                                  <div className="dotlabel">
                                    {eachitem.label}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <Footer isOpen={isOpen} />
      </div>
    </CustomErrorBoundaryForRoutes>
  );
}

export default ProtectedLayout;
